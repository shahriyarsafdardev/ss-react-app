import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import './CreateChannel.css';

import type { ChannelFilters } from 'stream-chat';

import { UserList } from './UserList';

import { CloseCreateChannel } from '../../../assets';

import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
} from '../../../pages/Chatting';

type InputProps = {
  channelName: string;
  setChannelName: (value: React.SetStateAction<string>) => void;
};

const ChannelNameInput: React.FC<InputProps> = (props) => {
  const { channelName = '', setChannelName } = props;
  const handleChange = (event: { preventDefault: () => void; target: { value: string } }) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        onChange={handleChange}
        placeholder="channel-name (no spaces)"
        type="text"
        value={channelName}
      />
      <p>Add Members</p>
    </div>
  );
};

type Props = {
  createType: string;
  filters: ChannelFilters[];
  cohortID: string;
  cohortUsers: any;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateChannel: React.FC<Props> = (props) => {
  const { createType, filters, setIsCreating, cohortID, cohortUsers } = props;

  const { client, setActiveChannel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const [channelName, setChannelName] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>([client.userID || '']);

  const createChannel = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!selectedUsers?.length) return;

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
        team: cohortID
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID || '']);
      setActiveChannel(newChannel);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-channel__container">
      <div className="create-channel__header">
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
        <CloseCreateChannel {...{ setIsCreating }} />
      </div>
      {createType === 'team' && <ChannelNameInput {...{ channelName, setChannelName }} />}
      <UserList {...{ filters, setSelectedUsers, cohortUsers }} />
      <div
        className="create-channel__button-wrapper"
        role="button"
        onKeyPress={() => {}}
        tabIndex={0}
        onClick={createChannel}
      >
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </div>
    </div>
  );
};
