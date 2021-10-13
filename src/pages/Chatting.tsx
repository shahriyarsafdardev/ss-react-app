import { useState, useEffect } from 'react';
import { Container, Typography } from '@material-ui/core';
import { StreamChat } from 'stream-chat';
import {
  Chat,
  Channel,
  ChannelHeader,
  ChannelList,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window
} from 'stream-chat-react';
import useAuth from '../hooks/useAuth';
import Page from '../components/Page';
import 'stream-chat-react/dist/css/index.css';

export default function Chatting() {
  const [chatClient, setChatClient] = useState<any>(null);
  const [sort, setSort] = useState<any>({ last_message_at: -1 });
  const { user } = useAuth();
  const filters = { type: 'messaging', members: { $in: [user?.stream_id] } };

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance('4zev2wpcm6r7');

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

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <Page title="ScholarSite | Contact Us">
      <Container maxWidth="lg">
        <Typography variant="h3">Chat with Friends</Typography>
        <Chat client={chatClient} theme="messaging light">
          {chatClient ? (
            <>
              <ChannelList sort={sort} />
              <Channel>
                <Window>
                  <ChannelHeader />
                  <MessageList />
                  <MessageInput />
                </Window>
                <Thread />
              </Channel>
            </>
          ) : (
            <LoadingIndicator />
          )}
        </Chat>
      </Container>
    </Page>
  );
}
