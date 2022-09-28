/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { Button, Container, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SLIDE_EVENTS, trackGenericEvent } from 'utils/amplitude';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import type { ToolbarSlot } from '@react-pdf-viewer/toolbar';
// Core viewer
import {
  Viewer,
  Worker,
  SpecialZoomLevel,
  DocumentLoadEvent,
  LoadError
} from '@react-pdf-viewer/core';

// Import styles
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/full-screen/lib/styles/index.css';

import Message from '../../Message';
import SlideShareModal from './SlideShareModal';
import { RootState, useSelector } from '../../../redux/store';

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

export default function NewSlides({
  pdfUrl,
  pdfDownloadable,
  onTrack,
  isFree
}: {
  pdfUrl: string | undefined;
  pdfDownloadable: boolean | undefined;
  onTrack: Function;
  isFree: boolean;
}) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [shareModal, setShareModal] = useState(false);
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  useEffect(() => {
    if (pdfUrl) {
      onTrack(SLIDE_EVENTS.opened);
    }
  }, [pdfUrl]);

  const toolbarPluginInstance = toolbarPlugin();

  const { Toolbar } = toolbarPluginInstance;

  const handleShareSlides = () => {
    trackGenericEvent(cohort, 'Sessions Page - "Share Slide" Selected');
    setShareModal(true);
  };

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
          height: '70vh'
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
                        <Box onClick={props.onClick} style={{ cursor: 'pointer', display: 'flex' }}>
                          <FullscreenIcon onClick={() => onTrack(SLIDE_EVENTS.full_screen_view)} />
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
              onDocumentLoad={(e: DocumentLoadEvent) => {
                setNumPages(e.doc.numPages);
              }}
              renderError={renderError}
            />
          </Worker>
        </div>
      </div>
      {numPages !== null && (
        <Button
          variant="contained"
          fullWidth
          style={{ marginTop: '10px', borderRadius: '50px', padding: '9px' }}
          onClick={() => handleShareSlides()}
        >
          <img
            src="https://sphere-public.s3.eu-west-2.amazonaws.com/share_icon_white.svg"
            alt="share"
            style={{ marginRight: '15px', height: '21px' }}
          />
          Share this slide with a friend or colleague
        </Button>
      )}
      <div>
        <SlideShareModal open={shareModal} onClose={setShareModal} />
      </div>
    </div>
  );

  return (
    <Container style={{ padding: 0, margin: 0 }}>
      {/* // eslint-disable-next-line no-nested-ternary */}
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
    </Container>
  );
}
