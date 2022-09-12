import { Stack, Button, Box, Checkbox, Typography, Theme } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Icon } from '@iconify/react';
import linkExternal from '@iconify/icons-bx/link-external';

const useStyles = makeStyles((theme: Theme) => ({
  parentBox: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#E2E8F0',
    width: '95%',
    padding: '10px'
  },
  openButton: {
    padding: '0 30px',
    borderRadius: '0px'
  },
  checkedBox: {
    backgroundColor: '#E2E8F0'
  },
  unCheckedBox: {
    backgroundColor: 'white',
    boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)'
  }
}));

function ResourceCode({
  checked,
  title,
  openLink
}: {
  checked: boolean;
  title: string;
  openLink: string;
}) {
  const classes = useStyles();

  return (
    <Stack flexDirection="row" marginTop="10px">
      <Box
        className={`${classes.parentBox} ${checked ? classes.checkedBox : classes.unCheckedBox}`}
      >
        <Checkbox checked={checked} />
        <Typography variant="subtitle1">{title}</Typography>
      </Box>
      {openLink !== '' && (
        <Button className={classes.openButton} variant="contained" href={openLink}>
          Open
          <Icon icon={linkExternal} style={{ marginLeft: '5px', width: '24px', height: '24px' }} />
        </Button>
      )}
    </Stack>
  );
}

export default ResourceCode;
