import { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { v4 as uuidv4 } from 'uuid';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';

import './CreateChannel.css';
import { Box, FormControl, OutlinedInput, InputAdornment } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

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
  cohortID: string;
  cohortUsers: any;
  setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
};

export const CreateChannel: React.FC<Props> = (props) => {
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
  const regexForChannelName = /^[a-zA-Z0-9._-]+$/;
  const [findUser, setFindUser] = useState<string>('');

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
        {...{ setSelectedUsers, cohortUsers }}
      />
      <div
        className="create-channel__button-wrapper"
        role="button"
        onKeyPress={() => {}}
        tabIndex={0}
        onClick={createChannel}
      >
        <p>{createType === 'team' ? 'Create Channel' : 'Start Chat'}</p>
      </div>
    </div>
  );
};
