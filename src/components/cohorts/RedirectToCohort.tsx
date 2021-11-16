import { Navigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import { RootState, useSelector } from '../../redux/store';

export default function RedirectToCohort() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  let navigationUrl = '/';

  if (cohorts.length > 0) {
    navigationUrl = `/cohorts/${cohorts[0].id}/home`;
  } else {
    return <LoadingScreen />;
  }
  return <Navigate to={navigationUrl} replace />;
}
