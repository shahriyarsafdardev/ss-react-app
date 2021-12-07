import { useRef, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import { StreamChat, LiteralStringForUnion } from 'stream-chat';
import { styled } from '@material-ui/core/styles';

// material
import {
  Box,
  List,
  Badge,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListItemButton
} from '@material-ui/core';
import { Notification } from '../../@types/cohorts';

import { addNotifications } from '../../redux/slices/notification';

import { RootState, useDispatch, useSelector } from '../../redux/store';

import useAuth from '../../hooks/useAuth';

// utils
import { fToNow } from '../../utils/formatTime';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const UserAvatar = styled('div')(() => ({
  width: '40px',
  minWidth: '40px',
  height: '40px',
  backgroundSize: 'cover',
  borderRadius: '50%',
  marginRight: '10px',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center'
}));

const trimString = (data: string) => {
  if (typeof data === 'string') {
    return data.length > 200 ? `${data.slice(0, 100)}...` : data;
  }
  return '';
};

function renderContent(notification: Notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {trimString(notification.description)}
      </Typography>
    </Typography>
  );

  if (notification.type === 'order_placed') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_package.svg" />,
      title
    };
  }
  if (notification.type === 'order_shipped') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_shipping.svg" />,
      title
    };
  }
  if (notification.type === 'mail') {
    return {
      avatar: <img alt={notification.title} src="/static/icons/ic_notification_mail.svg" />,
      title
    };
  }
  if (notification.type === 'chat_message') {
    return {
      avatar: notification.avatar ? (
        <img style={{ height: '100%' }} alt={notification.title} src={notification.avatar} />
      ) : (
        <img alt={notification.title} src="/static/icons/ic_notification_chat.svg" />
      ),
      title
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title
  };
}

function NotificationItem({ notification, onClick }: { notification: Notification; onClick: any }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      to={notification.link}
      onClick={onClick}
      disableGutters
      key={notification.id}
      component={RouterLink}
      sx={{
        py: 1.5,
        px: 2.5,
        '&:not(:last-of-type)': { mb: '1px' },
        ...(notification.isUnRead && {
          bgcolor: 'action.selected'
        })
      }}
    >
      <UserAvatar style={{ backgroundImage: `url(${avatar?.props.src}` }} />
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled'
            }}
          >
            <Box component={Icon} icon={clockFill} sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

export default function NotificationsPopover() {
  const apiKey = process.env.REACT_APP_STREAM_API_KEY || process.env.STREAM_API_KEY;
  const { user } = useAuth();
  const [unread, setUnread] = useState<number | undefined>(0);
  const [chatClient, setChatClient] = useState<any>(null);
  const anchorRef = useRef(null);
  const dispatch = useDispatch();
  const notifications = useSelector((state: RootState) => state?.notification?.notifications) || [];
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance<
        Record<string, unknown>,
        Record<string, unknown>,
        LiteralStringForUnion,
        Record<string, unknown>,
        Record<string, unknown>,
        Record<string, unknown>,
        { image?: string }
      >(apiKey!);

      // Go for connecting a user only is is not already connected
      if (!client.user && user?.stream_token) {
        await client.connectUser(
          {
            id: user?.stream_id || user?.id
          },
          user?.stream_token
        );
      }
      client.on((event) => {
        if (
          event.total_unread_count !== null &&
          event.type !== 'user.watching.start' &&
          event.type !== 'health.check'
        ) {
          setUnread(event.total_unread_count);
        }
      });
      const result = await client.queryChannels(
        { members: { $in: [user?.id] } },
        { has_unread: -1, last_message_at: -1, updated_at: -1 }
      );
      const unreadChannels = result.filter((channel) => channel.state.unreadCount > 0).reverse();
      let messages: any = [];
      unreadChannels.map((channel) => {
        channel.state.messages
          .filter(
            (m) => m?.user?.id !== user?.id && m.updated_at > channel.state.read[user?.id].last_read
          )
          .map(
            (m) =>
              (messages = [
                {
                  text: m.text,
                  user: m.user?.name,
                  date: m.updated_at,
                  id: m.id,
                  image: m.user?.image,
                  team: channel?.data?.team,
                  channel_id: channel?.id
                },
                ...messages
              ])
          )
          .reverse();
      });
      if (Object.keys(messages).length > 0) {
        dispatch(
          addNotifications(
            messages.map((message: any) => ({
              id: message.id,
              channel_id: message.channel_id,
              cohort_id: message.team,
              title: `New Message from ${message.user}`,
              description: message.text,
              link: `cohorts/${message.team}/messaging?channel_id=${message.channel_id}&message=${message.id}`,
              avatar: message.image,
              type: 'chat_message',
              createdAt: message.date,
              isUnRead: true,
              category: 'Messaging'
            }))
          )
        );
      } else {
        dispatch(addNotifications([]));
      }
      setChatClient(client);
    };
    if (user?.stream_token) {
      initChat();
    }
  }, [unread]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    await chatClient.markAllRead();
    dispatch(addNotifications([]));
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Badge badgeContent={notifications.length} color="error">
          <Icon icon={bellFill} width={20} height={20} />
        </Badge>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 360 }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {notifications.length} unread messages
            </Typography>
          </Box>

          {notifications.length > 0 && (
            <Tooltip title=" Mark all as read">
              <MIconButton color="primary" onClick={handleMarkAllAsRead}>
                <Icon icon={doneAllFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List disablePadding>
            {notifications.slice(0, 5).map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
                onClick={() => {
                  setOpen(false);
                }}
              />
            ))}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
