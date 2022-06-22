import { useEffect, useState } from 'react';
import Page from 'components/Page';
import LoadingScreen from 'components/LoadingScreen';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { useSnackbar } from 'notistack5';
import { initializeExperiences } from 'redux/slices/adminRegistrations';
import axios from 'utils/axios';
import { LoadingButton } from '@material-ui/lab';
import ExperiencesList from '../../components/cohorts/experiences/ExperiencesList';
import { AdminContainer, InviteButtonBox, LoadingContainer } from './Common';

export default function ExperiencesTab() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const cohort_experiences = useSelector(
    (state: RootState) => state.adminRegistrations.cohort_experiences
  );
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const copyInvationLink = () => {
    enqueueSnackbar('Generating master invite file', { variant: 'info' });
    setIsSubmitting(true);
    axios
      .get(`/generate_calender_invite_link`)
      .then((res) => {
        const textField = document.createElement('textarea');
        textField.innerText = res.data.link;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();
        setIsSubmitting(false);
        enqueueSnackbar('Calendar invite link copied to clipboard', { variant: 'success' });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (!cohort_experiences.length) {
      dispatch(initializeExperiences()).then(() => setLoading(false));
    } else {
      setLoading(false);
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
    <Page title="Sphere | Experiences">
      <InviteButtonBox>
        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          onClick={() => copyInvationLink()}
        >
          Copy calendar invite link
        </LoadingButton>
      </InviteButtonBox>
      <AdminContainer>
        <ExperiencesList cohortExperiences={cohort_experiences} />
      </AdminContainer>
    </Page>
  );
}
