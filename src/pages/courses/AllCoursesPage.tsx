import { useState, useEffect, useCallback } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { Box } from '@material-ui/core';
import { LoadingContainer } from 'pages/admin/Common';
import useAuth from 'hooks/useAuth';
import { getCourses } from 'redux/slices/course';
import { useDispatch } from 'redux/store';
import { useCourse } from 'hooks/Index';
import { trackEvent } from 'utils/eventTracking';
import CoursesHeader from './CoursesHeader';
import CoursesTabs from './CoursesTabs';
import CoursesContainer from './CoursesContainer';
import { TOPICS, HEADINGS } from './Common';
import ExperimentationPath from './ExperimentationPath';
import SearchDiscoveryPath from './SearchDiscoveryPath';
import TeamPackages from './TeamPackages';

export default function CoursesTab() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { courses } = useCourse();

  useEffect(() => {
    if (!courses.length) {
      dispatch(getCourses());
    }
    trackEvent(null, 'All Courses Page - Page Loaded');
  }, []);

  useEffect(() => {
    !isAuthenticated &&
      window.analytics?.ready &&
      window.analytics?.ready(() => {
        window.analytics?.identify(window.analytics?.user().anonymousId(), {});
      });
  }, []);

  const applyFilters = useCallback(() => {
    const topic = TOPICS[activeTab];
    let filteredCourses: any = [];
    if (topic) {
      filteredCourses = courses?.filter(
        (course: any) => course.business_function_subcategory === topic
      );
    }
    return filteredCourses;
  }, [activeTab, courses]);

  if (courses.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | All Courses">
      <Box paddingX={{ xs: '20px', md: '30px' }}>
        <CoursesHeader />
        <CoursesTabs currentTab={activeTab} setActiveTab={(value: number) => setActiveTab(value)} />
      </Box>
      <CoursesContainer courses={applyFilters()} heading={HEADINGS[activeTab]} />
      <ExperimentationPath />
      <SearchDiscoveryPath />
      <TeamPackages />
    </Page>
  );
}
