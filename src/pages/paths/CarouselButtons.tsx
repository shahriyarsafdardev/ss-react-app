import { useTheme, styled } from '@material-ui/core/styles';
import { Box, BoxProps } from '@material-ui/core';

// ----------------------------------------------------------------------

const SIZE = 32;

const RootStyle = styled(Box)(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: SIZE,
  width: '100%',
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between',
  [theme.breakpoints.down(600)]: {
    zIndex: 11
  }
}));

const ArrowStyle = styled('img')(({ theme }) => ({
  width: SIZE,
  height: SIZE,
  opacity: 0.48,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadiusSm,
  transition: theme.transitions.create('opacity'),
  '&:hover': {
    opacity: 1
  }
}));

// ----------------------------------------------------------------------

interface CarouselControlsArrowsBasic2Props extends BoxProps {
  arrowLine?: boolean;
  onNext?: VoidFunction;
  onPrevious?: VoidFunction;
}

export default function CarouselButtons({
  arrowLine,
  onNext,
  onPrevious,
  ...other
}: CarouselControlsArrowsBasic2Props) {
  return (
    <RootStyle {...other}>
      {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <ArrowStyle
        data-testid="left-arrow-icon"
        src="/static/cohorts-home/left-arrow.svg"
        onClick={onPrevious}
        alt="left arrow"
        onKeyDown={onPrevious}
      />
      <ArrowStyle
        data-testid="left-arrow-icon"
        src="/static/cohorts-home/right-arrow.svg"
        onClick={onNext}
        alt="left arrow"
        onKeyDown={onNext}
      />
    </RootStyle>
  );
}
