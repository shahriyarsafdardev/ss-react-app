import { useRef, useState, useEffect } from 'react';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import writeXlsxFile from 'write-excel-file';
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
  '&.empty': {
    width: '100%',
    justifyContent: 'center',
    padding: '30px',
    color: 'grey'
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
  width: '17px',
  height: '17px',
  lineHeight: '18px',
  borderRadius: '50%',
  fontSize: '13px',
  color: '#fff',
  textAlign: 'center',
  background: '#4d4dcd',
  marginLeft: '1rem',
  fontWeight: 600
}));

const StyledCircularLoader = styled(Box)(() => ({
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
  {
    name: 'City',
    applied: false,
    count: users?.filter((peer) => peer.city === user.city).length
  },
  {
    name: 'Company Size',
    applied: false,
    count: users.filter(
      (peer) =>
        peer.current_company &&
        user.current_company &&
        peer.current_company.number_of_employees === user.current_company.number_of_employees
    ).length
  },
  {
    name: 'Country',
    applied: false,
    count: users?.filter((peer) => peer.country === user.country).length
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
  },
  {
    name: 'Unmatched',
    applied: false,
    count: users.filter((peer) => !peer.matchings || peer.matchings.length === 0).length
  }
];

export const applyFilters = (userFilters: any, users: StudentProfile[], user: StudentProfile) => {
  let newMatches: StudentProfile[] = users;
  userFilters.map((filter: any) => {
    if (filter.applied) {
      if (filter.name === 'City') {
        newMatches = newMatches?.filter((matcher: StudentProfile) => matcher.city === user.city);
      } else if (filter.name === 'Country') {
        newMatches = newMatches?.filter(
          (matcher: StudentProfile) => matcher.country === user.country
        );
      } else if (filter.name === 'Company Size') {
        newMatches = newMatches?.filter(
          (matcher: StudentProfile) =>
            matcher.current_company &&
            user.current_company &&
            matcher.current_company.number_of_employees === user.current_company.number_of_employees
        );
      } else if (filter.name === 'Role') {
        newMatches = newMatches.filter(
          (peer) =>
            _.intersection(
              peer.current_role_category_selections,
              user.current_role_category_selections
            ).length > 0
        );
      } else if (filter.name === 'Industries') {
        newMatches = newMatches.filter(
          (peer) =>
            _.intersection(
              peer.current_industry_category_selections,
              user.current_industry_category_selections
            ).length > 0
        );
      } else if (filter.name === 'Unmatched') {
        newMatches = newMatches.filter((peer) => !peer.matchings || peer.matchings.length === 0);
      }
    }
  });
  return newMatches;
};

export const updatedFilters = (userFilters: any, users: StudentProfile[], user: StudentProfile) =>
  userFilters.map((filter: any) => {
    let count = 0;
    if (filter.name === 'City') {
      count = users?.filter((peer) => peer.city === user.city).length;
    } else if (filter.name === 'Country') {
      count = users?.filter((peer) => peer.country === user.country).length;
    } else if (filter.name === 'Company Size') {
      count = users.filter(
        (peer) =>
          peer.current_company &&
          user.current_company &&
          peer.current_company.number_of_employees === user.current_company.number_of_employees
      ).length;
    } else if (filter.name === 'Role') {
      count = users.filter(
        (peer) =>
          _.intersection(
            peer.current_role_category_selections,
            user.current_role_category_selections
          ).length > 0
      ).length;
    } else if (filter.name === 'Industries') {
      count = users.filter(
        (peer) =>
          _.intersection(
            peer.current_industry_category_selections,
            user.current_industry_category_selections
          ).length > 0
      ).length;
    } else if (filter.name === 'Unmatched') {
      count = users.filter((peer) => !peer.matchings || peer.matchings.length === 0).length;
    }

    return { ...filter, count };
  });

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

export const ExportToExcel = ({ cohortID, fileName }: { cohortID: string; fileName: string }) => {
  const exportExcel = async (objects: any, fileName: string) => {
    const schema = [
      {
        column: 'Match Created At',
        value: (student: any) => student.created_at,
        width: 30
      },
      {
        column: 'Status',
        value: (student: any) => 'Match Made',
        width: 30
      },
      {
        column: 'User_A: Email',
        value: (student: any) => student.user_a.email,
        width: 50
      },
      {
        column: 'User_A: First Name',
        value: (student: any) => student.user_a.first_name,
        width: 20
      },
      {
        column: 'User_A: Last Name',
        value: (student: any) => student.user_a.last_name,
        width: 20
      },
      {
        column: 'User_A: Company',
        value: (student: any) => student.user_a.company,
        width: 35
      },
      {
        column: 'User_A: Role',
        value: (student: any) => student.user_a.position,
        width: 60
      },
      {
        column: 'User_B: Email',
        value: (student: any) => student.user_b.email,
        width: 50
      },
      {
        column: 'User_B: First Name',
        value: (student: any) => student.user_b.first_name,
        width: 20
      },
      {
        column: 'User_B: Last Name',
        value: (student: any) => student.user_b.last_name,
        width: 20
      },
      {
        column: 'User_B: Company',
        value: (student: any) => student.user_b.company,
        width: 35
      },
      {
        column: 'User_B: Role',
        value: (student: any) => student.user_b.position,
        width: 60
      }
    ];
    await writeXlsxFile(objects, {
      schema,
      fileName
    });
  };

  const getData = async () => {
    let result = [];
    if (cohortID && fileName) {
      try {
        const response = await axios.get(`/cohorts/${cohortID}/match.json`);

        result = response.data;
      } catch (error) {
        console.log(error);
      }
    }
    if (result.length > 0) {
      exportExcel(result, fileName);
    }
  };

  return (
    <Button variant="outlined" color="primary" onClick={() => getData()}>
      <img style={{ marginRight: 2 }} src="/static/registration/download.svg" alt="download" />
      Excel Export
    </Button>
  );
};
