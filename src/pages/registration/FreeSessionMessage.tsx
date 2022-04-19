import React from 'react';
import { Container, Typography, Button } from '@material-ui/core';
import Page from 'components/Page';
import { styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { useStyles } from './styles';

function FreeSessionMessage() {
  const classes = useStyles();

  const RootStyle = styled(Page)(({ theme }) => ({
    minHeight: '100%',
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(15),
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
  }));

  const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
    width: 130,
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  }));

  return (
    <RootStyle title="ScholarSite Cohort Registration">
      <Container className={classes.sectionContainer}>
        <Typography className={classes.mainHeading} variant="h4">
          🎉 Thanks ... you’ll recieve an email with your calendar invite shortly
        </Typography>
        <Typography className={classes.subHeading} variant="subtitle2">
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
