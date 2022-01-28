import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import { RootState, useDispatch, useSelector } from 'redux/store';
import { getAttendance } from 'redux/slices/cohortSessionAttendance';

import { BaseOptionChart } from '../../charts';

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
const MOCK_DATA: CohortAttendanceRecord = {
  totalSessions: 5,
  sessionAttendanceRecords: [
    {
      user_id: '123-12sfqwesd-f-324234234df-234',
      name: 'Ingo Schimpff',
      position: '(UX Designer @ Hane Inc)',
      attendanceData: [
        AttendanceType.live,
        AttendanceType.recorded,
        AttendanceType.live,
        AttendanceType.none,
        AttendanceType.none
      ]
    },
    {
      user_id: '12wqeq3-12sfsd-f-32asd4234df-234',
      name: 'Olivia Nunn',
      position: '(Beast @ ScholarSite)',
      attendanceData: [
        AttendanceType.recorded,
        AttendanceType.recorded,
        AttendanceType.none,
        AttendanceType.none,
        AttendanceType.live
      ]
    },
    {
      user_id: '123-12sfsd-f-324234234df-23asdasd4',
      name: 'Nicholas Rudder',
      position: '(Associate @ Microsoft)',
      attendanceData: [
        AttendanceType.none,
        AttendanceType.live,
        AttendanceType.recorded,
        AttendanceType.recorded,
        AttendanceType.recorded
      ]
    },
    {
      user_id: '123-12sfsd-f-324234234asdadf-234',
      name: 'Lexie Sarstedt',
      position: '(Analyst @ Zen Energy)',
      attendanceData: [
        AttendanceType.live,
        AttendanceType.recorded,
        AttendanceType.live,
        AttendanceType.none,
        AttendanceType.none
      ]
    }
  ]
};

const AttendanceTab = () => {
  const dispatch = useDispatch();
  const cohort_id = window.location.pathname.split('/')[2] || '';

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
    if (!cohortSessionAttendance) {
      dispatch(getAttendance(cohort_id));
    } else {
      setRecord(cohortSessionAttendance);
    }
  }, [cohortSessionAttendance, cohort_id]);

  const getAttendanceFrequency = (type: string) => {
    const totalStudents = cohortAttendanceRecord.sessionAttendanceRecords.length;
    if (totalStudents === 0) {
      return Array(10).fill(0);
    }
    return [...Array(cohortAttendanceRecord.totalSessions)].map(
      (x, i) =>
        (cohortAttendanceRecord.sessionAttendanceRecords.filter(
          (datum: SessionAttendanceRecord) => datum.attendanceData[i] === type
        ).length /
          totalStudents) *
        100
    );
  };
  const CHART_DATA = {
    data: [
      { name: 'Live Attendance', data: getAttendanceFrequency(AttendanceType.live) },
      { name: 'Live or Async Attendance', data: getAttendanceFrequency(AttendanceType.recorded) }
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
      labels: {
        formatter: (item: number, index: number) => `${item}%`
      }
    }
  });

  return (
    <StyledContainer id="asd">
      <Card>
        <CardHeader title="Cohort Overview" />
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart
            type="line"
            series={CHART_DATA.data}
            options={chartOptions}
            height={364}
          />
        </Box>
      </Card>
      <Box style={{ marginTop: '30px' }}>
        <AttendanceTable attendance={cohortAttendanceRecord} />
      </Box>
    </StyledContainer>
  );
};

export default AttendanceTab;
