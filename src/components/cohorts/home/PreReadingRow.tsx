import React from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SessionMaterial } from '../../../@types/cohorts';
import MarkCheckbox from './MarkCheckbox';

type PreReadingRowProps = {
  item: SessionMaterial;
  number: Number | undefined;
  checkboxHanlder: Function;
  onPreReadingClick: Function;
};

const StyledLink = styled('a')(() => ({
  textDecoration: 'underline',
  fontWeight: 'bold',
  marginLeft: '10px',
  color: '#4D4DCD'
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
  return (
    <StyledBox className="main">
      <StyledBox className="inner">
        <p data-testid={`prereading-name-${number}`}>{item.name}</p>
        <StyledBox className="secondary">
          <span>{item.info_text}</span>
          <StyledLink
            data-testid={`prereading-link-${number}`}
            href={item.action_url || item.file_url}
            target="_blank"
            onClick={() => onPreReadingClick()}
          >
            {item.action_text}
          </StyledLink>
        </StyledBox>
      </StyledBox>
      <StyledBox className="check-box">
        <MarkCheckbox completed={item.complete} onChange={checkboxHanlder} number={number} />
      </StyledBox>
    </StyledBox>
  );
}
