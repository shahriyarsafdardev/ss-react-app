import { useEffect, useRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { trackHomePageEvents, HOME_PAGE_EVENTS } from 'utils/amplitude';
import { styled } from '@material-ui/core/styles';
import Slider from 'react-slick';
import { Box, Button, Card, Divider } from '@material-ui/core';
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
  const { random_peers } = cohort || [];

  useEffect(() => {
    if (cohort?.sessions && !random_peers) {
      dispatch(getPeers(cohort_id.toString()));
    }
  }, [dispatch, Object.keys(cohort || {}).length, cohort_id]);

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
    onTrackEvent('Navigate Left');
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
    onTrackEvent('Navigate Right');
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
        bottom: '0px',
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

  const onTrackEvent = (eventValue: string) => {
    trackHomePageEvents(
      cohort.name,
      cohort.intake,
      undefined,
      HOME_PAGE_EVENTS.network_suggestion,
      eventValue
    );
  };

  return (
    <SectionContainer
      className="card-3"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}
    >
      {random_peers ? (
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
                {random_peers?.map((peer) => (
                  <PeerCard
                    key={peer.id}
                    eventTrackHandler={(eventValue: string) => onTrackEvent(eventValue)}
                    item={peer}
                    cohortID={cohort_id}
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
          <Button
            to={`/cohorts/${cohort_id}/peers`}
            component={RouterLink}
            sx={{ marginTop: '15px' }}
            onClick={() => onTrackEvent('See all peers')}
          >
            {' '}
            See all peers
          </Button>
        </>
      ) : (
        <CircularLoader />
      )}
    </SectionContainer>
  );
};

export default NetworkSuggestion;
