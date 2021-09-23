import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StepsCompletedContainer = styled(Box)(() => ({
  marginTop: '1.5rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: 'calc(100vh - 160px)'
}));

const Container = styled(Box)(() => ({
  textAlign: 'center'
}));

const ImageContainer = styled(Box)(() => ({
  position: 'relative',
  marginBottom: '1.5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const ImageBackground = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 16,
  background: '#4D4DCD',
  mixBlendMode: 'normal',
  opacity: 0.08,
  borderRadius: 32,
  width: 64,
  height: 64,
  margin: '0 auto'
}));

const StyledStepsCompleted = styled(Typography)(() => ({
  fontWeight: 600,
  marginBottom: 8
}));

const StyledDescription = styled(Typography)(() => ({
  color: '#6C7885'
}));

export default function StepsCompleted() {
  return (
    <StepsCompletedContainer>
      <Container>
        <ImageContainer>
          <ImageBackground />
          <img
            src="/static/cohorts-home/tick.svg"
            alt="step-done"
            style={{ position: 'absolute' }}
          />
        </ImageContainer>
        <StyledStepsCompleted>All steps completed</StyledStepsCompleted>
        <StyledDescription>
          You have completed all the initial steps on the plataform!
        </StyledDescription>
      </Container>
    </StepsCompletedContainer>
  );
}
