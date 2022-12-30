import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { SectionContainer, useStyles } from './Common';

const StyledProfile = styled(LazyLoadImage)(({ theme }) => ({
  width: '93px',
  height: '93px',
  borderRadius: '100px'
}));
const About = () => {
  const classes = useStyles();
  return (
    <SectionContainer className="about">
      <Box className={classes.aboutDetails}>
        <StyledProfile
          src="https://scholarsite-public.s3.eu-west-2.amazonaws.com/waqas-nazir-e36a51"
          alt="waqas"
        />
        <Typography sx={{ fontWeight: 700, fontSize: '12px', color: '#637381' }}>Q&A</Typography>
        <Typography sx={{ fontWeight: 700, fontSize: '24px', color: '#454F5B' }}>
          Steve Tadelis
        </Typography>
        <Typography sx={{ fontWeight: 300, fontSize: '16px', color: '#212B36' }}>
          You can use Q&A to ask Steve questions outside of session hours. I recommend doing x, y
          and z. Q&A remains opened after the cohort finishes so you will see questions asked from
          other cohorts here as well.
        </Typography>
      </Box>
    </SectionContainer>
  );
};

export default About;
