import { useEffect, useState } from 'react';
import { Backdrop, Paper, Tooltip, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import options2Fill from '@iconify/icons-eva/options-2-fill';

import { styled } from '@material-ui/core/styles';

import Scrollbar from '../../../../components/Scrollbar';
import { MIconButton } from '../../../../components/@material-extend';
import SessionList from './SessionList';
import { SessionListItem } from '../../../../@types/cohorts';

type SessionListSidebarProps = {
  sessionsList: SessionListItem[];
  setSelectedSession: Function;
};

const DRAWER_WIDTH = 260;
const StyledSettingsBox = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const SessionListMobileConatiner = styled(Box)(({ theme }) => ({
  padding: 5
}));

export default function SessionListSidebar({
  setSelectedSession,
  sessionsList
}: SessionListSidebarProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const gotoSession = (session: number) => {
    setSelectedSession(session);
    setOpen(false);
  };

  return (
    <>
      <Backdrop
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      />
      <StyledSettingsBox
        sx={{
          top: 12,
          bottom: 12,
          right: 0,
          position: 'fixed',
          zIndex: 2001,
          ...(open && { right: 12 })
        }}
      >
        <Box
          sx={{
            p: 0.5,
            px: '4px',
            mt: -3,
            left: -44,
            top: '50%',
            color: 'grey.800',
            position: 'absolute',
            bgcolor: 'common.white',
            borderRadius: '24px 0 16px 24px',
            boxShadow: (theme) => theme.customShadows.z12
          }}
        >
          <Tooltip title="Settings">
            <MIconButton
              color="inherit"
              onClick={handleToggle}
              sx={{
                p: 0,
                width: 40,
                height: 40,
                transition: (theme) => theme.transitions.create('all'),
                '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
              }}
            >
              <Icon icon={open ? closeFill : options2Fill} width={20} height={20} />
            </MIconButton>
          </Tooltip>
        </Box>
        <Paper
          sx={{
            height: 1,
            width: '0px',
            overflow: 'hidden',
            boxShadow: (theme) => theme.customShadows.z24,
            transition: (theme) => theme.transitions.create('width'),
            ...(open && { width: DRAWER_WIDTH })
          }}
        >
          <Scrollbar sx={{ height: 1 }}>
            <SessionListMobileConatiner>
              <SessionList onClick={gotoSession} sessionsList={sessionsList} />
            </SessionListMobileConatiner>
          </Scrollbar>
        </Paper>
      </StyledSettingsBox>
    </>
  );
}
