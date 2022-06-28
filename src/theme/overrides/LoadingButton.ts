import { Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
          '&:hover': {
            backgroundColor: '#5A189A'
          }
        },
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        root: {
          '&:hover': {
            backgroundColor: '#5A189A',
            opacity: 0.9
          },
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0
            }
          }
        }
      }
    }
  };
}
