import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { SectionContainer } from './Common';

const StyledProfile = styled('img')(({ theme }) => ({
  width: '93px',
  height: '93px',
  borderRadius: '100px'
}));
const About = () => (
  <SectionContainer className="about">
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '295px'
      }}
    >
      <StyledProfile
        src="https://scholarsite-public.s3.eu-west-2.amazonaws.com/waqas-nazir-e36a51"
        alt="waqas"
      />
      <Typography style={{ fontWeight: 700, fontSize: '12px', color: '#637381' }}>Q&A</Typography>
      <Typography style={{ fontWeight: 700, fontSize: '24px', color: '#454F5B' }}>
        Steve Tadelis
      </Typography>
      <Typography style={{ fontWeight: 300, fontSize: '16px', color: '#212B36' }}>
        You can use Q&A to ask Steve questions outside of session hours. I recommend doing x, y and
        z. Q&A remains opend after the cohort finishes so you will see questions asked from other
        cohorts here as well.
      </Typography>
    </Box>
  </SectionContainer>
);

export default About;
