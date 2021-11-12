import { useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { Box, Button, Card, Divider } from '@material-ui/core';
import _ from 'lodash';
import { SectionContainer } from './Common';
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

  useEffect(() => {
    if (cohort && !peers) {
      dispatch(getPeers(cohort_id.toString()));
    }
  }, [cohort]);

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
        bottom: '0',
        right: '40%',
        left: '40%',
        zIndex: 99
      }
    })
  };

  return (
    <SectionContainer
      className="card-2"
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
    >
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
      <Box
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src="/static/cohorts-home/left-arrow.svg"
          onClick={handlePrevious}
          onKeyDown={handlePrevious}
          alt="left arrow"
        />
        <Card style={{ margin: '0 10px', boxShadow: 'none', borderRadius: '10px' }}>
          <Slider ref={carouselRef} {...settings}>
            {peers && _.sampleSize(peers, 4).map((peer) => <PeerCard key={peer.id} item={peer} />)}
          </Slider>
        </Card>
        {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
        <img
          src="/static/cohorts-home/right-arrow.svg"
          onClick={handleNext}
          onKeyDown={handleNext}
          alt="right arrow"
        />
      </Box>
      <Divider variant="middle" />
      <Button> See all peers</Button>
    </SectionContainer>
  );
};

export default NetworkSuggestion;
