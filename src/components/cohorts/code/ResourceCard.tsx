import { Button, Typography } from '@material-ui/core';
import { CODE_PAGE_EVENTS, trackGenericEvent } from 'utils/amplitude';
import { Cohort } from '../../../@types/cohorts';
import { DetailsBox, ImageBox, ResourceBox, useStyles } from './Common';

function ResourceCard({
  cohort,
  heading,
  detail,
  imageUrl,
  onOpenUrl
}: {
  cohort: Cohort;
  heading: string;
  detail: string;
  imageUrl: string;
  onOpenUrl: string;
}) {
  const classes = useStyles();

  const handleOpenClick = () => {
    trackGenericEvent(cohort, 'Code Page - Opened Resource', {
      [CODE_PAGE_EVENTS.resource_name]: heading
    });
  };

  return (
    <ResourceBox>
      <DetailsBox>
        <Typography variant="h4">{heading}</Typography>
        <Typography style={{ paddingBottom: '35px', marginTop: '20px' }}>{detail}</Typography>
        <Button
          variant="contained"
          color="primary"
          href={onOpenUrl}
          target="_blank"
          className={classes.openItemLink}
          onClick={() => handleOpenClick()}
        >
          Open
        </Button>
      </DetailsBox>
      <ImageBox>
        <img src={imageUrl} alt="session-prereading-img" width="100%" />
      </ImageBox>
    </ResourceBox>
  );
}

export default ResourceCard;
