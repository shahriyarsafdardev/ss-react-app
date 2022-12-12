import react, { useState } from 'react';
import { Container, styled, Stack, Typography, Button } from '@material-ui/core';
import OffboardingModal from './OffboardingModal';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '30px',
  width: '30%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export default function OffboardingPage() {
  const [modal, setModal] = useState(false);
  return (
    <Container
      sx={{
        background: 'linear-gradient(135.12deg, #6A2E9C 0.07%, #0D0217 100.02%)',
        height: '100%',
        textAlign: 'center'
      }}
    >
      <OffboardingModal modalState={modal} />
      <Stack spacing={3} sx={{ padding: '100px' }}>
        <Typography variant="h3" sx={{ color: '#fff', fontSize: '28px !important' }}>
          Congratulations, you have completed Applied Causal Inference! 🎉
        </Typography>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center">
          <StyledButton
            variant="contained"
            sx={{ color: '#101658', backgroundColor: '#fff' }}
            onClick={() => setModal(!modal)}
          >
            Download and share
          </StyledButton>
          <StyledButton variant="outlined" sx={{ color: '#fff !important' }}>
            Share feedback
          </StyledButton>
        </Stack>
      </Stack>
    </Container>
  );
}
