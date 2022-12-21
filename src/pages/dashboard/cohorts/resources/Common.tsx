import { memo, useEffect } from 'react';
import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core/styles';
import {
  ToggleButton,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Card,
  Stack,
  Button
} from '@material-ui/core';
import { Modal } from 'components/animate';
import { trackEvent } from 'utils/eventTracking';

export const getDisplayName = (type: String) => {
  switch (type) {
    case 'Academic Paper':
      return 'Academic Papers';
    case 'Article':
      return 'Articles';
    case 'Book':
      return 'Books';
    case 'Book Passage':
      return 'Book Passages';
    case 'Jupyter Notebook':
      return 'Jupyter';
    case 'Spreadsheet':
      return 'Spreadsheets';
    case 'Video':
      return 'Videos';
    default:
      return type;
  }
};

export const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  width: '100%',
  height: 4,
  borderRadius: 5,
  marginRight: 8,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 400 : 800]
  }
}));

export const StyledImage = styled('img')(({ theme }) => ({
  height: 'auto',
  width: '50px',
  minWidth: '50px',
  maxHeight: '50px'
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: 'rgba(225, 228, 231, 0.3)',
  padding: '10px 18px',
  border: 'none',
  borderRadius: '10px !important',
  marginLeft: '0 !important',
  marginRight: '15px',
  marginTop: '10px'
}));

export const ToggleButtonTypography = styled(Typography)(({ theme }) => ({
  color: '#334155',
  fontSize: '16px'
}));

export const SearchbarStyle = styled('div')(({ theme }) => ({
  marginBottom: '20px'
}));

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    fontSize: '16px',
    border: '1px solid #101658',
    fontWeight: '400',
    color: '#101658',
    padding: '10px'
  }
}));

export const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0px 2px 9px rgba(7, 26, 51, 0.1)'
  }
}));

export const getColor = (type: String) => {
  switch (type) {
    case 'Academic Paper':
      return '#56CCF2';
    case 'Article':
      return '#D96BC1';
    case 'Book':
      return '#F2C94C';
    case 'Book Passage':
      return '#2F80ED';
    case 'Github':
      return '#9B51E0';
    case 'Jupyter Notebook':
      return '#F2994A';
    case 'Slides':
      return '#EB5757';
    case 'Spreadsheet':
      return '#219653';
    case 'Video':
      return '#EB5757';
    default:
      return '#828282';
  }
};

export const types = [
  'Academic Paper',
  'Article',
  'Book',
  'Book Passage',
  'Jupyter Notebook',
  'Spreadsheet',
  'Video',
  'Slides',
  'Github',
  'Other'
];

export const ResourceIcon = styled('div')(({ theme }) => ({
  width: '50px',
  minWidth: '50px',
  height: '50px',
  maxHeight: '50px',
  display: 'flex',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.disabled,
  '& img': { width: '100%', height: '100%' }
}));

export const ResourceType = styled('div')(({ theme }) => ({
  opacity: 0,
  width: '100%',
  height: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: '10px',
  transition: theme.transitions.create('opacity'),
  '&:hover': { opacity: 1 }
}));

export const ResourceDetailBox = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

export const StyledModal = styled(Modal)(({ theme }) => ({
  width: '35% !important',
  minWidth: '440px',
  maxWidth: '530px',
  margin: 'auto',
  [theme.breakpoints.down('sm')]: {
    minWidth: '90% !important'
  }
}));

export const ModalCard = styled(Card)(({ theme }) => ({
  padding: '80px 40px',
  [theme.breakpoints.down('sm')]: {
    padding: '80px 10px'
  }
}));

export const ReachedLimitModal = memo(
  ({
    open,
    shouldOpen,
    hostName,
    cohortRegistrationURL,
    cohort
  }: {
    open: boolean;
    shouldOpen: Function;
    hostName: string;
    cohortRegistrationURL: string;
    cohort: any;
  }) => {
    useEffect(() => {
      open && trackEvent(cohort, 'Resources Page - Monthly Limit Modal - Modal Opened');
    }, [open]);

    const handleViewCourses = () => {
      trackEvent(cohort, 'Resources Page - Monthly Limit Modal - "View Course Details" Selected');
      window.open(`${cohortRegistrationURL}?source=Sphere-Outbound-Resources-Page`, '_blank');
    };

    return (
      <StyledModal
        open={open}
        onClose={() => {
          trackEvent(cohort, 'Resources Page - Monthly Limit Modal - Modal Closed');
          shouldOpen(false);
        }}
        zIndex={1400}
      >
        <ModalCard>
          <Stack spacing={8}>
            <Stack spacing={3}>
              <Typography sx={{ fontWeight: 'bold', textAlign: 'center', fontSize: '20px' }}>
                You've reached your monthly resource limit
              </Typography>
              <Typography sx={{ textAlign: 'center' }}>
                Signup to {hostName}'s course to receive unlimited access
              </Typography>
            </Stack>
            <Button
              variant="contained"
              sx={{
                borderRadius: '4px',
                height: '48px',
                background: 'linear-gradient(135.12deg, #7474D0 0.07%, #4D4DCD 100.02%)'
              }}
              onClick={() => handleViewCourses()}
            >
              View Course Details
            </Button>
          </Stack>
        </ModalCard>
      </StyledModal>
    );
  }
);

export function AdditionalFilters({
  materialCategory,
  sessionNumber,
  handleOnChange
}: {
  materialCategory: String;
  sessionNumber: Number | null;
  handleOnChange: Function;
}) {
  return (
    <>
      {sessionNumber && (
        <StyledToggleButton
          value={`Session ${sessionNumber}`}
          selected={true}
          onChange={() => handleOnChange('', 'sessionNumber')}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#F1F1FB',
              '& .toggleText': {
                color: '#334155 !important'
              }
            },
            ':hover': {
              backgroundColor: '#F1F1FB',
              '& .toggleText': {
                color: '#334155 !important'
              }
            }
          }}
        >
          <ToggleButtonTypography className="toggleText">
            {`Session ${sessionNumber}`}
          </ToggleButtonTypography>
        </StyledToggleButton>
      )}
      {materialCategory && (
        <StyledToggleButton
          value={materialCategory}
          selected={true}
          onChange={() => handleOnChange('', 'materialCategory')}
          sx={{
            '&.Mui-selected': {
              backgroundColor: '#F1F1FB',
              '& .toggleText': {
                color: '#334155 !important'
              }
            },
            ':hover': {
              backgroundColor: '#F1F1FB',
              '& .toggleText': {
                color: '#334155 !important'
              }
            }
          }}
        >
          <ToggleButtonTypography className="toggleText">{materialCategory}</ToggleButtonTypography>
        </StyledToggleButton>
      )}
    </>
  );
}
