import { Stack, Button, Box, Checkbox, Typography } from '@material-ui/core';
import { Icon } from '@iconify/react';
import linkExternal from '@iconify/icons-bx/link-external';
import { setCodeOnboardingCheckList } from 'redux/slices/cohort';
import { dispatch } from 'redux/store';
import { useStyles } from './Common';

function ResourceCode({
  itemID,
  isCompleted,
  description,
  externalLink,
  isOptional
}: {
  itemID: string;
  isCompleted: boolean;
  description: string;
  externalLink: string;
  isOptional: boolean;
}) {
  const classes = useStyles();
  const cohortID = window.location.pathname.split('/')[2] || '';
  const markCompleted = (itemID: string, value: boolean) => {
    dispatch(setCodeOnboardingCheckList(itemID, value, cohortID));
  };

  return (
    <Stack flexDirection="row" marginTop="10px">
      <Box
        className={`${classes.parentBox} ${
          isCompleted ? classes.checkedBox : classes.unCheckedBox
        } ${isOptional ? classes.ml60 : ''}`}
      >
        <Checkbox
          checked={isCompleted}
          className={classes.checkbox}
          onChange={(event) => markCompleted(itemID, event.target.checked)}
        />
        <Typography variant="subtitle1">{description}</Typography>
      </Box>
      {externalLink && (
        <Button
          className={classes.openButton}
          variant="contained"
          href={externalLink}
          target="_blank"
        >
          Open
          <Icon icon={linkExternal} className={classes.linkIcon} />
        </Button>
      )}
    </Stack>
  );
}

export default ResourceCode;
