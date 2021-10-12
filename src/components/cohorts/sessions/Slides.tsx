import { useState } from 'react';
import { Button, Container } from '@material-ui/core';
import Modal from 'components/animate/Modal';

import { Document, Page, pdfjs } from 'react-pdf';
import { styled } from '@material-ui/core/styles';
import Message from '../../Message';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type NavigationProps = {
  pageNumber: number;
  numPages: number | null;
  pageHandler: Function;
  setViewType: Function;
  viewType: string;
};

const NavigationContainer = styled('div')((props) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative'
}));

const StyledButton = styled(Button)((props) => ({
  padding: '10px',
  backgroundColor: 'white',
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
  height: 'auto',
  minHeight: '347px',
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
  [theme.breakpoints.between(900, 1000)]: {
    width: '100%',
    height: 'auto',
    minHeight: '280px !important'
  },
  [theme.breakpoints.between(300, 400)]: {
    height: 'auto !important',
    minHeight: '200px !important'
  },
  [theme.breakpoints.between(401, 700)]: {
    height: 'auto !important',
    minHeight: '250px !important'
  }
}));

const ViewToggler = styled(Button)(() => ({
  position: 'absolute',
  right: '5px',
  bottom: '5px',
  backgroundColor: '#4D4DCD',
  color: '#FFFFFF',
  '&:hover': {
    backgroundColor: '#4D4DCD',
    opacity: 0.9
  }
}));

const Navigation = ({
  pageNumber,
  numPages,
  pageHandler,
  viewType,
  setViewType
}: NavigationProps) => (
  <NavigationContainer>
    <StyledButton disabled={pageNumber === 1} onClick={() => pageHandler(pageNumber - 1)}>
      <img src="/static/icons/ic_chevron_left.svg" alt="" />
    </StyledButton>
    <span>{`Page ${pageNumber} of ${numPages}`}</span>
    <StyledButton disabled={pageNumber === numPages} onClick={() => pageHandler(pageNumber + 1)}>
      <img src="/static/icons/ic_chevron_right.svg" alt="" />
    </StyledButton>
    {viewType === VIEW_TYPES.STANDARD_VIEW && (
      <ViewToggler onClick={() => setViewType(VIEW_TYPES.FULL_VIEW)}>
        Full Screen Preview
      </ViewToggler>
    )}
  </NavigationContainer>
);

const VIEW_TYPES = {
  STANDARD_VIEW: 'standard',
  FULL_VIEW: 'full'
};

export default function Slides({ pdfUrl }: { pdfUrl: string | undefined }) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [viewType, setViewType] = useState<string>(VIEW_TYPES.STANDARD_VIEW);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const pdfSlider = () => (
    <div>
      <PdfDocument
        file={{
          url: 'https://scholarsite-public.s3.eu-west-2.amazonaws.com/EODP+S21+Session+2.pptx.pdf'
        }}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={console.error}
      >
        <StyledPage pageNumber={pageNumber} />
      </PdfDocument>
      {numPages !== null && (
        <div>
          <Navigation
            viewType={viewType}
            pageNumber={pageNumber}
            numPages={numPages}
            setViewType={setViewType}
            pageHandler={setPageNumber}
          />
        </div>
      )}
    </div>
  );

  const renderView = () =>
    viewType === VIEW_TYPES.STANDARD_VIEW ? (
      pdfSlider()
    ) : (
      <div>
        <Modal open={true} onClose={() => setViewType(VIEW_TYPES.STANDARD_VIEW)}>
          {pdfSlider()}
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
