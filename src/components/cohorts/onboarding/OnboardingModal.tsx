import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import { Box, Typography, Button } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import Step4 from 'pages/dashboard/cohorts/Home/ProfileForm';
import { useDispatch } from 'redux/store';
import { updateOnboardingStatus } from 'redux/slices/cohort';
import { ParticipantProfile } from '../../../@types/user';
import HomeTabHeader from './HomeTabHeader';
import { Question1, Question2, Question3, Question4, Question5 } from './Questions';

type HomeResponse = {
  cohort_id: string;
  cohort_title: string;
  setup_completed: boolean;
  enrollment_id: string | any;
  intro_video_url: string;
  discord_invitation_link: string;
  last_recorded_step: number;
  participant_profile: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    discord_url: string;
    profile_image_url: string;
    current_position: string;
    current_company: string;
    strengths: string[];
    interests: string[];
  };
};

const MODAL_HEIGHT = '600px';

const OnboardingStepsContainer = styled('div')(() => ({
  display: 'flex',
  borderRadius: '25px'
}));

const CohortAuthorPreview = styled('div')(({ theme }) => ({
  height: MODAL_HEIGHT,
  width: '430px',
  alignSelf: 'center',
  backgroundImage: `url("https://scholarsite-public.s3.eu-west-2.amazonaws.com/steve-side-banner.jpg")`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  borderTopLeftRadius: '25px',
  borderBottomLeftRadius: '25px',
  [theme.breakpoints.down(1250)]: {
    display: 'none'
  }
}));

const ContentContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  flex: '1',
  backgroundColor: 'white',
  height: MODAL_HEIGHT,
  padding: '50px',
  boxSizing: 'border-box',
  borderTopRightRadius: '25px',
  borderBottomRightRadius: '25px',
  [theme.breakpoints.down(1250)]: {
    borderRadius: '25px',
    height: '100%'
  }
}));

const ButtonsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flex_direction: 'column'
  }
}));

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  '&.next': {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '50px',
      bottom: '30px',
      width: '200px !important'
    },
    '&:hover': {
      backgroundColor: '#4D4DCD',
      opacity: 0.8,
      color: 'white'
    }
  },
  '&.previous': {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '280px',
      bottom: '30px',
      width: '200px !important'
    },
    '&:hover': {
      backgroundColor: 'white',
      opacity: 0.8
    }
  },

  [theme.breakpoints.down('sm')]: {
    position: null,
    bottom: null,
    right: null,
    width: '100%',
    marginTop: '10px'
  }
}));

const Step1Container = styled(Box)(() => ({
  textAlign: 'center'
}));

