import { Stack, styled, Card, Typography, Button, CircularProgress, Box } from '@material-ui/core';
import Modal from 'components/animate/Modal';
import axios from 'utils/axios';
import { useState } from 'react';
import useAuth from 'hooks/useAuth';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: '600px',
  width: '100%',
  position: 'relative',
  margin: 'auto',
  justifyContent: 'space-between',
  borderRadius: '16px',
  flexDirection: 'row',
  [theme.breakpoints.down(1100)]: {
    height: 'auto'
  }
}));

const InvitationMessage = styled(Stack)(({ theme }) => ({
  background: 'linear-gradient(163.43deg, #9E5AD7 11.47%, #29064C 91.06%)',
  padding: '100px 60px 100px 0px',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  [theme.breakpoints.down('lg')]: {
    padding: '0px 30px 0px 0px'
  },
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const TextContainer = styled(Stack)(({ theme }) => ({
  width: '57%',
  [theme.breakpoints.down('lg')]: {
    padding: '97px 67px',
    width: '100%'
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '32px',
  color: '#101658',
  textAlign: 'left',
  lineHeight: '38px',
  fontWeight: 'bold',
  [theme.breakpoints.down('md')]: {
    fontSize: '26px'
  }
}));

const StyledDescription = styled('div')(({ theme }) => ({
  fontSize: '16px',
  textAlign: 'left',
  color: theme.palette.text.secondary
}));

const StyledButton = styled(Button)(({ theme }) => ({
  height: '48px',
  borderRadius: '50px',
  fontSize: '18px',
  [theme.breakpoints.down(1200)]: {
    padding: '10px'
  }
}));

const StyledImage = styled(LazyLoadImage)(({ theme }) => ({
  width: '350px'
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20%'
}));

export default function ZoomAppAnnouncement({ openModal }: { openModal: boolean }) {
  const [open, setOpen] = useState(true);
  const { user, updateProfile } = useAuth();
  const newUser: any = { ...user };
  const [loading, setLoading] = useState(false);

  const announcementViewed = () => {
    setLoading(true);
    if (user && !user.opened_announcement) {
      axios.post('/users/opened_announcement.json').then(() => {
        setLoading(false);
        updateProfile({ ...newUser, opened_announcement: true });
      });
    } else {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        announcementViewed();
      }}
      id="student-modal"
    >
      {loading ? (
        <StyledCircularLoader>
          <CircularProgress />
        </StyledCircularLoader>
      ) : (
        <Card>
          <StyledStack>
            <InvitationMessage spacing={2}>
              <StyledImage
                src="https://sphere-public.s3.eu-west-2.amazonaws.com/zoom-app-announcement-sidebar.png"
                alt="invitation image"
              />
            </InvitationMessage>
            <Stack spacing={3} alignItems="center" justifyContent="center">
              <TextContainer spacing={4}>
                <StyledTypography>
                  Next-level notetaking with the new Sphere Zoom App 📝
                </StyledTypography>
                <StyledDescription>
                  Save timestamps and notes during your next live session using Sphere’s new Zoom
                  app!
                </StyledDescription>
                <Stack>
                  <StyledDescription>
                    After each session, your timestamps can be found in the Recordings & Slides tab
                    where you can:
                  </StyledDescription>
                  <StyledDescription>
                    <ul style={{ marginLeft: '25px' }}>
                      <li>
                        Use them to return to parts of the session recordings that you would like to
                        review
                      </li>
                      <li>Review notes you took during the session</li>
                      <li>Edit or add notes after the fact</li>
                    </ul>
                  </StyledDescription>
                </Stack>
                <StyledButton
                  variant="contained"
                  onClick={() =>
                    window.open(
                      'https://drive.google.com/file/d/1pNXGlh2UOy_0y-t6N6upyRz_fQoHPwjO/view?usp=sharing',
                      '_blank'
                    )
                  }
                >
                  Learn More
                </StyledButton>
              </TextContainer>
            </Stack>
          </StyledStack>
        </Card>
      )}
    </Modal>
  );
}
