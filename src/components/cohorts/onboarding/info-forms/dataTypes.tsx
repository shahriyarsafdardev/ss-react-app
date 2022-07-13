import { styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { MainContainer, ButtonsContainer } from '../Common';

export type CompanyProfileType = {
  name: string;
  logo_url: File | any;
  industries: string[];
  number_of_employees: String;
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
  current_understanding: string;
  payed_by: string;
  referred_by: string;
};

const StyledButton = styled(LoadingButton)(({ theme }) => ({
  padding: 11,
  '&.next': {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '50px',
      bottom: '30px',
      width: '200px !important'
    }
  },
  '&.previous': {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      right: '280px',
      bottom: '30px',
      width: '200px !important'
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
  isSubmitting = false
}: {
  showPrevButton: boolean;
  disabled: boolean;
  onPreviousHandler: Function;
  onNextHandler: Function;
  isSubmitBtn?: boolean;
  isSubmitting?: boolean;
}) => (
  <MainContainer sx={{ minHeight: '80px' }}>
    <Typography className="txt" variant="caption">
      Please enter all of your details to {isSubmitBtn ? 'submit' : 'move to the next page'}
    </Typography>
    <ButtonsContainer>
      {showPrevButton && (
        <StyledButton
          data-testid="btn_previous"
          className="previous"
          color="primary"
          disabled={isSubmitting}
          variant="outlined"
          onClick={() => onPreviousHandler()}
        >
          Previous
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
        {isSubmitBtn ? 'Complete Onboarding' : 'Next'}
      </StyledButton>
    </ButtonsContainer>
  </MainContainer>
);
