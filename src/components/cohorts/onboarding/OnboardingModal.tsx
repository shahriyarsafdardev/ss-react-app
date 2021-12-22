import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import { Box } from '@material-ui/core';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import { useDispatch, RootState, useSelector } from 'redux/store';
import { updateOnboardingStatus } from 'redux/slices/cohort';

import {
  UserInfoForm,
  CompanyInfoForm,
  RoleInfoForm,
  NetworkingForm,
  HouseKeepingForm
} from './info-forms';

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

const FormTypes = {
  userInfo: 'userinfo',
  roleInfo: 'roleinfo',
  companyInfo: 'companyinfo',
  networkingInfo: 'networkinginfo',
  housekeepingInfo: 'housekeepinginfo'
};

type OnboardingDataType = {
  first_name: string;
  last_name: string;
  country: string;
  city: string;
  preferred_pronoun: string;
  linkedin_url: string;
  compnay_name: string;
  company_industries: string[];
  number_of_employees: string;
  role_title: string;
  role_category: string;
  do_manage_team: boolean;
  role_description: string;
  networking_roles_categories: string[];
  networking_industries_categories: string[];
  interested_in_being_matched: boolean;
  date_of_birth: string;
  cohort_understanding: string;
  referred_by: string;
  payed_by: string;
};

export default function OnboardingModal({ onSubmit }: { onSubmit: Function }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [activeStep, setActiveStep] = useState(1);
  const [modal, setModal] = useState(true);
  const dispatch = useDispatch();
  const [responses, setResponses] = useState<any>({});
  const totalSteps = 11;
  const [profilePicture, setProfilePicture] = useState(null);
  const [companyLogo, setCompanyLogo] = useState(null);
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const { role_options, industry_options } = useSelector(
    (state: RootState) => state.profileOptions
  );

  const [onboardingData, setOnboardingData] = useState<OnboardingDataType>({
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    preferred_pronoun: '',
    linkedin_url: '',
    compnay_name: '',
    company_industries: [],
    number_of_employees: '',
    role_title: '',
    role_category: '',
    do_manage_team: false,
    role_description: '',
    networking_roles_categories: [],
    networking_industries_categories: [],
    interested_in_being_matched: false,
    date_of_birth: '',
    cohort_understanding: '',
    referred_by: '',
    payed_by: ''
  });

  const updateOnboardingData = (type: string, data: any) => {
    if (type === FormTypes.userInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        first_name: data.first_name,
        last_name: data.last_name,
        country: data.country,
        city: data.city,
        preferred_pronoun: data.preferred_pronoun,
        linkedin_url: data.linkedin_url
      };
      setProfilePicture(data.profile_image_url);
      setOnboardingData(tempData);
    } else if (type === FormTypes.roleInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        role_title: data.role_title,
        role_category: data.role_category,
        role_description: data.role_description,
        do_manage_team: data.do_manage_team
      };
      setOnboardingData(tempData);
    } else if (type === FormTypes.companyInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        compnay_name: data.name,
        company_industries: data.industries,
        number_of_employees: data.number_of_employees
      };
      setCompanyLogo(data.logo_url);
      setOnboardingData(tempData);
    } else if (type === FormTypes.networkingInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        networking_industries_categories: data.networking_industries_categories,
        networking_roles_categories: data.networking_roles_categories,
        interested_in_being_matched: data.interested_in_being_matched
      };
      setOnboardingData(tempData);
    } else if (type === FormTypes.housekeepingInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        cohort_understanding: data.current_understanding,
        payed_by: data.payed_by,
        referred_by: data.referred_by
      };
      setOnboardingData(tempData);
    } else {
      console.log('Unknown form type passed!');
    }
    setActiveStep(activeStep + 1);
  };

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
    setIsSubmitting(true);
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
        setIsSubmitting(false);
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
    if (activeStep === 1) {
      return (
        <div>
          <UserInfoForm
            userProfile={homeConfig?.participant_profile}
            onSubmit={(data: any) => updateOnboardingData(FormTypes.userInfo, data)}
          />
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <CompanyInfoForm
          companyProfile={{
            name: homeConfig?.participant_profile.current_company || '',
            logo_url: '',
            industries: homeConfig?.participant_profile.current_industry_category_selections || [],
            number_of_employees: ''
          }}
          onSubmit={(data: any) => updateOnboardingData(FormTypes.companyInfo, data)}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
        />
      );
    }

    if (activeStep === 3) {
      return (
        <RoleInfoForm
          infoDetails={{
            role_title: 'Test title',
            role_description: 'Test description',
            role_category: 'Experimentation',
            do_manage_team: false
          }}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
          onSubmit={(data: any) => updateOnboardingData(FormTypes.roleInfo, data)}
        />
      );
    }
    if (activeStep === 4) {
      return (
        <NetworkingForm
          onSubmit={(data: any) => updateOnboardingData(FormTypes.networkingInfo, data)}
          infoDetails={{
            networking_industries_categories: [],
            networking_roles_categories: [],
            interested_in_being_matched: false
          }}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
        />
      );
    }
    if (activeStep === 5) {
      return (
        <HouseKeepingForm
          onSubmit={(data: any) => updateOnboardingData(FormTypes.housekeepingInfo, data)}
          infoDetails={{
            date_of_birth: '',
            current_understanding: '',
            payed_by: '',
            referred_by: ''
          }}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
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
      return `Your profile will be visible to other members of the ${cohort?.code} cohort. You can edit all details again later in profile settings.`;
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
      </ContentContainer>
    </OnboardingStepsContainer>
  );

  return (
    <Modal open={modal} zIndex={1400}>
      <OnBoardingSteps />
    </Modal>
  );
}
