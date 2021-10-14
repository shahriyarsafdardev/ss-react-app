import React, { useEffect, useState } from 'react';
import { ChannelSort, LiteralStringForUnion, StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelList,
  LoadingIndicator,
  MessageList,
  MessageInput,
  Window,
  Thread
} from 'stream-chat-react';
import { Container, Typography } from '@material-ui/core';
import useAuth from '../hooks/useAuth';
import Page from '../components/Page';
import 'stream-chat-react/dist/css/index.css';

import {
  CreateChannel,
  MessagingChannelList,
  MessagingChannelHeader
} from '../components/stream-chat';

const apiKey = '4zev2wpcm6r7';
const options = { state: true, watch: true, presence: true, limit: 8 };

const sort: ChannelSort = {
  last_message_at: -1,
  updated_at: -1,
  cid: 1
};

export type AttachmentType = {};
export type ChannelType = { demo?: string };
export type CommandType = LiteralStringForUnion;
export type EventType = {};
export type MessageType = {};
export type ReactionType = {};
export type UserType = { image?: string };

export const GiphyContext = React.createContext(
  {} as { giphyState: boolean; setGiphyState: React.Dispatch<React.SetStateAction<boolean>> }
);

export default function Chatting() {
  const [chatClient, setChatClient] = useState<StreamChat | null>(null);
  const { user } = useAuth();
  const [giphyState, setGiphyState] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const [theme, setTheme] = useState('light');
  const filters = { type: 'messaging', members: { $in: [user?.stream_id] } };

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance<
        AttachmentType,
        ChannelType,
        CommandType,
        EventType,
        MessageType,
        ReactionType,
        UserType
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

    return () => {
      chatClient?.disconnectUser();
    };
  }, []); // eslint-disable-line

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

  useEffect(() => {
    /*
     * Get the actual rendered window height to set the container size properly.
     * In some browsers (like Safari) the nav bar can override the app.
     */
    const setAppHeight = () => {
      const doc = document.documentElement;
      doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    setAppHeight();

    window.addEventListener('resize', setAppHeight);
    return () => window.removeEventListener('resize', setAppHeight);
  }, []);

  const toggleMobile = () => setMobileNav(!isMobileNavVisible);

  const giphyContextValue = { giphyState, setGiphyState };

  if (!chatClient) return <LoadingIndicator />;

  return (
    <Page title="ScholarSite | Contact Us">
      <Container maxWidth="lg">
        <Typography variant="h3">Chat with Friends</Typography>
        <Chat client={chatClient} theme={`messaging ${theme}`}>
          <ChannelList
            filters={filters}
            sort={sort}
            options={options}
            List={(props) => (
              <MessagingChannelList {...props} onCreateChannel={() => setIsCreating(!isCreating)} />
            )}
          />
          <div>
            <Channel>
              {isCreating && (
                <CreateChannel toggleMobile={toggleMobile} onClose={() => setIsCreating(false)} />
              )}
              <GiphyContext.Provider value={giphyContextValue}>
                <Window>
                  <MessagingChannelHeader theme={theme} toggleMobile={toggleMobile} />
                  <MessageList />
                  <MessageInput focus />
                </Window>
                <Thread />
              </GiphyContext.Provider>
            </Channel>
          </div>
        </Chat>
      </Container>
    </Page>
  );
}
