import { Box } from '@material-ui/core';
import { styled, Theme, useTheme } from '@material-ui/core/styles';

type ToDoItemProps = {
  item: any;
  onClick: Function;
};

const StyledCheckBox = styled(Box)(
  ({ theme, background }: { theme: Theme; background: '#EEEFF7' }) => ({
    width: '92px',
    height: '100%',
    backgroundColor: background,
    borderRadius: '0px 8px 8px 0px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '53px',
      flexDirection: 'row',
      borderRadius: '0px 0px 8px 8px',
      justifyContent: 'flex-start'
    }
  })
);

const StyledLink = styled('a')(() => ({
  textDecoration: 'underline',
  fontWeight: 'bold',
  marginLeft: '10px'
}));

const StyledBox = styled(Box)(({ theme }) => ({
  '&.main': {
    background: '#F7F8F9',
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
    fontSize: '14px',
    [theme.breakpoints.down('sm')]: {
      margin: '5px 0 10px 0',
      display: 'flex',
      justifyContent: 'space-between'
    },
    span: {
      opacity: 0.4,
      fontSize: '14px'
    }
  },
  '&.red': {
    color: '#FF4842'
  },
  '&.inner': {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '15px',
    minHeight: '85px',
    [theme.breakpoints.down('sm')]: {
      width: '100%'
    }
  }
}));

export default function ToDoItem({ item, onClick }: ToDoItemProps) {
  const theme = useTheme();
  return (
    <StyledBox className="main">
      <StyledBox className="inner">
        <p>
          <strong>{item.heading}</strong>
        </p>
        <StyledBox className={`secondary, ${item.due === 'Today' && !item.complete ? 'red' : ''}`}>
          <span>{item.complete ? 'Complete' : `Complete by: ${item.due}`}</span>
        </StyledBox>
      </StyledBox>
      <StyledBox className="check-box">
        <StyledCheckBox
          theme={theme}
          background={
            (item.complete && 'rgba(0, 171, 85, 0.12)') ||
            (item.due === 'Today' && 'rgba(255, 72, 66, 0.12)') ||
            '#EEEFF7'
          }
        >
          <a href={item.link || ''} onClick={() => onClick()}>
            <img
              data-testid="left-arrow-icon"
              src={`/static/cohorts-home/${
                (item.complete && 'check-green') ||
                (item.due === 'Today' && 'red-right-arrow') ||
                'right-arrow'
              }.svg`}
              alt="left arrow"
            />
          </a>
        </StyledCheckBox>
      </StyledBox>
    </StyledBox>
  );
}
