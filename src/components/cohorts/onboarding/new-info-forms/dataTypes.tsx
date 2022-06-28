import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { MainContainer, ButtonsContainer } from '../Common';

export type GoalsType = {
  name: string;
  role_title: string;
  goals: string;
  improvements: string;
};

export type HouseKeepingInfoType = {
  interested_in_being_matched?: boolean;
  referred_by: string;
};

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  '&.next': {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '50px',
      bottom: '30px',
      width: '300px !important'
    },
    '&:hover': {
      backgroundColor: '#5A189A',
      opacity: 0.8,
      color: 'white'
    }
  },
  '&.previous': {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      bottom: '30px',
      width: '300px !important'
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
      opacity: 0.8
    }
  },

  [theme.breakpoints.down('sm')]: {
    position: null,
    bottom: null,
    right: null,
    width: '100%',
    marginTop: '10px'
  }
}));

export const NavigationButtons = ({
  showPrevButton = true,
  disabled,
  onPreviousHandler,
  onNextHandler,
  isSubmitBtn = false,
  isSubmitting = false,
  displayMessage = true,
  previousButtonText = 'Previous',
  nextButtonText = 'Next'
}: {
  showPrevButton: boolean;
  disabled: boolean;
  onPreviousHandler: Function;
  onNextHandler: Function;
  isSubmitBtn?: boolean;
  isSubmitting?: boolean;
  displayMessage?: boolean;
  previousButtonText?: string;
  nextButtonText?: string;
}) => (
  <MainContainer>
    {displayMessage && (
      <Typography className="txt" variant="caption">
        Please enter all of your details to {isSubmitBtn ? 'submit' : 'move to the next page'}
      </Typography>
    )}
    <ButtonsContainer>
      {showPrevButton && (
        <StyledButton
          data-testid="btn_previous"
          className="previous"
          disabled={isSubmitting}
          variant="outlined"
          onClick={() => onPreviousHandler()}
        >
          {previousButtonText}
        </StyledButton>
      )}

      <StyledButton
        data-testid="btn_next"
        variant="contained"
        className="next"
        loading={isSubmitting}
        disabled={disabled}
        onClick={() => onNextHandler()}
      >
        {nextButtonText ? `${nextButtonText}` : 'Next'}
      </StyledButton>
    </ButtonsContainer>
  </MainContainer>
);
