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
  selectedSession: number;
};

type StyledSettingsBoxProps = {
  theme?: any;
  open: boolean;
};

const DRAWER_WIDTH = 260;
const StyledSettingsBox = styled(Box)(({ theme, open }: StyledSettingsBoxProps) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block',
    top: 12,
    bottom: 12,
    right: 0,
    position: 'fixed',
    zIndex: 2001,
    ...(open && { right: 12 })
  }
}));

const SessionListMobileConatiner = styled(Box)(() => ({
  padding: 5
}));

const TooltipContainer = styled(Box)(({ theme }) => ({
  left: -44,
  top: '50%',
  position: 'absolute',
  backgroundColor: '#fff',
  borderRadius: '24px 0 16px 24px',
  boxShadow: theme.customShadows.z12,
  padding: 4,
  paddingLeft: 4,
  paddingRight: 4,
  marginTop: -24,
  color: '#212B36'
}));

const StyledIconButton = styled(MIconButton)(({ theme }) => ({
  padding: 0,
  width: 40,
  height: 40,
  transition: theme.transitions.create('all'),
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent'
  }
}));

const StyledPaper = styled(Paper)(({ theme, open }: StyledSettingsBoxProps) => ({
  height: '100%',
  width: '0',
  overflow: 'hidden',
  boxShadow: theme.customShadows.z24,
  transition: theme.transitions.create('width'),
  ...(open && { width: DRAWER_WIDTH })
}));

const StyledScrollBar = styled(Scrollbar)(() => ({
  height: '100%'
}));

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1
}));

export default function SessionListSidebar({
  setSelectedSession,
  selectedSession,
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
      <StyledBackdrop open={open} onClick={handleClose} />
      <StyledSettingsBox open={open}>
        <TooltipContainer>
          <Tooltip title="Settings">
            <StyledIconButton color="inherit" onClick={handleToggle}>
              <Icon icon={open ? closeFill : options2Fill} width={20} height={20} />
            </StyledIconButton>
          </Tooltip>
        </TooltipContainer>
        <StyledPaper open={open}>
          <StyledScrollBar>
            <SessionListMobileConatiner>
              <SessionList
                onClick={gotoSession}
                selectedSession={selectedSession}
                sessionsList={sessionsList}
              />
            </SessionListMobileConatiner>
          </StyledScrollBar>
        </StyledPaper>
      </StyledSettingsBox>
    </>
  );
}
