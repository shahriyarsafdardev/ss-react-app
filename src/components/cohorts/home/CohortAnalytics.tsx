import { useState, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SectionContainer, getAnalyticsData, CircularLoader } from './Common';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getEnrollments } from '../../../redux/slices/cohort';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  overflowX: 'hidden',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  '&::-webkit-scrollbar': { width: '4px' },
  img: {
    margin: '0 10px',
    '&.active': {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(77, 77, 205, 0.05)',
        borderRadius: '15px',
        boxShadow: '1px 1px 5px 5px rgba(77, 77, 205, 0.1)'
      }
    },
    '&.disabled': {
      cursor: 'default',
      opacity: 0.3,
      pointerEvents: 'none'
    }
  },
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));
const CohortAnalytics = ({ cohort_id }: { cohort_id: string }) => {
  let items: any[] = [];
  const [index, setIndex] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const dispatch = useDispatch();
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { enrollments } = cohort || [];

  useEffect(() => {
    if (cohort && !enrollments) {
      dispatch(getEnrollments(cohort.id));
    }
    setIndex(0);
    setAutoScroll(true);
  }, [cohort]);

  useEffect(() => {
    let counterId: any;
    if (autoScroll) {
      counterId = setTimeout(() => increaseIndex(), 10000);
    } else {
      clearTimeout(counterId);
    }
    return () => clearInterval(counterId);
  }, [autoScroll, enrollments, index]);

  const increaseIndex = () => {
    if (items && items.length > 0) {
      if (index === items.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }
  };
  if (enrollments && enrollments !== []) {
    items = getAnalyticsData(cohort_id, enrollments);
  }

  const changeIndex = (value: number) => {
    if (autoScroll) {
      setAutoScroll(false);
    }
    if (value < 0) {
      setIndex(0);
    } else if (index === items.length) {
      setIndex(items.length - 1);
    } else {
      setIndex(value);
    }
  };

  return (
    <Box>
      <SectionContainer key={cohort.id} className="analytics">
        {enrollments ? (
          <StyledBox>
            {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              data-testid="left-arrow-icon"
              src="/static/cohorts-home/left-arrow.svg"
              className={index === 0 ? 'disabled' : 'active'}
              onClick={() => changeIndex(index - 1)}
              onKeyDown={() => changeIndex(index - 1)}
              alt="left arrow"
            />
            <div
              style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
            >
              {items[index]}
            </div>
            {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              data-testid="right-arrow-icon"
              src="/static/cohorts-home/right-arrow.svg"
              onClick={() => changeIndex(index + 1)}
              onKeyDown={() => changeIndex(index + 1)}
              className={index === items.length - 1 ? 'disabled' : 'active'}
              alt="right arrow"
            />
          </StyledBox>
        ) : (
          <CircularLoader />
        )}
      </SectionContainer>
    </Box>
  );
};

export default CohortAnalytics;
