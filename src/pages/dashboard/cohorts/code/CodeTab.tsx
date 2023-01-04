import { useEffect } from 'react';
import { Container, Box, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LoadingScreen from 'components/LoadingScreen';
import ResourceCard from 'components/cohorts/code/ResourceCard';
import MLSCodeList from 'components/cohorts/code/MLSCodeList';
import CodeList from 'components/cohorts/code/CodeList';
import { CohortContext } from 'contexts/CohortContext';
import { getCodeOnboardingCheckList } from 'redux/slices/cohort';
import { dispatch, RootState, useSelector } from '../../../../redux/store';
import Page from '../../../../components/Page';

// ----------------------------------------------------------------------

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

const ResourceStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '18px',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

export default function CodeTab() {
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const { code_onboarding_items } = cohort || [];

  useEffect(() => {
    if (cohort && !code_onboarding_items && cohort?.code === 'HPT') {
      dispatch(getCodeOnboardingCheckList(cohort.id));
    }
  }, [cohort]);

  const codeOnboardingContent = () =>
    typeof code_onboarding_items !== 'undefined' ? (
      <>
        <ResourceStack>
          <ResourceCard
            cohort={cohort}
            heading="Hugging Face Hub"
            detail="An easy place to upload your models and demos."
            imageUrl="https://sphere-public.s3.eu-west-2.amazonaws.com/htp-logo.svg"
            onOpenUrl="https://huggingface.co/Sphere-Fall2022"
          />
          <ResourceCard
            cohort={cohort}
            heading="Github Organization"
            detail="Access Google Colab notebooks to participate during in-session exercises"
            imageUrl="https://sphere-public.s3.eu-west-2.amazonaws.com/github.svg"
            onOpenUrl="https://github.com/Hugging-Face-Sphere"
          />
        </ResourceStack>
        <CodeList codeOnboardingItems={code_onboarding_items} />
      </>
    ) : (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );

  return (
    <CohortContext.Provider
      value={{ id: cohort?.id, cohortName: cohort?.name, cohortIntake: cohort?.intake, cohort }}
    >
      <Page title="Sphere | Code">
        <Container style={{ marginBottom: '50px' }}>
          <Typography variant="h3">Resources</Typography>
          {cohort?.code === 'HPT' ? codeOnboardingContent() : <MLSCodeList />}
        </Container>
      </Page>
    </CohortContext.Provider>
  );
}
