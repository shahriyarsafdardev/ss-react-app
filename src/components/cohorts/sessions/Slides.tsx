/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useState } from 'react';
import { Button, Container, Box, Theme, Typography } from '@material-ui/core';
import Modal from 'components/animate/Modal';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import { Document, Page, pdfjs } from 'react-pdf';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import { SLIDE_EVENTS } from 'utils/amplitude';
import Message from '../../Message';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type NavigationProps = {
  pdfUrl: string | undefined;
  pageNumber: number;
  pdfDownloadable: boolean | undefined;
  numPages: number | null;
  pageHandler: Function;
  setViewType: Function;
  viewType: string;
  setError: Function;
  trackEventHandler: Function;
};

const NavigationContainer = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap'
}));

const StyledButton = styled(Button)(() => ({
  minWidth: '20px',
  padding: '10px 6px',
  '&:disabled': {
    opacity: '0.5'
  }
}));

export const ModalPage = styled(Page)(({ theme }) => ({
  '.react-pdf__Page': { height: 'fit-content' },
  '.react-pdf__Page__svg': { height: 'fit-content !important', width: '100% !important' },
  '.react-pdf__Page__svg > svg': { height: 'fit-content !important', width: '100% !important' },
  '.react-pdf__Page__annotations': { height: 'fit-content !important', width: '100% !important' }
}));

const StyledPage = styled(Page)(({ theme }) => ({
  '.react-pdf__Page': { height: '100% !important' },
  '.react-pdf__Page__svg': { height: '100% !important', width: '100% !important' },
  '.react-pdf__Page__svg > svg': { height: '100% !important', width: '100% !important' },
  [theme.breakpoints.between(1300, 1400)]: {
    '.react-pdf__Page__svg': { width: '550px !important' },
    '.react-pdf__Page__svg > svg': { width: '550px !important' }
  },
  [theme.breakpoints.between(1200, 1300)]: {
    '.react-pdf__Page__svg': { width: '500px !important' },
    '.react-pdf__Page__svg > svg': { width: '500px !important' },
    '.react-pdf__Page': { width: '500px !important' }
  },
  [theme.breakpoints.down(1200)]: {
    '.react-pdf__Page__svg': { width: '100% !important' },
    '.react-pdf__Page__svg > svg': { width: '100% !important' }
  },
  [theme.breakpoints.between(800, 900)]: {
    '.react-pdf__Page__svg': { height: '100% !important' },
    '.react-pdf__Page__svg > svg': { height: '100% !important' },
    '.react-pdf__Page': { height: '100% !important' }
  },
  [theme.breakpoints.down(800)]: {
    '.react-pdf__Page__svg': { height: '380px !important' },
    '.react-pdf__Page__svg > svg': { height: '380px !important' }
  },
  [theme.breakpoints.down('sm')]: {
    '.react-pdf__Page__svg': { height: '100% !important' },
    '.react-pdf__Page__svg > svg': { height: '100% !important' },
    '.react-pdf__Page': { height: '100% !important' }
  }
}));

export const ModalDocument = styled(Document)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '.react-pdf__Page': {
    width: '100% !important',
    top: 0,
    left: 0,
    right: 0
  }
}));

const PdfDocument = styled(Document)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '.react-pdf__Page': {
    position: 'absolute !important',
    height: '100%',
    top: 0,
    left: 0,
    right: 0
  },
  [theme.breakpoints.down('sm')]: {
    height: 'auto'
  },
  [theme.breakpoints.between(1200, 1400)]: {
    width: '100%',
    height: 'auto',
    minHeight: '280px !important'
  },
  [theme.breakpoints.between(901, 1200)]: {
    width: '100%',
    height: 'auto',
    minHeight: '280px !important'
  },
  [theme.breakpoints.between(601, 900)]: {
    height: 'auto !important',
    minHeight: '400px !important'
  },
  [theme.breakpoints.between(401, 500)]: {
    height: 'auto !important',
    minHeight: '250px !important'
  },
  [theme.breakpoints.between(500, 600)]: {
    height: 'auto !important',
    minHeight: '325px !important'
  },
  [theme.breakpoints.between(300, 400)]: {
    height: 'auto !important',
    minHeight: '200px !important'
  }
}));

const useStyles = makeStyles((theme: Theme) => ({
  modalView: {
    width: '90%',
    maxWidth: '1200px',
    height: 'fit-content',
    margin: 'auto'
  },
  standard: {
    height: '347px'
  },
  actionsContainer: {
    display: 'flex'
  },

  actionBtn: {
    textAlign: 'center',
    backgroundColor: '#4D4DCD',
    color: '#FFFFFF',
    fontSize: '14px',
    borderRadius: '8px',
    padding: '10px',
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      backgroundColor: '#4D4DCD',
      opacity: 0.9
    }
  },
  fullScreen: {},
  downloadBtn: {
    marginRight: '10px'
  },
  navigation: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#F6F7F8',
    borderRadius: '8px'
  },
  errorBox: {
    backgroundColor: '#F6F7F8',
    height: '90%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    padding: '8px',
    margin: '0 3px',
    width: '40px'
  }
}));

