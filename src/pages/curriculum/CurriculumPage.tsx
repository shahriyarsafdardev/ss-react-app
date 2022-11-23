import { useState, useEffect } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import axiosV2 from 'utils/axiosV2';
import { LoadingContainer } from 'pages/admin/Common';
import { Box } from '@material-ui/core';
import CoursesContainer from './CoursesContainer';
import CurriculumHeader from './CurriculumHeader';
import CurriculumTabs from './CurriculumTabs';
import { TOPICS, HEADINGS } from './Common';

export default function CurriculumPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [courses, setCourses] = useState<any>([]);

  useEffect(() => {
    const getCourses = async () => {
      await axiosV2.get(`/cohorts.json`).then((res) => {
        setCourses(res.data.cohorts);
      });
    };
    getCourses();
  }, []);

  const applyFilters = (tab: number) => {
    const topic = TOPICS[tab];
    let filteredCourses: any = [];
    if (topic) {
      filteredCourses = courses?.filter((course: any) => course.topic === topic);
    }
    return filteredCourses;
  };
  if (courses.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page>
      <Box paddingX="72px">
        <CurriculumHeader />
        <CurriculumTabs
          currentTab={activeTab}
          setActiveTab={(value: number) => setActiveTab(value)}
        />
      </Box>
      <CoursesContainer courses={applyFilters(activeTab)} heading={HEADINGS[activeTab]} />
    </Page>
  );
}
