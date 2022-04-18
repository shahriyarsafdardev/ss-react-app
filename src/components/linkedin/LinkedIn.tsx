import { Button, Stack, Typography } from '@material-ui/core';

const LinkedIn = ({
  redirectUri,
  clientId,
  scope,
  onCancel
}: {
  redirectUri: string;
  clientId: string;
  scope: string;
  onCancel: any;
}) => {
  const getUrl = () => {
    const scopeParam = scope ? `&scope=${encodeURI(scope)}` : '';
    const linkedInAuthenLink = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}${scopeParam}&state=34232424`;
    return linkedInAuthenLink;
  };

  return (
    <Stack
      sx={{ marginTop: '8rem' }}
      spacing={{ xs: 4, md: 10 }}
      alignItems="center"
      justifyContent="center"
    >
      <Typography variant="h5">Do you want to import your data from LinkedIn?</Typography>
      <Stack direction="row" spacing={{ xs: 4, md: 10 }}>
        <Button
          size="large"
          variant="outlined"
          onClick={onCancel}
          sx={{
            py: 1.5,
            px: 2.5
          }}
        >
          No
        </Button>
        <Button
          size="large"
          variant="contained"
          href={getUrl()}
          sx={{
            py: 1.5,
            px: 2.5
          }}
        >
          Yes
        </Button>
      </Stack>
    </Stack>
  );
};

export default LinkedIn;
