import Slider from 'react-slick';
import { useEffect, useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box, Stack, useMediaQuery, useTheme } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import CarouselButtons from './CarouselButtons';
import CarouselItem from './CarouselItem';
import { useStyles } from './Common';

const RootStyle = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
  height: '320px',
  position: 'relative',
  background: '#101658',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '& .slick-slide': { opacity: 0.7 },
  '& .slick-center': { opacity: 1, transform: 'scale(1.1)' }
}));

export default function CoursesCarousel({
  courses,
  activeCourse,
  setActiveCourse
}: {
  courses: any;
  activeCourse: number;
  setActiveCourse: Function;
}) {
  const carouselRef = useRef<Slider | null>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(500));
  const isLarge = useMediaQuery(theme.breakpoints.up('xl'));
  const classes = useStyles();

  useEffect(() => {
    let found = false;
    courses?.map((course: any, index: any) => {
      if (!found && !course.is_complete) {
        setActiveCourse(index);
        found = true;
      }
    });
  }, []);

  const settings = {
    slidesToShow: courses.length === 2 ? 2 : 1,
    arrows: false,
    focusOnSelect: false,
    rtl: false,
    cssEase: 'linear',
    variableWidth: true,
    variableHeight: true,
    centerPadding: '0',
    infinite: true,
    slidesToScroll: 1,
    initialSlide: activeCourse,
    beforeChange: (current: number, next: number) => setActiveCourse(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const sendAnalyticsData = () => {
    trackEvent(courses[activeCourse], 'Path Pages - Course selected', {
      'Course Name': courses[activeCourse]?.name
    });
  };

  const handlePrevious = () => {
    sendAnalyticsData();
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    sendAnalyticsData();
    carouselRef.current?.slickNext();
  };

  const setNextActive = (index: number) => {
    if ((index === 0 && activeCourse === 1) || (activeCourse === 0 && index !== 1)) {
      handlePrevious();
    } else if (index < activeCourse && index !== 0) {
      handlePrevious();
    } else {
      handleNext();
    }
  };

  const displaySlider = () => (
    <Box className={`${!isMobile && !isLarge && classes.tileGradient}`}>
      <Slider centerMode={true} ref={carouselRef} {...settings}>
        {courses.map((course: any, index: number) => (
          <CarouselItem
            key={course.name}
            course={course}
            index={index}
            setNextActive={setNextActive}
          />
        ))}
      </Slider>
    </Box>
  );

  return (
    <RootStyle>
      <Box sx={{ maxWidth: '1200px', margin: 'auto', position: 'relative' }}>
        {courses.length < 3 ? (
          <Stack
            direction="row"
            sx={{
              m: 'auto',
              maxWidth: { sm: '85%', md: '90%', lg: '93%' },
              justifyContent: 'center',
              position: 'relative',
              zIndex: '10'
            }}
          >
            {displaySlider()}
          </Stack>
        ) : (
          <Box
            sx={{
              m: 'auto',
              maxWidth: { sm: '85%', md: '90%', lg: '89%' },
              position: 'relative',
              zIndex: '10'
            }}
          >
            {displaySlider()}
          </Box>
        )}
        {!isMobile && courses.length > 1 && (
          <CarouselButtons onNext={handleNext} onPrevious={handlePrevious} />
        )}
      </Box>
    </RootStyle>
  );
}
