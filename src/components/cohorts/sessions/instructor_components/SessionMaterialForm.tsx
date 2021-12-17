import { useState } from 'react';
import { Modal } from 'components/animate';
import { styled } from '@material-ui/core/styles';
import { Box, Button, Typography, TextField, Tabs, Tab } from '@material-ui/core';
import { DropzoneArea } from 'material-ui-dropzone';

const FormContainer = styled('div')(() => ({
  maxWidth: '700px',
  backgroundColor: 'white',
  margin: 'auto',
  borderRadius: '8px',
  padding: '40px 20px'
}));

const StyledTabs = styled(Tabs)(() => ({
  margin: '0 auto',
  width: '100%',
  button: {
    width: '40%'
  },
  '.MuiTabs-flexContainer': {
    justifyContent: 'center',
    backgroundColor: 'rgba(225, 228, 231, 0.3)',
    marginTop: '20px',
    borderRadius: '16px 16px 0px 0px'
  }
}));

const StyledDropzone = styled(DropzoneArea)(() => ({
  marginTop: '20px',
  backgroundColor: 'white',
  '&.MuiDropzoneArea-root-31': {
    minHeight: '150px',
    border: '2px dashed'
  }
}));

const StyledButton = styled(Button)(() => ({
  width: '150px'
}));

const ActionRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: '10px'
}));

const SessionMaterialForm = ({
  action,
  onSave,
  modalHandler,
  modalState
}: {
  action: string;
  onSave: Function;
  modalHandler: Function;
  modalState: boolean;
}) => {
  const [tab, setTab] = useState(0);
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState(null);

  const handleSave = () => {
    onSave({
      title,
      source,
      url,
      file
    });
  };

  const tabContent = [
    <Box key="file" style={{ paddingTop: 20 }}>
      <StyledDropzone datatest-id="hey" dropzoneText="Upload or drag and drop your file here." />
    </Box>,
    <Box key="url">
      <TextField
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{ marginTop: '20px' }}
        fullWidth
        label="Resource URL"
      />
    </Box>
  ];

  return (
    <Modal open={modalState} onClose={() => modalHandler(false)}>
      <FormContainer>
        <Typography variant="h4">Create Prereading</Typography>
        <Box>
          <TextField
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ marginTop: '40px' }}
            fullWidth
            label="Resource Title"
          />
          <TextField
            value={source}
            onChange={(e) => setSource(e.target.value)}
            style={{ marginTop: '20px' }}
            fullWidth
            label="Resource Source"
          />
        </Box>
        <Box>
          <StyledTabs
            value={tab}
            onChange={(e, value) => {
              setTab(value);
              value === 1 ? setFile(null) : setUrl('');
            }}
          >
            <Tab label="Upload File" />
            <Tab label="Add link" />
          </StyledTabs>
          {tabContent[tab]}
        </Box>
        <ActionRow>
          {action === 'edit' && (
            <StyledButton variant="contained" style={{ marginRight: '10px' }}>
              Delete
            </StyledButton>
          )}
          <StyledButton onClick={() => handleSave()} variant="contained">
            Save
          </StyledButton>
        </ActionRow>
      </FormContainer>
    </Modal>
  );
};

export default SessionMaterialForm;
