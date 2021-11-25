import { useRef, useEffect, useState } from 'react';
import axios from 'utils/axios';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import { styled } from '@material-ui/core/styles';
import { StreamChat, LiteralStringForUnion } from 'stream-chat';

import { ActionCableConsumer } from 'react-actioncable-provider';

// material
import {
  Box,
  List,
  Badge,
  Button,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListItemButton
} from '@material-ui/core';
import useAuth from '../../hooks/useAuth';

// utils
import { fToNow } from '../../utils/formatTime';
// components
import Scrollbar from '../../components/Scrollbar';
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

type TNotificationPopover = {
  id: string;
  link: string;
  title: string;
  description: string;
  channel_id: string;
  avatar: string | null;
  type: string;
  createdAt: Date;
  isUnRead: boolean;
};

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

function renderContent(notification: TNotificationPopover) {
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

function NotificationItem({
  notification,
  onClick
}: {
  notification: TNotificationPopover;
  onClick: any;
}) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      href={notification.link}
      onClick={onClick}
      disableGutters
      key={notification.id}
      component="a"
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
  const anchorRef = useRef(null);
  const [chatClient, setChatClient] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<TNotificationPopover[]>([]);

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
      // Go for connecting a user only if not already connected
      if (!client.user && user?.stream_token) {
        await client.connectUser(
          {
            id: user?.stream_id || user?.id
          },
          user?.stream_token
        );
      }
      client.on((event) => {
        if (event.total_unread_count !== null && event.type === 'notification.mark_read') {
          axios
            .post('/notifications/mark_read.json', {
              type: 'channel',
              channel_id: event.channel_id
            })
            .then((res) => setNotifications(res.data.notifications));
        }
      });
      setChatClient(client);
    };
    if (user?.stream_token) {
      initChat();
    }
  }, []);

  useEffect(() => {
    axios.get('/notifications.json').then((res) => {
      setNotifications([...res.data.notifications, ...notifications]);
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const markRead = (id: string) => {
    axios.post('/notifications/mark_read.json', {
      type: 'single',
      notification_id: id
    });
  };

  const handleMarkAllAsRead = async () => {
    setNotifications([]);
    axios.post('/notifications/mark_read.json', {
      type: 'all'
    });
  };

  const handleReceivedNotifications = (val: any) => {
    if (val.receiver === user?.id) {
      setNotifications([val.react_notification, ...notifications]);
    }
  };

  return (
    <>
      <ActionCableConsumer
        channel={{ channel: 'NotificationsChannel' }}
        onReceived={handleReceivedNotifications}
      />
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
                  markRead(notification.id);
                }}
              />
            ))}
          </List>
        </Scrollbar>
      </MenuPopover>
    </>
  );
}
