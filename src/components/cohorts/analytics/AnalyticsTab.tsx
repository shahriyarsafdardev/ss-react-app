import { Box } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { RootState, useSelector, dispatch } from 'redux/store';
import { getAnalytics } from 'redux/slices/cohort';
import StackedBarChart from './StackBarChart';
import AnalyticsTable from './AnalyticsTable';

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const ChartsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '1rem 0',
  maxWidth: '1200px',
  margin: 'auto'
}));

const Row = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '0 1rem 1rem 1rem',
  padding: '1rem 0',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column'
  }
}));

function AnalyticsTab() {
  const [loading, setLoading] = useState(true);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const instructor_name = window.location.pathname.split('/')[3] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );
  const { analytics } = cohort || [];

  useEffect(() => {
    if (cohort_id && instructor_name && cohort && !analytics) {
      dispatch(getAnalytics(cohort_id, instructor_name));
      setLoading(false);
    }
  }, [cohort, cohort_id, instructor_name, analytics]);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="ScholarSite | Analytics">
      {cohort?.analytics && (
        <ChartsContainer>
          <Row>
            <StackedBarChart
              data_points={cohort?.analytics.views_over_last_week}
              title="Views over the last 7 days"
              label="user(s)"
              xaxisType="datetime"
            />
            <StackedBarChart
              data_points={cohort?.analytics.reg_over_last_week}
              title="Registrations over the last 7 days"
              label="user(s)"
              xaxisType="datetime"
            />
          </Row>
          <Row>
            <AnalyticsTable rows={cohort?.analytics.analytics_table_data} />
          </Row>
        </ChartsContainer>
      )}
    </Page>
  );
}

export default AnalyticsTab;
