/* eslint-disable no-else-return */
import { Box, Button, styled, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack5';
import copy from 'clipboard-copy';
import { Modal } from 'components/animate';
import { uniq } from 'lodash';
import { REFERRAL_EVENTS, trackReferralEvent } from 'utils/amplitude';
import { Cohort } from '../../@types/cohorts';
import InviteEmailForm from './InviteEmailForm';

export const seasonOrder: { [index: string]: number } = {
  winter: 4,
  spring: 3,
  summer: 2,
  fall: 1
};

export const comparatorFuntion = (intake1: string, intake2: string) => {
  const block1 = intake1?.split(' ');
  const block2 = intake2?.split(' ');
  if (block1?.length === 2 && block2?.length === 2) {
    if (Number(block1[1]) && Number(block2[1])) {
      if (Number(block1[1]) === Number(block2[1])) {
        // if year is same, compare the season
        return seasonOrder[block1[0].toLowerCase()] > seasonOrder[block2[0].toLowerCase()] ? 1 : -1;
      } else {
        return Number(block1[1]) < Number(block2[1]) ? 1 : -1;
      }
    }
  }
  return -1;
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

const BoldText = styled(Typography)(() => ({
  textAlign: 'center',
  fontSize: '20px',
  lineHeight: '24px',
  fontWeight: 'bolder',
  paddingTop: '40px'
}));

const LightText = styled(Typography)(() => ({
  textAlign: 'center',
  marginTop: '12px',
  fontSize: '16px',
  padding: '0px 26px',
  color: '#212B36CC'
}));

const InviteYourTeamMates = () => (
  <Box sx={{ paddingRight: '64px', borderRight: '1px solid #DCE0E480', width: '50%' }}>
    <img alt="sketch icon" src="/static/peers/peers-group.png" />
    <Typography sx={{ fontSize: '24px', marginTop: '32px', fontWeight: 'bolder' }}>
      Invite a friend or colleague
    </Typography>
    <Typography sx={{ fontSize: '16px', marginTop: '16px', color: '#919EAB', lineHeight: '24px' }}>
      Once they pay for the course, you get $100!
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

const ReferralEmailModal = ({ referralEmailModal, setReferralEmailModal }: EmailModalProps) => (
  <Modal open={referralEmailModal} zIndex={1400} onClose={() => setReferralEmailModal(false)}>
    <ContentContainer>
      <InviteYourTeamMates />
      <InviteEmailForm
        referralEmailModal={referralEmailModal}
        setReferralEmailModal={setReferralEmailModal}
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

  const handleCopyReferralLink = () => {
    trackReferralEvent(REFERRAL_EVENTS.event_type, {
      [REFERRAL_EVENTS.cohort_name]: cohort?.name,
      [REFERRAL_EVENTS.cohort_intake_number]: cohort?.intake,
      [REFERRAL_EVENTS.event]: 'click',
      [REFERRAL_EVENTS.category]: 'referral link',
      [REFERRAL_EVENTS.description]: 'Copied referral link',
      [REFERRAL_EVENTS.referrer_code]: referrer_code
    });
    if (referralLink) {
      copy(`${referralLink}&alumni=true`);
      enqueueSnackbar('Referral Link Copied', { variant: 'success' });
    } else {
      enqueueSnackbar('Referral Link Not Available', { variant: 'warning' });
    }
  };

  const handleSendViaEmail = () => {
    setReferralEmailModal(true);
    trackReferralEvent(REFERRAL_EVENTS.event_type, {
      [REFERRAL_EVENTS.cohort_name]: cohort?.name,
      [REFERRAL_EVENTS.cohort_intake_number]: cohort?.intake,
      [REFERRAL_EVENTS.event]: 'click',
      [REFERRAL_EVENTS.category]: 'referral link',
      [REFERRAL_EVENTS.description]: 'Send referral link via email',
      [REFERRAL_EVENTS.referrer_code]: referrer_code
    });
  };

  return (
    <>
      <BoldText>Invite your colleagues</BoldText>
      <LightText>
        and earn <span style={{ color: '#4D4DCD', fontWeight: 'bold' }}>$100</span> when they signs
        up
      </LightText>
      <Box sx={{ margin: '32px 0px' }}>
        <Button
          variant="contained"
          style={{ width: '-webkit-fill-available', borderRadius: '4px' }}
          onClick={() => {
            handleSendViaEmail();
          }}
        >
          Share My Link
        </Button>
        <Button
          variant="outlined"
          style={{ width: '-webkit-fill-available', borderRadius: '4px', marginTop: '12px' }}
          onClick={() => {
            handleCopyReferralLink();
          }}
        >
          Copy My Link
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
