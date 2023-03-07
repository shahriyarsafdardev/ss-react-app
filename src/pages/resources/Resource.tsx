import { Avatar, Box, Button, Container, Stack, Typography } from '@material-ui/core';

import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import axiosV3 from 'utils/axiosV3';
import { Icon } from '@iconify/react';
import baselineContentCopy from '@iconify/icons-ic/baseline-content-copy';
import baselineRemoveRedEye from '@iconify/icons-ic/baseline-remove-red-eye';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';
import useSettings from 'hooks/useSettings';
import { useNavigate } from 'react-router';
import { LoadingButton } from '@material-ui/lab';
import { trackEvent } from 'utils/eventTracking';
import LoadingScreen from 'components/LoadingScreen';
import { LoadingContainer, useStyles } from './Common';

export const JUPYTER_SERVER_URL = 'https://jupyter.getsphere.com';

function Resource() {
  const { user } = useAuth();
  const resource_id = window.location.pathname.split('/')[2] || '';
  const { themeStretch } = useSettings();
  const navigate = useNavigate();
  const [resource, setResource] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [isCopying, setIsCopying] = useState(false);
  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e?.data && typeof e?.data === 'string') trackEvent(null, `Jupyter Notebook - ${e?.data}`);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`/resources/${resource_id}.json`)
      .then((res) => {
        setResource(res?.data?.resource);
        if (res?.data?.resource?.resource_type !== 'notebook' || !res?.data?.resource?.url) {
          setLoading(true);
        }
      })
      .catch((err) => {
        enqueueSnackbar('Something went wrong!', { variant: 'error' });
      });
  }, []);

  const handleSeeMoreResources = () => {
    navigate(`/resources`);
  };

  const saveNotebookInDB = (fileName: string) => {
    const { origin } = window.location;
    axios
      .post('/resources/create_duplicate.json', {
        resource_id: resource?.id,
        user_id: user?.id,
        url: `${JUPYTER_SERVER_URL}/notebooks${fileName}`
      })
      .then((response) => {
        const pageURL = new URL(`${origin}/resources/${response?.data?.resource?.id}`);
        window.history.pushState(null, '', pageURL.toString());
        setResource(response?.data?.resource);
        enqueueSnackbar('Notebook Copied Successfully!', { variant: 'success' });
        setIsCopying(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message || 'Something went wrong!', { variant: 'error' });
      });
  };

  const generateFileName = () => {
    const fileName = resource?.url?.split('notebooks')?.[1];
    return fileName ? `${fileName?.split('.ipynb')?.[0]}::${user?.slug}.ipynb` : '';
  };

  const saveNotebookInJupyterServer = () => {
    const fileName = generateFileName();
    if (!fileName) {
      enqueueSnackbar('Something went wrong!', { variant: 'error' });
      return;
    }
    axiosV3
      .post(`${JUPYTER_SERVER_URL}/api/contents`, {
        type: 'notebook',
        copy_from: `${resource?.url?.split('notebooks')?.[1]}`,
        kernel: 'python'
      })
      .then((response) => {
        axiosV3
          .patch(`${JUPYTER_SERVER_URL}/api/contents/${response.data.path}`, {
            path: fileName
          })
          .then((response) => {
            saveNotebookInDB(fileName);
          });
      })
      .catch((error) => {
        enqueueSnackbar(error.message || 'Something went wrong!', { variant: 'error' });
      });
  };

  const handleCopyNotebook = () => {
    setIsCopying(true);
    let copy: boolean = true;
    const { origin } = window.location;
    axios
      .get('/resources/get_duplicate_resource.json', {
        params: {
          resource_name: resource?.name
        }
      })
      .then((response) => {
        if (response?.data?.resource) {
          setResource(response?.data?.resource);
          const pageURL = new URL(`${origin}/resources/${response?.data?.resource?.id}`);
          window.history.pushState(null, '', pageURL.toString());
          setIsCopying(false);
          copy = false;
        }
      })
      .catch((error) => {
        enqueueSnackbar(error.message || 'Something went wrong!', { variant: 'error' });
      });
    if (copy) {
      saveNotebookInJupyterServer();
    }
  };

  if (loading || !resource_id) {
    <LoadingContainer>
      <LoadingScreen />
    </LoadingContainer>;
  }

  return (
    <>
      <Page title="Sphere | Resource">
        <Container
          key={resource_id}
          maxWidth={themeStretch ? false : 'xl'}
          className={classes.rootContainer}
        >
          <Stack direction="column" width="100%" spacing={2}>
            {/* <Button sx={{ width: 'fit-content' }} variant="text" onClick={handleSeeMoreResources}>
              {'< See More Resources'}
            </Button> */}
            <Typography variant="h3">{resource?.name}</Typography>
            <Typography>{resource?.description}</Typography>
            <Stack direction="row" spacing={2}>
              <Avatar
                alt={resource?.instructor_name}
                src={resource?.instructor_headshot}
                sx={{
                  width: 50,
                  height: 50
                }}
              />
              <Stack>
                <Typography sx={{ fontWeight: 500 }}>
                  Shared by {resource?.instructor_name}
                </Typography>
                <Typography sx={{ fontSize: '14px', fontWeight: 300 }}>
                  {resource?.instructor_title} @ Sphere
                </Typography>
              </Stack>
            </Stack>
            {user?.id !== resource?.user_id && (
              <Stack
                direction={{ xs: 'column', md: 'row' }}
                sx={{ alignItems: 'center', justifyContent: 'space-between', padding: '20px 0px' }}
                spacing={2}
              >
                <Stack direction="row" sx={{ alignItems: 'center' }}>
                  <Icon
                    icon={baselineRemoveRedEye}
                    width={20}
                    height={20}
                    style={{ marginRight: '8px' }}
                  />
                  <Typography>You are viewing this notebook</Typography>
                </Stack>
                <LoadingButton
                  variant="contained"
                  sx={{ borderRadius: '30px', textTransform: 'none' }}
                  onClick={handleCopyNotebook}
                  loading={isCopying}
                >
                  <Icon
                    icon={baselineContentCopy}
                    width={20}
                    height={20}
                    style={{ marginRight: '8px' }}
                  />
                  Copy notebook to your library to edit
                </LoadingButton>
              </Stack>
            )}
            <Box sx={{ position: 'relative' }}>
              {resource?.url && (
                <iframe
                  id="notebook_iframe"
                  title="jupyter notebook"
                  src={resource?.url}
                  width="100%"
                  height="600px"
                />
              )}
              {user?.id !== resource?.user_id && <Box className={classes.viewOnlyBox} />}
            </Box>
          </Stack>
        </Container>
      </Page>
    </>
  );
}

export default Resource;
