import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { RootState, useSelector } from 'redux/store';
import { ONBOARDING_EVENTS, trackOnboardingEvent } from 'utils/amplitude';
import {
  GoalsForm,
  HouseKeepingForm,
  AddToCalendarInfo,
  UserInfoForm,
  InviteColleaguesForm
} from './new-info-forms';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import HomeTabHeader from './HomeTabHeader';

type HomeResponse = {
  cohort_id: string;
  cohort_title: string;
  setup_completed: boolean;
  discord_invitation_link: string | undefined;
  onboarding_side_image_url: string | undefined;
  onboarding_video_url: string | undefined;
  onboarding_video_thumbnail_url: string | undefined;
  onboarding_header: string | undefined;
  participant_profile: {
    profile_image_url: string;
    current_position: string;
    current_company: string;
    opted_in_for_matching_suggestions?: boolean;
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
  maxWidth: '-webkit-fill-available',
  [theme.breakpoints.down(1250)]: {
    borderRadius: '25px',
    height: '100%'
  }
}));

const FormTypes = {
  userInfo: 'userInfo',
  companyInfo: 'companyinfo',
  housekeepingInfo: 'housekeepinginfo',
  inviteColleage: 'inviteColleage'
};

type OnboardingDataType = {
  company_name: string;
  role_title: string;
  interested_in_being_matched?: boolean;
  referred_by: string;
  goals: string;
  improvements: string;
};

