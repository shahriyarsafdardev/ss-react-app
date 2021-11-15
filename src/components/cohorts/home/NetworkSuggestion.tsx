import { useEffect, useRef, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Slider from 'react-slick';
import { Box, Button, Card, Divider } from '@material-ui/core';
import _ from 'lodash';
import { CircularLoader, SectionContainer } from './Common';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getPeers } from '../../../redux/slices/cohort';
import PeerCard from './PeerCard';
import { CarouselControlsPaging1 } from '../../carousel';

const NetworkSuggestion = () => {
  const carouselRef = useRef<Slider>(null);
  const dispatch = useDispatch();
  const cohort_id: any = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { peers } = cohort || [];
  const [networkSuggestion, setNetworkSuggestions] = useState(peers);

  useEffect(() => {
    if (cohort?.sessions && !peers) {
      dispatch(getPeers(cohort_id.toString()));
    }
  }, [dispatch, Object.keys(cohort || {}).length, cohort_id]);

  useEffect(() => {
    setNetworkSuggestions(peers);
  }, [peers]);

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  const settings = {
    speed: 800,
    dots: true,
    arrows: false,

    ...CarouselControlsPaging1({
      color: 'primary.main',
      sx: {
        position: 'relative',
        backgroundColor: 'transparent',
        bottom: '-5px',
        right: '40%',
        left: '40%',
        zIndex: 99
      }
    })
  };

  const StyledBoxContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    [theme.breakpoints.down('sm')]: {
      img: { display: 'none' }
    }
  }));

  return (
    <SectionContainer
      className="card-3"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}
    >
      {peers ? (
        <>
          <Box style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <Box>
              <p style={{ fontSize: '18px' }}>
                👋 Say hi to some of your{' '}
                <span style={{ color: '#4D4DCD', fontWeight: 'bold' }}>peers</span>
              </p>
              <p style={{ fontSize: '14px', color: '#212B36' }}>
                Here are a few who are interested in growing their network
              </p>
            </Box>
          </Box>
          <StyledBoxContainer>
            {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src="/static/cohorts-home/left-arrow.svg"
              onClick={handlePrevious}
              onKeyDown={handlePrevious}
              alt="left arrow"
            />
            <Card style={{ margin: '0 10px', boxShadow: 'none', borderRadius: '10px' }}>
              <Slider ref={carouselRef} {...settings}>
                {networkSuggestion &&
                  _.sampleSize(networkSuggestion, 4).map((peer) => (
                    <PeerCard
                      key={peer.id}
                      item={peer}
                      onHandleNext={handleNext}
                      onHandlePrevious={handlePrevious}
                    />
                  ))}
              </Slider>
            </Card>
            {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src="/static/cohorts-home/right-arrow.svg"
              onClick={handleNext}
              onKeyDown={handleNext}
              alt="right arrow"
            />
          </StyledBoxContainer>
          <Divider variant="middle" sx={{ marginTop: '15px' }} />
          <Button> See all peers</Button>
        </>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default NetworkSuggestion;
