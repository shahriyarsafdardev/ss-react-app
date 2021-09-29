import { Grid, Box, Card, CardMedia, CardContent, Typography, Theme } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';
import Page from '../components/Page';

type ContactCardProps = {
  name: string;
  title: string;
  email: string;
  imageUrl: string;
  phone: string;
  discordLink: string;
};

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

const useCardStyles = makeStyles<Theme>((theme: Theme) => ({
  root: {
    marginRight: '20px',
    [theme.breakpoints.down('sm')]: {
      marginRight: '0',
      marginTop: '20px'
    }
  },
  img: {
    height: '250px'
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

const ContactCard = ({ name, title, email, imageUrl, phone, discordLink }: ContactCardProps) => {
  const classes = useCardStyles();

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.img} image={imageUrl} />
      <CardContent>
        <Typography variant="h4">{name}</Typography>
        <Typography>{title}</Typography>
        <Typography>{email}</Typography>
        <Typography>{phone}</Typography>
        <Typography>{discordLink}</Typography>
      </CardContent>
    </Card>
  );
};

export default function ContactUs() {
  const contactInfoDetails = [
    {
      name: 'Olivia Nunn',
      title: 'Head of Operations',
      email: 'olivia@scholarsite.io',
      imageUrl: '/static/contact/Olivia.png',
      phone: '+1 734 720 2996',
      discordLink: 'discordapp.com'
    },
    {
      name: 'Adrian Sarstedt',
      title: 'Co-Founder & CTO',
      email: 'adrian@scholarsite.io',
      imageUrl: '/static/contact/Adrian.png',
      phone: '+1 415 818 4841',
      discordLink: 'discordapp.com'
    },
    {
      name: 'Nick Rudder',
      title: 'Co-Founder & CEO',
      email: 'nicholas@scholarsite.io',
      imageUrl: '/static/contact/Nick.png',
      phone: '+1 415 994 7284',
      discordLink: 'discordapp.com'
    }
  ];

  return (
    <Page title="ScholarSite | Contact Us">
      <ContactContainer>
        <Typography variant="h3">Contact Us</Typography>
        <ContactNote />
        <StyledGrid container>
          {contactInfoDetails.map((info) => (
            <Grid item key={info.email} sm={12} md={3}>
              <ContactCard {...info} />
            </Grid>
          ))}
        </StyledGrid>
      </ContactContainer>
    </Page>
  );
}
