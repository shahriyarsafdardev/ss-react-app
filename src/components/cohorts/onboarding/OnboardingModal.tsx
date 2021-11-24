import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import { Box } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import ProfileForm from 'pages/dashboard/cohorts/Home/ProfileForm';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { updateOnboardingStatus } from 'redux/slices/cohort';
import { ParticipantProfile } from '../../../@types/user';
import HomeTabHeader from './HomeTabHeader';
import {
  Question1,
  Question2,
  Question4,
  Question5,
  Question6,
  Question7,
  Question8,
  Question9,
  Question10
} from './Questions';

type HomeResponse = {
  cohort_id: string;
  cohort_title: string;
  setup_completed: boolean;
  enrollment_id: string | any;
  discord_invitation_link: string | undefined;
  onboarding_side_image_url: string | undefined;
  onboarding_video_url: string | undefined;
  onboarding_video_thumbnail_url: string | undefined;
  onboarding_header: string | undefined;
  last_recorded_step: number;
  participant_profile: {
    first_name: string;
    last_name: string;
    linkedin_url: string;
    discord_url: string;
    profile_image_url: string;
    current_position: string;
    current_company: string;
    preferred_pronoun: string;
    strengths: string[];
    current_role_category_selections: string[];
    opted_in_for_matching_suggestions: boolean;
    networking_matching_preferences: string[];
    current_industry_category_selections: string[];
    interests: string[];
    bio_text: string;
  };
};

const MODAL_HEIGHT = '650px';

const OnboardingStepsContainer = styled('div')(() => ({
  display: 'flex',
  borderRadius: '25px'
}));

