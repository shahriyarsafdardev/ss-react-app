import { useState, useEffect } from 'react';
import { Container, Grid, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import useSettings from 'hooks/useSettings';
import Page from '../components/Page';
import { StudentProfileModal, StudentProfileCard } from '../components/students';
import { RootState, useSelector } from '../redux/store';

const ContactContainer = styled('div')((props) => ({
  padding: '0 20px'
}));

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
        Please don’t hesitate to contact the ScholarSite support team - we’d love to hear from you!
      </Typography>
      <Typography>Alternatively feel free to message any one of us on Discord</Typography>
    </Box>
  </ContactInfoNote>
);

export default function ContactUs() {
  const { themeStretch } = useSettings();
  const [modalState, modalHandler] = useState({});
  const [cohortID, setCohortID] = useState('testing');
  const [displayChatLink, setDisplayChatLink] = useState(false);

  const cohorts = useSelector((state: RootState) => state?.cohort?.cohorts);
  useEffect(() => {
    cohorts.forEach((cohort) => {
      if (cohort.id !== 'e5659779-2c87-43b1-98f7-93d8b7173d61') {
        setCohortID(cohort.id);
        setDisplayChatLink(true);
      }
    });
  }, []);

  const contactInfoDetails = [
    {
      id: '7a815eb7-f6c8-4934-90aa-fc578603f42f',
      first_name: 'Olivia',
      last_name: 'Nunn',
      current_position: 'Head of Operations',
      email: 'olivia@scholarsite.io',
      phone: '+1 347 225 3144',
      profile_image_url: '/static/contact/Olivia.png',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      linkedin_url: 'https://www.linkedin.com/in/olivia-nunn-29845990/',
      current_company: {
        id: '',
        name: 'ScholarSite',
        logo_url: '/static/contact/companyLogo.svg',
        number_of_employees: '1000-2000'
      },
      discord_url: 'https://discordapp.com/users/893656080914186251'
    },
    {
      id: 'eba5d109-04c1-480c-ae34-1021a6edf36e',
      first_name: 'Nick',
      last_name: 'Rudder',
      email: 'nicholas@scholarsite.io',
      current_position: 'Co-Founder & CEO',
      phone: '+1 415 994 7284',
      profile_image_url: '/static/contact/Nick.png',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      linkedin_url: 'https://www.linkedin.com/in/nicholasrudder/',
      current_company: {
        id: '',
        name: 'ScholarSite',
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
      email: 'adrian@scholarsite.io',
      phone: '+1 415 818 4841',
      profile_image_url: '/static/contact/Adrian.png',
      city: 'New York',
      country: 'America',
      is_managing_team: true,
      linkedin_url: 'https://www.linkedin.com/in/adrian-sarstedt-375623133/',
      current_company: {
        id: '',
        name: 'ScholarSite',
        logo_url: '/static/contact/companyLogo.svg',
        number_of_employees: '1000-2000'
      },
      discord_url: 'https://discordapp.com/users/811400748020662284'
    }
  ];

  return (
    <Page title="ScholarSite | Contact Us">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Typography variant="h3">Contact Us</Typography>
        <ContactNote />
        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          modalUser={modalState}
          cohortID={cohortID}
          dispalyChatLink={displayChatLink}
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
