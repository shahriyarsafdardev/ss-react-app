import { useState } from 'react';
import { Container, Box, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LoadingScreen from 'components/LoadingScreen';
import ResourceCard from 'components/cohorts/code/ResourceCard';
import { CohortContext } from 'contexts/CohortContext';
import EmptySessionsTab from 'components/cohorts/onboarding/empty-states/EmptySessionsTab';
import { RootState, useSelector } from '../../../../redux/store';
import Page from '../../../../components/Page';

// ----------------------------------------------------------------------

const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const ResourceStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '18px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

export default function CodeTab() {
  const { mode } = useSelector((state: RootState) => state.instructorView);
  const [codeData, setcodeData] = useState(true);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const cohortCode = () =>
    codeData ? (
      <Container style={{ marginBottom: '50px' }}>
        <h1>Resources</h1>
        <ResourceStack>
          <ResourceCard
            heading="Hugging Face Hub"
            detail="This is used for ..."
            imageUrl="https://sphere-public.s3.eu-west-2.amazonaws.com/github.svg"
            onOpenUrl="https://www.google.com"
          />
          <ResourceCard
            heading="Github Organization"
            detail="This is used for ..."
            imageUrl="https://sphere-public.s3.eu-west-2.amazonaws.com/htp-logo.svg"
            onOpenUrl="https://www.google.com"
          />
        </ResourceStack>
      </Container>
    ) : (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );

  return (
    <CohortContext.Provider
      value={{ id: cohort?.id, cohortName: cohort?.name, cohortIntake: cohort?.intake }}
    >
      <Page title="Sphere | Code">
        {cohort?.released_for_learners === true ||
        cohort?.readings_released === true ||
        mode === 'Instructor' ? (
          cohortCode()
        ) : (
          <EmptySessionsTab key={cohort_id} cohortHost={cohort?.host_names} />
        )}
      </Page>
    </CohortContext.Provider>
  );
}
