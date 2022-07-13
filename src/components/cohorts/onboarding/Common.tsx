import { styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

export const ButtonsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export const MainContainer = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  minHeight: '80px',
  marginTop: '30px',
  [theme.breakpoints.down('sm')]: {
    textAlign: 'center'
  },
  '.txt': {
    color: '#6C7885',
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '50px',
      bottom: '90px'
    },
    [theme.breakpoints.down('sm')]: {
      position: null,
      bottom: null,
      right: null
    }
  }
}));

export const checkFormValidity = (form: Object) => {
  const invalidFields = Object.values(form).map((item) =>
    item === false ? item : !item || item.length === 0
  );

  return invalidFields.filter((field) => field === true).length > 0;
};
