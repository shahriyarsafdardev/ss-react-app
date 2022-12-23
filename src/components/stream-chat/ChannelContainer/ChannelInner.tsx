import React, { useContext, useState, memo, useCallback } from 'react';
import ConfirmationAlert from 'components/ConfirmationAlert';
import { MessageResponse, logChatPromiseExecution } from 'stream-chat';

import {
  defaultPinPermissions,
  MessageList,
  MessageInput,
  PinEnabledUserRoles,
  Thread,
  useChannelActionContext,
  useChannelStateContext,
  Window,
  MessageToSend
} from 'stream-chat-react';

import { AnalyticsContext } from 'contexts/AnalyticsContext';
import useAuth from 'hooks/useAuth';
import { PinnedMessageList } from '../PinnedMessageList/PinnedMessageList';
import { TeamChannelHeader } from '../TeamChannelHeader/TeamChannelHeader';
import { ThreadMessageInput } from '../TeamMessageInput/ThreadMessageInput';
import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
} from '../../../pages/dashboard/cohorts/messaging/Messaging';
import { getChannelName } from '../TeamChannelPreview/TeamChannelPreview';

type InnerProps = {
  pinsOpen: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  setPinsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type: string | undefined;
};

type GiphyStateObj = {
  giphyState: boolean;
  setGiphyState: React.Dispatch<React.SetStateAction<boolean>>;
};

export const GiphyContext = React.createContext<GiphyStateObj>({} as GiphyStateObj);

export const ChannelInner: React.FC<InnerProps> = memo((props) => {
  const { pinsOpen, setIsEditing, setPinsOpen } = props;

  const [giphyState, setGiphyState] = useState(false);
  const [modalState, setModalState] = useState(false);
  const [message, setMessage] = useState<MessageToSend>({});

  const giphyStateObj = {
    giphyState,
    setGiphyState
  };

  const { sendMessage } = useChannelActionContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const { channel } = useChannelStateContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const teamPermissions: PinEnabledUserRoles = { ...defaultPinPermissions.team, user: true };
  const messagingPermissions: PinEnabledUserRoles = {
    ...defaultPinPermissions.messaging,
    user: true
  };
  const pinnedPermissions = {
    ...defaultPinPermissions,
    team: teamPermissions,
    messaging: messagingPermissions
  };

  const sendMessageHandler = (messageToSend: MessageToSend) => {
    let updatedMessage = {
      attachments: messageToSend.attachments,
      mentioned_users: messageToSend.mentioned_users,
      parent_id: messageToSend.parent?.id,
      parent: messageToSend.parent as MessageResponse,
      text: messageToSend.text
    };
    if (giphyState) {
      const updatedText = `/giphy ${message.text}`;
      updatedMessage = { ...updatedMessage, text: updatedText };
    }

    if (sendMessage) {
      const sendMessagePromise = sendMessage(updatedMessage);
      logChatPromiseExecution(sendMessagePromise, 'send message');
      setGiphyState(false);
    }
  };

  const overrideSubmitHandler = useCallback((message: MessageToSend) => {
    if (message.text?.includes('@everyone')) {
      setMessage(message);
      setModalState(true);
    } else {
      sendMessageHandler(message);
    }
  }, []);

  return (
    <GiphyContext.Provider value={giphyStateObj}>
      <ConfirmationAlert
        title=""
        open={modalState}
        alertText={`Are you sure you want to send an email notification to all ${
          Number(channel?.data?.member_count) - 1
        } members of this channel?`}
        onCancel={() => {
          setModalState(false);
        }}
        onConfirm={() => {
          sendMessageHandler(message);
          setModalState(false);
        }}
      />
      <div style={{ display: 'flex', width: '100%' }}>
        <Window>
          <TeamChannelHeader {...{ setIsEditing, setPinsOpen }} />
          <MessageList disableQuotedMessages={true} pinPermissions={pinnedPermissions} />
          <MessageInput grow overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread
          additionalMessageInputProps={{
            grow: true,
            Input: ThreadMessageInput
          }}
        />
        {pinsOpen && <PinnedMessageList setPinsOpen={setPinsOpen} />}
      </div>
    </GiphyContext.Provider>
  );
});
