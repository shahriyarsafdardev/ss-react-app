import LinearProgress, { linearProgressClasses } from '@material-ui/core/LinearProgress';
import { styled } from '@material-ui/core/styles';
import {
  ToggleButton,
  Typography,
  Tooltip,
  TooltipProps,
  tooltipClasses,
  Card,
  Box
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
  minWidth: '50px'
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: '#E1E4E7',
  padding: '10px 18px',
  border: 'none',
  borderRadius: '10px !important',
  '&.Mui-selected': {
    backgroundColor: '#2F80ED !important',
    '& .toggleText': {
      color: '#ffffff !important'
    }
  },
  '&:hover': {
    backgroundColor: '#2F80ED !important',
    '& .toggleText': {
      color: '#ffffff'
    }
  }
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
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11
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

export const MaterialTypes = [
  {
    type: 'Academic Paper',
    display: 'Academic Papers',
    color: '#56CCF2'
  },
  {
    type: 'Article',
    display: 'Articles',
    color: '#D96BC1'
  },
  {
    type: 'Book',
    display: 'Books',
    color: '#F2C94C'
  },
  {
    type: 'Book Passage',
    display: 'Book Passages',
    color: '#2F80ED'
  },
  {
    type: 'Github',
    display: 'Github',
    color: '#9B51E0'
  },
  {
    type: 'Jupyter Notebook',
    display: 'Jupyter',
    color: '#F2994A'
  },
  {
    type: 'Slides',
    display: 'Slides',
    color: '#EB5757'
  },
  {
    type: 'Spreadsheet',
    display: 'Spreadsheets',
    color: '#219653'
  },
  {
    type: 'Video',
    display: 'Videos',
    color: '#EB5757'
  },
  {
    type: 'Other',
    display: 'Other',
    color: '#828282'
  }
];

export const getColor = (materialType: String) => {
  const idx = MaterialTypes.findIndex((material) => material.type === materialType);
  return MaterialTypes[idx].color;
};

export const StyledBox = styled(Box)(({ theme }) => ({
  width: '80px',
  height: '80px',
  display: 'none',
  alignItems: 'center',
  textAlign: 'center',
  borderRadius: '10px'
  // '&:hover': {
  //   display: 'flex'
  // }
}));

export const ParentBox = styled(Box)(({ theme }) => ({
  '&:hover': {
    '& .StyledBox': {
      display: 'flex'
    },
    '& .StyledImage': {
      display: 'none'
    }
  }
}));

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
