import { Box } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

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
    span: {
      opacity: 0.4
    }
  },
  '&.inner': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '15px',
    width: '100%',
    fontSize: '36px',
    minHeight: '110px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
    p: {
      color: '#4D4DCD'
    }
  }
}));

export default function PreReadingRow() {
  return (
    <StyledBox className="main">
      <StyledBox className="inner">
        <p>GoodBye</p>
        <StyledBox className="secondary">
          <span>See you soon!</span>
        </StyledBox>
      </StyledBox>
    </StyledBox>
  );
}
