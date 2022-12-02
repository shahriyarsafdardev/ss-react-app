import Slider from 'react-slick';
import { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowForwardFill from '@iconify/icons-eva/arrow-forward-fill';
// material
import { alpha, useTheme, styled } from '@material-ui/core/styles';
import { Stack, Box, Paper, Link, Typography, CardContent } from '@material-ui/core';
// utils
import mockData from 'utils/mock-data'; //
import CarouselControlsArrowsBasic2 from '../../components/carousel/controls/CarouselControlsArrowsBasic2';

import CarouselItem from './CarouselItem';
// ----------------------------------------------------------------------

// const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
//   id: mockData.id(index),
//   title: mockData.text.title(index),
//   image: mockData.image.feed(index),
//   description: mockData.text.description(index)
// }));

const RootStyle = styled(Box)(({ theme }) => ({
  alignItems: 'center',
  overflow: 'hidden',
  width: '100%',
  height: '320px',
  position: 'relative',
  background: 'linear-gradient(163.43deg, #29064C 11.47%, #9E5AD7 91.06%)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  '&:before, &:after': {
    top: 0,
    left: 0,
    zIndex: 8,
    width: 48,
    content: "''",
    height: '100%',
    display: 'none',
    position: 'absolute',
    [theme.breakpoints.up(480)]: {
      display: 'block'
    }
  },
  '&:after': {
    right: 0,
    left: 'auto',
    transform: 'scaleX(-1)'
  }
}));

// const CarouselImgStyle = styled('img')(({ theme }) => ({
//   top: 0,
//   width: '100%',
//   height: '100%',
//   objectFit: 'cover',
//   position: 'absolute'
//   // transition: theme.transitions.create('all')
// }));

// ----------------------------------------------------------------------

type CarouselItemProps = {
  title: string;
  description: string;
  image: string;
};

// function CarouselItem({ item }: { item: CarouselItemProps }) {
//   const { image, title } = item;

//   return (
//     <Paper
//       sx={{
//         m: 5,
//         height: '210px',
//         width: '280px',
//         borderRadius: 2,
//         overflow: 'hidden',
//         position: 'relative',
//         '&:hover': {
//           transform: 'scale(1.2)'
//         }
//       }}
//     >
//       <CarouselImgStyle alt={title} src={image} />
//     </Paper>
//   );
// }

export default function CarouselCenterMode({ courses }: { courses: any }) {
  const [activeCourse, setActiveCourse] = useState(0);
  const carouselRef = useRef<Slider | null>(null);
  const theme = useTheme();

  // const findActiveSlide = () => {
  //   let found = false;
  //   courses.map((course: any, index: any) => {
  //     if (!found && !course.complete) {
  //       setActiveCourse(index);
  //       found = true;
  //     }
  //   });
  //   return activeCourse;
  // };

  useEffect(() => {
    let found = false;
    courses.map((course: any, index: any) => {
      if (!found && !course.is_complete) {
        setActiveCourse(index);
        found = true;
      }
    });
  }, []);

  const settings = {
    slidesToShow: 3,
    centerMode: true,
    focusOnSelect: true,
    centerPadding: '60px',
    rtl: true,
    initialSlide: activeCourse,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' }
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
      <Slider ref={carouselRef} {...settings}>
        {courses.map((course: any, index: number) => (
          <CarouselItem key={course.name} course={course} isActive={activeCourse === index} />
        ))}
      </Slider>

      <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </RootStyle>
  );
}