export default function NewOnboardingModal({ onSubmit }: { onSubmit: Function }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [homeConfig, setHomeConfig] = useState<HomeResponse | undefined>(undefined);
  const { user, updateProfile } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [activeStep, setActiveStep] = useState(1);
  const [modal, setModal] = useState(true);
  const totalSteps = 5;
  const [profilePicture, setProfilePicture] = useState<any>();
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const [onboardingData, setOnboardingData] = useState<OnboardingDataType>({
    company_name: '',
    role_title: '',
    referred_by: '',
    goals: '',
    improvements: ''
  });

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/onboarding/home.json`, {
        params: { cohort_id, participant_id: user?.id }
      })
      .then((res) => res.data)
      .then((payload) => {
        setHomeConfig(payload);
        setProfilePicture(payload.participant_profile.profile_image_url);
        setOnboardingData({
          company_name: payload.participant_profile.current_company,
          role_title: payload.participant_profile.current_position,
          interested_in_being_matched:
            payload.participant_profile.opted_in_for_matching_suggestions,
          referred_by: '',
          goals: '',
          improvements: ''
        });
      });
  }, [cohort_id, user?.id]);

  const updateOnboardingData = (type: string, data: any) => {
    if (type === FormTypes.companyInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        company_name: data.name,
        role_title: data.role_title,
        goals: data.goals,
        improvements: data.improvements
      };
      setOnboardingData(tempData);
      setActiveStep(activeStep + 1);
    } else if (type === FormTypes.housekeepingInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        interested_in_being_matched: data.interested_in_being_matched,
        referred_by: data.referred_by
      };
      setOnboardingData(tempData);
      setActiveStep(activeStep + 1);
    } else if (type === FormTypes.userInfo) {
      setProfilePicture(data);
    } else if (type === FormTypes.inviteColleage) {
      console.log('onboarding completed !');
    } else {
      console.log('Unknown form type passed!');
    }
  };

  const submitData = async () => {
    setIsSubmitting(true);
    const uploadData = new FormData();
    profilePicture?.image && uploadData.append('profile_image', profilePicture?.image);
    uploadData.append('participant_id', user?.id);
    uploadData.append('onboarding_data', JSON.stringify(onboardingData));

    await axios
      .post(`/cohorts/${cohort_id}/onboarding/submit_new_onboarding_answers.json`, uploadData)
      .then((res) => {
        enqueueSnackbar('Onboarding completed successfully', { variant: 'success' });
        if (res.data.user) {
          updateProfile({ ...res.data.user });
        }
        setIsSubmitting(false);
        setModal(false);
        trackOnboardingEvent(ONBOARDING_EVENTS.event_type, {
          [ONBOARDING_EVENTS.cohort_name]: cohort.name,
          [ONBOARDING_EVENTS.cohort_intake_number]: cohort.intake,
          [ONBOARDING_EVENTS.event]: 'Onboarding Event',
          [ONBOARDING_EVENTS.category]: 'Onboarding Complete',
          [ONBOARDING_EVENTS.description]: 'User has completed the onboarding in cohort.'
        });
      })
      .catch((err) => {
        setIsSubmitting(false);
        enqueueSnackbar(`Error occurred`, { variant: 'error' });
        enqueueSnackbar('Please try again', { variant: 'info' });
      });
  };

  const selectStep = () => {
    if (activeStep === 1) {
      return (
        <div data-testid="onboarding-form-modal">
          <AddToCalendarInfo
            onNextHandler={() => {
              setActiveStep(activeStep + 1);
              trackOnboardingEvent(ONBOARDING_EVENTS.event_type, {
                [ONBOARDING_EVENTS.cohort_name]: cohort.name,
                [ONBOARDING_EVENTS.cohort_intake_number]: cohort.intake,
                [ONBOARDING_EVENTS.event]: 'Onboarding Event',
                [ONBOARDING_EVENTS.category]: 'Calendar Added',
                [ONBOARDING_EVENTS.description]: 'User has added the calender.'
              });
            }}
            inviteUrl={cohort?.calendar_invite_url}
          />
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <GoalsForm
          companyProfile={{
            name: onboardingData.company_name || '',
            role_title: onboardingData.role_title || '',
            goals: onboardingData.goals || '',
            improvements: onboardingData.improvements || ''
          }}
          isSubmitting={isSubmitting}
          onSubmit={(data: any) => {
            updateOnboardingData(FormTypes.companyInfo, data);
            trackOnboardingEvent(ONBOARDING_EVENTS.event_type, {
              [ONBOARDING_EVENTS.cohort_name]: cohort.name,
              [ONBOARDING_EVENTS.cohort_intake_number]: cohort.intake,
              [ONBOARDING_EVENTS.event]: 'Onboarding Event',
              [ONBOARDING_EVENTS.category]: 'Goals Added',
              [ONBOARDING_EVENTS.description]: 'User has added goals.'
            });
          }}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
        />
      );
    }

    if (activeStep === 3) {
      return (
        <HouseKeepingForm
          onSubmit={(data: any) => {
            updateOnboardingData(FormTypes.housekeepingInfo, data);
            trackOnboardingEvent(ONBOARDING_EVENTS.event_type, {
              [ONBOARDING_EVENTS.cohort_name]: cohort.name,
              [ONBOARDING_EVENTS.cohort_intake_number]: cohort.intake,
              [ONBOARDING_EVENTS.event]: 'Onboarding Event',
              [ONBOARDING_EVENTS.category]: 'House Keeping Questions',
              [ONBOARDING_EVENTS.description]: 'User has answered housekeeping questions.'
            });
          }}
          isSubmitting={isSubmitting}
          infoDetails={{
            interested_in_being_matched: onboardingData.interested_in_being_matched,
            referred_by: onboardingData.referred_by
          }}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
        />
      );
    }

    if (activeStep === 4) {
      return (
        <UserInfoForm
          onUpload={(data: any) => updateOnboardingData(FormTypes.userInfo, data)}
          onSubmit={() => setActiveStep(activeStep + 1)}
          profile_image_url={profilePicture}
          isSubmitting={isSubmitting}
          isSubmitable={true}
          showPrevButton={true}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
        />
      );
    }

    if (activeStep === 5) {
      return (
        <InviteColleaguesForm
          isSubmittingButton={isSubmitting}
          onSubmit={submitData}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
        />
      );
    }

    return <div>All steps are completed!</div>;
  };

  const headContent = () => {
    if (activeStep === 1) {
      return (
        <p>
          Firstly, lets make sure we add the upcoming sessions to{' '}
          <span style={{ color: '#12125C' }}> your calendar</span>
        </p>
      );
    }

    if (activeStep === 2) {
      return (
        <p>
          Next, {cohort?.host_names} would love to{' '}
          <span style={{ color: '#12125C' }}> understand your goals!</span>
        </p>
      );
    }

    if (activeStep === 3) {
      return (
        <p>
          Now for a few <span style={{ color: '#12125C' }}> housekeeping</span> questions!
        </p>
      );
    }

    if (activeStep === 4) {
      return (
        <p>
          Last step, <span style={{ color: '#12125C' }}>your picture</span> really helps in the live
          sessions!
        </p>
      );
    }

    if (activeStep === 5) {
      return <p>Learn together with your colleagues</p>;
    }

    return '';
  };

  const headContentDescription = () => {
    if (activeStep === 1) {
      return 'We’d love to see you in as many of as possible!';
    }

    if (activeStep === 2) {
      return 'We’ll use this information to personalize your learning experience';
    }

    if (activeStep === 3) {
      return 'We’re nearly there!';
    }

    if (activeStep === 4) {
      return 'It makes it much easier for Steve and other participants recognize you in class!';
    }

    if (activeStep === 5) {
      return `Invite your colleagues to join ${cohort?.host_names}’s cohort so that you can network and grow together!`;
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
