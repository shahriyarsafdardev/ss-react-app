import { useContext } from 'react';
// modal
import { Modal } from 'components/animate';
import { styled, useTheme } from '@material-ui/core/styles';
import { Box, Typography, Link } from '@material-ui/core';
import { capitalCase } from 'change-case';
import { CohortContext } from 'contexts/CohortContext';
import { trackPeersPageEvent, PEERS_PAGE_EVENTS } from 'utils/amplitude';
import Label from '../Label';

type StudentProfileModalProps = {
  modalState: boolean;
  modalHandler: Function;
  modalUser: any;
  cohortID: string;
  dispalyChatLink: boolean;
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
  whiteSpace: 'break-spaces'
}));

const ColoredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexWrap: 'wrap',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  },
  '&.gaped': {
    gap: 10
  }
}));

const ColoredContainerMobile = styled(Box)(({ theme }) => ({
  display: 'none',
  flex: 1,
  alignItems: 'center',
  flexWrap: 'wrap',
  marginBottom: 20,
  [theme.breakpoints.down('sm')]: {
    display: 'flex'
  },
  '&.gaped': {
    gap: 10
  }
}));

export default function StudentProfileModal({
  modalState,
  modalHandler,
  modalUser,
  cohortID,
  dispalyChatLink
}: StudentProfileModalProps) {
  const theme = useTheme();
  const { cohortName, cohortIntake } = useContext(CohortContext);

  const {
    id,
    first_name,
    last_name,
    current_company,
    profile_image_url,
    current_position,
    current_role_category_selections,
    current_industry_category_selections,
    bio_text,
    preferred_pronoun,
    phone,
    strengths,
    interests,
    linkedin_url,
    discord_url,
    email
  } = modalUser;
  return (
    <Modal className="small" open={modalState} onClose={() => modalHandler({})} id="student-modal">
      <StyledContainer>
        <Title>
          {first_name} {last_name}
        </Title>
        {preferred_pronoun && (
          <StyledRow>
            <img
              alt="sketch icon"
              src="/static/peers/ic_person.svg"
              width={20}
              height={20}
              style={{ marginRight: 15 }}
            />
            <Text data-testid="preferred-pronoun">{preferred_pronoun}</Text>
          </StyledRow>
        )}
        {bio_text && (
          <StyledRow>
            <img
              alt="sketch icon"
              src="/static/peers/ic_clear_all.svg"
              width={20}
              height={20}
              style={{ marginRight: 15 }}
            />
            <Text data-testid="introduction">{bio_text}</Text>
          </StyledRow>
        )}
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/job.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text data-testid="company-name">{current_company?.name}</Text>
        </StyledRow>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/job.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text data-testid="current-position">{current_position}</Text>
        </StyledRow>
        {current_industry_category_selections?.length > 0 && (
          <>
            <StyledRow>
              <img
                alt="sketch icon"
                src="/static/peers/job.svg"
                width={20}
                height={20}
                style={{ marginRight: 15 }}
              />
              <ColoredContainer>
                {current_industry_category_selections?.map((industry: any, index: number) => (
                  <Text key={index} data-testid="preferred-pronoun">
                    {index !== 0 && ', '}
                    {capitalCase(industry)}
                  </Text>
                ))}
              </ColoredContainer>
            </StyledRow>
            <ColoredContainerMobile>
              {current_industry_category_selections?.length > 0 &&
                current_industry_category_selections?.map((industry: any, index: number) => (
                  <Text key={index} data-testid="preferred-pronoun">
                    {capitalCase(industry)}
                    {index !== 0 && ', '}
                  </Text>
                ))}
            </ColoredContainerMobile>
          </>
        )}
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/mail.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text data-testid="user-email">{email}</Text>
        </StyledRow>
        {interests?.length > 0 && (
          <>
            <StyledRow>
              <img
                alt="sketch icon"
                src="/static/peers/done_all.svg"
                width={20}
                height={20}
                style={{ marginRight: 15 }}
              />
              <Text style={{ marginRight: 10 }}>What I am looking for</Text>
              <ColoredContainer className="gaped">
                {interests?.map((interest: any, index: number) => (
                  <Label
                    key={index}
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color="secondary"
                    testId={`interest-${index}`}
                  >
                    {capitalCase(interest)}
                  </Label>
                ))}
              </ColoredContainer>
            </StyledRow>
            <ColoredContainerMobile className="gaped">
              {interests?.length > 0 &&
                interests?.map((interest: any, index: number) => (
                  <Label
                    key={index}
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color="secondary"
                  >
                    {capitalCase(interest)}
                  </Label>
                ))}
            </ColoredContainerMobile>
          </>
        )}
        {strengths?.length > 0 && (
          <>
            <StyledRow>
              <img
                alt="sketch icon"
                src="/static/peers/star.svg"
                width={20}
                height={20}
                style={{ marginRight: 15 }}
              />
              <Text style={{ marginRight: 10 }}>What I am good at</Text>
              <ColoredContainer className="gaped">
                {strengths?.map((strength: any, index: number) => (
                  <Label
                    key={index}
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color="success"
                    testId={`strength-${index}`}
                  >
                    {capitalCase(strength)}
                  </Label>
                ))}
              </ColoredContainer>
            </StyledRow>
            <ColoredContainerMobile className="gaped">
              {strengths?.length > 0 &&
                strengths?.map((strength: any, index: number) => (
                  <Label
                    key={index}
                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color="success"
                  >
                    {capitalCase(strength)}
                  </Label>
                ))}
            </ColoredContainerMobile>
          </>
        )}
        {phone && (
          <StyledRow>
            <img
              alt="sketch icon"
              src="/static/contact/smartphone.svg"
              width={20}
              height={20}
              style={{ marginRight: 15 }}
            />
            <Text>{phone}</Text>
          </StyledRow>
        )}
      </StyledContainer>
      {(linkedin_url || discord_url) && (
        <StyledContainer>
          <Title>Socials</Title>
          {discord_url && !dispalyChatLink && (
            <StyledRow>
              <img
                alt="sketch icon"
                src="/static/peers/discord.svg"
                width={20}
                height={20}
                style={{ marginRight: 15 }}
              />
              <Link href={discord_url} target="_blank" data-testid="discord-url">
                <Text data-testid="discord-text">Message {first_name} on Discord</Text>
              </Link>
            </StyledRow>
          )}
          {linkedin_url && (
            <StyledRow>
              <img
                alt="sketch icon"
                src="/static/peers/linkedin.svg"
                width={20}
                height={20}
                style={{ marginRight: 15 }}
              />
              <Link
                href={linkedin_url}
                onClick={() =>
                  trackPeersPageEvent(
                    cohortName,
                    cohortIntake,
                    PEERS_PAGE_EVENTS.member_details_modal,
                    PEERS_PAGE_EVENTS.opened_linked_in
                  )
                }
                target="_blank"
                data-testid="linkedin-url"
              >
                {' '}
                <Text data-testid="linkedin-text">Connect with {first_name} on LinkedIn</Text>
              </Link>
            </StyledRow>
          )}
          {dispalyChatLink && (
            <StyledRow>
              <img
                alt="sketch icon"
                src="/static/icons/navbar/ic_chat.svg"
                width={20}
                height={20}
                style={{ marginRight: 15 }}
              />
              <Link href={`/cohorts/${cohortID}/messaging?direct=true&receiver_id=${id}`}>
                {' '}
                <Text>Message {first_name} through ScholarSite</Text>
              </Link>
            </StyledRow>
          )}
        </StyledContainer>
      )}
    </Modal>
  );
}
