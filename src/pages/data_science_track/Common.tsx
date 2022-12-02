import { Box, styled, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  courseTile: {
    height: '225px',
    width: '300px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '8px',
    position: 'relative',
    padding: '20px 20px 16px',
    cursor: 'pointer',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  font15: {
    fontSize: '15px',
    fontWeight: 500
  },
  font13: {
    fontSize: '13px',
    fontWeight: 300
  },
  instructorAvatar: {
    width: 56,
    height: 56,
    alignSelf: 'flex-end',
    [theme.breakpoints.down('sm')]: {
      alignSelf: 'center'
    }
  }
}));

export const SessionSummaryBox = styled(Box)(() => ({
  fontWeight: 'normal',
  fontSize: 15,
  lineHeight: '27px',
  marginTop: '24px',
  ul: {
    paddingLeft: '30px'
  }
}));

export const SessionSummary = ({ innerContent }: { innerContent: string }) => (
  <SessionSummaryBox dangerouslySetInnerHTML={{ __html: innerContent }} />
);
