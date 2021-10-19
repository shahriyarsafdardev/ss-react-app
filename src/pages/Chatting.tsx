import { useState, useEffect } from 'react';
import { Container } from '@material-ui/core';
import { LiteralStringForUnion, StreamChat, ChannelFilters, ChannelSort } from 'stream-chat';
import { Chat, enTranslations, LoadingIndicator, Streami18n } from 'stream-chat-react';
import { RootState, useSelector } from '../redux/store';

import './Chatting.css';

import { ChannelContainer } from '../components/stream-chat/ChannelContainer/ChannelContainer';
import { ChannelListContainer } from '../components/stream-chat/ChannelListContainer/ChannelListContainer';

import useAuth from '../hooks/useAuth';
import Page from '../components/Page';
import 'stream-chat-react/dist/css/index.css';

const apiKey = '4zev2wpcm6r7';

const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations
  }
});

export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = { image?: string };

const options = { state: true, watch: true, presence: true };

export default function Chatting() {
  const [client, setChatClient] = useState<any>(null);
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { user } = useAuth();
  const cohortID = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohortID === cohort.id)[0]
  );
  const cohortUsers = cohort.enrollments;
  const sort: ChannelSort<TeamChannelType> = { last_message_at: -1, updated_at: -1 };
  const filters: ChannelFilters[] = [
    { type: 'team', members: { $in: [user?.stream_id] }, team: cohortID },
    { type: 'messaging', members: { $in: [user?.stream_id] }, team: cohortID }
  ];

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance<
        TeamAttachmentType,
        TeamChannelType,
        TeamCommandType,
        TeamEventType,
        TeamMessageType,
        TeamReactionType,
        TeamUserType
      >(apiKey!);
      await client.disconnectUser();
      await client.connectUser(
        {
          id: user?.stream_id,
          name: user?.full_name,
          image: user?.profile_picture_url
        },
        user?.stream_token
      );
      setChatClient(client);
    };

    initChat();
  }, []);

  useEffect(() => {
    const mobileChannelList = document.querySelector('#mobile-channel-list');
    if (isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else if (!isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }, [isMobileNavVisible]);

  if (!client) {
    return <LoadingIndicator />;
  }

  return (
    <Page title="ScholarSite | Messaging">
      <Container maxWidth="lg">
        <div key={cohortID} className="chat_wrapper">
          <Chat {...{ client, i18nInstance }} theme="team light">
            <ChannelListContainer
              {...{
                isCreating,
                filters,
                options,
                setCreateType,
                setIsCreating,
                setIsEditing,
                cohortID,
                cohortUsers,
                sort
              }}
            />
            <ChannelContainer
              {...{
                createType,
                isCreating,
                isEditing,
                setIsCreating,
                setIsEditing,
                cohortID,
                cohortUsers
              }}
            />
          </Chat>
        </div>
      </Container>
    </Page>
  );
}
