import { motion, AnimatePresence } from 'framer-motion';
// material
import { Box } from '@material-ui/core';
import Modal from 'react-modal';
//
import { varFadeInUp } from './variants';

// ----------------------------------------------------------------------

interface ModalAnimateProps {
  animate?: object;
  onClose?: VoidFunction;
  open: boolean;
  children: React.ReactNode | React.ReactNode[];
  id: string;
}

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    background: 'none',
    border: 'none',
    padding: 0,
    borderRadius: 0,
    width: '50%'
  },
  overlay: {
    background: 'linear-gradient(75deg, rgba(22, 28, 36, 0.48) 0%, rgb(22, 28, 36) 100%)',
    zIndex: 1300
  }
};

export default function ModalAnimate({
  open = false,
  animate,
  onClose,
  children,
  id
}: ModalAnimateProps) {
  return (
    <AnimatePresence>
      {open && (
        <Modal isOpen={open} onRequestClose={onClose} style={customStyles}>
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
            <Box id={id}>{children}</Box>
          </Box>
        </Modal>
      )}
    </AnimatePresence>
  );
}
