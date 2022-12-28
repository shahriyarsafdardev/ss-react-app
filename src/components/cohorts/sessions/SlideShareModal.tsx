import { Stack, Box } from '@material-ui/core';
import Modal from 'components/animate/Modal';
import { styled } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { StyledShareModal, StyledTypography } from './Common';

const StyledStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '100%',
  alignItems: 'center',
  textAlign: 'center',
  justifyContent: 'space-evenly'
}));

const StyledImage = styled(LazyLoadImage)(({ theme }) => ({
  marginBottom: '3%',
  width: '45%',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export default function SlideShareModal({ open, onClose }: { open: boolean; onClose: Function }) {
  return (
    <Modal open={open} onClose={() => onClose(false)}>
      <StyledShareModal sx={{ padding: '7% 7%' }}>
        <StyledStack spacing={1} direction="column">
          <StyledImage src="https://sphere-public.s3.eu-west-2.amazonaws.com/slides_graphic.png" />
          <StyledTypography style={{ fontWeight: 700 }}>
            Sharing slides is coming soon
          </StyledTypography>
          <StyledTypography style={{ fontWeight: 500, fontSize: '16px' }}>
            We’re not there quite yet but will let you know when this functionality is ready!
          </StyledTypography>
        </StyledStack>
      </StyledShareModal>
    </Modal>
  );
}
