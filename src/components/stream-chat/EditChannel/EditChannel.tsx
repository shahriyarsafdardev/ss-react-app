import { useState, memo } from 'react';
import { useChatContext } from 'stream-chat-react';
import './EditChannel.css';
import { UserList } from '../CreateChannel/UserList';
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

import useAuth from '../../../hooks/useAuth';

type InputProps = {
  channelName: string;
  setChannelName: (value: React.SetStateAction<string>) => void;
};

const ChannelNameInput: React.FC<InputProps> = memo((props) => {
  const { channelName = '', setChannelName } = props;

  const handleChange = (event: { preventDefault: () => void; target: { value: string } }) => {
    event.preventDefault();
    setChannelName(event.target.value);
  };

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input onChange={handleChange} placeholder="channel-name" type="text" value={channelName} />
      <p>Channel Members</p>
    </div>
  );
});

type Props = {
  cohortUsers: any;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
};

export const EditChannel: React.FC<Props> = memo((props) => {
  const { setIsEditing, cohortUsers } = props;
  const { user } = useAuth();

  const { channel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const [channelName, setChannelName] = useState<string>(
    channel?.data?.name || (channel?.data?.id as string)
  );
  const [selectedUsers, setSelectedUsers] = useState<string[] | undefined>();
  const enrolledUsers = cohortUsers.filter((user_id: string) => user_id !== user?.id);

  const updateChannel = async (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();

    const nameChanged = channelName !== (channel?.data?.name || channel?.data?.id);
    try {
      if (nameChanged) {
        await channel?.updatePartial({
          set: { name: channelName, text: `Channel name changed to ${channelName}` }
        });
      }
      if (selectedUsers?.length) {
        const users = selectedUsers.map((user) => user);
        await channel?.addMembers(users);
      }

      setChannelName('');
      setIsEditing(false);
      setSelectedUsers(undefined);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="edit-channel__container">
      <div className="edit-channel__header">
        {user?.type === 'admin' ? <p>Edit Channel</p> : <p>Channel Info</p>}
        <CloseCreateChannel {...{ setIsEditing }} />
      </div>
      {user?.type === 'admin' && <ChannelNameInput {...{ channelName, setChannelName }} />}
      <UserList
        admin={user?.type === 'admin'}
        query=""
        showMembers={true}
        {...{ enrolledUsers, setSelectedUsers }}
      />
      {user?.type === 'admin' && (
        <div
          className="edit-channel__button-wrapper"
          role="button"
          onKeyPress={() => {}}
          tabIndex={0}
          onClick={updateChannel}
        >
          <p>Save Changes</p>
        </div>
      )}
    </div>
  );
});
