import { Stack, Button, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const StyledFeedContainer = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '50%',
  [theme.breakpoints.down('sm')]: {
    width: '90%'
  }
}));
const Description = styled(Typography)(() => ({
  fontSize: '15px',
  lineHeight: '31px',
  textAlign: 'center',
  color: '#071A33'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '182px',
  marginTop: '20px',
  marginLeft: 10,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
    marginTop: 20
  }
}));

const StyledPreview = styled('img')(({ theme }) => ({
  width: '100%',
  borderRadius: '14.5691px',
  objectFit: 'cover',
  marginTop: '50px',
  marginBottom: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

const handleClick = () => {
  const elem = document.getElementById('question-text-input');
  if (elem) {
    elem.focus();
  }
};

const EmptyFeed = ({ hosts }: { hosts: string }) => (
  <StyledFeedContainer>
    <StyledPreview src="/static/empty_tabs.png" alt="empty feed" />
    <Description sx={{ fontWeight: '600' }}>
      {`${hosts} hasn’t recieved any questions yet but you could be the first to ask! Potential topics are not restricted, your question can refer to a Session or a problem you’re facing at work, and will be answered by ${hosts} in video format!`}
    </Description>
    <StyledButton onClick={() => handleClick()} variant="contained">
      ASK YOUR QUESTION
    </StyledButton>
  </StyledFeedContainer>
);
export default EmptyFeed;
