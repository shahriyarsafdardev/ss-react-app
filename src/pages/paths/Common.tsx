import { Box, styled, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  courseTile: {
    height: '235px',
    width: '320px',
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: '8px',
    position: 'relative',
    padding: '20px 20px 16px',
    cursor: 'pointer',
    justifyContent: 'space-between',
    overflow: 'hidden',
    transition: theme.transitions.create('opacity')
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
  },
  courseDetailsHeading: {
    fontSize: '38px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '24px'
    }
  },
  tileGradient: {
    '&:before': { left: -1 },
    '&:before, &:after': {
      top: 0,
      zIndex: 9,
      content: "''",
      height: '100%',
      position: 'absolute',
      width: 65,
      backgroundImage: (theme) => 'linear-gradient(to right, #12125C 15%, rgba(18, 18, 92, 0) 85%);'
    },
    '&:after': { right: -2, transform: 'scaleX(-1)' }
  }
}));

export const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '35%',
  left: '45%',
  [theme.breakpoints.down('md')]: {
    top: '40%',
    left: '43%'
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
