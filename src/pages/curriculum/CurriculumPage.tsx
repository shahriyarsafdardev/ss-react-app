import { useState, useEffect, useCallback } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import axiosV2 from 'utils/axiosV2';
import { LoadingContainer } from 'pages/admin/Common';
import { Box } from '@material-ui/core';
import CoursesContainer from './CoursesContainer';
import CurriculumHeader from './CurriculumHeader';
import CurriculumTabs from './CurriculumTabs';
import { TOPICS, HEADINGS } from './Common';
import SeniorityFilter from './SeniorityFilter';

export default function CurriculumPage() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const [courses, setCourses] = useState<any>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);

  useEffect(() => {
    const getCourses = async () => {
      await axiosV2.get(`/cohorts.json`).then((res) => {
        setCourses(res.data.cohorts);
        let seniorityList = res.data.cohorts
          ?.map((cohort: any) => cohort.seniority)
          ?.filter((seniority: string) => !!seniority);
        seniorityList = Array.from(new Set(seniorityList)).sort((a: any, b) => a.localeCompare(b));
        setSeniority(seniorityList);
      });
    };
    getCourses();

    return () => {
      setSelectedSeniority([]);
    };
  }, []);

  const applyFilters = useCallback(() => {
    const topic = TOPICS[activeTab].toLowerCase();
    let filteredCourses: any = [];
    if (topic) {
      filteredCourses = courses?.filter(
        (course: any) =>
          course.topics.includes(topic) &&
          (selectedSeniority.length > 0 ? selectedSeniority.includes(course.seniority) : true)
      );
    }
    return filteredCourses;
  }, [selectedSeniority, activeTab]);

  if (courses.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page>
      <Box paddingX={{ xs: '20px', md: '72px' }}>
        <CurriculumHeader />
        {seniority.length > 0 && (
          <SeniorityFilter
            handleOnChange={(value: any) => setSelectedSeniority(value)}
            types={seniority}
            selectedTypes={selectedSeniority}
          />
        )}
        <CurriculumTabs
          currentTab={activeTab}
          setActiveTab={(value: number) => setActiveTab(value)}
        />
      </Box>
      <CoursesContainer courses={applyFilters()} heading={HEADINGS[activeTab]} />
    </Page>
  );
}
