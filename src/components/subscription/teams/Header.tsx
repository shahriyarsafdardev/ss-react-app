import { Box, Stack, Typography } from '@material-ui/core';
import { StyledStack, StyledTypography } from './Common';

export default function Header({
  activeStep,
  isSinglePayee,
  cohortID
}: {
  activeStep: number;
  isSinglePayee: boolean;
  cohortID: string;
}) {
  const selectHeadings = () => {
    if (activeStep === 1) {
      return ['Onboard your team', ''];
    }
    if (activeStep === 2) {
      return isSinglePayee
        ? ['Please add your team member', '']
        : ['Please invite your team members:', 'They will be asked to pay individually'];
    }
    if (activeStep === 3 && !isSinglePayee && cohortID === '') {
      return ['Log in to the Business Portal to track your team member’s status & onboarding', ''];
    }
    if (activeStep === 4) {
      return ['Log in to the Business Portal to track your team’s onboarding', ''];
    }
    return ['', ''];
  };

  return (
    <StyledStack>
      <Stack
        direction={{ xs: 'column' }}
        width={{ xs: '100%', md: '70%' }}
        spacing={2}
        sx={{ justifyContent: 'center', alignItems: 'center' }}
      >
        <Typography
          variant="h3"
          align="center"
          paragraph
          data-testid="thankyou-message"
          style={{ marginBottom: '0px' }}
        >
          {selectHeadings()[0]}
        </Typography>
        <Box sx={{ mb: 5, textAlign: 'center' }}>
          <StyledTypography
            align="center"
            sx={{ color: 'text.secondary' }}
            data-testid="refund-alert"
            variant="h6"
          >
            {selectHeadings()[1]}
          </StyledTypography>
        </Box>
      </Stack>
    </StyledStack>
  );
}
