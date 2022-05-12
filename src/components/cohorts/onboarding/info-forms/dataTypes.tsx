import { styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

import { LoadingButton } from '@material-ui/lab';

export type CompanyProfileType = {
  name: string;
  logo_url: File | any;
  industries: string[];
  number_of_employees: String;
};

export type GoalsType = {
  name: string;
  role_title: string;
  goals: string;
  improvements: string;
};

export type InfoType = {
  role_title: string;
  role_category: string[];
  do_manage_team: boolean;
  role_description: string;
};

export type NetworkInfoType = {
  networking_industries_categories: string[];
  networking_roles_categories: string[];
  interested_in_being_matched: boolean;
};

export type HouseKeepingInfoType = {
  interested_in_being_matched: boolean;
  referred_by: string;
};

const ButtonsContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const MainContainer = styled(Box)(({ theme }) => ({
  textAlign: 'right',
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
      backgroundColor: '#4D4DCD',
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
      backgroundColor: 'white',
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
  previousButtonText = 'Previous',
  nextButtonText = 'Next'
}: {
  showPrevButton: boolean;
  disabled: boolean;
  onPreviousHandler: Function;
  onNextHandler: Function;
  isSubmitBtn?: boolean;
  isSubmitting?: boolean;
  previousButtonText?: string;
  nextButtonText?: string;
}) => (
  <MainContainer>
    <Typography className="txt" variant="caption">
      Please enter all of your details to {isSubmitBtn ? 'submit' : 'move to the next page'}
    </Typography>
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

export const checkFormValidity = (form: Object) => {
  console.log(form);
  const invalidFields = Object.values(form).map((item) =>
    item === false ? item : !item || item.length === 0
  );

  return invalidFields.filter((field) => field === true).length > 0;
};
