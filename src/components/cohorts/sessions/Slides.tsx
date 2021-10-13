/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from 'react';
import { Button, Container, Box, Theme, TextField, Typography } from '@material-ui/core';
import Modal from 'components/animate/Modal';

import { Document, Page, pdfjs } from 'react-pdf';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Message from '../../Message';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type NavigationProps = {
  pdfUrl: string | undefined;
  pageNumber: number;
  numPages: number | null;
  pageHandler: Function;
  setViewType: Function;
  viewType: string;
  setError: Function;
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

const StyledPage = styled(Page)(({ theme }) => ({
  '.react-pdf__Page__canvas': {
    width: '100% !important',
    height: 'auto !important'
  },
  [theme.breakpoints.between(1200, 1400)]: {
    height: 'auto !important'
  },
  [theme.breakpoints.between(600, 700)]: {
    height: 'auto !important'
  }
}));

const PdfDocument = styled(Document)(({ theme }) => ({
  // height: '700px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0.75rem 0rem',
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
  [theme.breakpoints.between(701, 900)]: {
    height: 'auto !important',
    minHeight: '280px !important'
  },

  [theme.breakpoints.between(401, 700)]: {
    height: 'auto !important',
    minHeight: '250px !important'
  },
  [theme.breakpoints.between(300, 400)]: {
    height: 'auto !important',
    minHeight: '200px !important'
  }
}));

const useStyles = makeStyles((theme: Theme) => ({
  modalView: {
    height: '700px'
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
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputBox: {
    padding: '8px',
    margin: '0 3px',
    width: '80px',
    [theme.breakpoints.down('sm')]: {
      width: '50px'
    }
  }
}));

const Navigation = ({
  pdfUrl,
  pageNumber,
  numPages,
  pageHandler,
  viewType,
  setViewType,
  setError
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

  return (
    <NavigationContainer
      style={{ justifyContent: viewType === VIEW_TYPES.STANDARD_VIEW ? 'space-between' : 'center' }}
    >
      <Box className={classes.navigation}>
        <StyledButton
          disabled={pageNumber === 1}
          onClick={() => customNavigationHandler(pageNumber - 1)}
        >
          <img src="/static/icons/ic_chevron_left.svg" alt="" />
        </StyledButton>
        Page{' '}
        <input
          value={currentPage}
          className={classes.inputBox}
          type="number"
          placeholder="Slide#"
          onChange={(e) => customNavigationHandler(Number(e.target.value))}
        />
        of {numPages}
        <StyledButton
          disabled={pageNumber === numPages}
          onClick={() => customNavigationHandler(pageNumber + 1)}
        >
          <img src="/static/icons/ic_chevron_right.svg" alt="" />
        </StyledButton>
      </Box>

      {viewType === VIEW_TYPES.STANDARD_VIEW && (
        <div className={classes.actionsContainer}>
          <a
            href={pdfUrl}
            className={`${classes.actionBtn} ${classes.downloadBtn}`}
            rel="noreferrer"
            target="_blank"
            download
          >
            {/* // eslint-disable-next-line jsx-a11y/alt-text */}
            <img
              width="20px"
              src="/static/cohorts-home/sessions/ic_download.svg"
              alt="full-screen"
            />
          </a>

          <a
            className={`${classes.actionBtn} ${classes.fullScreen}`}
            onClick={() => setViewType(VIEW_TYPES.FULL_VIEW)}
            href="#"
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

export default function Slides({ pdfUrl }: { pdfUrl: string | undefined }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [viewType, setViewType] = useState<string>(VIEW_TYPES.STANDARD_VIEW);
  const [error, setError] = useState(false);

  const classes = useStyles();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const pdfSlider = (type: string) => (
    <div>
      <PdfDocument
        className={type === VIEW_TYPES.STANDARD_VIEW ? classes.standard : classes.modalView}
        file={{
          url: 'https://scholarsite-public.s3.eu-west-2.amazonaws.com/EODP+S21+Session+2.pptx.pdf'
        }}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        {error ? (
          <div className={classes.errorBox}>
            <Typography variant="h4">That slide does not exist</Typography>
          </div>
        ) : (
          <StyledPage pageNumber={pageNumber} />
        )}
      </PdfDocument>
      {numPages !== null && (
        <div>
          <Navigation
            pdfUrl={pdfUrl}
            viewType={viewType}
            pageNumber={pageNumber}
            numPages={numPages}
            setViewType={setViewType}
            pageHandler={setPageNumber}
            setError={setError}
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
          <div style={{ height: '710px' }}>{pdfSlider(VIEW_TYPES.FULL_VIEW)}</div>
        </Modal>
      </div>
    );

  return (
    <Container>
      {/* // eslint-disable-next-line no-nested-ternary */}
      {pdfUrl && pdfUrl !== '' ? (
        renderView()
      ) : (
        <Message content="The presentation slides will be available shortly after this session." />
      )}
    </Container>
  );
}
