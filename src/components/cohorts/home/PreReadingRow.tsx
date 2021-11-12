import React from 'react';
import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SessionMaterial } from '../../../@types/cohorts';
import MarkCheckbox from './MarkCheckbox';

type PreReadingRowProps = {
  item: SessionMaterial;
  checkboxHanlder: Function;
};

const StyledLink = styled('a')(() => ({
  textDecoration: 'underline',
  fontWeight: 'bold',
  marginRight: '20px',
  color: '#4D4DCD'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  '&.main': {
    backgroundColor: 'rgba(229, 231, 235, 0.3)',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    borderRadius: '8px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
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
    padding: '15px',
    width: '70%',
    minHeight: '110px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

export default function PreReadingRow({ item, checkboxHanlder }: PreReadingRowProps) {
  return (
    <StyledBox className="main">
      <StyledBox className="inner">
        <p>{item.name}</p>
        <StyledBox className="secondary">
          <StyledLink href={item.action_url}>{item.action_text}</StyledLink>
          <span>{item.info_text}</span>
        </StyledBox>
      </StyledBox>
      <Box>
        <MarkCheckbox completed={item.complete} onChange={checkboxHanlder} />
      </Box>
    </StyledBox>
  );
}
