import { useEffect, useState } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { initializeExperiences } from 'redux/slices/adminRegistrations';
import ExperiencesList from '../../components/cohorts/experiences/ExperiencesList';
import { AdminContainer, LoadingContainer } from './Common';

export default function ExperiencesTab() {
  const dispatch = useDispatch();
  const cohort_experiences = useSelector(
    (state: RootState) => state.adminRegistrations.cohort_experiences
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(initializeExperiences()).then(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }
  return (
    <Page title="ScholarSite | Experiences">
      <AdminContainer>
        <ExperiencesList cohortExperiences={cohort_experiences} />
      </AdminContainer>
    </Page>
  );
}
