import { useState } from 'react';
import { Button, Container } from '@material-ui/core';

import { Document, Page, pdfjs } from 'react-pdf';
import { styled } from '@material-ui/core/styles';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type NavigationProps = {
  pageNumber: number;
  numPages: number | null;
  pageHandler: Function;
};

const NavigationContainer = styled('div')((props) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));

const StyledButton = styled(Button)((props) => ({
  padding: '10px',
  backgroundColor: 'white',
  '&:disabled': {
    opacity: '0.5'
  }
}));

const Navigation = ({ pageNumber, numPages, pageHandler }: NavigationProps) => (
  <NavigationContainer>
    <StyledButton disabled={pageNumber === 1} onClick={() => pageHandler(pageNumber - 1)}>
      <img src="/static/icons/ic_chevron_left.svg" alt="" />
    </StyledButton>
    <span>{`Page ${pageNumber} of ${numPages}`}</span>
    <StyledButton disabled={pageNumber === numPages} onClick={() => pageHandler(pageNumber + 1)}>
      <img src="/static/icons/ic_chevron_right.svg" alt="" />
    </StyledButton>
  </NavigationContainer>
);

export default function Slides() {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <Container>
      <div>
        <Document
          file={{
            url: 'https://scholarsite-public.s3.eu-west-2.amazonaws.com/EODP+S21+Session+2.pptx.pdf'
          }}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        {numPages !== null && (
          <Navigation pageNumber={pageNumber} numPages={numPages} pageHandler={setPageNumber} />
        )}
      </div>
    </Container>
  );
}
