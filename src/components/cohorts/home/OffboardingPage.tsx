import react, { useState, useEffect } from 'react';
import { Stack, Typography } from '@material-ui/core';
import ReactConfetti from 'react-confetti';
import OffboardingModal from './OffboardingModal';
import OffboardingCarousel from './OffboardingCarousel';
import { StyledButton, StyledBox, OffboardingHeader } from './Common';

export default function OffboardingPage() {
  const [modal, setModal] = useState(false);
  const [activeImage, setActiveImage] = useState('certificate4');
  const [images, setImages] = useState(['certificate1', 'certificate2', 'certificate3']);
  const [displayConfetti, setDisplayConfetti] = useState(true);
  const [confetti, setConfetti] = useState(200);

  useEffect(() => {
    setTimeout(() => {
      setConfetti(0);
    }, 3000);
  }, []);

  return (
    <StyledBox>
      {displayConfetti && (
        <ReactConfetti
          numberOfPieces={confetti}
          colors={['#12125C', '#475569', '#000000', '#071A33']}
          onConfettiComplete={(confetti: any) => {
            setDisplayConfetti(false);
          }}
        />
      )}
      <OffboardingModal modalState={modal} setModalState={setModal} />
      <Stack
        spacing={3}
        justifyContent="center"
        alignItems="center"
        width="100%"
        sx={{ maxWidth: '1200px', p: { md: '50px', sm: '25px', xs: '16px' } }}
      >
        <OffboardingHeader variant="h3">
          Congratulations, you have completed Applied Causal Inference! 🎉
        </OffboardingHeader>

        <OffboardingCarousel
          activeImage={activeImage}
          setActiveImage={setActiveImage}
          images={images}
          setImages={setImages}
        />
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          width="100%"
          justifyContent="center"
          sx={{ maxWidth: '1200px' }}
        >
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
    </StyledBox>
  );
}
