import { Box, Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

export const ResourceBox = styled(Box)(({ theme }) => ({
  width: '50%',
  overflow: 'hidden',
  backgroundColor: 'white',
  boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
  borderRadius: '16px',
  display: 'flex',
  gap: '32px',
  margin: '32px 0px',
  alignItems: 'strech',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'column-reverse'
  }
}));

export const ImageBox = styled(Box)(({ theme }) => ({
  width: '40%',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const DetailsBox = styled(Box)(({ theme }) => ({
  width: '60%',
  padding: '24px',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

export const OpenButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '24px',
  borderRadius: '20px',
  padding: '6px 60px',
  [theme.breakpoints.down('md')]: {
    position: 'inherit',
    bottom: '0px',
    marginTop: '20px'
  }
}));

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
  return (
    <ResourceBox>
      <DetailsBox>
        <Typography variant="h4">{heading}</Typography>
        <Typography style={{ marginTop: '20px' }}>{detail}</Typography>
        <OpenButton href={onOpenUrl} variant="contained" color="primary" data-testid="open-btn">
          Open
        </OpenButton>
      </DetailsBox>
      <ImageBox>
        <img src={imageUrl} alt="session-prereading-img" width="100%" />
      </ImageBox>
    </ResourceBox>
  );
}

export default ResourceCard;
