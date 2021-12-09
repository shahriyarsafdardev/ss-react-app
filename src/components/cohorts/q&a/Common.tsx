import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import cancel from '@iconify/icons-ic/cancel';
import CheckCircle from '@iconify/icons-ic/check-circle';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// material
import { styled } from '@material-ui/core/styles';

import { Box, MenuItem, CircularProgress, IconButton } from '@material-ui/core';
import MenuPopover from '../../MenuPopover';

export const SectionContainer = styled('div')(({ theme }) => ({
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  padding: '20px',
  '&.newQuestion': {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  '&.filters': {
    height: '250px',
    marginTop: '20px'
  },
  '&.about': {
    height: '340px'
  }
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '20%'
}));

export const CircularLoader = () => (
  <StyledCircularLoader>
    <CircularProgress />
  </StyledCircularLoader>
);

export const DeleteOption = ({
  handleDelete,
  handleSkipQuestion
}: {
  handleDelete: Function;
  handleSkipQuestion: Function;
}) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <Box>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleOpen}
        ref={menuRef}
      >
        <MoreVertIcon />
      </IconButton>
      <MenuPopover
        open={open}
        anchorEl={menuRef.current}
        onClose={() => {
          setOpen(false);
        }}
        sx={{ width: 200 }}
      >
        <MenuItem
          id="comment-settings"
          onClick={() => handleDelete()}
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={cancel}
            sx={{
              mr: 2,
              width: 24,
              height: 24
            }}
          />
          Delete
        </MenuItem>
        <MenuItem
          id="comment-settings"
          onClick={() => handleSkipQuestion()}
          sx={{ typography: 'body2', py: 1, px: 2.5 }}
        >
          <Box
            component={Icon}
            icon={CheckCircle}
            sx={{
              mr: 2,
              width: 24,
              height: 24
            }}
          />
          Mark as answered
        </MenuItem>
      </MenuPopover>
    </Box>
  );
};
