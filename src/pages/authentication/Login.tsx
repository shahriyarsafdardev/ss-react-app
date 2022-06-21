import { capitalCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@material-ui/core/styles';
import { Box, Card, Stack, Link, Alert, Tooltip, Container, Typography } from '@material-ui/core';
// routes
import { PATH_AUTH } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const StyledContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.up('xl')]: {
    marginLeft: '50px',
    marginRight: '50px'
  }
}));

const SectionStyle = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 900,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(20, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

const Title = styled(Typography)(({ theme }) => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  marginBottom: 12,
  [theme.breakpoints.down('md')]: {
    marginBottom: 19
  }
}));

const StyledStack = styled(Stack)(({ theme }) => ({
  marginBottom: '2.75rem',
  marginTop: 0,
  [theme.breakpoints.down('sm')]: {
    marginBottom: '1.5rem',
    marginTop: '1rem'
  }
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();

  return (
    <RootStyle title="Sphere | Login">
      <MHidden width="mdDown">
        <SectionStyle>
          <img src="/static/scholarsite_home.svg" alt="login" style={{ height: '80vh' }} />
        </SectionStyle>
      </MHidden>

      <StyledContainer maxWidth="sm">
        <ContentStyle>
          <MHidden width="mdUp">
            <img src="/static/ScholarSite.svg" alt="login" width={140} />
          </MHidden>
          <StyledStack direction="row" alignItems="center">
            <Box sx={{ flexGrow: 1 }}>
              <Title gutterBottom>Welcome to the Sphere Portal</Title>
              <Typography sx={{ color: 'text.secondary' }}>
                Sphere's portal can be used to access your cohort content, network and messages at
                any time!
              </Typography>
            </Box>
          </StyledStack>
          <LoginForm />
        </ContentStyle>
      </StyledContainer>
    </RootStyle>
  );
}
