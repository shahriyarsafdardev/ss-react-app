import { Box, styled, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

export const ArrowStyle = styled('img')(({ theme }) => ({
  width: 32,
  height: 32,
  opacity: 0.48,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadiusSm,
  margin: '10px',
  transition: theme.transitions.create('opacity'),
  '&:hover': {
    opacity: 1
  },
  [theme.breakpoints.down('sm')]: {
    position: 'absolute',
    display: 'block',
    zIndex: '11'
  }
}));

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
    transition: theme.transitions.create('opacity'),
    [theme.breakpoints.down('sm')]: {
      height: '225px !important',
      width: '260px !important',
      padding: '20px 10px 16px'
    },
    [theme.breakpoints.down(292)]: {
      height: '200px !important',
      width: '220px !important'
    }
  },
  font15: {
    fontSize: '15px',
    fontWeight: 500,
    [theme.breakpoints.down('sm')]: {
      fontSize: '13px'
    }
  },
  font13: {
    fontSize: '13px',
    fontWeight: 300,
    [theme.breakpoints.down('sm')]: {
      fontSize: '11px'
    }
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
  },
  arrowLeft: {
    [theme.breakpoints.down('sm')]: {
      left: 0
    }
  },
  arrowRight: {
    [theme.breakpoints.down('sm')]: {
      right: 0
    }
  },
  tileHeading: {
    fontSize: '1.2rem',
    [theme.breakpoints.down('md')]: {
      fontSize: '1rem'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px'
    }
  },
  companyLogos: {
    margin: '15px auto 0px auto',
    maxHeight: '30px',
    maxWidth: '250px',
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100% !important'
    }
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
