import { useRef, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Stack,
  Switch,
  MenuItem,
  Button,
  CircularProgress,
  Typography
} from '@material-ui/core';
import MenuPopover from 'components/MenuPopover';
import TuneIcon from '@material-ui/icons/Tune';
import _ from 'lodash';
import { StudentProfile } from '../../../@types/cohorts';
import { useDispatch } from '../../../redux/store';

export const SectionContainer = styled('div')(({ theme }) => ({
  '&.matching': {
    width: '49%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  '&.filters': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  '&.white': {
    padding: '30px 20px',
    backgroundColor: 'white',
    boxShadow: '0px 0px 4px rgba(145, 158, 171, 0.24), 0px 24px 48px rgba(145, 158, 171, 0.24)',
    borderRadius: '16px'
  },
  '&.available': {
    width: '49%',
    [theme.breakpoints.down('md')]: {
      width: '100%'
    }
  },
  '&.matches': {
    width: '100%',
    height: '450px',
    overflowY: 'auto',
    [theme.breakpoints.down('sm')]: {
      height: '600px'
    }
  },
  '&.match': {
    padding: '30px 20px',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '2px solid whitesmoke',
    marginBottom: '1rem'
  }
}));

const StyledCount = styled(Typography)(() => ({
  background: '#4d4dcd',
  color: 'white',
  borderRadius: '100%',
  padding: '0 5px',
  width: '20px',
  height: '19px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '12px',
  marginLeft: '1rem',
  fontWeight: 600
}));

const StyledCircularLoader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%'
}));

export const CircularLoader = () => (
  <StyledCircularLoader>
    <CircularProgress />
  </StyledCircularLoader>
);

export const initialFilters = (user: StudentProfile, users: StudentProfile[]) => [
  { name: 'City', applied: false, count: _.intersectionBy(users, [user], 'city').length },
  {
    name: 'Company',
    applied: false,
    count: users.filter(
      (peer) =>
        peer.current_company &&
        user.current_company &&
        peer.current_company.name === user.current_company.name
    ).length
  },
  {
    name: 'Country',
    applied: false,
    count: _.intersectionBy(users, [user], 'country').length
  },
  {
    name: 'Role',
    applied: false,
    count: users.filter(
      (peer) =>
        _.intersection(peer.current_role_category_selections, user.current_role_category_selections)
          .length > 0
    ).length
  },
  {
    name: 'Industries',
    applied: false,
    count: users.filter(
      (peer) =>
        _.intersection(
          peer.current_industry_category_selections,
          user.current_industry_category_selections
        ).length > 0
    ).length
  }
];

export const Filters = ({ filters, setFilter }: { filters: any; setFilter: Function }) => {
  const menuRef = useRef(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <Stack
        spacing={1}
        justifyContent="center"
        alignItems="center"
        direction={{ xs: 'column', md: 'row' }}
      >
        <Button
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={() => setOpen(!open)}
          ref={menuRef}
          color="primary"
          variant="outlined"
          sx={{ height: '24px' }}
        >
          <TuneIcon sx={{ fontSize: 20, mr: 1 }} />
          Filters
          <StyledCount>{filters.filter((filter: any) => filter.applied).length}</StyledCount>
        </Button>
        <MenuPopover
          open={open}
          anchorEl={menuRef.current}
          onClose={() => {
            setOpen(false);
          }}
        >
          {filters.map((filter: any, index: number) => (
            <MenuItem
              key={index}
              sx={{
                typography: 'subtitle2',
                color: filter.applied ? '#4d4dcd' : '#CACED4',
                display: 'flex',
                justifyContent: 'space-between',
                py: 1,
                px: 2.5
              }}
            >
              {filter.name} Match{filter.count !== 1 && 'es'} ({filter.count})
              <Switch
                size="small"
                checked={filter.applied}
                onChange={(e) => setFilter(index, e.target.checked)}
              />
            </MenuItem>
          ))}
        </MenuPopover>
      </Stack>
    </>
  );
};
