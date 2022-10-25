import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import { useLocation } from 'react-router-dom';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundPeople from '@iconify/icons-ic/baseline-people';
import roundDelete from '@iconify/icons-ic/baseline-delete';
import bellFill from '@iconify/icons-eva/bell-fill';
import roundLoop from '@iconify/icons-ic/round-loop';

// material
import { Container, Tab, Box, Tabs } from '@material-ui/core';
// redux
import { EVENT_TYPES, sendAmplitudeData, trackGenericEvent } from 'utils/amplitude';

// routes
import useAuth from 'hooks/useAuth';
import AccountSubscription from 'components/subscription/settings/AccountSubscription';
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import AccountDeleteModal from './AccountDeleteModal';
import {
  AccountGeneral,
  AccountChangePassword,
  AccountNetworking,
  AccountNotifications,
  BusinessAccount
} from '../../components/_dashboard/user/account';

// ----------------------------------------------------------------------

const companyType = 'company';

export default function UserAccount() {
  const { themeStretch } = useSettings();

  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('general');
  const url = new URLSearchParams(useLocation().search);
  const emailType = url.get('email_type');

  const EMAIL_EVENTS = {
    summary: 'Email - "What you missed" Email - Messaging Opened',
    direct: 'Email - "New Direct Message" Email - Notification Settings Opened',
    everyone: 'Email - "@everyone Notification﻿" Email - Notification Settings Opened'
  };

  useEffect(() => {
    sendAmplitudeData(EVENT_TYPES.page_view, {
      [EVENT_TYPES.page_type]: EVENT_TYPES.account_settings_tab
    });
    if (emailType) {
      setCurrentTab('email_notifications');
      trackEvents(emailType);
    }
  }, []);

  const trackEvents = (type: string) => {
    let eventType = '';
    if (type === 'summary') {
      eventType = EMAIL_EVENTS.summary;
    } else if (type === 'direct') {
      eventType = EMAIL_EVENTS.direct;
    } else if (type === 'everyone') {
      eventType = EMAIL_EVENTS.everyone;
    }
    trackGenericEvent({}, eventType);
  };

  const getTabs = () =>
    user?.type === companyType
      ? [
          {
            value: 'general',
            icon: <Icon icon={roundAccountBox} width={20} height={20} />,
            component: <BusinessAccount />
          },
          {
            value: 'change_password',
            icon: <Icon icon={roundVpnKey} width={20} height={20} />,
            component: <AccountChangePassword />
          },
          {
            value: 'delete_account',
            icon: <Icon icon={roundDelete} width={20} height={20} />,
            component: <></>
          }
        ]
      : [
          {
            value: 'general',
            icon: <Icon icon={roundAccountBox} width={20} height={20} />,
            component: <AccountGeneral />
          },
          {
            value: 'networking',
            icon: <Icon icon={roundPeople} width={20} height={20} />,
            component: <AccountNetworking />
          },
          {
            value: 'change_password',
            icon: <Icon icon={roundVpnKey} width={20} height={20} />,
            component: <AccountChangePassword />
          },
          {
            value: 'email_notifications',
            icon: <Icon icon={bellFill} width={20} height={20} />,
            component: <AccountNotifications />
          },

          {
            value: 'delete_account',
            icon: <Icon icon={roundDelete} width={20} height={20} />,
            component: <></>
          }
        ];

  const ACCOUNT_TABS = getTabs();

  if (user?.is_subscribed) {
    ACCOUNT_TABS.splice(-1, 0, {
      value: 'my_subscription',
      icon: <Icon icon={roundLoop} width={20} height={20} />,
      component: <AccountSubscription />
    });
  }

  return (
    <Page title="Sphere | Settings">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <AccountDeleteModal open={open} onClose={() => setOpen(false)} />
        <HeaderBreadcrumbs
          heading="Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: 'Account Settings' }
          ]}
        />

        <Tabs
          value={currentTab}
          scrollButtons="auto"
          variant="scrollable"
          allowScrollButtonsMobile
          onChange={(e, value) => {
            if (value === 'delete_account') {
              setOpen(true);
            } else {
              setCurrentTab(value);
            }
          }}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              disableRipple
              key={tab.value}
              label={capitalCase(tab.value)}
              id={tab.value}
              data-testid={tab.value}
              icon={tab.icon}
              value={tab.value}
            />
          ))}
        </Tabs>

        <Box sx={{ mb: 5 }} />

        {ACCOUNT_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
