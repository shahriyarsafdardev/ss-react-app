import { useState, useEffect, useCallback } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import axiosV2 from 'utils/axiosV2';
import { LoadingContainer } from 'pages/admin/Common';
import { Box, Stack } from '@material-ui/core';
import _ from 'lodash';
import { useStyles } from './Common';
import CoursesContainer from './CoursesContainer';
import AllCoursesFilters from './AllCoursesFilters';

export default function AllCourses() {
  const [courses, setCourses] = useState<any>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [functions, setFunctions] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
  const [selectedFunctions, setSelectedFunctions] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const classes = useStyles();

  useEffect(() => {
    const getCourses = async () => {
      await axiosV2.get(`/cohorts.json`).then((res) => {
        setCourses(res.data.cohorts);
        let seniorityList = res.data.cohorts
          ?.map((cohort: any) => cohort.seniority)
          ?.filter((seniority: string) => !!seniority);
        seniorityList = Array.from(new Set(seniorityList)).sort((a: any, b) => a.localeCompare(b));
        setSeniority(seniorityList);

        let functionList = res.data.cohorts
          ?.map((cohort: any) => cohort.function)
          ?.filter((func: string) => !!func);
        functionList = Array.from(new Set(functionList)).sort((a: any, b) => a.localeCompare(b));
        setFunctions(functionList);

        let topicList = res.data.cohorts
          ?.map((cohort: any) => cohort.topics)
          .flat()
          .filter((topic: string) => !!topic);
        topicList = Array.from(new Set(topicList)).sort((a: any, b) => a.localeCompare(b));
        setTopics(topicList);
      });
    };
    getCourses();

    return () => {
      setSelectedSeniority([]);
    };
  }, []);

  const applyFilters = useCallback(() => {
    let filteredCourses: any = courses;

    if (selectedSeniority.length > 0) {
      filteredCourses = filteredCourses?.filter((course: any) =>
        selectedSeniority.includes(course.seniority)
      );
    }

    if (selectedFunctions.length > 0) {
      filteredCourses = filteredCourses?.filter((course: any) =>
        selectedFunctions.includes(course.function)
      );
    }

    if (selectedTopics.length > 0) {
      filteredCourses = filteredCourses?.filter(
        (course: any) => _.intersection(selectedTopics, course.topics).length > 0
      );
    }

    return filteredCourses;
  }, [selectedSeniority, courses, selectedFunctions, selectedTopics]);

  if (courses.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere Courses">
      <Box paddingX={{ xs: '20px', md: '40px' }}>
        <AllCoursesFilters
          functions={functions}
          seniority={seniority}
          topics={topics}
          setSelectedFunctions={setSelectedFunctions}
          setSelectedSeniority={setSelectedSeniority}
          setSelectedTopics={setSelectedTopics}
          selectedTopics={selectedTopics}
          selectedFunctions={selectedFunctions}
          selectedSeniority={selectedSeniority}
        />
      </Box>
      <Stack className={classes.purpleBackground} justifyContent="center">
        <CoursesContainer courses={applyFilters()} />
      </Stack>
    </Page>
  );
}