const StyledVideoPreview = styled('video')(({ theme }) => ({
  width: '92%',
  marginBottom: '35px',
  marginTop: '20px',
  borderRadius: '25px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export default function OnboardingModal({ onSubmit }: { onSubmit: Function }) {
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [activeStep, setActiveStep] = useState(0);
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  const [responses, setResponses] = useState<any>([]);
  const totalSteps = 7;

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/home.json`, { params: { cohort_id, participant_id: user?.id } })
      .then((res) => res.data)
      .then((payload) => {
        payload.last_recorded_step && setActiveStep(payload.last_recorded_step + 1);
        setHomeConfig(payload);
      });
  }, [cohort_id, user?.id]);

  const sendStepCompletionRequest = (stepNumber: number, answer?: string) =>
    axios.post(`/cohorts/${cohort_id}/step_completed.json`, {
      cohort_id,
      step_number: stepNumber,
      enrollment_id: homeConfig?.enrollment_id,
      answer
    });

  const onStepChange = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 5) {
      sendStepCompletionRequest(activeStep, responses[stepNumber] || '');
    } else {
      sendStepCompletionRequest(activeStep);
    }

    setActiveStep(stepNumber + 1);
  };

  const onFormSubmitHandler = async (values: ParticipantProfile) => {
    const uploadData = new FormData();
    uploadData.append('enrollment_id', homeConfig?.enrollment_id);
    uploadData.append('step_number', activeStep.toString());
    values.first_name && uploadData.append('first_name', values.first_name);
    values.last_name && uploadData.append('last_name', values.last_name);
    values.linkedin_url && uploadData.append('linkedin_url', values.linkedin_url);
    values.discord_url && uploadData.append('discord_url', values.discord_url);
    values.current_company && uploadData.append('current_company', values.current_company);
    values.current_position && uploadData.append('current_position', values.current_position);
    values.strengths && uploadData.append('strengths', values.strengths);
    values.interests && uploadData.append('interests', values.interests);
    values.profile_image_url?.image && uploadData.append('image', values.profile_image_url?.image);

    onSubmit();

    await axios.post(`/cohorts/${cohort_id}/save_user_profile.json`, uploadData).then((res) => {
      setModal(false);
      enqueueSnackbar('Profile Updated successfully', { variant: 'success' });
      dispatch(updateOnboardingStatus(cohort_id));

      updateProfile({ ...res.data });
    });
  };

  const Step1 = () => (
    <Step1Container>
      <StyledVideoPreview
        src="https://scholarsite-public.s3-accelerate.amazonaws.com/Welcome+Video+-+EODP+F21.mp4"
        poster="https://scholarsite-public.s3.eu-west-2.amazonaws.com/steve-thumbnail-3.jpg"
        controls
      />
    </Step1Container>
  );

  const updateAnswers = (answer: any) => {
    const newResponse = [...responses];
    newResponse[activeStep] = answer;
    setResponses(newResponse);
  };

  const selectStep = () => {
    if (activeStep === 0) {
      return <Step1 />;
    }

    if (activeStep === 1) {
      return <Question1 currentAnswer={responses[activeStep]} setCurrentAnswer={updateAnswers} />;
    }

    if (activeStep === 2) {
      return <Question2 currentAnswer={responses[activeStep]} setCurrentAnswer={updateAnswers} />;
    }
    if (activeStep === 3) {
      return <Question3 currentAnswer={responses[activeStep]} setCurrentAnswer={updateAnswers} />;
    }
    if (activeStep === 4) {
      return <Question4 currentAnswer={responses[activeStep]} setCurrentAnswer={updateAnswers} />;
    }
    if (activeStep === 5) {
      return <Question5 currentAnswer={responses[activeStep]} setCurrentAnswer={updateAnswers} />;
    }

    if (activeStep === 6) {
      return (
        <div>
          <Step4
            userProfile={homeConfig?.participant_profile}
            isOnboardingModal={true}
            onSubmit={onFormSubmitHandler}
            showSubmitButton={false}
          />
        </div>
      );
    }

    return <div>All steps are completed!</div>;
  };

  const headContent = () => {
    if (activeStep === 0) {
      return `Welcome to EODP F21! Here is a message from your instructor!`;
    }

    if (activeStep >= 1 && activeStep <= 5) {
      return "First off, we'd like to ask you a few questions so we can get to know you better";
    }

    if (activeStep === 6) {
      return 'Finally, fill out your profile for the directory.';
    }

    return '';
  };

  const OnBoardingSteps = () => (
    <OnboardingStepsContainer>
      <CohortAuthorPreview />
      <ContentContainer>
        <HomeTabHeader
          cohortTitle={headContent()}
          activeStep={activeStep}
          totalSteps={totalSteps}
          showProgressBar={true}
        />
        {selectStep()}
        <ButtonsContainer>
          {activeStep !== 0 && (
            <StyledButton
              disabled={activeStep <= 0}
              className="previous"
              variant="outlined"
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Previous
            </StyledButton>
          )}

          {activeStep !== totalSteps - 1 && (
            <StyledButton
              variant="contained"
              className="next"
              disabled={
                activeStep > 0 &&
                activeStep < 6 &&
                (!responses[activeStep] || responses[activeStep].length === 0)
              }
              onClick={() => onStepChange(activeStep)}
            >
              Next
            </StyledButton>
          )}
          {activeStep === 6 && (
            <StyledButton form="profile-form" type="submit" variant="contained" className="next">
              Submit
            </StyledButton>
          )}
        </ButtonsContainer>
      </ContentContainer>
    </OnboardingStepsContainer>
  );

  return (
    <Modal open={modal} zIndex={1400}>
      <OnBoardingSteps />
    </Modal>
  );
}
