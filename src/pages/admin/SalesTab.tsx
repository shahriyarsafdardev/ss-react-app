import { useEffect, useState } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { initializeSales } from 'redux/slices/adminRegistrations';
import SalesList from '../../components/cohorts/sales/SalesList';
import { AdminContainer, LoadingContainer } from './Common';

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
      <AdminContainer>
        <SalesList cohortSales={cohort_sales} />
      </AdminContainer>
    </Page>
  );
}
