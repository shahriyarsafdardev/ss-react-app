import { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useSettings from 'hooks/useSettings';
import useAuth from 'hooks/useAuth';
import Page from '../components/Page';
import { StudentProfileModal, StudentProfileCard } from '../components/students';
import { RootState, useSelector } from '../redux/store';

const ContactInfoNote = styled('div')(({ theme }) => ({
  backgroundColor: '#D0F2FF',
  display: 'flex',
  padding: '10px',
  borderRadius: '8px',
  margin: '25px 0',
  '.img-content': {
    width: '40px',
    [theme.breakpoints.down('sm')]: {
      width: '80px'
    }
  }
}));
const StyledGrid = styled(Grid)(({ theme }) => ({
  marginBottom: '15px',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}));

const ContactNote = () => (
  <ContactInfoNote>
    <Box className="img-content">
      <img src="/static/icons/navbar/ic_sun.svg" alt="" />
    </Box>
    <Box className="text-content">
      <Typography>
        Please don’t hesitate to contact the Sphere support team - we’d love to hear from you!
      </Typography>
    </Box>
  </ContactInfoNote>
);

export default function ContactUs() {
  const { themeStretch } = useSettings();
  const [modalState, modalHandler] = useState({});
  const [cohort, setCohort] = useState({});
  const [displayChatLink, setDisplayChatLink] = useState(false);
  const { user, updateProfile, isAuthenticated } = useAuth();
  const newUser: any = { ...user };
  const { mode } = useSelector((state: RootState) => state.instructorView);

  const cohorts = useSelector((state: RootState) => state?.cohort?.cohorts);
  useEffect(() => {
    cohorts.forEach((cohort) => {
      if (cohort.id !== 'e5659779-2c87-43b1-98f7-93d8b7173d61') {
        setCohort(cohort);
        setDisplayChatLink(true);
      }
    });
  }, []);

  const displayWalkthrough = () => {
    updateProfile({ ...newUser, new_instructor: true });
  };

  const StyledBox = styled(Box)(() => ({
    display: 'flex',
    justifyContent: 'space-between'
  }));

  const contactInfoDetails = [
    {
      id: 'eba5d109-04c1-480c-ae34-1021a6edf36e',
      first_name: 'Nick',
      last_name: 'Rudder',
      email: 'nicholas@getsphere.com',
      current_position: 'Co-Founder & CEO',
      phone: '+1 415 994 7284',
      profile_image_url: 'https://sphere-public.s3.eu-west-2.amazonaws.com/assets/nick.png',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      matchings: [],
      opted_in_for_matching_suggestions: false,
      linkedin_url: 'https://www.linkedin.com/in/nicholasrudder/',
      current_company: {
        id: '',
        name: 'Sphere',
        logo_url: '/static/contact/companyLogo.svg',
        number_of_employees: '1000-2000'
      },
      discord_url: 'https://discordapp.com/users/875140709898928130'
    },
    {
      id: '1214f562-ebde-42cb-9bfa-653abb7e74f7',
      first_name: 'Adrian',
      last_name: 'Sarstedt',
      current_position: 'Co-Founder & CTO',
      email: 'adrian@getsphere.com',
      phone: '+1 415 818 4841',
      profile_image_url: 'https://sphere-public.s3.eu-west-2.amazonaws.com/assets/adrian.png',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      matchings: [],
      opted_in_for_matching_suggestions: false,
      linkedin_url: 'https://www.linkedin.com/in/adrian-sarstedt-375623133/',
      current_company: {
        id: '',
        name: 'Sphere',
        logo_url: '/static/contact/companyLogo.svg',
        number_of_employees: '1000-2000'
      },
      discord_url: 'https://discordapp.com/users/811400748020662284'
    },
    {
      id: 'd5781c7f-ff3b-4d5e-9e53-d4cb7e40b68f',
      first_name: 'Leah Nicolai',
      last_name: 'Higgins',
      current_position: 'Cohort Operations Manager',
      email: 'leah@getsphere.com',
      phone: '+1 315 521 6341',
      profile_image_url: 'https://sphere-public.s3.eu-west-2.amazonaws.com/assets/leah.png',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      matchings: [],
      opted_in_for_matching_suggestions: false,
      linkedin_url: 'https://www.linkedin.com/in/leahnicolai/',
      current_company: {
        id: '',
        name: 'Sphere',
        logo_url: '/static/contact/companyLogo.svg',
        number_of_employees: '1000-2000'
      }
    },
    {
      id: 'efee9707-96c6-42c3-83e9-e941672a9e6a',
      first_name: 'Kristy',
      last_name: 'Rosado',
      current_position: 'Cohort Operations Manager',
      email: 'kristy@getsphere.com',
      phone: '',
      profile_image_url: 'https://sphere-public.s3.eu-west-2.amazonaws.com/assets/kristy.png',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      matchings: [],
      opted_in_for_matching_suggestions: false,
      linkedin_url: 'https://www.linkedin.com/in/kristy-rosado-8b5ba5123',
      current_company: {
        id: '',
        name: 'Sphere',
        logo_url: '/static/contact/companyLogo.svg',
        number_of_employees: '1000-2000'
      }
    },
    {
      id: '9f1ddd02-9c73-459e-b141-8765c1316d62',
      first_name: 'Natalie',
      last_name: 'Cone',
      current_position: 'Head of Community',
      email: 'natalie@getsphere.com',
      phone: '',
      profile_image_url: 'https://sphere-public.s3.eu-west-2.amazonaws.com/assets/natalie.jpeg',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      matchings: [],
      opted_in_for_matching_suggestions: false,
      linkedin_url: 'https://www.linkedin.com/in/natalie-cone-she-her-pmp-2364b7154/',
      current_company: {
        id: '',
        name: 'Sphere',
        logo_url: '/static/contact/companyLogo.svg',
        number_of_employees: '1000-2000'
      }
    }
    // {
    //   id: '549c6fb3-41dd-4c8d-854f-2a48c2a519bd',
    //   first_name: 'Nathan',
    //   last_name: 'Thompson',
    //   current_position: 'Growth Marketing Manager',
    //   email: 'nathan@getsphere.com',
    //   phone: '',
    //   profile_image_url: '/static/contact/Nathan.jpeg',
    //   city: 'New York',
    //   country: 'America',
    //   is_managing_team: true,
    //   matchings: [],
    //   opted_in_for_matching_suggestions: false,
    //   linkedin_url: 'https://www.linkedin.com/in/nathan-likes-writing',
    //   current_company: {
    //     id: '',
    //     name: 'Sphere',
    //     logo_url: '/static/contact/companyLogo.svg',
    //     number_of_employees: '1000-2000'
    //   }
    // }
  ];

  return (
    <Page title="Sphere | Contact Us">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <StyledBox>
          <Typography variant="h3">Contact Us</Typography>
          {isAuthenticated && mode === 'Instructor' && (
            <Button variant="contained" size="large" onClick={() => displayWalkthrough()}>
              Walkthrough
            </Button>
          )}
        </StyledBox>
        <ContactNote />
        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          modalUser={modalState}
          dispalyChatLink={displayChatLink}
          cohort={cohort}
          trackModalEvent={() => {}}
        />
        <StyledGrid container spacing={3}>
          {contactInfoDetails.map((info, index) => (
            <Grid item key={index} xs={12} sm={6} md={3}>
              <StudentProfileCard peer={info} modalHandler={modalHandler} />
            </Grid>
          ))}
        </StyledGrid>
      </Container>
    </Page>
  );
}