export const Navigation = ({
  pdfUrl,
  pdfDownloadable,
  pageNumber,
  numPages,
  pageHandler,
  viewType,
  setViewType,
  setError,
  trackEventHandler
}: NavigationProps) => {
  const classes = useStyles();
  const [currentPage, setCurrentPage] = useState<any>(pageNumber);

  const customNavigationHandler = (index: number) => {
    if (numPages && typeof index === 'number') {
      if (index !== 0) setCurrentPage(index);

      if (index === 0) {
        pageHandler(pageNumber);
        setCurrentPage('');
      } else if (index >= 1 && index <= numPages) {
        pageHandler(index);
        setError(false);
      } else {
        setError(true);
      }
    }
  };

  const pdfDownloadButton = () => {
    if (pdfDownloadable) {
      return (
        <a
          href={pdfUrl}
          className={`${classes.actionBtn} ${classes.downloadBtn}`}
          rel="noreferrer"
          target="_blank"
          onClick={() => trackEventHandler(SLIDE_EVENTS.downloaded_pdf)}
          download
          data-testid="pdf-download-button"
        >
          {/* // eslint-disable-next-line jsx-a11y/alt-text */}
          <img width="20px" src="/static/cohorts-home/sessions/ic_download.svg" alt="full-screen" />
        </a>
      );
    }
    return null;
  };

  return (
    <NavigationContainer
      style={{ justifyContent: viewType === VIEW_TYPES.STANDARD_VIEW ? 'space-between' : 'center' }}
    >
      <Box className={classes.navigation}>
        <StyledButton
          disabled={pageNumber === 1}
          onClick={() => {
            customNavigationHandler(pageNumber - 1);
            trackEventHandler(SLIDE_EVENTS.navigated_left);
          }}
          data-testid="slides-left"
        >
          <img src="/static/icons/ic_chevron_left.svg" alt="" />
        </StyledButton>
        Page{' '}
        <input
          data-testid="slides-page-number"
          value={currentPage}
          className={classes.inputBox}
          type="number"
          onChange={(e) => customNavigationHandler(Number(e.target.value))}
        />
        of {numPages}
        <StyledButton
          data-testid="slides-right"
          disabled={pageNumber === numPages}
          onClick={() => {
            customNavigationHandler(pageNumber + 1);
            trackEventHandler(SLIDE_EVENTS.navigated_right);
          }}
        >
          <img src="/static/icons/ic_chevron_right.svg" alt="" />
        </StyledButton>
      </Box>

      {viewType === VIEW_TYPES.STANDARD_VIEW && (
        <div className={classes.actionsContainer} data-testid="slides-buttons-container">
          {pdfDownloadButton()}
          <a
            className={`${classes.actionBtn} ${classes.fullScreen}`}
            onClick={() => {
              setViewType(VIEW_TYPES.FULL_VIEW);
              trackEventHandler(SLIDE_EVENTS.full_screen_view);
            }}
            href="#"
            data-testid="slides-full-screen"
          >
            {/* // eslint-disable-next-line jsx-a11y/alt-text */}
            <img src="/static/cohorts-home/sessions/full-view.svg" width="20px" alt="full-screen" />
          </a>
        </div>
      )}
    </NavigationContainer>
  );
};

const VIEW_TYPES = {
  STANDARD_VIEW: 'standard',
  FULL_VIEW: 'full'
};

export default function Slides({
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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [viewType, setViewType] = useState<string>(VIEW_TYPES.STANDARD_VIEW);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (pdfUrl) {
      onTrack(SLIDE_EVENTS.opened);
      setNumPages(null);
      setPageNumber(1);
      setViewType(VIEW_TYPES.STANDARD_VIEW);
      setError(false);
    }
  }, [pdfUrl]);

  const classes = useStyles();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const pdfSlider = (type: string) => (
    <div data-testid="session-pdf-slides">
      {type === VIEW_TYPES.STANDARD_VIEW ? (
        <PdfDocument
          className={classes.standard}
          file={{
            url: pdfUrl
          }}
          externalLinkTarget="_blank"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          {error ? (
            <div className={classes.errorBox}>
              <Typography variant="h4">That slide does not exist</Typography>
            </div>
          ) : (
            <StyledPage
              renderMode="svg"
              scale={0.65}
              pageNumber={pageNumber}
              renderAnnotationLayer={true}
            />
          )}
        </PdfDocument>
      ) : (
        <ModalDocument
          className={classes.modalView}
          file={{
            url: pdfUrl
          }}
          loading={
            <Typography
              variant="subtitle1"
              color="primary"
              style={{ backgroundColor: '#ffff', padding: '1rem 3rem', borderRadius: '10px' }}
            >
              Loading Pdf...
            </Typography>
          }
          externalLinkTarget="_blank"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          {error ? (
            <div className={classes.errorBox}>
              <Typography variant="h4">That slide does not exist</Typography>
            </div>
          ) : (
            <ModalPage
              renderMode="svg"
              scale={1.15}
              pageNumber={pageNumber}
              renderAnnotationLayer={true}
            />
          )}
        </ModalDocument>
      )}
      {numPages !== null && (
        <div style={{ marginTop: '35px' }}>
          <Navigation
            pdfUrl={pdfUrl}
            pdfDownloadable={pdfDownloadable}
            viewType={viewType}
            pageNumber={pageNumber}
            numPages={numPages}
            setViewType={setViewType}
            pageHandler={setPageNumber}
            setError={setError}
            trackEventHandler={(eventType: string) => onTrack(eventType)}
          />
        </div>
      )}
    </div>
  );

  const renderView = () =>
    viewType === VIEW_TYPES.STANDARD_VIEW ? (
      pdfSlider(VIEW_TYPES.STANDARD_VIEW)
    ) : (
      <div>
        <Modal open={true} onClose={() => setViewType(VIEW_TYPES.STANDARD_VIEW)}>
          {pdfSlider(VIEW_TYPES.FULL_VIEW)}
        </Modal>
      </div>
    );

  return (
    <Container>
      {/* // eslint-disable-next-line no-nested-ternary */}
      {!isFree && pdfUrl && pdfUrl !== '' ? (
        renderView()
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
