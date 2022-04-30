import { useEffect, useState } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { initializeSales, initializeSalesCharts } from 'redux/slices/adminRegistrations';
import { styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import StackedBarChart from 'components/cohorts/analytics/StackBarChart';
import SalesList from '../../components/cohorts/sales/SalesList';
import { AdminContainer, LoadingContainer } from './Common';

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

export default function SalesTab() {
  const dispatch = useDispatch();
  const cohort_sales = useSelector((state: RootState) => state.adminRegistrations.cohort_sales);
  const cohort_sales_charts = useSelector(
    (state: RootState) => state.adminRegistrations.cohort_sales_charts
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeSales()).then((res) => setLoading(false));
  }, []);

  useEffect(() => {
    if (!cohort_sales_charts) {
      dispatch(initializeSalesCharts()).then((res) => setLoading(false));
    }
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="ScholarSite | Sales">
      <ChartsContainer>
        {cohort_sales_charts ? (
          <Row>
            <StackedBarChart
              data_points={cohort_sales_charts?.monthly_revenue_data}
              title="Revenue over the last year"
              label="$ revenue"
              xaxisType=""
            />
            <StackedBarChart
              data_points={cohort_sales_charts?.weekly_revenue_data}
              title="Revenue over the last 7 days"
              label="$ revenue"
              xaxisType=""
            />
          </Row>
        ) : (
          <>
            <LoadingScreen />
            <Typography
              gutterBottom
              variant="subtitle2"
              sx={{ color: 'text.secondary', paddingBottom: '50px' }}
            >
              Charts are Loading ...
            </Typography>
          </>
        )}
      </ChartsContainer>
      <AdminContainer>
        <SalesList cohortSales={cohort_sales} />
      </AdminContainer>
    </Page>
  );
}
