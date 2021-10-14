import React, { useEffect } from 'react';
import { Avatar, useChatContext, ChannelSearchProps } from 'stream-chat-react';
import type { StreamChat } from 'stream-chat';
import { CreateChannelIcon } from '../../../assets';

import type {
  AttachmentType,
  ChannelType,
  CommandType,
  EventType,
  MessageType,
  ReactionType,
  UserType
} from '../../../pages/Chatting';

import './MessagingChannelList.css';

type Props = ChannelSearchProps & {
  onCreateChannel: () => void;
};

const MessagingChannelList: React.FC<Props> = (props) => {
  const { children, SearchLoading, onCreateChannel } = props;

  const { client, setActiveChannel } = useChatContext<
    AttachmentType,
    ChannelType,
    CommandType,
    EventType,
    MessageType,
    ReactionType,
    UserType
  >();

  const { id, image, name } = client.user || {};

  return (
    <div className="messaging__channel-list">
      <div className="messaging__channel-list__header">
        <Avatar image={image} name={name} size={40} />
        <div className="messaging__channel-list__header__name">{name || id}</div>
        <button
          className="messaging__channel-list__header__button"
          onKeyPress={() => {}}
          onClick={onCreateChannel}
        >
          <CreateChannelIcon />
        </button>
      </div>
      {children}
    </div>
  );
};

export default React.memo(MessagingChannelList);
