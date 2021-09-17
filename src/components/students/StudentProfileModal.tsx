// modal
import { Modal } from 'components/animate';
import { styled, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

type StudentProfileModalProps = {
  modalState: boolean;
  toggleModal: VoidFunction;
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

const ColoredText = styled(Box)((props: any) => ({
  display: 'flex',
  fontFamily: 'Public Sans',
  fontWeight: 'bold',
  color: props.color,
  backgroundColor: props.backgroundColor,
  borderRadius: 10,
  padding: '3px 10px',
  marginRight: 10,
  whiteSpace: 'nowrap',
  marginBottom: 10
}));

export default function StudentProfileModal({ modalState, toggleModal }: StudentProfileModalProps) {
  return (
    <Modal open={modalState} onClose={toggleModal}>
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
            <ColoredText color="#229A16" backgroundColor="rgba(84, 214, 44, 0.16)">
              mentor
            </ColoredText>
            <ColoredText color="#1890FF" backgroundColor="rgba(24, 144, 255, 0.16)">
              Networking
            </ColoredText>
            <ColoredText color="#B78103" backgroundColor="rgba(255, 193, 7, 0.16)">
              Discuss Materials
            </ColoredText>
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
            <ColoredText color="#229A16" backgroundColor="rgba(84, 214, 44, 0.16)">
              Marketing
            </ColoredText>
            <ColoredText color="#1890FF" backgroundColor="rgba(24, 144, 255, 0.16)">
              Content Recommendation System
            </ColoredText>
            <ColoredText color="#FF4842" backgroundColor="rgba(255, 72, 66, 0.16)">
              Personalization
            </ColoredText>
            <ColoredText color="#637381" backgroundColor="#C4CDD5">
              User tracking
            </ColoredText>
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
