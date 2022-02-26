import { useEffect, useState } from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { initializeSales } from 'redux/slices/adminRegistrations';
import SalesList from '../../components/cohorts/sales/SalesList';

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const SalesContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '0 1rem 1rem 1rem',
  padding: '1rem 0',
  background: 'white',
  borderRadius: '10px',
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
}));

export default function SalesTab() {
  const dispatch = useDispatch();
  const cohort_sales = useSelector((state: RootState) => state.adminRegistrations.cohort_sales);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeSales()).then((res) => setLoading(false));
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
      <SalesContainer>
        <SalesList cohortSales={cohort_sales} />
      </SalesContainer>
    </Page>
  );
}
