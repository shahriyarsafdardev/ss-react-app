import { Box } from '@material-ui/core';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import { SectionContainer } from './Common';

const containerStyle = {
  width: '100%',
  height: '200px'
};

const CohortTimeLine = () => {
  const steps = ['step1', 'step2', 'step3', 'step4'];
  return (
    <SectionContainer style={containerStyle}>
      <Box width="100%">
        <Stepper activeStep={1} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>
    </SectionContainer>
  );
};

export default CohortTimeLine;
