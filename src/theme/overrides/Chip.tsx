import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import { Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------
export default function Chip(theme: Theme) {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <Icon icon={closeCircleFill} color="primary" />
      },

      styleOverrides: {
        root: {
          color: theme.palette.primary.main,
          fontWeight: 700,
          backgroundColor: 'rgba(77, 77, 205, 0.16)'
        },
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.primary.main
          }
        },
        outlined: {
          borderColor: theme.palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main
          }
        },
        deleteIcon: {
          '&:hover': {
            fill: '#ee7e62'
          }
        },
        //
        avatarColorInfo: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.info.dark
        },
        avatarColorPrimary: {
          color: theme.palette.primary.main,
          backgroundColor: theme.palette.info.dark
        },
        avatarColorSuccess: {
          color: theme.palette.success.contrastText,
          backgroundColor: theme.palette.success.dark
        },
        avatarColorWarning: {
          color: theme.palette.warning.contrastText,
          backgroundColor: theme.palette.warning.dark
        },
        avatarColorError: {
          color: theme.palette.error.contrastText,
          backgroundColor: theme.palette.error.dark
        }
      }
    }
  };
}
