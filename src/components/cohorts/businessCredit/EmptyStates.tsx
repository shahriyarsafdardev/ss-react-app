import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const MainMessage = styled('p')(({ theme }) => ({
  color: theme.palette.text.primary,
  fontWeight: 700,
  fontSize: '18px',
  [theme.breakpoints.down('md')]: {
    fontSize: '15px'
  }
}));

const SecondaryMessage = styled('p')(({ theme }) => ({
  color: 'theme.palette.text.secondary',
  fontWeight: 400,
  fontsize: '16px',
  [theme.breakpoints.down('md')]: {
    fontSize: '12px'
  }
}));

const BoxContainer = styled(Box)(({ theme }) => ({
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
