import { useSnackbar } from 'notistack5';
import axios from 'utils/axios';
import VisibilitySensor from 'react-visibility-sensor';

// material
import { styled } from '@material-ui/core/styles';

import { Avatar, Paper, Stack, Typography, ListItemProps } from '@material-ui/core';
import { markAsRead } from '../../../redux/slices/notification';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { DeleteOption } from './Common';
// utils
import { fDate } from '../../../utils/formatTime';

interface CommentItemProps extends ListItemProps {
  id: string;
  name: string;
  avatarUrl?: string;
  message: string;
  postedAt: Date;
  image: string;
  admin: boolean;
  removeComment: Function;
}

const StyledPreview = styled('img')(({ theme }) => ({
  width: '150px',
  height: '150px',
  borderRadius: '14.5691px',
  objectFit: 'cover',
  marginTop: '5px',
  [theme.breakpoints.down('sm')]: {
    width: '192px',
    height: '157px'
  }
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  display: 'flex',
  marginRight: '15px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
    marginRight: '0'
  }
}));

export default function CommentItem({
  id,
  name,
  avatarUrl,
  message,
  image,
  postedAt,
  admin,
  removeComment
}: CommentItemProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const unreadNotificationID = useSelector((state: RootState) =>
    state?.notification?.notifications.filter((notification) => id === notification.channel_id)
  )[0]?.id;

  const handleDelete = async () => {
    const url = `/questions_feed/delete_comment.json?comment_id=${id}`;
    await axios
      .delete(url)
      .then((response) => {
        enqueueSnackbar('Comment Deleted', { variant: 'success' });
        removeComment(id);
      })
      .catch((error) => {
        enqueueSnackbar('Error in deleting comment', { variant: 'error' });
      });
  };

  const handleRead = (value: boolean) => {
    if (value && unreadNotificationID) {
      dispatch(markAsRead('single', unreadNotificationID));
    }
  };

  return (
    <>
      <VisibilitySensor onChange={(isVisible) => handleRead(isVisible)}>
        <Stack direction="row">
          <UserAvatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
          <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
            <Stack
              direction="row"
              alignItems={{ xs: 'flex-start', sm: 'center' }}
              style={{ width: '100%' }}
            >
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                alignItems={{ xs: 'flex-start', sm: 'center' }}
                justifyContent="space-between"
                style={{ width: '100%' }}
              >
                <Typography variant="subtitle2">{name}</Typography>
                <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                  {fDate(postedAt)}
                </Typography>
              </Stack>
              {admin && <DeleteOption handleDelete={() => handleDelete()} />}
            </Stack>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {message}
            </Typography>
            {image && <StyledPreview src={image} />}
          </Paper>
        </Stack>
      </VisibilitySensor>
    </>
  );
}
