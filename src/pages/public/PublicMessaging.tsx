import { Card } from '@material-ui/core';
import { RegisterForm } from 'components/authentication/register';
import Page from 'components/Page';
import useAuth from 'hooks/useAuth';

export default function PublicMessaging() {
  const { isAuthenticated } = useAuth();
  return (
    <Page
      title="Sphere | Messaging"
      sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
      <Card sx={{ width: '70%', margin: 'auto', padding: '50px' }}>
        {!isAuthenticated && <RegisterForm />}
      </Card>
    </Page>
  );
}
