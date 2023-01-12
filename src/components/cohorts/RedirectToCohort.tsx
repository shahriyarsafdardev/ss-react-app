import { Navigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import useAuth from 'hooks/useAuth';
import { RootState, useSelector } from '../../redux/store';

export default function RedirectToCohort() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { user } = useAuth();
  const { mode } = useSelector((state: RootState) => state.instructorView);

  let navigationUrl = '/';
  if (user) {
    if (user.new_user) {
      navigationUrl = `/auth/first-login`;
    } else if (user.type === 'company') {
      navigationUrl = `/business-dashboard`;
    } else if (cohorts.length > 0) {
      const sortedCohorts = [...cohorts].sort((a, b) =>
        new Date(a.start_date) < new Date(b.start_date) ? -1 : 1
      );
      const currentDate = new Date();

      let upcomingCohort = sortedCohorts.find(
        (cohort) => currentDate <= new Date(cohort.start_date)
      );

      if (typeof upcomingCohort == 'undefined') {
        upcomingCohort = sortedCohorts[sortedCohorts.length - 1];
      }

      if (user.type === 'learner' || mode === 'Learner') {
        if (upcomingCohort.alumni_event) navigationUrl = `/cohorts/${upcomingCohort.id}/peers`;
        else if (new Date(upcomingCohort.end_date) < new Date())
          navigationUrl = `/cohorts/${upcomingCohort.id}/sessions`;
        else navigationUrl = `/cohorts/${upcomingCohort.id}/home`;
      } else if (user.type === 'expert') {
        navigationUrl = `/cohorts/${upcomingCohort.id}/registrations`;
      } else {
        navigationUrl = `/monthly-registrations`;
      }
    } else {
      return <LoadingScreen />;
    }
  } else {
    return <LoadingScreen />;
  }

  return <Navigate to={navigationUrl} replace />;
}
