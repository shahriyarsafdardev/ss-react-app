import { useRef, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'utils/axios';
import { Icon } from '@iconify/react';
import bellFill from '@iconify/icons-eva/bell-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import doneAllFill from '@iconify/icons-eva/done-all-fill';
import { StreamChat, LiteralStringForUnion } from 'stream-chat';
import { styled } from '@material-ui/core/styles';
import { ActionCable } from 'react-actioncable-provider';

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
  channel_id: string | null;
  cohort_id: string | null;
  title: string;
  description: string;
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
      to={`cohorts/${notification.cohort_id}/messaging?channel_id=${notification.channel_id}&message=${notification.id}`}
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
  const { user } = useAuth();
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<TNotificationPopover[]>([]);
  const [totalUnRead, setTotalUnread] = useState(0);

  useEffect(() => {
    axios.get('/notifications.json').then((res) => {
      setNotifications([...res.data.notifications, ...notifications]);
      setTotalUnread(totalUnRead + res.data.notifications.length);
    });
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMarkAllAsRead = async () => {
    setNotifications([]);
    setTotalUnread(0);
  };

  const handleReceivedNotifications = (val: any) => {
    // eslint-disable-next-line no-debugger
    console.log('received', val);
    if (val.receiver === user?.id) {
      setTotalUnread(totalUnRead + 1);
    }
  };

  return (
    <>
      <ActionCable
        channel={{ channel: 'NotificationsChannel' }}
        onReceived={handleReceivedNotifications}
      />
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

        <Divider />

        {notifications.length > 0 && (
          <Box sx={{ p: 1 }}>
            <Button
              fullWidth
              disableRipple
              component={RouterLink}
              to={`cohorts/${notifications[0].cohort_id}/messaging`}
              onClick={() => {
                setOpen(false);
              }}
            >
              View All
            </Button>
          </Box>
        )}
      </MenuPopover>
    </>
  );
}
