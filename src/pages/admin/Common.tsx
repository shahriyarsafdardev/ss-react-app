import { Box, Button, Stack } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Modal } from 'components/animate';
import { OnboardingStepsContainer } from 'components/cohorts/onboarding/OnboardingModal';
import { StyledContainer } from 'components/cohorts/sessions/SurveyForm';
import { useState } from 'react';
import Highlight from 'react-highlight';
import copy from 'clipboard-copy';
import { useSnackbar } from 'notistack5';

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
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

export const ExampleQuestionModal = () => {
  const [JsonModalOpen, setJsonModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const JSON_FORMAT_EXAMPLE = `[
    {
      title: 'How likely are you to recommend a Sphere course to a friend or colleague?',
      description: 'From 1 (Not at all) to 10 (Very Likely!)',
      question_type: 'slider',
      options: {
        max: 10
      }
    },
    {
      title: 'How likely are you to recommend The Challenger Sale course to a friend or colleague?',
      description: 'From 1 (Not at all) to 10 (Very Likely!)',
      question_type: 'slider',
      options: {
        max: 10
      }
    },
    {
      title: 'Overall, how would you rate this cohort?',
      question_type: 'star-rating',
      options: []
    },
    {
      title: 'Will what you learned in the cohort help improve how you do your job?',
      description: 'From 1 (Not at all) to 10 (Without a doubt!)',
      question_type: 'slider',
      options: {
        max: 10
      }
    },
    {
      title:
        "To what extent do you agree with the following statement: Sphere's technology made it easy for me to participate in this course",
      description: 'From 1 (Not at all) to 10 (Without a doubt!)',
      question_type: 'slider',
      options: {
        max: 10
      }
    },
    {
      title:
        'If you are interested in participating in another Sphere cohort, what topics would you be interested in learning more about?',
      question_type: 'text-input',
      options: { placeholder: 'eg. Crypto, Immunology or Sales' }
    },
    {
      title: 'Did you enjoy the live Networking Session hosted by Sphere last week?',
      question_type: 'multiple-choice',
      options: ['Yes', 'No', "I didn't attend"],
      mandatory: true
    },
    {
      title: 'Did you get value out of the optional Networking get together?',
      question_type: 'multiple-choice',
      options: ['Yes', 'No', 'I did not join'],
      mandatory: true
    },
    {
      title: 'Would you rather:',
      question_type: 'multiple-choice',
      options: [
        'Have had more networking opportunities in-session',
        'Have had more date/time options for a networking event on a non-session day',
        'Both',
        'Neither'
      ],
      mandatory: true
    },
    {
      title: 'What was your favourite part of your cohort experience?',
      question_type: 'text-input',
      options: { placeholder: "We're interested to hear your honest feedback!" },
      mandatory: true
    },
    {
      title: 'If you could improve one thing about your cohort experience, what would it be?',
      question_type: 'text-input',
      options: { placeholder: "We're interested to hear your honest feedback!" },
      mandatory: true
    },
    {
      title:
        'If you have any friends or colleagues that you think would benefit from the next iteration of this cohort, please list their names here and we will provide them with an exclusive invitation. Once they confirm their seat, Sphere will issue a $50 Amazon gift card to both you and your referral!',
      question_type: 'text-input',
      options: { placeholder: 'eg. John Smith (john.smith@gmail.com)' }
    },
    {
      title:
        'Challenger has a host of resources, tools, and additional support at both the individual and organizational level. Please opt-in if you’re interested in learning more.',
      question_type: 'multiple-choice',
      options: ['I opt in', 'I opt out'],
      mandatory: true
    }
  ]`;

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
