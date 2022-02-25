import { Link as RouterLink } from 'react-router-dom';
import { Box, Stack, Link, Button, Divider, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SectionContainer } from './Common';
import { StudentProfile } from '../../../@types/cohorts';

const StyledProfile = styled('img')(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '14.5691px',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    width: '192px',
    height: '157px'
  }
}));

const StyledProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    flexBasis: '60%'
  }
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const StyledCompanyContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    img: { display: 'none !important' }
  },
  img: {
    '&:hover': {
      backgroundColor: 'rgba(77, 77, 205, 0.1)',
      borderRadius: '15px',
      boxShadow: '2px 2px 5px 5px rgba(77, 77, 205, 0.1)'
    }
  }
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  marginLeft: '20px',
  flexBasis: '68%',
  [theme.breakpoints.down('sm')]: {
    alignItems: 'center',
    marginLeft: 'unset'
  }
}));

const StyledNameContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start'
  }
}));

export default function UserCard({
  item,
  match,
  styleClass,
  matchings,
  matchUser
}: {
  item: StudentProfile;
  match: boolean;
  styleClass: string;
  matchings: string | null;
  matchUser: Function;
}) {
  return (
    <SectionContainer className={styleClass}>
      <StyledProfileContainer>
        <StyledImageContainer>
          <StyledProfile src={item.profile_image_url} alt={item.first_name} />
        </StyledImageContainer>
        <StyledContainer>
          <StyledCompanyContainer>
            <StyledNameContainer>
              <Typography variant="h5">
                {item.first_name} {item.last_name}
              </Typography>
              <Typography sx={{ fontWeight: 400, color: '#637381' }}>
                {item.current_position}
              </Typography>
              {item.current_company && (
                <Typography sx={{ fontWeight: 400, color: '#637381' }}>
                  <b>{item.current_company?.name}</b>
                  {item.current_company?.number_of_employees &&
                    `(${item.current_company?.number_of_employees})`}
                </Typography>
              )}
              {matchings && (
                <Typography sx={{ fontWeight: 400, color: '#637381' }}>
                  <b>Existing matches: {matchings}</b>
                </Typography>
              )}
              {item.linkedin_url && (
                <Link
                  color="primary"
                  to={item.linkedin_url || '#'}
                  target="_blank"
                  component={RouterLink}
                  sx={{ mt: '0px !important' }}
                >
                  Open LinkedIn
                </Link>
              )}
            </StyledNameContainer>
          </StyledCompanyContainer>
        </StyledContainer>
      </StyledProfileContainer>
      {item.bio_text && <Typography sx={{ color: '#637381' }}>{item.bio_text}</Typography>}
      <Divider variant="middle" sx={{ margin: '10px 0px' }} />
      <Stack spacing={1} justifyContent="flex-start">
        {item?.current_role_category_selections?.length > 0 && (
          <Typography>
            Roles: <b>{item.current_role_category_selections?.join(',')}</b>
          </Typography>
        )}
        {item?.current_industry_category_selections?.length > 0 && (
          <Typography>
            Company Industries: <b>{item.current_industry_category_selections?.join(',')}</b>
          </Typography>
        )}
        <Typography>
          Manage a team or division: <b>{item.is_managing_team ? 'Yes' : 'No'}</b>
        </Typography>
        {item.city && (
          <Typography>
            City: <b>{item.city}</b>
          </Typography>
        )}
        {item.country && (
          <Typography>
            Country: <b>{item.country}</b>
          </Typography>
        )}
      </Stack>

      {match && (
        <Box sx={{ mt: 2, width: '100%' }}>
          <Button onClick={() => matchUser(item.id)} variant="contained" color="primary" fullWidth>
            Match
          </Button>
        </Box>
      )}
    </SectionContainer>
  );
}
