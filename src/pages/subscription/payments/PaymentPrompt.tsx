import { Button, Container, Link, Typography } from '@material-ui/core';

export default function PaymentPrompt() {
  return (
    <Container
      sx={{
        display: 'flex',
        marginTop: '92px',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '90vh',
        overflow: 'hidden'
      }}
    >
      <Typography variant="h3" align="center" paragraph>
        👋 Payment made successfully.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        href="https://www.getsphere.com/pages/contact-us"
        align="center"
      >
        Any questions? Click here to contact Sphere
      </Button>
    </Container>
  );
}
