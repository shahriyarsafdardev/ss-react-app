import { useState } from 'react';
import { Grid, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Page from '../components/Page';
import { StudentProfileModal, StudentProfileCard } from '../components/students';

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
  const [modalState, modalHandler] = useState({});
  const contactInfoDetails = [
    {
      first_name: 'Joe',
      last_name: 'Obeto',
      current_position: 'Head of Community',
      email: 'joe@scholarsite.io',
      phone: '+1 734 720 2996',
      profile_image_url: '/static/contact/Joe.jpeg',
      linkedin_url: 'https://www.linkedin.com/in/obetojoachim/',
      current_company: {
        id: '',
        name: 'Scholar Site',
        logo_url: '/static/contact/companyLogo.svg'
      },
      discord_url: 'https://discordapp.com/users/893656080914186251'
    },
    {
      first_name: 'Olivia',
      last_name: 'Nunn',
      current_position: 'Head of Operations',
      email: 'olivia@scholarsite.io',
      phone: '+1 734 720 2996',
      profile_image_url: '/static/contact/Olivia.png',
      linkedin_url: 'https://www.linkedin.com/in/olivia-nunn-29845990/',
      current_company: {
        id: '',
        name: 'Scholar Site',
        logo_url: '/static/contact/companyLogo.svg'
      },
      discord_url: 'https://discordapp.com/users/893656080914186251'
    },
    {
      first_name: 'Nick',
      last_name: 'Rudder',
      email: 'nicholas@scholarsite.io',
      current_position: 'Co-Founder & CEO',
      phone: '+1 415 994 7284',
      profile_image_url: '/static/contact/Nick.png',
      linkedin_url: 'https://www.linkedin.com/in/nicholasrudder/',
      current_company: {
        id: '',
        name: 'Scholar Site',
        logo_url: '/static/contact/companyLogo.svg'
      },
      discord_url: 'https://discordapp.com/users/875140709898928130'
    },
    {
      first_name: 'Adrian',
      last_name: 'Sarstedt',
      current_position: 'Head of Operations',
      email: 'adrian@scholarsite.io',
      phone: '+1 415 818 4841',
      profile_image_url: '/static/contact/Adrian.png',
      linkedin_url: 'https://www.linkedin.com/in/adrian-sarstedt-375623133/',
      current_company: {
        id: '',
        name: 'Scholar Site',
        logo_url: '/static/contact/companyLogo.svg'
      },
      discord_url: 'https://discordapp.com/users/811400748020662284'
    }
  ];

  return (
    <Page title="ScholarSite | Contact Us">
      <ContactContainer>
        <Typography variant="h3">Contact Us</Typography>
        <ContactNote />
        <StudentProfileModal
          modalState={Object.keys(modalState).length > 0}
          modalHandler={modalHandler}
          modalUser={modalState}
        />
        <StyledGrid container spacing={3}>
          {contactInfoDetails.map((info, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <StudentProfileCard peer={info} modalHandler={modalHandler} />
            </Grid>
          ))}
        </StyledGrid>
      </ContactContainer>
    </Page>
  );
}
