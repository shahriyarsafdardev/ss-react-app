import { useEffect, useState } from 'react';
import { Stack, Container } from '@material-ui/core';
import Page from 'components/Page';
import { getTrackData } from 'redux/slices/track';
import { RootState, useDispatch, useSelector } from 'redux/store';
import LoadingScreen from 'components/LoadingScreen';
import TrackHeader from './TrackHeader';
import CourseDetails from './CourseDetails';
import CoursesCarousel from './CoursesCarousel';
import { LoadingContainer } from './Common';

export default function DataScienceTrack() {
  const [activeCourse, setActiveCourse] = useState<number>(0);
  const [nextRecommended, setNextRecommended] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const trackSlug = window.location.pathname.split('/')[2] || '';
  const track = useSelector((state: RootState) => state?.track?.track);

  useEffect(() => {
    !track?.id && dispatch(getTrackData(trackSlug));
    let found = false;
    if (track?.cohorts?.length > 0) {
      track?.cohorts?.forEach((course: any, index: any) => {
        if (!found && !course.is_complete) {
          setActiveCourse(index);
          setNextRecommended(index);
          found = true;
        }
      });
      setLoading(false);
    }
  }, [track?.id]);

  if (loading || track?.cohorts?.length === 0) {
    return (
      <Container sx={{ position: 'relative', height: '100%' }}>
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Page title="Sphere | Courses Track">
      <Stack>
        <TrackHeader
          trackName={track?.name}
          trackDescription={track?.description}
          total={track?.cohorts?.length}
          complete={track?.cohorts?.filter((course) => course.is_complete).length}
        />
        <CoursesCarousel
          courses={track?.cohorts}
          activeCourse={activeCourse}
          setActiveCourse={(value: number) => setActiveCourse(value)}
        />
        <CourseDetails
          key={`${String(activeCourse)} ${track?.cohorts[activeCourse]}`}
          courseData={track?.cohorts[activeCourse]}
          nextRecommended={activeCourse === nextRecommended}
        />
      </Stack>
    </Page>
  );
}
