import { useState, useEffect, useCallback } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import axiosV2 from 'utils/axiosV2';
import { LoadingContainer } from 'pages/admin/Common';
import { Box, Stack } from '@material-ui/core';
import { useStyles } from './Common';
import CoursesContainer from './CoursesContainer';
import SeniorityFilter from './SeniorityFilter';

export default function AllCourses() {
  const [courses, setCourses] = useState<any>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>([]);
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
      });
    };
    getCourses();

    return () => {
      setSelectedSeniority([]);
    };
  }, []);

  const applyFilters = useCallback(() => {
    let filteredCourses: any = [];
    filteredCourses = courses?.filter((course: any) =>
      selectedSeniority.length > 0 ? selectedSeniority.includes(course.seniority) : true
    );
    return filteredCourses;
  }, [selectedSeniority, courses]);

  if (courses.length === 0) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere Courses">
      <Box paddingX={{ xs: '20px', md: '72px' }}>
        {seniority.length > 0 && (
          <SeniorityFilter
            handleOnChange={(value: any) => setSelectedSeniority(value)}
            types={seniority}
            selectedTypes={selectedSeniority}
          />
        )}
      </Box>
      <Stack className={classes.purpleBackground} justifyContent="center">
        <CoursesContainer courses={applyFilters()} />
      </Stack>
    </Page>
  );
}
