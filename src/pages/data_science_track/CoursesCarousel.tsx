import Slider from 'react-slick';
import { useEffect, useRef } from 'react';
import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import CarouselButtons from './CarouselButtons';
import CarouselItem from './CarouselItem';

const RootStyle = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
  height: '320px',
  position: 'relative',
  background: 'linear-gradient(163.43deg, #29064C 11.47%, #9E5AD7 91.06%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '& .slick-slide': { opacity: 0.7 },
  '& .slick-center': { opacity: 1, transform: 'scale(1.2)' }
}));

export default function CarouselCenterMode({
  courses,
  activeCourse,
  setActiveCourse
}: {
  courses: any;
  activeCourse: number;
  setActiveCourse: Function;
}) {
  const carouselRef = useRef<Slider | null>(null);

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
    slidesToShow: courses.length > 3 ? 3 : courses.length,
    arrows: false,
    focusOnSelect: false,
    rtl: true,
    cssEase: 'linear',
    variableWidth: true,
    variableHeight: true,
    centerPadding: '0',
    infinite: true,
    slidesToScroll: 1,
    initialSlide: activeCourse,
    beforeChange: (current: number, next: number) => setActiveCourse(courses.length - next - 1),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  return (
    <RootStyle>
      <Box sx={{ maxWidth: { sm: '85%', md: '90%', lg: '93%' }, mx: 'auto' }}>
        <Slider centerMode={true} ref={carouselRef} {...settings}>
          {courses?.map((course: any, index: number) => (
            <CarouselItem key={course?.name} course={course} />
          ))}
        </Slider>
      </Box>
      <CarouselButtons onNext={handleNext} onPrevious={handlePrevious} />
    </RootStyle>
  );
}
