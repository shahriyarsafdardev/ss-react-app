import { useRef, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import { StreamChat, LiteralStringForUnion } from 'stream-chat';
// material
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Typography,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
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
  channel_id: string | null;
  cohort_id: string | null;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
  createdAt: Date;
  isUnRead: boolean;
};

function renderContent(notification: TNotificationPopover) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
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

function NotificationItem({ notification }: { notification: TNotificationPopover }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      to={`cohorts/${notification.cohort_id}/messaging?channel_id=${notification.channel_id}&message=${notification.id}`}
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
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
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
  const apiKey = '4zev2wpcm6r7';
  const { user } = useAuth();
  const [unread, setUnread] = useState<number | undefined>(0);
  const [chatClient, setChatClient] = useState<any>(null);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<TNotificationPopover[]>([]);
  const [totalUnRead, setTotalUnread] = useState(0);

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
      if (!client.user) {
        await client.connectUser(
          {
            id: user?.stream_id
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
      const unread = messages.length;
      if (Object.keys(messages).length > 0) {
        setNotifications(
          messages.map((message: any) => ({
            id: message.id,
            channel_id: message.channel_id,
            cohort_id: message.team,
            title: `New Message from ${message.user}`,
            description: message.text,
            avatar: message.image,
            type: 'chat_message',
            createdAt: message.date,
            isUnRead: true
          }))
        );
      } else {
        setNotifications([]);
      }
      setTotalUnread(unread);
      setChatClient(client);
    };
    initChat();
  }, [unread]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    await chatClient.markAllRead();
    setNotifications([]);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        size="large"
        color={open ? 'primary' : 'default'}
        onClick={handleOpen}
      >
        <Badge badgeContent={totalUnRead} color="error">
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
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
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
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider />

        {notifications.length > 0 && (
          <Box sx={{ p: 1 }}>
            <Button
              fullWidth
              disableRipple
              component={RouterLink}
              to={`cohorts/${notifications[0].cohort_id}/messaging`}
            >
              View All
            </Button>
          </Box>
        )}
      </MenuPopover>
    </>
  );
}
