import { useContext, useState, memo, useCallback } from 'react';
import { useChatContext } from 'stream-chat-react';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import './CreateChannel.css';
import { Box, FormControl, OutlinedInput, InputAdornment } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack5';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
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

import { getChannelName } from '../TeamChannelPreview/TeamChannelPreview';

type InputProps = {
  channelName: string;
  setChannelName: (value: React.SetStateAction<string>) => void;
};

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  },
  [theme.breakpoints.up('md')]: {
    width: 240,
    flexDirection: 'row',
    '&.Mui-focused': { width: 280 }
  }
}));

const ChannelNameInput: React.FC<InputProps> = memo((props) => {
  const { channelName = '', setChannelName } = props;

  return (
    <div className="channel-name-input__wrapper">
      <p>Name</p>
      <input
        onChange={(e) => setChannelName(e.target.value)}
        placeholder="channel-name (no spaces)"
        type="text"
        value={channelName}
      />
      <p>Add Members</p>
    </div>
  );
});

type Props = {
  createType: string;
  cohortID: string;
  cohortUsers: any;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateChannel: React.FC<Props> = memo((props) => {
  const { createType, setIsCreating, cohortID, cohortUsers } = props;

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
  const regexForChannelName = /^[a-zA-Z0-9_-]*$/;
  const [findUser, setFindUser] = useState<string>('');
  const enrolledUsers = cohortUsers.filter((user_id: string) => user_id !== client.userID);
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const matchRegex = useCallback(() => {
    if (createType === 'team' && !regexForChannelName.test(channelName)) {
      enqueueSnackbar('Invalid channel name. Only A-Z, a-z, 0-9 and _- are allowed', {
        variant: 'error'
      });
      return false;
    }
    return true;
  }, [createType, channelName]);

  const createPublicChannel = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!matchRegex()) {
      return;
    }
    try {
      let users: any;
      if (enrolledUsers.length === 0) {
        users = [];
      } else {
        const response = await client.queryUsers(
          { id: { $in: enrolledUsers } },
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
        const myuuid = uuidv4();
        const newName = channelName + myuuid;
        const newChannel = await client.channel(createType, newName, {
          name: channelName,
          members: users,
          team: cohortID
        });

        await newChannel.watch();

        setChannelName('');
        setIsCreating(false);
        setSelectedUsers([client.userID || '']);
        setActiveChannel(newChannel);
        sendAnalyticsData('Messaging Page - Channel Opened', {
          'Channel Name': `#${channelName}`,
          'Channel Type': 'public'
        });
      } catch (err) {
        console.log(err);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createChannel = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (!matchRegex()) {
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
      let newName = channelName;
      // if (createType === 'team') {
      //   newName = channelName + myuuid;
      // }
      newName = channelName + myuuid;
      const newChannel = await client.channel(createType, newName, {
        name: channelName,
        members: selectedUsers,
        team: cohortID
      });

      await newChannel.watch();

      setChannelName('');
      setIsCreating(false);
      setSelectedUsers([client.userID || '']);
      setActiveChannel(newChannel);
      sendAnalyticsData('Messaging Page - Channel Opened', {
        'Channel Name':
          createType === 'team'
            ? `#${channelName}`
            : getChannelName(
                Object.values(newChannel.state.members).filter(
                  ({ user }) => user?.id !== client.userID
                )
              ),
        'Channel Type': createType === 'team' ? 'public' : 'private'
      });
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
      <FormControl size="small">
        <SearchStyle
          value={findUser}
          onChange={(e) => setFindUser(e.target.value)}
          placeholder="Search User..."
          startAdornment={
            <InputAdornment position="start">
              <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
        />
      </FormControl>
      <UserList
        admin={true}
        showMembers={false}
        query={findUser}
        {...{ setSelectedUsers, enrolledUsers }}
      />
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
});
