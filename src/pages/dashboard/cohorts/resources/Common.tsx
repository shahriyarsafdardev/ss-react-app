import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core/styles';
import {
  ToggleButton,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Card
} from '@material-ui/core';

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
  fontSize: '18px'
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
    boxShadow: '0px 2px 9px rgba(7, 26, 51, 0.1)',
    cursor: 'pointer'
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
