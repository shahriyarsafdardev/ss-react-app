import { useState, useRef } from 'react';
import { Icon } from '@iconify/react';
import cancel from '@iconify/icons-ic/cancel';
import { useSnackbar } from 'notistack5';
import axios from 'utils/axios';
import MoreVertIcon from '@material-ui/icons/MoreVert';

// material
import { styled } from '@material-ui/core/styles';

import {
  Box,
  Avatar,
  Paper,
  Stack,
  MenuItem,
  Typography,
  ListItemProps,
  IconButton
} from '@material-ui/core';
import MenuPopover from '../../MenuPopover';
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
  const [open, setOpen] = useState(false);
  const listRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(!open);
  };

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

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: 'background.neutral' }}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            alignItems={{ sm: 'center' }}
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">{name}</Typography>
            <Stack direction="row" alignItems="center">
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {fDate(postedAt)}
              </Typography>
              {admin && (
                <Box>
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleOpen}
                    ref={listRef}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <MenuPopover
                    open={open}
                    anchorEl={listRef.current}
                    onClose={() => {
                      setOpen(false);
                    }}
                    sx={{ width: 200 }}
                  >
                    <MenuItem
                      id="comment-settings"
                      onClick={() => {
                        handleDelete();
                      }}
                      sx={{ typography: 'body2', py: 1, px: 2.5 }}
                    >
                      <Box
                        component={Icon}
                        icon={cancel}
                        sx={{
                          mr: 2,
                          width: 24,
                          height: 24
                        }}
                      />
                      Delete
                    </MenuItem>
                  </MenuPopover>
                </Box>
              )}
            </Stack>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {message}
          </Typography>
          {image && <StyledPreview src={image} />}
        </Paper>
      </Stack>
    </>
  );
}
