import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack5';
import { useRef, useState } from 'react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import roundPeople from '@iconify/icons-ic/baseline-people';

import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { resetStore } from 'redux/rootReducer';
// material
import { alpha } from '@material-ui/core/styles';
import { Button, Box, Divider, MenuItem, Typography } from '@material-ui/core';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { MIconButton } from '../../components/@material-extend';
import MyAvatar from '../../components/MyAvatar';
import MenuPopover from '../../components/MenuPopover';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Settings',
    icon: settings2Fill,
    linkTo: PATH_DASHBOARD.user.account
  },
  {
    label: 'Referrals',
    icon: roundPeople,
    linkTo: PATH_DASHBOARD.user.referrals
  }
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const navigate = useNavigate();
  const anchorRef = useRef(null);
  const { user, logout } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      dispatch(resetStore());
      await logout?.();
      if (isMountedRef.current) {
        navigate('/');
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <>
      <MIconButton
        data-testid="user-icon"
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <MyAvatar />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap data-testid="user-name">
            {user?.displayName}
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: 'text.secondary' }}
            noWrap
            data-testid="user-email"
          >
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => {
          if (option.label === 'Referrals') {
            return (
              user?.type === 'learner' && (
                <MenuItem
                  data-testid="user-setting"
                  key={option.label}
                  id="user-settings"
                  to={option.linkTo}
                  component={RouterLink}
                  onClick={handleClose}
                  sx={{ typography: 'body2', py: 1, px: 2.5 }}
                >
                  <Box
                    component={Icon}
                    icon={option.icon}
                    sx={{
                      mr: 2,
                      width: 24,
                      height: 24
                    }}
                  />

                  {option.label}
                </MenuItem>
              )
            );
          }
          return (
            <MenuItem
              data-testid="user-setting"
              key={option.label}
              id="user-settings"
              to={option.linkTo}
              component={RouterLink}
              onClick={handleClose}
              sx={{ typography: 'body2', py: 1, px: 2.5 }}
            >
              <Box
                component={Icon}
                icon={option.icon}
                sx={{
                  mr: 2,
                  width: 24,
                  height: 24
                }}
              />

              {option.label}
            </MenuItem>
          );
        })}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
