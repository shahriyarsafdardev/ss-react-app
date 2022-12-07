import { useState, useEffect, useCallback } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import axiosV2 from 'utils/axiosV2';
import { Box, Container, Stack } from '@material-ui/core';
import { trackEvent } from 'utils/eventTracking';
import { uniq } from 'lodash';
import { RootState, useSelector } from 'redux/store';
import { useStyles, LoadingContainer } from './Common';
import CoursesContainer from './CoursesContainer';
import AllCoursesFilters from './AllCoursesFilters';
import PathsList from './PathsList';

export default function AllCourses() {
  const [courses, setCourses] = useState<any>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [functions, setFunctions] = useState<string[]>([]);
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<any>();
  const [selectedFunction, setSelectedFunction] = useState<any>();
  const [selectedTopic, setSelectedTopic] = useState<any>();
  const cohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);
  const classes = useStyles();

  useEffect(() => {
    const getCourses = async () => {
      await axiosV2.get(`/cohorts.json?hide_duplicates=true`).then((res) => {
        setCourses(res.data.cohorts);
        trackEvent(cohort, 'All Courses Page - Page Loaded');
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
        selectFilterTopics(res.data.cohorts, functionList[0]);
      });
    };
    getCourses();

    return () => {
      setSelectedSeniority([]);
    };
  }, []);

  const selectFilterTopics = (cohorts: any, value: string) => {
    if (value.toLocaleLowerCase() === 'other') {
      setSelectedTopic(null);
      setTopics(['All']);
      return;
    }
    const filteredTopics = uniq(
      cohorts
        .filter((course: any) => course.function === value)
        .map((course: any) => course.topics)
        .flat()
        .sort((a: any, b: any) => a.localeCompare(b))
    );
    setTopics(filteredTopics);
    setSelectedTopic(filteredTopics[0]);
  };

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

  const handleChangeFunction = (value: any) => {
    setSelectedFunction(value);
    selectFilterTopics(courses, value);
  };

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
      <PathsList />
      <Box paddingX={{ xs: '20px', md: '40px' }} marginY={{ xs: '20px', md: '30px' }}>
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
          handleChangeFunction={handleChangeFunction}
        />
      </Box>
      <Stack className={`${classes.purpleBackground} ${classes.coursesGrid}`}>
        <CoursesContainer courses={applyFilters()} />
      </Stack>
    </Page>
  );
}
