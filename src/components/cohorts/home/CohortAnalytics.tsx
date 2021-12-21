import { useState } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SectionContainer, getAnalyticsData } from './Common';

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
const CohortAnalytics = () => {
  const items = getAnalyticsData();

  const [index, setIndex] = useState(0);

  const changeIndex = (value: number) => {
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
      <SectionContainer className="analytics">
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
          <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
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
      </SectionContainer>
    </Box>
  );
};

export default CohortAnalytics;
