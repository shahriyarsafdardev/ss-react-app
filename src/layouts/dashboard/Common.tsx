/* eslint-disable no-else-return */
import { Box, Button, styled, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import { Modal } from 'components/animate';
import { uniq } from 'lodash';
import { trackEvent } from 'utils/eventTracking';
import { RootState, useSelector } from 'redux/store';
import { useNavigate } from 'react-router-dom';
import { Cohort } from '../../@types/cohorts';
import InviteEmailForm from './InviteEmailForm';
import ReferralChart from './ReferralChart';

export const seasonOrder: { [index: string]: number } = {
  winter: 4,
  spring: 3,
  summer: 2,
  fall: 1
};

export const comparatorFuntion = (intake1: string, intake2: string) => {
  if (intake1 === 'Waitlist') {
    return -1;
  }
  if (intake2 === 'Waitlist') {
    return 1;
  }
  if (intake1 === 'TBD') {
    return -1;
  }
  if (intake2 === 'TBD') {
    return 1;
  }
  return new Date(intake2) > new Date(intake1) ? 1 : -1;
};

export const sortByIntake = (intakeCategories: string[]) =>
  intakeCategories.sort(comparatorFuntion);

export const getCategories = (cohorts: Cohort[]) =>
  uniq(
    cohorts
      .filter((cohort) => cohort.is_host)
      .map((cohort) => cohort.name?.toLowerCase())
      .sort()
  );

export const getInstructorCohorts = (cohorts: Cohort[], category: string) =>
  cohorts
    .filter((cohort) => cohort.name?.toLowerCase() === category && cohort.is_host)
    .sort((a, b) => comparatorFuntion(a.intake_name, b.intake_name));

export const groupByIntake = (cohorts: Cohort[]) =>
  sortByIntake(uniq(cohorts.map((c) => c.intake_name)));

export const getLearnerCohorts = (cohorts: Cohort[], category: string) =>
  cohorts
    .filter((item) => item.intake_name === category)
    .sort((a, b) => (a.name > b.name ? 1 : -1));

const ContentContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  backgroundColor: 'white',
  padding: '54px 40px',
  boxSizing: 'border-box',
  borderRadius: '25px',
  maxWidth: '100%',
  [theme.breakpoints.down(1250)]: {
    borderRadius: '25px',
    height: '100%'
  }
}));

const InviteYourTeamMates = () => (
  <Box sx={{ paddingRight: '64px', borderRight: '1px solid #DCE0E480', width: '50%' }}>
    <img alt="sketch icon" src="/static/peers/peers-group.png" width={160} />
    <Typography sx={{ fontSize: '24px', marginTop: '32px', fontWeight: 'bolder' }}>
      Invite a friend or colleague
    </Typography>
    <Typography sx={{ fontSize: '16px', marginTop: '16px', color: 'primary', lineHeight: '24px' }}>
      Learning is more enjoyable with friends
    </Typography>
  </Box>
);

export type EmailModalProps = {
  referralEmailModal: boolean;
  setReferralEmailModal: Function;
  referralLink?: string;
  cohort?: Cohort;
  referrer_code?: string;
};

const ReferralEmailModal = ({
  referralEmailModal,
  setReferralEmailModal,
  cohort
}: EmailModalProps) => (
  <Modal open={referralEmailModal} zIndex={1400} onClose={() => setReferralEmailModal(false)}>
    <ContentContainer>
      <InviteYourTeamMates />
      <InviteEmailForm
        referralEmailModal={referralEmailModal}
        setReferralEmailModal={setReferralEmailModal}
        cohort={cohort}
      />
    </ContentContainer>
  </Modal>
);

export const ShareReferralLink = ({
  referralEmailModal,
  setReferralEmailModal,
  referralLink = '',
  cohort
}: EmailModalProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const referrer_code = String(String(referralLink.split('?')[1]).split('=')[1]);
  const { referrals_count } = useSelector((state: RootState) => state.referral.referral);
  const firstCohort = useSelector((state: RootState) => state?.cohort?.cohorts[0]);
  const navigate = useNavigate();

  const buttonText = () =>
    referrals_count?.total_referrals_count === 0 ? 'Go to Referrals' : 'Send more referrals';

  const handleButtonClick = () => {
    if (firstCohort) {
      trackEvent(firstCohort, `Sidebar - Referral Preview - '${buttonText()}' Selected`);
      navigate('/user/referrals');
    } else {
      enqueueSnackbar('Please enroll in a cohort to send referrals!', { variant: 'warning' });
    }
  };

  return (
    <>
      <Typography
        variant="h5"
        align="center"
        color="primary"
        sx={{ textAlign: 'center', margin: 'auto !important', color: '#212B36' }}
      >
        Give $100, Get $100
      </Typography>
      <ReferralChart
        enrolled={referrals_count?.enrolled_referrals_count}
        referralsSent={referrals_count?.total_referrals_count}
        requiredReferees={7}
      />
      <Typography align="center" color="text.primary">
        {referrals_count?.total_referrals_count === 0 ? (
          'Refer friends to earn a free Sphere course!'
        ) : (
          <>
            You've earned <b>${referrals_count?.enrolled_referrals_count * 100}</b> to use towards
            Sphere courses
          </>
        )}
      </Typography>
      <Box sx={{ margin: '32px 0px 14px 0px' }}>
        <Button
          variant="contained"
          style={{ width: '-webkit-fill-available', borderRadius: '30px', height: '40px' }}
          onClick={() => handleButtonClick()}
        >
          {buttonText()}
        </Button>
      </Box>
      <ReferralEmailModal
        referralEmailModal={referralEmailModal}
        setReferralEmailModal={setReferralEmailModal}
        cohort={cohort}
        referrer_code={referrer_code}
      />
    </>
  );
};
