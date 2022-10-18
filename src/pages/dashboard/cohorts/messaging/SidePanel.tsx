import { useEffect, useState } from 'react';
import { Backdrop, Paper, Tooltip, Box } from '@material-ui/core';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import bxMessage from '@iconify/icons-bx/bx-message';
import { styled } from '@material-ui/core/styles';

import { ChannelFilters } from 'stream-chat';
import Scrollbar from '../../../../components/Scrollbar';
import { MIconButton } from '../../../../components/@material-extend';
import { ChannelListContainer } from '../../../../components/stream-chat/ChannelListContainer/ChannelListContainer';

type SidePanelProps = {
  props: {
    isCreating: boolean;
    options: Object;
    setCreateType: any;
    setIsCreating: any;
    setIsEditing: any;
    cohortID: string;
    cohortUsers: String[];
    sort: any;
    canTrack: boolean;
    loggedinUserID: string;
  };
};

type ChatMenuProps = {
  theme?: any;
  open: boolean;
};

const DRAWER_WIDTH = 260;
const ChatMenu = styled(Box)(({ theme, open }: ChatMenuProps) => ({
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

const StyledPaper = styled(Paper)(({ theme, open }: ChatMenuProps) => ({
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

export default function SidePanel({ props }: SidePanelProps) {
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

  return (
    <>
      <StyledBackdrop open={open} onClick={handleClose} />
      <ChatMenu open={open}>
        <TooltipContainer>
          <Tooltip title="Chat Menu">
            <StyledIconButton color="inherit" onClick={handleToggle}>
              <Icon icon={open ? closeFill : bxMessage} width={20} height={20} />
            </StyledIconButton>
          </Tooltip>
        </TooltipContainer>
        <StyledPaper open={open}>
          <StyledScrollBar>
            <ChannelListContainer {...props} />
          </StyledScrollBar>
        </StyledPaper>
      </ChatMenu>
    </>
  );
}
