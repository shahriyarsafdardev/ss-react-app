import { Stack } from '@material-ui/core';
import { HeaderStyle, StyledLogo, StyledHeading } from './Common';

export default function Navbar({ activeStep }: { activeStep: number }) {
  const selectHeading = () => {
    if (activeStep === 1) {
      return 'Group Package Plans';
    }
    return 'Team Package Plan';
  };
  return (
    <HeaderStyle>
      <StyledLogo
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/sphere_blue.svg"
        alt="logo"
      />
      <Stack spacing={2} direction="row" sx={{ justifyContent: 'center' }} width="100%">
        <StyledHeading>{selectHeading()}</StyledHeading>
      </Stack>
    </HeaderStyle>
  );
}
