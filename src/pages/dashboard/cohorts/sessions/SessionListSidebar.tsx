import { useEffect, useState, memo } from 'react';
import { Tooltip } from '@material-ui/core';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import options2Fill from '@iconify/icons-eva/options-2-fill';
import SessionList from './SessionList';
import { SessionListItem } from '../../../../@types/cohorts';
import {
  StyledSettingsBox,
  StyledIconButton,
  SessionListMobileConatiner,
  StyledPaper,
  TooltipContainer,
  StyledScrollBar,
  StyledBackdrop
} from './Common';

type SessionListSidebarProps = {
  sessionsList: SessionListItem[];
  setSelectedSession: Function;
  selectedSession: number;
};

const SessionListSidebar = ({
  setSelectedSession,
  selectedSession,
  sessionsList
}: SessionListSidebarProps) => {
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
};

export default memo(SessionListSidebar);
