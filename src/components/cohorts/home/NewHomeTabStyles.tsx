import { Box, Button, Stack, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';

export const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  padding: '24px',
  borderRadius: '16px',
  display: 'flex',
  gap: '32px',
  margin: '32px 0px',
  alignItems: 'strech',
  [theme.breakpoints.down('md')]: {
    flexWrap: 'wrap'
  }
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: '50%',
  borderRadius: '8px',
  minHeight: '400px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    minHeight: 'auto'
  }
}));

export const DescriptionBox = styled(Box)(({ theme }) => ({
  width: '50%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const PreReadingStack = styled(Stack)(({ theme }) => ({
  width: '50%',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const NavigationStack = styled(Stack)(({ theme }) => ({
  flexDirection: 'row',
  gap: '8px',
  justifyContent: 'center',
  position: 'absolute',
  bottom: 0,
  width: '100%',
  [theme.breakpoints.down('md')]: {
    position: 'inherit',
    paddingTop: '24px',
    flexWrap: 'wrap'
  }
}));

export const HomePageTitle = styled(Typography)(({ theme }) => ({
  color: '#334155',
  fontWeight: 'bold',
  fontSize: '32px',
  marginBottom: '24px',
  [theme.breakpoints.down('md')]: {
    fontSize: '28px'
  }
}));

export const PreReadingTitle = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: '24px',
  lineHeight: '130%',
  color: '#475569'
}));

export const PreReadingDetail = styled(Typography)(() => ({
  fontWeight: 'normal',
  fontSize: 16,
  lineHeight: '24px',
  marginTop: '12px',
  color: '#64748B'
}));

export const PreReadingDescription = styled(Typography)(({ theme }) => ({
  fontWeight: 'normal',
  fontSize: 18,
  lineHeight: '27px',
  marginTop: '24px',
  color: '#000000',
  marginBottom: '100px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '24px'
  }
}));

export const SessionDescriptionBox = styled(Box)(() => ({
  fontWeight: 'normal',
  fontSize: 18,
  lineHeight: '27px',
  marginTop: '24px',
  color: '#000000',
  ul: {
    paddingLeft: '30px'
  }
}));

export const SessionDescription = ({ innerContent }: { innerContent: string }) => (
  <SessionDescriptionBox dangerouslySetInnerHTML={{ __html: innerContent }} />
);

export const NavigationButton = styled(Button)(({ theme }) => ({
  width: '50%',
  borderRadius: '1000px',
  padding: '13px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 4,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: '#E2E8F0',
    span: {
      backgroundColor: '#147A16'
    }
  }
}));
