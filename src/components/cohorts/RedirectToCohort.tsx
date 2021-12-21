import { Navigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import { RootState, useSelector } from '../../redux/store';

export default function RedirectToCohort() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { user } = useAuth();
  let navigationUrl = '/';

  if (!!user && cohorts.length > 0) {
    if (user.type === 'learner') {
      navigationUrl = `/cohorts/${cohorts[0].id}/home`;
    } else {
      const hostCohorts = cohorts.filter((cohort) => cohort.is_host);
      navigationUrl = `/cohorts/${hostCohorts[0].id}/home`;
    }
  } else {
    return <LoadingScreen />;
  }
  return <Navigate to={navigationUrl} replace />;
}
