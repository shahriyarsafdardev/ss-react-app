import { merge } from 'lodash';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
//
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

const getAttendanceFrequency = (type: string) =>
  [...Array(MOCK_DATA.totalSessions)].map(
    (x, i) =>
      MOCK_DATA.sessionAttendanceRecords.filter(
        (datum: SessionAttendanceRecord) => datum.attendanceData[i] === type
      ).length
  );

const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Live Attendance', data: getAttendanceFrequency(AttendanceType.live) },
      { name: 'Live or Async Attendance', data: getAttendanceFrequency(AttendanceType.recorded) }
    ]
  }
];

const AttendanceTab = () => {
  const [seriesData, setSeriesData] = useState(2019);

  const chartOptions = merge(BaseOptionChart(), {
    colors: ['#00AB55', '#FFC107'],
    xaxis: {
      categories: [...Array(MOCK_DATA.totalSessions)].map((item, index) => `Session ${index + 1}`)
    }
  });

  return (
    <StyledContainer id="asd">
      <Card>
        <CardHeader title="Cohort Overview" />
        {CHART_DATA.map((item) => (
          <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
            {item.year === seriesData && (
              <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
            )}
          </Box>
        ))}
      </Card>
      <Box style={{ marginTop: '30px' }}>
        <AttendanceTable attendance={MOCK_DATA} />
      </Box>
    </StyledContainer>
  );
};

export default AttendanceTab;
