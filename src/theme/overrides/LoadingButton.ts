import { Theme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#4D4DCD',
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
