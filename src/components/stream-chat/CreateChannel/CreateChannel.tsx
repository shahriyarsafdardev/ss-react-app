import { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import { v4 as uuidv4 } from 'uuid';

import './CreateChannel.css';

import type { ChannelFilters } from 'stream-chat';
import { useSnackbar } from 'notistack5';

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
} from '../../../pages/dashboard/cohorts/messaging/Messaging';

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
  const { enqueueSnackbar } = useSnackbar();
  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>([client.userID || '']);
  const regexForChannelName = /^[a-zA-Z0-9._-]+$/;

  const createPublicChannel = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (createType === 'team' && !regexForChannelName.test(channelName)) {
      enqueueSnackbar('Invalid channel name. Only A-Z, a-z, 0-9 and _- are allowed', {
        variant: 'error'
      });

      return;
    }
    try {
      let users: any;
      if (cohortUsers.length === 0) {
        users = [];
      } else {
        const response = await client.queryUsers(
          { id: { $in: cohortUsers } },
          { created_at: -1 },
          { limit: 99 }
        );
        if (response.users.length) {
          const newusers = response.users.map((user) => user.id);
          users = [client.userID, ...newusers];
        } else {
          users = [];
        }
      }
      try {
        const newChannel = await client.channel(createType, channelName, {
          name: channelName,
          members: users,
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
    } catch (error) {
      console.log(error);
    }
  };
  const createChannel = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (createType === 'team' && !regexForChannelName.test(channelName)) {
      enqueueSnackbar('Invalid channel name. Only A-Z, a-z, 0-9 and _- are allowed', {
        variant: 'error'
      });

      return;
    }

    if (!selectedUsers?.length) return;

    if (createType !== 'team' && selectedUsers && selectedUsers?.length < 2) {
      enqueueSnackbar('Select at least 1 member for direct chat!', {
        variant: 'error'
      });

      return;
    }

    try {
      const myuuid = uuidv4();
      const newChannel = await client.channel(createType, channelName + myuuid, {
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
      <UserList showMembers={false} {...{ filters, setSelectedUsers, cohortUsers }} />
      <div className="create-channel__button-wrapper">
        {createType === 'team' && (
          <div role="button" onKeyPress={() => {}} tabIndex={0} onClick={createPublicChannel}>
            <p>Create Public Channel</p>
          </div>
        )}
        <div role="button" onKeyPress={() => {}} tabIndex={0} onClick={createChannel}>
          <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
        </div>
      </div>
    </div>
  );
};
