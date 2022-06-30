import { Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          },
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0
            }
          }
        },
        sizeLarge: {
          height: 48
        },
        // contained
        containedInherit: {
          color: theme.palette.grey[800],
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            backgroundColor: '#5A189A',
            opacity: 0.8
          }
        },
        containedPrimary: {
          boxShadow: theme.customShadows.primary,
          '&:hover': {
            backgroundColor: '#5A189A',
            opacity: 0.8
          }
        },
        // outlined
        outlinedInherit: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        outlinedPrimary: {
          border: `1px solid ${theme.palette.grey[500_32]}`,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        },
        textInherit: {
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }
      }
    }
  };
}
