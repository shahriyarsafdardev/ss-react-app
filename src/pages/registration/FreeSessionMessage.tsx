import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import Page from 'components/Page';
import { styled } from '@material-ui/core/styles';
import { useStyles } from './styles';

function FreeSessionMessage() {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const user_name = urlParams.get('user_name') || '';

  const RootStyle = styled(Page)(({ theme }) => ({
    minHeight: '100%',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }));

  return (
    <RootStyle title="ScholarSite Cohort Registration">
      <Container className={classes.sectionContainer}>
        <Typography variant="h3" align="center" paragraph>
          🎉 Thanks {user_name} you’ll receive an email with your calendar invite shortly
        </Typography>
        <Typography align="center" sx={{ color: 'text.secondary' }}>
          The ScholarSite team & Instructors look forward to meeting you and answering your
          questions!
        </Typography>
        <Button
          href="https://www.scholarsite.io/pages/get-in-touch"
          variant="contained"
          color="primary"
          className={classes.btnContactUs}
        >
          Still have questions? Click here to contact us
        </Button>
      </Container>
    </RootStyle>
  );
}

export default FreeSessionMessage;
