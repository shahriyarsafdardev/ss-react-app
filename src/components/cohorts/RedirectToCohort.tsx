import { Navigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import { comparatorFuntion } from '../../layouts/dashboard/Common';
import { RootState, useSelector } from '../../redux/store';

export default function RedirectToCohort() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { user } = useAuth();
  // eslint-disable-next-line no-debugger
  debugger;
  let navigationUrl = '/';
  if (user) {
    if (user.new_user) {
      navigationUrl = `/auth/first-login`;
    } else if (user.type === 'company') {
      navigationUrl = `/business-dashboard`;
    } else if (cohorts.length > 0) {
      if (user.type === 'learner') {
        navigationUrl = `/cohorts/${cohorts[0].id}/home`;
      } else {
        const hostCohorts = cohorts
          .filter((cohort) => cohort.is_host)
          .sort(
            (a, b) =>
              comparatorFuntion(a.intake_name, b.intake_name) || a.name.localeCompare(b.name)
          );
        navigationUrl = `/cohorts/${hostCohorts[0].id}/registrations`;
      }
    } else {
      return <LoadingScreen />;
    }
  } else {
    return <LoadingScreen />;
  }

  return <Navigate to={navigationUrl} replace />;
}
