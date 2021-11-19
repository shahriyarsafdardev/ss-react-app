import { motion, AnimatePresence } from 'framer-motion';
// material
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Modal from 'react-modal';
//
import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------

interface ModalAnimateProps {
  animate?: object;
  onClose?: VoidFunction;
  open: boolean;
  children: React.ReactNode | React.ReactNode[];
  id?: string;
  className?: string;
  zIndex?: number;
}

const customStyles = {
  overlay: {
    background: 'linear-gradient(75deg, rgba(22, 28, 36, 0.48) 0%, rgb(22, 28, 36) 100%)',
    zIndex: 1300,
    overflow: 'auto'
  }
};
const StyledModal = styled(Modal)(({ theme }) => ({
  top: '55%',
  left: '50%',
  right: 'auto',
  bottom: 'auto',
  marginRight: '-50%',
  transform: 'translate(-50%, -55%)',
  background: 'none',
  border: 'none',
  padding: 0,
  borderRadius: 0,
  width: '80%',
  maxHeight: '80vh',
  maxWidth: '1232px',
  position: 'absolute',
  inset: '50% auto auto 50%',
  outline: 'none',
  [theme.breakpoints.down('sm')]: {
    width: '90%'
  },
  '&.small': {
    width: '40%',
    [theme.breakpoints.down('sm')]: {
      width: '90%'
    }
  }
}));
const Cross = styled(Box)(({ theme }) => ({
  background: '#FFFFFF',
  borderRadius: '50%',
  width: 40,
  height: 40,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginBottom: 10,
  marginLeft: 'auto',
  [theme.breakpoints.down('sm')]: {
    dispay: 'flex'
  }
}));
export default function ModalAnimate({
  open = false,
  animate,
  onClose,
  children,
  zIndex,
  id,
  className
}: ModalAnimateProps) {
  return (
    <AnimatePresence>
      {open && (
        <StyledModal
          isOpen={open}
          onRequestClose={onClose}
          className={className}
          style={{
            ...customStyles,
            ...(zIndex && { overlay: { ...customStyles.overlay, zIndex: 1200 } })
          }}
          ariaHideApp={false}
        >
          <Box
            component={motion.div}
            {...(animate || varFadeInUp)}
            sx={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {onClose && (
              <Cross onClick={onClose} data-testid="close-modal">
                <img src="/static/cross.svg" alt="close-modal" />
              </Cross>
            )}
            <Box id={id}>{children}</Box>
          </Box>
        </StyledModal>
      )}
    </AnimatePresence>
  );
}
