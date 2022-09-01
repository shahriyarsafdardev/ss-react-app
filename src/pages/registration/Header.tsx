import React from 'react';
import { Box, Stack, Typography, Avatar } from '@material-ui/core';
import { styled, Theme } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { CohortType, CompanyType } from './Registration';

const useStyles = makeStyles((theme: Theme) => ({
  fullLength: {
    width: '100%'
  },
  halfLength: {
    width: '70%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  marginBottom: '40px',
  padding: '16px',
  [theme.breakpoints.down('md')]: {
    margin: '40px 0px'
  }
}));

const BlueText = styled('span')(() => ({
  color: '#7474d0'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  margin: 'auto',
  [theme.breakpoints.down('md')]: {
    marginBottom: '10px'
  }
}));

const RONNY_COHORT_ID = '7a6133fe-7183-4f5b-a6ba-fc533a1bc457';

export default function Header({
  company,
  account,
  activeStep,
  waitlist,
  preRelease,
  userName,
  cohort
}: {
  company: CompanyType | null | undefined;
  account: string;
  activeStep: number;
  waitlist: boolean;
  preRelease: boolean;
  userName: string | undefined;
  cohort: CohortType;
}) {
  const classes = useStyles();

  const selectSubHeading = () => {
    if (company) {
      if (activeStep === 1) {
        let accountSubHeading = '';
        if (cohort?.id !== RONNY_COHORT_ID) {
          accountSubHeading = account
            ? `Please provide us with the information below so we can check with ${company.name} whether you qualify under their enterprise package.`
            : 'Please provide us with the information below so we can get started on your application';
        }
        return [
          `Welcome to ${company.name}’s Sphere`,
          account ? (
            <p>
              {company.name} has an <BlueText>Enterprise Package</BlueText> with Sphere which means
              they may cover the cost of your seat!
            </p>
          ) : (
            `${company.name} has approved Sphere’s live courses as a Learning & Development expense for other employees!`
          ),
          accountSubHeading
        ];
      }

      if (activeStep === 2) {
        return [
          'Learn together as a team',
          account ? (
            <p>
              Invite colleagues to get the most out of Sphere courses -
              <BlueText> {company.name}'s Enterprise Package</BlueText> may cover their seats!
            </p>
          ) : (
            <p>
              Invite colleagues to get the most out of Sphere courses - referring peers makes{' '}
              {company.name} eligible for an <BlueText>Enterprise Package</BlueText> which may cover
              the cost of your seat!
            </p>
          ),
          ''
        ];
      }

      if (activeStep === 3) {
        return [
          'Invite your colleagues',
          'Enter your colleagues email and name and we will send them an exclusive invite to the course.',
          ''
        ];
      }

      if (activeStep === 4) {
        if (cohort?.id === RONNY_COHORT_ID) {
          return [
            '💳 Secure your seat',
            'You can get a full refund up to 72 hours before the date of the first session.',
            ''
          ];
        }
        return [
          preRelease
            ? `💳 Thanks ${userName}, do you want to secure your seat?`
            : 'Secure your seat',
          'You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort',
          ''
        ];
      }
    }
    if (activeStep === 1) {
      if (cohort?.id === RONNY_COHORT_ID) {
        return ['👋 Welcome!', '', 'We just need a few more details from you to secure your seat.'];
      }
      return [
        waitlist || preRelease
          ? '👋 Hi there, to join our waitlist please fill in a few more details'
          : '👋 We just need a few more details to process your application',
        '',
        'We review each application in order to ensure a diverse and experienced cohort!'
      ];
    }

    if (activeStep === 2) {
      return [
        'Learn together as a team',
        <p key="no-enterprise">
          Invite colleagues to get the most out of Sphere courses - referring peers makes your
          company eligible for an <BlueText>Enterprise Package</BlueText> which may cover the cost
          of your seat!
        </p>,
        ''
      ];
    }

    if (activeStep === 3) {
      return [
        'Invite friends and colleagues',
        'Enter your colleagues email and name and we will send them an exclusive invite to the course.',
        ''
      ];
    }

    if (activeStep === 4) {
      if (cohort?.id === RONNY_COHORT_ID) {
        return [
          '💳 Secure your seat',
          'You can get a full refund up to 72 hours before the date of the first session.',
          ''
        ];
      }
      return [
        preRelease
          ? `💳 Thanks ${userName}, do you want to secure your seat?`
          : '💳 Secure your seat',
        'You can get a full refund up to 72 hours before the date of the first session, and will only be charged if you are accepted into the cohort',
        ''
      ];
    }

    return ['', '', ''];
  };

  return (
    <StyledStack>
      {!!company && (
        <Box>
          <Avatar
            alt={company?.name}
            src={company?.image}
            sx={{ width: 95, height: 95, border: '1px solid #64748B' }}
          />
        </Box>
      )}
      <Stack
        direction={{ xs: 'column' }}
        width={{ xs: '100%', md: '70%' }}
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center', marginTop: '24px' }}
      >
        <Typography
          variant="h3"
          align="center"
          paragraph
          data-testid="thankyou-message"
          style={{ marginBottom: '0px' }}
        >
          {selectSubHeading()[0]}
        </Typography>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <StyledTypography
            align="center"
            sx={{ color: 'text.secondary' }}
            data-testid="refund-alert"
            variant="h6"
            className={
              activeStep === 1 && company && !!account ? classes.fullLength : classes.halfLength
            }
          >
            {selectSubHeading()[1]}
          </StyledTypography>
          <Typography
            align="center"
            sx={{ color: 'text.secondary', fontWeight: 'lighter' }}
            data-testid="refund-alert"
            variant="h6"
          >
            {selectSubHeading()[2]}
          </Typography>
        </Box>
      </Stack>
    </StyledStack>
  );
}
