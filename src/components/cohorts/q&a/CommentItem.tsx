// material
import { styled } from '@material-ui/core/styles';

import {
  Avatar,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemProps
} from '@material-ui/core';
// utils
import { fDate } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

interface CommentItemProps extends ListItemProps {
  name: string;
  avatarUrl?: string;
  message: string;
  postedAt: Date;
  image: string;
}

const StyledPreview = styled('img')(({ theme }) => ({
  marginLeft: '70px',
  width: '150px',
  height: '150px',
  borderRadius: '14.5691px',
  objectFit: 'cover',
  marginBottom: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '192px',
    height: '157px'
  }
}));

export default function CommentItem({
  name,
  avatarUrl,
  message,
  image,
  postedAt
}: CommentItemProps) {
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          pt: 3
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled'
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                {message}
              </Typography>
            </>
          }
        />
      </ListItem>
      {image && <StyledPreview src={image} />}
      <Divider
        style={{ marginBottom: 3 }}
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`
        }}
      />
    </>
  );
}
