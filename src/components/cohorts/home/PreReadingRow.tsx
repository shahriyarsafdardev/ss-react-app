import React, { useState } from 'react';
import { Box, Theme, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Modal from 'components/animate/Modal';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/umd/Page/AnnotationLayer.css';
import { pdfjs } from 'react-pdf';
import { makeStyles } from '@material-ui/styles';
import MarkCheckbox from './MarkCheckbox';
import { SessionMaterial } from '../../../@types/cohorts';
import { Navigation, ModalDocument, ModalPage } from '../sessions/Slides';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const url_prefix = 'https://';

type PreReadingRowProps = {
  item: SessionMaterial;
  number: Number | undefined;
  checkboxHanlder: Function;
  onPreReadingClick: Function;
};

const StyledLink = styled('a')(({ theme }) => ({
  textDecoration: 'underline',
  fontWeight: 'bold',
  marginLeft: '10px',
  color: theme.palette.primary.main
}));

const StyledButton = styled('label')(({ theme }) => ({
  textDecoration: 'underline',
  fontWeight: 'bold',
  cursor: 'pointer',
  marginLeft: '10px',
  color: theme.palette.primary.main
}));

const useStyles = makeStyles((theme: Theme) => ({
  modalView: {
    width: '90%',
    maxWidth: '1200px',
    height: 'fit-content',
    margin: 'auto'
  },
  loading: {
    backgroundColor: '#FFFFF',
    padding: '1rem',
    textAlign: 'center'
  },
  errorBox: {
    backgroundColor: '#F6F7F8',
    height: '90%',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const StyledBox = styled(Box)(({ theme }) => ({
  '&.main': {
    width: '100%',
    backgroundColor: 'rgba(229, 231, 235, 0.3)',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    },
    marginRight: '4px'
  },
  '&.secondary': {
    marginTop: '5px',
    fontSize: '15px',
    [theme.breakpoints.down('sm')]: {
      margin: '5px 0 10px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    span: {
      opacity: 0.4
    }
  },
  '&.inner': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '15px',
    minHeight: '110px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  },
  '&.check-box': {
    '&:hover': {
      span: {
        backgroundColor: 'rgba(77, 77, 205, 0.04)'
      }
    }
  }
}));

export default function PreReadingRow({
  item,
  checkboxHanlder,
  onPreReadingClick,
  number
}: PreReadingRowProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }
  return (
    <>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div data-testid="pre-reading-pdf-slides">
          <ModalDocument
            className={classes.modalView}
            loading={
              <Typography
                variant="subtitle1"
                color="primary"
                style={{ backgroundColor: '#ffff', padding: '1rem 3rem', borderRadius: '10px' }}
              >
                Loading Pdf...
              </Typography>
            }
            file={{
              url: item.action_url
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
              <ModalPage
                renderMode="svg"
                scale={1.15}
                pageNumber={pageNumber}
                renderAnnotationLayer={true}
              />
            )}
          </ModalDocument>
          {numPages !== null && (
            <div style={{ marginTop: '35px' }}>
              <Navigation
                pdfUrl={item.action_url}
                pdfDownloadable={false}
                viewType="full"
                pageNumber={pageNumber}
                numPages={numPages}
                setViewType={() => setOpen(false)}
                pageHandler={setPageNumber}
                setError={setError}
                trackEventHandler={() => {}}
              />
            </div>
          )}
        </div>
      </Modal>
      <StyledBox className="main">
        <StyledBox className="inner">
          <p data-testid={`prereading-name-${number}`}>{item.name}</p>
          <StyledBox className="secondary">
            <span>{item.info_text}</span>
            {item.is_private ? (
              <StyledButton
                data-testid={`prereading-button-${number}`}
                onClick={() => setOpen(true)}
              >
                {item.action_text}
              </StyledButton>
            ) : (
              <StyledLink
                data-testid={`prereading-link-${number}`}
                href={
                  item.action_url.substr(0, 'http'.length) !== 'http'
                    ? url_prefix + item.action_url
                    : item.action_url
                }
                target="_blank"
                onClick={() => onPreReadingClick()}
              >
                {item.action_text}
              </StyledLink>
            )}
          </StyledBox>
        </StyledBox>
        <StyledBox className="check-box">
          <MarkCheckbox completed={item.complete} onChange={checkboxHanlder} number={number} />
        </StyledBox>
      </StyledBox>
    </>
  );
}
