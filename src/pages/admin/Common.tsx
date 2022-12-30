import { Box, Button, Stack, Theme } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Modal } from 'components/animate';
import { OnboardingStepsContainer } from 'components/cohorts/onboarding/OnboardingModal';
import { StyledContainer } from 'components/cohorts/sessions/SurveyForm';
import { useState } from 'react';
import Highlight from 'react-highlight';
import copy from 'clipboard-copy';
import { useSnackbar } from 'notistack5';
import { makeStyles } from '@material-ui/styles';

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));

export const AlumniContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '0 1rem 1rem 1rem',
  padding: '1rem 0',
  background: 'white',
  borderRadius: '10px',
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
}));

export const AdminContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '0 1rem 1rem 1rem',
  padding: '1rem 0',
  background: 'white',
  borderRadius: '10px',
  boxShadow: 'rgb(145 158 171 / 24%) 0px 0px 2px, rgb(145 158 171 / 24%) 0px 16px 32px -4px'
}));

export const InviteButtonBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-end',
  padding: '20px'
}));

const CopyJsonButton = styled(Button)(({ theme }) => ({
  width: '250px',
  margin: '12px 0px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export const useStyles = makeStyles((theme: Theme) => ({
  headerContainer: {
    justifyContent: 'space-between',
    width: '-webkit-fill-available',
    mx: 2,
    mb: 2
  },
  surveyBox: {
    mt: 3,
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '16px'
  }
}));

const JSON_FORMAT_EXAMPLE = `[
    {
      title: 'Would you like to network with other learners in this cohort?',
      question_type: 'multiple-choice',
      options: ['I would like to network during the live classes', 'I would like to network through standalone networking sessions', 'I would like to network through standalone 1-on-1 meetings', 'I would like to network through messaging', 'I would not like to network'],
      mandatory: true
    },
    {
      title: 'What resources are you must interested in having access to?',
      question_type: 'multiple-choice',
      options: ['Case Studies', 'Academic Papers', 'Take Home Exercises', 'Newly Released Articles'],
      mandatory: true
    },
    {
      title: 'Are you trying to use the learning from this course to impact a business KPI?',
      question_type: 'multiple-choice',
      options: ['This course directly relates to a business KPI', 'This course may relate to a future business KPI', 'This course will not related to any business KPI'],
      mandatory: true
    },
    {
      title: 'If so, which KPI does this course relate to?',
      question_type: 'text-input',
      options: { placeholder: 'Enter here' },
      mandatory: true
    }
  ]`;

export const ExampleQuestionModal = () => {
  const [JsonModalOpen, setJsonModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyToClipboard = () => {
    copy(JSON_FORMAT_EXAMPLE);
    enqueueSnackbar('Copied to clipboard !', { variant: 'success' });
  };

  return (
    <>
      <Button variant="contained" onClick={() => setJsonModalOpen(true)}>
        See JSON Example
      </Button>
      <Modal open={JsonModalOpen} onClose={() => setJsonModalOpen(false)} zIndex={1400}>
        <OnboardingStepsContainer>
          <StyledContainer
            style={{
              padding: '0px',
              border: '20px solid white',
              overflow: 'scroll',
              height: '600px'
            }}
          >
            <Stack alignItems={{ xs: 'center', md: 'end' }}>
              <CopyJsonButton variant="contained" onClick={() => handleCopyToClipboard()}>
                Copy example to clipboard
              </CopyJsonButton>
            </Stack>
            <Highlight>{JSON_FORMAT_EXAMPLE}</Highlight>
          </StyledContainer>
        </OnboardingStepsContainer>
      </Modal>
    </>
  );
};
