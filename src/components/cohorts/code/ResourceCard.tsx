import { Button, Typography } from '@material-ui/core';
import { DetailsBox, ImageBox, ResourceBox, useStyles } from './Common';

function ResourceCard({
  heading,
  detail,
  imageUrl,
  onOpenUrl
}: {
  heading: string;
  detail: string;
  imageUrl: string;
  onOpenUrl: string;
}) {
  const classes = useStyles();
  return (
    <ResourceBox>
      <DetailsBox>
        <Typography variant="h4">{heading}</Typography>
        <Typography style={{ marginTop: '20px' }}>{detail}</Typography>
        <Button
          variant="contained"
          color="primary"
          href={onOpenUrl}
          target="_blank"
          className={classes.openItemLink}
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
