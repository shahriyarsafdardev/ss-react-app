// material
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
}

export default function CommentItem({ name, avatarUrl, message, postedAt }: CommentItemProps) {
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3
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
      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`
        }}
      />
    </>
  );
}
