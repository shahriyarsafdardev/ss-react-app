import { useState, useEffect, useCallback } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import axiosV2 from 'utils/axiosV2';
import { Box, Container, Stack } from '@material-ui/core';
import _ from 'lodash';
import { useStyles, LoadingContainer } from './Common';
import CoursesContainer from './CoursesContainer';
import AllCoursesFilters from './AllCoursesFilters';

export default function AllCourses() {
  const [courses, setCourses] = useState<any>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [functions, setFunctions] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<any>();
  const [selectedFunction, setSelectedFunction] = useState<any>();
  const [selectedTopic, setSelectedTopic] = useState<any>();
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
        setSelectedFunction(functionList[0]);
        setFunctions(functionList);

        let topicList = res.data.cohorts
          ?.map((cohort: any) => cohort.topics)
          .flat()
          .filter((topic: string) => !!topic);
        topicList = Array.from(new Set(topicList)).sort((a: any, b) => a.localeCompare(b));
        setSelectedTopic(topicList[0]);
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

    if (selectedSeniority) {
      filteredCourses = filteredCourses?.filter(
        (course: any) => selectedSeniority === course.seniority
      );
    }

    if (selectedFunction) {
      filteredCourses = filteredCourses?.filter(
        (course: any) => selectedFunction === course.function
      );
    }

    if (selectedTopic) {
      filteredCourses = filteredCourses?.filter((course: any) =>
        course.topics.includes(selectedTopic)
      );
    }

    return filteredCourses;
  }, [selectedSeniority, courses, selectedFunction, selectedTopic]);

  if (courses.length === 0) {
    return (
      <Container sx={{ position: 'relative', height: '100%' }}>
        <LoadingContainer>
          <LoadingScreen />
        </LoadingContainer>
      </Container>
    );
  }

  return (
    <Page title="Sphere Courses">
      <Box paddingX={{ xs: '20px', md: '40px' }} mb={{ xs: '20px', md: '30px' }}>
        <AllCoursesFilters
          key={`${topics.length} ${functions.length}`}
          functions={functions}
          seniority={seniority}
          topics={topics}
          setSelectedFunction={setSelectedFunction}
          setSelectedSeniority={setSelectedSeniority}
          setSelectedTopic={setSelectedTopic}
          selectedTopic={selectedTopic}
          selectedFunction={selectedFunction}
          selectedSeniority={selectedSeniority}
        />
      </Box>
      <Stack className={`${classes.purpleBackground} ${classes.coursesGrid}`}>
        <CoursesContainer courses={applyFilters()} />
      </Stack>
    </Page>
  );
}
