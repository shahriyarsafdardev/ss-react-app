// modal
import { Modal } from 'components/animate';
import { styled, useTheme } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import { capitalCase } from 'change-case';
import Label from '../Label';

type StudentProfileModalProps = {
  modalState: boolean;
  modalHandler: Function;
  modalUser: any;
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
  flexWrap: 'wrap',
  gap: 10
}));
export default function StudentProfileModal({
  modalState,
  modalHandler,
  modalUser
}: StudentProfileModalProps) {
  const theme = useTheme();
  const {
    id,
    first_name,
    last_name,
    current_company,
    profile_image_url,
    strengths,
    interests,
    email
  } = modalUser;
  return (
    <Modal open={modalState} onClose={() => modalHandler({})}>
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
          <Text>{current_company?.name}</Text>
        </StyledRow>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/mail.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>{email}</Text>
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
            {strengths?.length > 0 &&
              strengths?.map((strength: any, index: number) => (
                <Label
                  key={index}
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={strength.color}
                >
                  {capitalCase(strength?.name)}
                </Label>
              ))}
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
            {interests?.length > 0 &&
              interests?.map((interest: any, index: number) => (
                <Label
                  key={index}
                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                  color={interest.color}
                >
                  {capitalCase(interest?.name)}
                </Label>
              ))}
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
          <Text>Message {first_name} on Discord here</Text>
        </StyledRow>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/linkedin.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>Connect with {first_name} on LinkedIn Here</Text>
        </StyledRow>
      </StyledContainer>
    </Modal>
  );
}
