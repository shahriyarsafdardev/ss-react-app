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
  width: '80px'
  // '&:hover': {
  //   display: 'none'
  // }
}));

export const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  backgroundColor: '#E1E4E74D',
  border: 'none',
  borderRadius: '10px !important',
  ':hover': {
    backgroundColor: '#2F80ED !important',
    '&:ToggleButtonTypography': {
      color: '#ffffff'
    }
  },
  ':active': {
    backgroundColor: '#2F80ED !important'
  }
}));

export const ToggleButtonTypography = styled(Typography)(({ theme }) => ({
  color: '#334155',
  ':hover': {
    color: '#ffffff'
  }
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
  '&:hover': {
    boxShadow: '0px 9px 24px rgba(7, 26, 51, 0.2)'
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
