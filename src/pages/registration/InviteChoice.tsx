import { Stack, styled, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core/styles';
import PersonIcon from '@material-ui/icons/Person';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';
import { useEffect } from 'react';
import { SubmitButton, CompanyType, UserType, CohortType } from './Registration';

const StyledBox = styled(Stack)(({ theme }) => ({
  borderRadius: '16px',
  padding: '24px',
  width: '45%',
  height: '365px',
  margin: 'auto',
  justifyContent: 'left',
  alignItems: 'flex-start',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: 'auto',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const useStyles = makeStyles((theme: Theme) => ({
  heading: {
    fontSize: '18px',
    fontWeight: 600,
    marginBottom: '12px',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center'
    }
  },
  text: {
    fontSize: '14px',
    color: '#64748B',
    lineHeight: '150%',
    marginBottom: '20px',
    height: '30%',
    [theme.breakpoints.down('md')]: {
      textAlign: 'center',
      marginBottom: '10px'
    }
  },
  icon: {
    fontSize: '60px',
    marginBottom: '16px',
    background: '#f8fafc',
    padding: '4px',
    borderRadius: '50%'
  }
}));

function InviteChoice({
  company,
  account,
  setStep,
  selectStep,
  trackReferralFlowEvents
}: {
  company: CompanyType | null | undefined;
  account: string;
  setStep: Function;
  selectStep: Function;
  trackReferralFlowEvents: Function;
}) {
  const classes = useStyles();

  useEffect(() => {
    trackReferralFlowEvents('Cohort Registration - Refer Colleagues Page - Page Loaded');
  }, []);

  const submitLearnAlone = () => {
    trackReferralFlowEvents('Cohort Registration - Refer Colleagues Page - ‘Learn Alone’ Selected');
    selectStep();
  };

  const submitInviteColleagues = () => {
    trackReferralFlowEvents(
      'Cohort Registration - Refer Colleagues Page - ‘Invite Colleagues’ Selected'
    );
    setStep(3);
  };

  return (
    <Stack
      alignContent="center"
      width={{ xs: '100%', md: '70%' }}
      alignItems="center"
      margin="auto"
      marginTop="32px"
      direction={{ xs: 'column-reverse', md: 'row' }}
      spacing={2}
    >
      <StyledBox border="1px solid #E2E8F0" direction="column">
        <PersonIcon className={classes.icon} style={{ color: '#64748b' }} />
        <Typography className={classes.heading} color="text.secondary">
          Learn alone
        </Typography>
        <Typography className={classes.text}>
          Many participants have enjoyed joining our cohorts as an individual.
        </Typography>
        <SubmitButton variant="outlined" onClick={submitLearnAlone}>
          Continue
        </SubmitButton>
      </StyledBox>
      <StyledBox border="2px solid #12125c" direction="column">
        <PeopleAltIcon className={classes.icon} style={{ color: '#101658' }} />
        <Typography className={classes.heading} color="#101658">
          {company
            ? `Invite colleagues to join the ${company.name}'s Sphere`
            : 'Learn with your colleagues'}
        </Typography>
        <Typography className={classes.text}>
          Learning and applying concepts with friends and peers keeps people motivated and
          accountable.{' '}
          {account && company
            ? `Additionally, your colleagues may be covered by ${company?.name}’s enterprise package.`
            : 'Additionally, inviting your colleagues makes you and your company eligible for enterprise discounts.'}
        </Typography>
        <SubmitButton variant="contained" onClick={submitInviteColleagues}>
          Invite Colleagues
        </SubmitButton>
      </StyledBox>
    </Stack>
  );
}

export default InviteChoice;
