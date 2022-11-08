import { useRef } from 'react';
import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import type { ToolbarSlot } from '@react-pdf-viewer/toolbar';
// Core viewer
import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  LoadError,
  PageChangeEvent
} from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';

import Message from 'components/Message';

const StyledNavigation = styled(Box)(({ theme }) => ({
  padding: '0px 2px',
  [theme.breakpoints.down(400)]: {
    display: 'none'
  }
}));

const StyledOptions = styled(Box)(({ theme }) => ({
  padding: '0px 2px'
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

export default function ResourceSlides({
  pdfUrl,
  isFree,
  sliderEvents
}: {
  pdfUrl: string | undefined;
  isFree: boolean;
  sliderEvents: Function;
}) {
  const toolbarPluginInstance = toolbarPlugin();

  const { Toolbar } = toolbarPluginInstance;
  const slideNumber = useRef(1);

  const renderError = (error: LoadError) => {
    let message = '';
    switch (error.name) {
      case 'InvalidPDFException':
        message = 'The document is invalid or corrupted';
        break;
      case 'MissingPDFException':
        message = 'The document is missing';
        break;
      case 'UnexpectedResponseException':
        message = 'Unexpected server response';
        break;
      default:
        message = 'Cannot load the document';
        break;
    }

    return (
      <div
        style={{
          alignItems: 'center',
          display: 'flex',
          height: '100%',
          justifyContent: 'center'
        }}
      >
        <div
          style={{
            backgroundColor: '#e53e3e',
            borderRadius: '0.25rem',
            color: '#fff',
            padding: '0.5rem'
          }}
        >
          {message}
        </div>
      </div>
    );
  };

  const pdfSlider = () => (
    <div data-testid="session-pdf-slides">
      <div
        className="rpv-core__viewer"
        style={{
          border: '1px solid rgba(0, 0, 0, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          height: '70vh',
          width: '100%'
        }}
      >
        <div
          style={{
            alignItems: 'center',
            backgroundColor: '#eeeeee',
            borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
            display: 'flex',
            padding: '0.25rem'
          }}
        >
          <Toolbar>
            {(props: ToolbarSlot) => {
              const {
                CurrentPageInput,
                EnterFullScreen,
                GoToNextPage,
                GoToPreviousPage,
                NumberOfPages,
                ShowSearchPopover,
                Zoom,
                ZoomIn,
                ZoomOut
              } = props;
              return (
                <>
                  <StyledOptions>
                    <ShowSearchPopover />
                  </StyledOptions>
                  <StyledOptions>
                    <ZoomOut />
                  </StyledOptions>
                  <StyledOptions>
                    <Zoom />
                  </StyledOptions>
                  <StyledOptions>
                    <ZoomIn />
                  </StyledOptions>
                  <StyledNavigation style={{ marginLeft: 'auto' }}>
                    <GoToPreviousPage />
                  </StyledNavigation>
                  <StyledOptions style={{ width: '2.5rem' }}>
                    <CurrentPageInput />
                  </StyledOptions>
                  <StyledOptions>
                    / <NumberOfPages />
                  </StyledOptions>
                  <StyledNavigation>
                    <GoToNextPage />
                  </StyledNavigation>
                  <StyledOptions style={{ marginLeft: 'auto' }}>
                    <EnterFullScreen>
                      {(props) => (
                        <Box
                          onClick={() =>
                            sliderEvents(
                              'Sessions Page - Slides - "Full Screen" Selected',
                              slideNumber.current
                            )
                          }
                          style={{ cursor: 'pointer', display: 'flex' }}
                        >
                          <FullscreenIcon onClick={props.onClick} />
                          <StyledTypography>Full Screen</StyledTypography>
                        </Box>
                      )}
                    </EnterFullScreen>
                  </StyledOptions>
                </>
              );
            }}
          </Toolbar>
        </div>
        <div
          style={{
            flex: 1,
            overflow: 'hidden'
          }}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.9.359/build/pdf.worker.js">
            <Viewer
              fileUrl={pdfUrl || ''}
              plugins={[toolbarPluginInstance]}
              defaultScale={SpecialZoomLevel.PageFit}
              onPageChange={(e: PageChangeEvent) => {
                sliderEvents('Sessions Page - Slides - Slide Opened', e.currentPage + 1);
                slideNumber.current = e.currentPage + 1;
              }}
              renderError={renderError}
            />
          </Worker>
        </div>
      </div>
    </div>
  );

  return (
    <Box sx={{ width: '100%', padding: 0, margin: 0 }}>
      {!isFree && pdfUrl && pdfUrl !== '' ? (
        pdfSlider()
      ) : (
        <Message
          content={
            isFree
              ? 'We restrict slides access to paid participants'
              : 'The presentation slides will be available shortly after this session.'
          }
        />
      )}
    </Box>
  );
}
