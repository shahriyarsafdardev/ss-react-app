import { styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import useAuth from 'hooks/useAuth';

const ZoomAnnouncement = styled(Typography)(({ theme }) => ({
  color: '#071A33',
  fontWeight: 500,
  fontSize: '14px',
  lineHeight: '16.45px',
  textDecorationLine: 'underline',
  display: 'inline-block',
  marginLeft: '10px'
}));

const Container = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

export default function ZoopAppAnnouncementPopover() {
  const { user, updateProfile } = useAuth();
  const newUser: any = { ...user };

  const displayWalkthrough = () => {
    updateProfile({ ...newUser, opened_announcement: false });
  };

  return (
    <>
      <Container
        onClick={() => {
          displayWalkthrough();
        }}
      >
        <img src="/static/announcement.svg" height="20px" width="20px" />
        <ZoomAnnouncement>New Feature: Timestamps</ZoomAnnouncement>
      </Container>
    </>
  );
}
