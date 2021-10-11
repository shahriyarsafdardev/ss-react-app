import { Navigate } from 'react-router-dom';
import LoadingScreen from 'components/LoadingScreen';
import { useLocation } from 'react-router';
import { RootState, useSelector } from '../../redux/store';

export default function RedirectToCohort() {
  const feedBackModal = new URLSearchParams(useLocation().search).get('feedBackModal');
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  let navigationUrl = '/';

  if (cohorts.length > 0) {
    navigationUrl = feedBackModal
      ? `/cohorts/${cohorts[0].id}/sessions/?feedBackModal=${feedBackModal}`
      : `/cohorts/${cohorts[0].id}/sessions`;
  } else {
    return <LoadingScreen />;
  }
  return <Navigate to={navigationUrl} replace />;
}
