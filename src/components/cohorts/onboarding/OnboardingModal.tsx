import { useState, useEffect } from 'react';
import { Modal } from 'components/animate';
import useAuth from 'hooks/useAuth';
import axios from 'utils/axios';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { RootState, useSelector } from 'redux/store';

import {
  UserInfoForm,
  CompanyInfoForm,
  RoleInfoForm,
  NetworkingForm,
  HouseKeepingForm
} from './info-forms';

import { ParticipantProfile } from '../../../@types/user';
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
    first_name: string;
    last_name: string;
    linkedin_url: string;
    profile_image_url: string;
    current_position: string;
    current_company: string;
    country: string;
    city: string;
    company_logo_url: string;
    number_of_employees: string;
    preferred_pronoun: string;
    current_role_category_selections: string[];
    opted_in_for_matching_suggestions: boolean;
    networking_matching_preferences: string[];
    networking_roles_categories: string[];
    networking_industries_categories: string[];
    current_industry_category_selections: string[];
    do_manage_team: boolean;
    bio_text: string;
    date_of_birth: string;
    referred_by: string;
    payed_by: string;
    current_understanding: string;
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
  maxWidth: '720px',
  [theme.breakpoints.down(1250)]: {
    borderRadius: '25px',
    height: '100%'
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
  company_name: string;
  company_industries: string[];
  number_of_employees: string;
  role_title: string;
  role_category: string[];
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
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const [activeStep, setActiveStep] = useState(1);
  const [modal, setModal] = useState(true);
  const totalSteps = 5;
  const [profilePicture, setProfilePicture] = useState<any>();
  const [companyLogo, setCompanyLogo] = useState<any>();
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  const [onboardingData, setOnboardingData] = useState<OnboardingDataType>({
    first_name: '',
    last_name: '',
    country: '',
    city: '',
    preferred_pronoun: '',
    linkedin_url: '',
    company_name: '',
    company_industries: [],
    number_of_employees: '',
    role_title: '',
    role_category: [],
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

  useEffect(() => {
    axios
      .get(`/cohorts/${cohort_id}/onboarding/home.json`, {
        params: { cohort_id, participant_id: user?.id }
      })
      .then((res) => res.data)
      .then((payload) => {
        setHomeConfig(payload);
        setProfilePicture(payload.participant_profile.profile_image_url);
        setCompanyLogo(payload.participant_profile.company_logo_url);
        setOnboardingData({
          first_name: payload.participant_profile.first_name,
          last_name: payload.participant_profile.last_name,
          country: payload.participant_profile.country,
          city: payload.participant_profile.city,
          preferred_pronoun: payload.participant_profile.preferred_pronoun,
          linkedin_url: payload.participant_profile.linkedin_url,
          company_name: payload.participant_profile.current_company,
          company_industries: payload.participant_profile.current_industry_category_selections,
          number_of_employees: payload.participant_profile.number_of_employees,
          role_title: payload.participant_profile.current_company,
          role_category: payload.participant_profile.current_role_category_selections,
          do_manage_team: payload.participant_profile.do_manage_team,
          role_description: payload.participant_profile.bio_text,
          networking_roles_categories: payload.participant_profile.networking_roles_categories,
          networking_industries_categories:
            payload.participant_profile.networking_industries_categories,
          interested_in_being_matched:
            payload.participant_profile.opted_in_for_matching_suggestions,
          date_of_birth: payload.participant_profile.date_of_birth,
          cohort_understanding: '',
          referred_by: '',
          payed_by: ''
        });
      });
  }, [cohort_id, user?.id]);

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
      setActiveStep(activeStep + 1);
    } else if (type === FormTypes.roleInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        role_title: data.role_title,
        role_category: data.role_category,
        role_description: data.role_description,
        do_manage_team: data.do_manage_team
      };
      setOnboardingData(tempData);
      setActiveStep(activeStep + 1);
    } else if (type === FormTypes.companyInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        company_name: data.name,
        company_industries: data.industries,
        number_of_employees: data.number_of_employees
      };
      setCompanyLogo(data.logo_url);
      setOnboardingData(tempData);
      setActiveStep(activeStep + 1);
    } else if (type === FormTypes.networkingInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        networking_industries_categories: data.networking_industries_categories,
        networking_roles_categories: data.networking_roles_categories,
        interested_in_being_matched: data.interested_in_being_matched
      };
      setOnboardingData(tempData);
      setActiveStep(activeStep + 1);
    } else if (type === FormTypes.housekeepingInfo) {
      const tempData: OnboardingDataType = {
        ...onboardingData,
        cohort_understanding: data.current_understanding,
        payed_by: data.payed_by,
        referred_by: data.referred_by,
        date_of_birth: data.date_of_birth
      };
      setIsSubmitting(true);
      submitData(tempData);
      setOnboardingData(tempData);
    } else {
      console.log('Unknown form type passed!');
    }
  };

  const submitData = async (data: any) => {
    const uploadData = new FormData();

    profilePicture?.image && uploadData.append('profile_image', profilePicture?.image);
    companyLogo?.image && uploadData.append('company_logo', companyLogo?.image);
    uploadData.append('participant_id', user?.id);
    uploadData.append('onboarding_data', JSON.stringify(data));

    await axios
      .post(`/cohorts/${cohort_id}/onboarding/submit_onboarding_answers.json`, uploadData)
      .then((res) => {
        enqueueSnackbar('Onboarding complete successfully', { variant: 'success' });
        setIsSubmitting(false);
        setModal(false);
      });
  };

  const selectStep = () => {
    if (activeStep === 1) {
      return (
        <div>
          <UserInfoForm
            userProfile={{
              first_name: onboardingData.first_name || '',
              last_name: onboardingData.last_name || '',
              linkedin_url: onboardingData.linkedin_url || '',
              profile_image_url: profilePicture,
              preferred_pronoun: onboardingData.preferred_pronoun || '',
              country: onboardingData.country || '',
              city: onboardingData.city || ''
            }}
            onSubmit={(data: any) => updateOnboardingData(FormTypes.userInfo, data)}
          />
        </div>
      );
    }

    if (activeStep === 2) {
      return (
        <CompanyInfoForm
          companyProfile={{
            name: onboardingData.company_name || '',
            logo_url: companyLogo,
            industries: onboardingData.company_industries || [],
            number_of_employees: onboardingData.number_of_employees || ''
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
            role_title: onboardingData.role_title || '',
            role_description: onboardingData.role_description || '',
            role_category: onboardingData.role_category || [],
            do_manage_team: onboardingData.do_manage_team || false
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
            networking_industries_categories: onboardingData.networking_industries_categories || [],
            networking_roles_categories: onboardingData.networking_roles_categories || [],
            interested_in_being_matched: onboardingData.interested_in_being_matched || false
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
            date_of_birth: onboardingData.date_of_birth || '',
            current_understanding: onboardingData.cohort_understanding,
            payed_by: onboardingData.payed_by,
            referred_by: onboardingData.referred_by
          }}
          isSubmitting={isSubmitting}
          onPrevHandler={() => setActiveStep(activeStep - 1)}
        />
      );
    }

    return <div>All steps are completed!</div>;
  };

  const headContent = () => {
    if (activeStep === 1) {
      return 'Build Your Profile';
    }

    if (activeStep === 2) {
      return 'Where do you work?';
    }

    if (activeStep === 3) {
      return 'Tell us about your current role?';
    }

    if (activeStep === 4) {
      return 'Networking Preferences';
    }

    if (activeStep === 5) {
      return 'Housekeeping Questions';
    }

    return '';
  };

  const headContentDescription = () => {
    if ([1, 2, 3].includes(activeStep)) {
      return `Your profile will be visible to other members of the ${cohort?.code} cohort. You can edit all details again later in profile settings.`;
    }

    if (activeStep === 4) {
      return 'We’ll help you make meaningful connections with other professionals in the cohort.';
    }

    if (activeStep === 5) {
      return 'Your answers to these questions will not be shared with cohort members';
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
