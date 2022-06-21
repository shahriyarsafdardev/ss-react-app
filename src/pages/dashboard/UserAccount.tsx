import { Icon } from '@iconify/react';
import { capitalCase } from 'change-case';
import { useState, useEffect } from 'react';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundPeople from '@iconify/icons-ic/baseline-people';
import roundDelete from '@iconify/icons-ic/baseline-delete';
import bellFill from '@iconify/icons-eva/bell-fill';
// material
import { Container, Tab, Box, Tabs } from '@material-ui/core';
// redux
import { EVENT_TYPES, sendAmplitudeData } from 'utils/amplitude';

// routes
import useAuth from 'hooks/useAuth';
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

  useEffect(() => {
    sendAmplitudeData(EVENT_TYPES.page_view, {
      page_type: EVENT_TYPES.account_settings_tab
    });
  }, []);

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
