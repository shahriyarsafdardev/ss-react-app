import { styled } from '@material-ui/core/styles';
import { Card, Stack, Button, Box } from '@material-ui/core';

export type Event = {
  name: string;
  time: string;
  description: string;
};

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '30px',
  boxShadow: 'none',
  marginTop: '2rem',
  '&:hover': {
    boxShadow: '0px 2px 9px rgba(7, 26, 51, 0.1)',
    cursor: 'pointer'
  }
}));

export const StyledTime = styled(Stack)(({ theme }) => ({
  backgroundColor: '#F6F7F8',
  borderRadius: '8px',
  padding: '5px 10px'
}));

export const StyledModal = styled(Card)(({ theme }) => ({
  width: '100%',
  padding: '100px'
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '30px'
}));

export const LoadingContainer = styled(Box)(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%'
}));
