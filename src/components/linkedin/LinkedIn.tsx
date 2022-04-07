import { Button } from '@material-ui/core';

const LinkedIn = ({
  redirectUri,
  clientId,
  scope
}: {
  redirectUri: string;
  clientId: string;
  scope: string;
}) => {
  const getUrl = () => {
    const scopeParam = scope ? `&scope=${encodeURI(scope)}` : '';
    const linkedInAuthenLink = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}${scopeParam}&state=34232424`;
    return linkedInAuthenLink;
  };

  return (
    <Button
      variant="text"
      href={getUrl()}
      sx={{
        py: 1.5,
        px: 2.5
      }}
    >
      Authenticate with LinkedIn
    </Button>
  );
};

export default LinkedIn;
