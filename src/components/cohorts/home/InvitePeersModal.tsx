import { Stack, styled, Card, Typography } from '@material-ui/core';
import Modal from 'components/animate/Modal';
import InviteTeamForm from './InviteTeamForm';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: '600px',
  width: '100%',
  margin: 'auto',
  borderRadius: '16px',
  border: '1px solid #E2E8F0',
  position: 'relative',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    height: 'auto'
  }
}));

const InvitationMessage = styled(Stack)(({ theme }) => ({
  backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome_background.png')`,
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
  backgroundPosition: 'right',
  padding: '60px 100px',
  alignItems: 'center',
  justifyContent: 'center',
  width: '45%',
  borderRadius: '16px',
  [theme.breakpoints.down('md')]: {
    padding: '20px',
    width: '100%',
    backgroundImage: `url('https://sphere-public.s3.eu-west-2.amazonaws.com/welcome-bg-mbl.png')`,
    backgroundSize: '100%',
    backgroundPosition: 'top center',
    flexDirection: 'column',
    height: 'auto'
  }
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '15px',
  color: '#ffffff',
  textAlign: 'center'
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '250px',
  height: '150px'
}));

export default function InvitePeersModal({
  invitePeersModalState,
  setInvitePeersModalState,
  onFinish
}: {
  invitePeersModalState: boolean;
  setInvitePeersModalState: Function;
  onFinish: Function;
}) {
  return (
    <Modal
      open={invitePeersModalState}
      onClose={() => {
        setInvitePeersModalState(false);
      }}
      id="student-modal"
    >
      <Card>
        <StyledStack>
          <InvitationMessage spacing={2}>
            <StyledImage
              src="https://sphere-public.s3.eu-west-2.amazonaws.com/invitation-box.png"
              alt="invitation image"
            />
            <Stack spacing={2}>
              <StyledTypography variant="h3">Upskill your team</StyledTypography>
              <StyledTypography>
                Please fill in a few details so [Instructor] and your peers will know who you are.
                You can always edit these later under your profile.
              </StyledTypography>
            </Stack>
          </InvitationMessage>
          <InviteTeamForm handleSubmit={onFinish} />
        </StyledStack>
      </Card>
    </Modal>
  );
}
