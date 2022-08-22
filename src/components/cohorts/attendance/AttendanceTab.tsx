import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import LoadingScreen from 'components/LoadingScreen';
import { EVENT_TYPES, trackPageViewEvent } from 'utils/amplitude';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import { RootState, useDispatch, useSelector } from 'redux/store';
import { getAttendance } from 'redux/slices/cohortSessionAttendance';

import EmptyAttendanceTab from 'components/cohorts/onboarding/empty-states/EmptyAttendanceTab';
import { BaseOptionChart } from '../../charts';
import Page from '../../Page';
import AttendanceTable from './AttendanceTable';
import {
  CohortAttendanceRecord,
  AttendanceType,
  SessionAttendanceRecord
} from '../../../@types/cohorts';

// ----------------------------------------------------------------------

const StyledContainer = styled(Box)(() => ({
  margin: '30px auto 100px auto',
  padding: '0 30px',
  maxWidth: '1200px'
}));

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const AttendanceTab = () => {
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [loading, setLoading] = useState(true);
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const cohortSessionAttendance = useSelector(
    (state: RootState) =>
      state.cohortSessionAttendance.list.find((e) => e.cohort_id === cohort_id)
        ?.cohortAttendanceRecord
  );

  const [cohortAttendanceRecord, setRecord] = useState<CohortAttendanceRecord>({
    totalSessions: cohortSessionAttendance?.totalSessions || 0,
    sessionAttendanceRecords: cohortSessionAttendance?.sessionAttendanceRecords || []
  });

  useEffect(() => {
    if (cohort && !analyticsSent) {
      trackPageViewEvent(cohort, EVENT_TYPES.attendance_tab);
      setAnalyticsSent(true);
    }
  }, [cohort]);

  useEffect(() => {
    if (!cohortSessionAttendance) {
      dispatch(getAttendance(cohort_id));
    } else {
      setRecord(cohortSessionAttendance);
    }
    setLoading(false);
  }, [cohortSessionAttendance, cohort_id]);

  const getAttendanceFrequency = (types: string[]) => {
    const totalStudents = cohortAttendanceRecord.sessionAttendanceRecords.length;
    if (totalStudents === 0) {
      return Array(10).fill(0);
    }
    return [...Array(cohortAttendanceRecord.totalSessions)].map((x, i) =>
      (
        (cohortAttendanceRecord.sessionAttendanceRecords.filter((datum: SessionAttendanceRecord) =>
          types.includes(datum.attendanceData[i])
        ).length /
          totalStudents) *
        100
      ).toFixed(2)
    );
  };

  const CHART_DATA = {
    data: [
      { name: 'Live Attendance', data: getAttendanceFrequency([AttendanceType.live]) },
      {
        name: 'Live or Async Attendance',
        data: getAttendanceFrequency([AttendanceType.live, AttendanceType.recorded])
      }
    ]
  };

  const chartOptions = merge(BaseOptionChart(), {
    colors: ['#00AB55', '#FFC107'],
    xaxis: {
      categories: [...Array(cohortAttendanceRecord.totalSessions)].map(
        (item, index) => `Session ${index + 1}`
      )
    },
    yaxis: {
      max: 100,
      min: 0,
      labels: {
        formatter: (item: number, index: number) => `${item}%`
      }
    }
  });

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  const displayData = !(
    (CHART_DATA.data[0].data.length === 0 && CHART_DATA.data[1].data.length === 0) ||
    (Math.max(...CHART_DATA.data[0].data) === 0 && Math.max(...CHART_DATA.data[1].data) === 0)
  );

  return (
    <Page title="Sphere | Attendance">
      <StyledContainer id="asd" key={String(CHART_DATA.data)}>
        <Card>
          <CardHeader title="Cohort Overview" data-testid="cohort_overview_header" />
          <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
            {displayData ? (
              <ReactApexChart
                data-testid="cohort_overview_graph"
                type="line"
                series={CHART_DATA.data}
                options={chartOptions}
                height={364}
              />
            ) : (
              <EmptyAttendanceTab imageLink="/static/cohort-empty-states/empty-graph.svg" />
            )}
          </Box>
        </Card>
        <Box style={{ marginTop: '30px' }}>
          <AttendanceTable displayData={displayData} attendance={cohortAttendanceRecord} />
        </Box>
      </StyledContainer>
    </Page>
  );
};

export default AttendanceTab;
