import { useEffect, useState } from 'react';
// material
import { Container, Grid, Backdrop, Paper, Tooltip, Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import options2Fill from '@iconify/icons-eva/options-2-fill';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getSessions } from '../../../../redux/slices/cohort';
import { SessionListItem } from '../../../../@types/cohorts';

import Scrollbar from '../../../../components/Scrollbar';
import { MIconButton } from '../../../../components/@material-extend';

// components
import Page from '../../../../components/Page';
import SessionBoard from './SessionBoard';
import SessionList from './SessionList';
// ----------------------------------------------------------------------
const DRAWER_WIDTH = 260;

const SessionsContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const SessionsInnerContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    marginLeft: 0,
    '.MuiGrid-item': {
      paddingLeft: 0
    }
  }
}));

const StyledSettingsBox = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const SessionListDesktopContainer = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const SessionListMobileConatiner = styled(Box)(({ theme }) => ({
  padding: 5
}));

export default function SessionsTab() {
  const dispatch = useDispatch();
  const [selectedSession, setSelectedSession] = useState(0);
  const { sessions } = useSelector((state: RootState) => state.cohort.cohorts[0]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  useEffect(() => {
    dispatch(getSessions('cohort-1'));
  }, [dispatch]);

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

  let trimmedSessionData: SessionListItem[] = [];
  if (sessions && sessions.length) {
    trimmedSessionData = sessions.map((session) => ({
      id: session.id,
      name: session.name,
      datetime: session.datetime,
      length: session.length,
      number: session.number
    }));
  }

  return (
    <Page title="Sessions | Minimal-UI">
      <SessionsContainer>
        <SessionsInnerContainer container sm={12} xs={12} spacing={12}>
          <Grid item md={8} sm={12}>
            <SessionBoard session={sessions && sessions[selectedSession]} />
          </Grid>
          <SessionListDesktopContainer item md={4}>
            <SessionList onClick={setSelectedSession} sessionsList={trimmedSessionData} />
          </SessionListDesktopContainer>
        </SessionsInnerContainer>
      </SessionsContainer>
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
              <SessionList onClick={gotoSession} sessionsList={trimmedSessionData} />
            </SessionListMobileConatiner>
          </Scrollbar>
        </Paper>
      </StyledSettingsBox>
    </Page>
  );
}
