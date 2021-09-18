// modal
import { Modal } from 'components/animate';
import { styled, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { capitalCase } from 'change-case';
import Label from '../Label';

type StudentProfileModalProps = {
  modalState: boolean;
  modalHandler: Function;
};

const StyledContainer = styled(Box)(() => ({
  backgroundColor: '#fff',
  boxShadow:
    '0px 0px 4.60729px rgba(145, 158, 171, 0.24), 0px 36.8583px 73.7167px -9.21459px rgba(145, 158, 171, 0.24)',
  borderRadius: 20,
  padding: '20px 30px',
  marginBottom: 16
}));

const Title = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  fontWeight: 'bold',
  fontSize: 22,
  color: '#212B36',
  marginBottom: 30
}));

const StyledRow = styled(Box)(() => ({
  display: 'flex',
  marginBottom: 20
}));

const Text = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  color: '#212B36',
  fontSize: 12,
  whiteSpace: 'nowrap'
}));

const TagsContainer = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexWrap: 'wrap'
}));

const StyledLabel = styled(Label)((props: any) => ({
  marginRight: 10,
  marginBottom: 10
}));

export default function StudentProfileModal({
  modalState,
  modalHandler
}: StudentProfileModalProps) {
  const theme = useTheme();

  return (
    <Modal open={modalState} onClose={() => modalHandler(false)}>
      <StyledContainer>
        <Title>Information</Title>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/job.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>Adobe</Text>
        </StyledRow>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/mail.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>nihalhakim@gmail.com</Text>
        </StyledRow>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/done_all.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text style={{ marginRight: 10 }}>What I am looking for</Text>
          <TagsContainer>
            <StyledLabel
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="success"
            >
              {capitalCase('mentor')}
            </StyledLabel>
            <StyledLabel
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="primary"
            >
              {capitalCase('networking')}
            </StyledLabel>
            <StyledLabel
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="warning"
            >
              {capitalCase('Discuss Materials')}
            </StyledLabel>
          </TagsContainer>
        </StyledRow>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/star.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text style={{ marginRight: 10 }}>What I am good at</Text>
          <TagsContainer>
            <StyledLabel
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="success"
            >
              {capitalCase('marketing')}
            </StyledLabel>
            <StyledLabel
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="primary"
            >
              {capitalCase('Content Recommendation System')}
            </StyledLabel>
            <StyledLabel
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="error"
            >
              {capitalCase('Personalization')}
            </StyledLabel>
            <StyledLabel
              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
              color="default"
            >
              {capitalCase(' User tracking')}
            </StyledLabel>
          </TagsContainer>
        </StyledRow>
      </StyledContainer>
      <StyledContainer>
        <Title>Social</Title>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/discord.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>Message Nihal on Discord here</Text>
        </StyledRow>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/linkedin.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>Connect with Nihal on LinkedIn Here</Text>
        </StyledRow>
      </StyledContainer>
    </Modal>
  );
}
