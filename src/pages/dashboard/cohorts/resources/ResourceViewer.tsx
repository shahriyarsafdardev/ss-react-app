import { Typography, Stack, Button, Box } from '@material-ui/core';
import ResourceShareModal from 'components/cohorts/sessions/ResourceShareModal';
import { ResourceContext } from 'contexts/ResourceContext';
import { useContext, useState } from 'react';
import ResourceSlides from './ResourceSlides';

export default function ResourceViewer({
  resource,
  setIsSearch
}: {
  resource: any;
  setIsSearch: Function;
}) {
  const { setSelectedResource } = useContext(ResourceContext);
  const [displayShareModal, setDisplayShareModal] = useState(false);
  const handleBackButton = () => {
    setIsSearch(false);
    setSelectedResource({});
  };

  return (
    <Box>
      <ResourceShareModal
        open={displayShareModal}
        onClose={setDisplayShareModal}
        item={resource}
        sessionId={resource?.session_id}
        ontriggerShareEvent={() => {}}
      />
      <Stack
        spacing={1}
        sx={{
          padding: '20px 30px',
          border: '1px solid #E2E8F0',
          borderRadius: '8px',
          height: '20%'
        }}
      >
        <Button
          sx={{ width: 'fit-content', padding: '0px !important' }}
          variant="text"
          onClick={() => handleBackButton()}
        >
          {'<'}
          <u style={{ marginLeft: '3px' }}>Back</u>
        </Button>
        <Typography variant="h5" style={{ fontSize: '1.1rem', color: '#000' }}>
          {resource?.name?.length > 95 ? `${resource?.name?.slice(0, 96)}...` : resource?.name}
        </Typography>
        <Typography variant="subtitle2">
          {resource?.info_text?.length > 130
            ? `${resource?.info_text?.slice(0, 131)}...`
            : resource?.info_text}
        </Typography>
        <Button
          sx={{
            color: '#475569',
            border: '1px solid #E2E8F0',
            borderRadius: '30px',
            height: '40px'
          }}
          variant="outlined"
          onClick={() => setDisplayShareModal(true)}
        >
          <img
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/share_icon.svg"
            alt="share"
            style={{ marginRight: '5px', width: '18px', height: '15px' }}
          />
          Share Resource
        </Button>
      </Stack>
      {resource?.action_url && (
        <>
          {resource.action_url.split('.')[resource.action_url.split('.').length - 1] === 'pdf' ? (
            <ResourceSlides pdfUrl={resource.action_url} isFree={false} sliderEvents={() => {}} />
          ) : (
            <iframe
              src={resource?.action_url}
              width="100%"
              sandbox="allow-scripts allow-modal"
              loading="lazy"
              title="Custom title"
              about="blank"
              style={{ height: '70vh' }}
            />
          )}
        </>
      )}
    </Box>
  );
}
