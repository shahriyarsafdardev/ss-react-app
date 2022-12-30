import { Theme, styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) => ({
  sectionContainer: {
    display: 'flex',
    marginTop: '20px',
    justifyContent: 'space-between',
    marginBottom: '40px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  },
  sectionCard: {
    padding: '24px',
    [theme.breakpoints.down('md')]: {
      marginTop: '20px',
      padding: '24px 10px'
    }
  },
  width50: {
    width: '49%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  mt20: {
    marginTop: '20px'
  },
  creditsModal: {
    width: '50% !important',
    margin: 'auto'
  },
  yearLine: {
    color: '#C4C4C4',
    borderBottom: '1px solid #E3E7EA',
    fontSize: '16px'
  },
  rowContainer: {
    marginTop: '15px',
    height: '50vh',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
    '&::-webkit-scrollbar-thumb': { display: 'none' },
    [theme.breakpoints.down('md')]: {
      height: 'auto',
      maxHeight: '400px'
    }
  },
  upcomingContainer: {
    marginTop: '10px',
    height: '100%',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': { display: 'none' },
    '&::-webkit-scrollbar-thumb': { display: 'none' }
  },
  dateBox: {
    height: 'fit-content',
    backgroundColor: 'rgba(77, 77, 205, 0.05)',
    textAlign: 'center',
    fontSize: '12px !important',
    lineHeight: '17px !important',
    padding: '10px',
    borderRadius: '8px',
    '&>p': {
      color: '#70767C',
      fontWeight: 300,
      textTransform: 'uppercase',

      '&:first-child': {
        fontWeight: 600
      }
    }
  },
  historyRow: {
    display: 'flex',
    padding: '15px 0',
    borderBottom: '1px solid #E3E7EA'
  },
  textSmall: {
    paddingBottom: '2px',
    fontSize: '14px',
    color: '#919EAB',
    fontWeight: 400,
    '& > span': {
      color: '#565455',
      fontWeight: 600
    },
    '& > a': {
      color: '#919EAB'
    }
  },
  notificationText: {
    height: '25px',
    backgroundColor: 'rgba(77, 77, 205, 0.05)',
    color: theme.palette.primary.main,
    padding: '5px 10px',
    borderRadius: '4px',
    fontWeight: 600
  },
  approveBtn: {
    display: 'flex',
    padding: '13px 0 0 0',
    justifyContent: 'center'
  },
  buttonIcon: {
    marginRight: 5,
    width: 24,
    height: 24,
    cursor: 'pointer'
  },
  boxTwo: {
    backgroundColor: 'rgba(77, 77, 205, 0.02)',
    padding: '10px 20px',
    marginBottom: '10px'
  },
  invoiceLink: {
    marginLeft: 'auto',
    textDecoration: 'none',
    fontSize: '14px'
  }
}));

export const MainMessage = styled('p')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: '18px',
  [theme.breakpoints.down('md')]: {
    fontSize: '15px'
  }
}));

export const SecondaryMessage = styled('p')(({ theme }) => ({
  color: 'theme.palette.text.secondary',
  fontWeight: 400,
  fontsize: '16px',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px'
  }
}));

export const BoxContainer = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  '&.enrollments': {
    margin: '80px 30px',
    [theme.breakpoints.down('md')]: {
      margin: '30px'
    }
  },
  '&.history': {
    margin: '10px 30px'
  }
}));

export const StyledIcon = styled('img')(() => ({
  marginRight: 5,
  width: 20,
  height: 21,
  cursor: 'pointer'
}));

export const EmptyStateNewEnrollments = () => (
  <BoxContainer className="enrollments">
    <img
      data-testid="Empty-enrollments"
      src="/static/business-empty-states/enrollments.svg"
      style={{ padding: '30px 30px' }}
      alt="empty-state"
    />
    <MainMessage>No enrollments waiting for approval</MainMessage>
    <SecondaryMessage>New enrollments are listed here for approval</SecondaryMessage>
  </BoxContainer>
);

export const EmptyStateHistory = () => (
  <BoxContainer className="history">
    <img
      data-testid="Empty-history"
      src="/static/business-empty-states/history.svg"
      style={{ padding: '30px 30px' }}
      alt="empty-state"
    />
    <MainMessage>No history to show yet</MainMessage>
    <SecondaryMessage>As soon as any transaction happens, data will be shown</SecondaryMessage>
  </BoxContainer>
);
