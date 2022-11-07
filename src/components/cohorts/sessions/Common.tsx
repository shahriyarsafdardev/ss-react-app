import { Typography, Card } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { StyledCheckBox, StyledText } from '../home/MarkCheckbox';

export const StyledShareModal = styled(Card)(() => ({
  height: '600px',
  padding: '40px',
  display: 'flex',
  alignItems: 'flex-end'
}));

export const StyledTypography = styled(Typography)(() => ({
  fontSize: '22px'
}));

export const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: 130,
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export function ShareReading({
  onShare,
  ontriggerShareEvent
}: {
  onShare: Function;
  ontriggerShareEvent: Function;
}) {
  return (
    <StyledCheckBox
      onClick={() => {
        onShare(true);
        ontriggerShareEvent('Sessions Page - Resources - "Share" Selected');
      }}
      style={{ justifyContent: 'center' }}
    >
      <img
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/share_icon.svg"
        alt="share"
        style={{ marginBottom: '5px' }}
      />
      <StyledText>Share</StyledText>
    </StyledCheckBox>
  );
}