const CohortAuthorPreview = styled('div')(({ theme }) => ({
  height: MODAL_HEIGHT,
  width: '430px',
  alignSelf: 'center',
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
  const [responses, setResponses] = useState<any>({});
  const totalSteps = 11;

  const { role_options, industry_options } = useSelector(
    (state: RootState) => state.profileOptions
  );

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/onboarding/home.json`, {
        params: { cohort_id, participant_id: user?.id }
      })
      .then((res) => res.data)
      .then((payload) => {
        payload.last_recorded_step && setActiveStep(payload.last_recorded_step + 1);
        setHomeConfig(payload);
      });
  }, [cohort_id, user?.id]);

  const sendStepCompletionRequest = (stepNumber: number) =>
    axios.post(`/cohorts/${cohort_id}/onboarding/step_completed.json`, {
      cohort_id,
      step_number: stepNumber,
      enrollment_id: homeConfig?.enrollment_id
    });

  const submitOnboardingAnswers = () => {
    axios
      .post(`/cohorts/${cohort_id}/onboarding/submit_onboarding_answers.json`, {
        onboarding_answers: responses,
        enrollment_id: homeConfig?.enrollment_id
      })
      .then((res) => {
        updateProfile({ ...res.data });
        if (homeConfig) {
          homeConfig.participant_profile = { ...homeConfig.participant_profile, ...res.data };
        }
        setModal(false);
        enqueueSnackbar('Onboarding complete successfully', { variant: 'success' });
        dispatch(updateOnboardingStatus(cohort_id));
      });
  };

  const onStepChange = (stepNumber: number) => {
    sendStepCompletionRequest(activeStep);
    if (activeStep >= 10) {
      submitOnboardingAnswers();
    } else {
      setActiveStep(stepNumber + 1);
    }
  };

  const onPreviousHandler = () => {
    setActiveStep(activeStep - 1);
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
    values.preferred_pronoun && uploadData.append('preferred_pronoun', values.preferred_pronoun);
    values.current_position && uploadData.append('current_position', values.current_position);
    values.strengths && uploadData.append('strengths', values.strengths);
    values.interests && uploadData.append('interests', values.interests);
    values.profile_image_url?.image && uploadData.append('image', values.profile_image_url?.image);

    onSubmit();
    onStepChange(activeStep);

    await axios
      .post(`/cohorts/${cohort_id}/onboarding/save_user_profile.json`, uploadData)
      .then((res) => {
        updateProfile({ ...res.data });
        if (homeConfig) {
          homeConfig.participant_profile = { ...homeConfig.participant_profile, ...res.data };
        }
      });
  };

  const Step1 = () => (
    <Step1Container>
      <StyledVideoPreview
        src={homeConfig?.onboarding_video_url}
        poster={homeConfig?.onboarding_video_thumbnail_url}
        data-testid="onboard-video"
        controls
      />
    </Step1Container>
  );

  const updateAnswers = (answer: any) => {
    const newResponse = { ...responses };
    newResponse[`question-${activeStep}`] = answer;
    setResponses(newResponse);
  };

  const selectStep = () => {
    if (activeStep === 0) {
      return <Step1 />;
    }

    if (activeStep === 1) {
      return (
        <div>
          <ProfileForm
            userProfile={homeConfig?.participant_profile}
            isOnboardingModal={true}
            onSubmit={onFormSubmitHandler}
            showSubmitButton={false}
          />
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <Question1
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
        />
      );
    }

    if (activeStep === 3) {
      return (
        <Question2
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
          options={role_options}
        />
      );
    }
    if (activeStep === 4) {
      return (
        <Question4
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
          options={industry_options}
        />
      );
    }
    if (activeStep === 5) {
      return (
        <Question5
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
        />
      );
    }
    if (activeStep === 6) {
      return (
        <Question6
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
        />
      );
    }
    if (activeStep === 7) {
      return (
        <Question7
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
        />
      );
    }
    if (activeStep === 8) {
      return (
        <Question8
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
        />
      );
    }
    if (activeStep === 9) {
      return (
        <Question9
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
        />
      );
    }
    if (activeStep === 10) {
      return (
        <Question10
          currentAnswer={responses[`question-${activeStep}`]}
          setCurrentAnswer={updateAnswers}
        />
      );
    }

    return <div>All steps are completed!</div>;
  };

  const headContent = () => {
    if (activeStep === 0) {
      return homeConfig?.onboarding_header;
    }

    if (activeStep >= 1 && activeStep <= 4) {
      return 'Build Your Profile';
    }

    if (activeStep >= 5 && activeStep <= 7) {
      return 'Networking Preferences';
    }

    if (activeStep >= 8) {
      return 'Housekeeping Questions';
    }

    return '';
  };

  const headContentDescription = () => {
    if (activeStep === 0) {
      return '';
    }

    if (activeStep >= 1 && activeStep <= 4) {
      return 'Your profile will be visible to other members of the EODP F21 cohort. You can edit all details again later in profile settings.';
    }

    if (activeStep >= 5 && activeStep <= 7) {
      return 'We’ll help you make meaningful connections with other professionals in the cohort.';
    }

    if (activeStep >= 8) {
      return 'Don’t worry, there’s just a few!';
    }

    return '';
  };

  const OnBoardingSteps = () => (
    <OnboardingStepsContainer>
      <CohortAuthorPreview
        style={{ backgroundImage: `url("${homeConfig?.onboarding_side_image_url}")` }}
        data-testid="onboarding-image"
      />
      <ContentContainer>
        <HomeTabHeader
          cohortTitle={headContent()}
          cohortDescription={headContentDescription()}
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
              onClick={onPreviousHandler}
            >
              Previous
            </StyledButton>
          )}

          {activeStep !== 1 && (
            <StyledButton
              variant="contained"
              className="next"
              disabled={
                activeStep > 0 &&
                activeStep !== 1 &&
                activeStep <= 10 &&
                (!responses[`question-${activeStep}`] ||
                  responses[`question-${activeStep}`].length === 0)
              }
              onClick={() => onStepChange(activeStep)}
              data-testid="btn-next"
            >
              Next
            </StyledButton>
          )}
          {activeStep === 1 && (
            <StyledButton
              form="profile-form"
              type="submit"
              variant="contained"
              className="next"
              data-testid="btn-submit"
            >
              Next
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
