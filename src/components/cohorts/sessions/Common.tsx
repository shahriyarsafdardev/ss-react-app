import { Typography, Card, TableCell } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
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

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
  width: '33%',
  minWidth: '200px',
  [theme.breakpoints.down('md')]: {
    minWidth: '180px'
  }
}));

export const StyledNote = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  lineHeight: '22px',
  color: '#000',
  fontWeight: 700,
  marginBottom: '24px'
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
      <LazyLoadImage
        src="https://sphere-public.s3.eu-west-2.amazonaws.com/share_icon.svg"
        alt="share"
        style={{ marginBottom: '5px' }}
      />
      <StyledText>Share</StyledText>
    </StyledCheckBox>
  );
}
