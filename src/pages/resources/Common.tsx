import { styled, Box, Theme, Stack, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Icon } from '@iconify/react';
import baselineContentCopy from '@iconify/icons-ic/baseline-content-copy';
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';
import { LoadingButton } from '@material-ui/lab';

export const LoadingContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '45%'
}));

export const useStyles = makeStyles((theme: Theme) => ({
  notebookContainer: {
    padding: '20px 50px !important',
    [theme.breakpoints.down('md')]: {
      padding: '20px !important'
    }
  },
  viewOnlyContainer: {
    padding: '50px !important',
    [theme.breakpoints.down('md')]: {
      padding: '20px !important',
      paddingTop: '60px !important'
    }
  },
  viewOnlyBanner: {
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 92,
    backdropFilter: 'blur(6px)',
    backgroundColor: 'rgba(255, 255, 255, 0.72)',
    width: '80%',
    padding: '0px 50px',
    maxWidth: '1200px',
    zIndex: 100,
    [theme.breakpoints.down('lg')]: {
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      padding: '0px 10px',
      width: '100%',
      top: 58
    }
  }
}));

export const ViewOnlyBanner = ({
  isCopying,
  handleCopyNotebook
}: {
  isCopying: boolean;
  handleCopyNotebook: Function;
}) => {
  const classes = useStyles();
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} className={classes.viewOnlyBanner}>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <Icon icon={baselineRemoveRedEye} width={20} height={20} style={{ marginRight: '8px' }} />
        <Typography>You are viewing this notebook</Typography>
      </Stack>
      <LoadingButton
        variant="contained"
        sx={{ borderRadius: '30px', textTransform: 'none' }}
        onClick={() => handleCopyNotebook()}
        loading={isCopying}
      >
        <Icon icon={baselineContentCopy} width={20} height={20} style={{ marginRight: '8px' }} />
        Copy notebook to your library to edit
      </LoadingButton>
    </Stack>
  );
};
