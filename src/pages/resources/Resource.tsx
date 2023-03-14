import { Avatar, Box, Container, Stack, Typography } from '@material-ui/core';

import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import axiosV3 from 'utils/axiosV3';
import axios from 'utils/axios';
import useAuth from 'hooks/useAuth';
import useSettings from 'hooks/useSettings';
import { trackEvent } from 'utils/eventTracking';
import LoadingScreen from 'components/LoadingScreen';
import JupyterViewer from 'react-jupyter-notebook';
import { LoadingContainer, useStyles, ViewOnlyBanner } from './Common';
import './styles.css';

export const JUPYTER_SERVER_URL = process.env.REACT_APP_JUPYTER_SERVER_URL;

function Resource() {
  const { user } = useAuth();
  const resource_id = window.location.pathname.split('/')[2] || '';
  const { themeStretch } = useSettings();
  const [resource, setResource] = useState<any>();
  const { enqueueSnackbar } = useSnackbar();
  const [isCopying, setIsCopying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notebook, setNotebook] = useState<any>();
  const classes = useStyles();

  const customProperties = (resource: any) => ({
    'Notebook ID': resource?.id,
    'Notebook Name': resource?.name,
    'Course ID': resource?.course_id
  });
  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (e?.data && typeof e?.data === 'string')
        trackEvent(null, `Juypter Notebook Page - ${e?.data}`, customProperties(resource));
    });
    if (resource_id) {
      axios
        .get(`/resources/${resource_id}.json`)
        .then((res) => {
          setResource(res?.data?.resource);
          trackEvent(
            null,
            'Juypter Notebook Page - Page Opened',
            customProperties(res?.data?.resource)
          );
          if (
            res?.data?.resource?.resource_type === 'Jupyter Notebook' &&
            res?.data?.resource?.url
          ) {
            const isUrlValid = evaluateResourceURL(res?.data?.resource?.url);
            if (isUrlValid) getNotebookContent(res?.data?.resource?.url);
          }
        })
        .catch((err) => {
          enqueueSnackbar('Something went wrong!', { variant: 'error' });
        });
    }
  }, []);

  const evaluateResourceURL = (url: string) => {
    const re = new RegExp(`^${process.env.REACT_APP_JUPYTER_SERVER_URL}/notebooks/.*.ipynb$`);
    return re.test(url);
  };

  const getNotebookContent = (url: string) => {
    const fileName = url?.split('notebooks')?.[1];
    axiosV3
      .get(`${JUPYTER_SERVER_URL}/api/contents${fileName}`)
      .then((response) => {
        const cells = response?.data?.content?.cells;
        if (!cells || cells?.length === 0) {
          enqueueSnackbar('Something went wrong!', { variant: 'error' });
          return;
        }
        cells?.forEach((cell: any) => {
          if (typeof cell?.source === 'string') {
            cell.source = [cell.source];
          }
          const outputs = cell?.outputs?.map((output: any) => ({
            ...output,
            text: [output?.text],
            data: { ...output?.data, 'text/html': [output?.data?.['text/html']] }
          }));
          cell.outputs = outputs;
        });
        setNotebook({ ...response?.data?.content, cells });
        setLoading(false);
      })
      .catch((error) => {
        enqueueSnackbar(error.message || 'Something went wrong!', { variant: 'error' });
      });
  };

  // const handleSeeMoreResources = () => {
  //   navigate(`/resources`);
  // };

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
    trackEvent(
      null,
      'Juypter Notebook Page - "Copy Notebook" Button Clicked',
      customProperties(resource)
    );
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
          copy = false;
          setIsCopying(false);
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
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <>
      <Page title="Sphere | Resource">
        {user?.id !== resource?.user_id && (
          <ViewOnlyBanner isCopying={isCopying} handleCopyNotebook={handleCopyNotebook} />
        )}
        <Container
          key={resource_id}
          maxWidth={themeStretch ? false : 'xl'}
          className={`${
            user?.id !== resource?.user_id ? classes.viewOnlyContainer : classes.notebookContainer
          }`}
        >
          <Stack direction="column" width="100%" spacing={2} sx={{ position: 'relative' }}>
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
            <Box sx={{ position: 'relative' }}>
              {user?.id !== resource?.user_id
                ? notebook && (
                    <Box
                      style={{
                        border: '1px solid #000',
                        overflow: 'auto'
                      }}
                    >
                      <JupyterViewer rawIpynb={notebook} />
                    </Box>
                  )
                : resource?.url && (
                    <iframe
                      id="notebook_iframe"
                      title="jupyter notebook"
                      src={resource?.url}
                      width="100%"
                    />
                  )}
            </Box>
          </Stack>
        </Container>
      </Page>
    </>
  );
}

export default Resource;
