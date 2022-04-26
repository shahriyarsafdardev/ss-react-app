import React from 'react';
import { Container, Box, Typography } from '@material-ui/core';
import Page from 'components/Page';
import { styled } from '@material-ui/core/styles';
import { useStyles } from './styles';
import FreeSessionForm from './FreeSessionForm';

function FreeSessionInfo() {
  const classes = useStyles();

  const RootStyle = styled(Page)(({ theme }) => ({
    minHeight: '100%',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }));

  const urlParams = new URLSearchParams(window.location.search);
  const email: string = urlParams.get('email') || '';
  const cohort_id: string = urlParams.get('cohort_id') || '';

  return (
    <RootStyle title="ScholarSite Cohort Registration">
      <Container className={classes.sectionContainer}>
        <Typography variant="h3" align="center" paragraph>
          👋 Nearly there, we just need a few more details
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          Don’t worry, there aren’y any more steps or obligations.
        </Typography>
        <FreeSessionForm email={email} cohort_id={cohort_id} />
      </Container>
    </RootStyle>
  );
}

export default FreeSessionInfo;
