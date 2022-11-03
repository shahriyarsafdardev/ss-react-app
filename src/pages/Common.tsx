import { makeStyles } from '@material-ui/styles';

export const useStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root.Mui-error fieldset': {
      border: '2px solid #DF1B41'
    },
    '& .MuiOutlinedInput-root.Mui-focused fieldset': {
      borderWidth: '1px'
    },
    '& .MuiOutlinedInput-root.Mui-error.Mui-focused fieldset': {
      borderColor: '#475569'
    }
  },
  input: {
    '&::placeholder': {
      color: '#D3D3D3'
    }
  },
  helperText: {
    fontSize: '14.88px',
    margin: '0',
    '&.MuiFormHelperText-root.Mui-error': {
      color: '#DF1B41'
    }
  }
});
