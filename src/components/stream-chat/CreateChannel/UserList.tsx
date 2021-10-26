import { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import useAuth from 'hooks/useAuth';
import './UserList.css';
import moment from 'moment';
import type { ChannelFilters, ChannelMemberResponse, UserResponse } from 'stream-chat';

import { InviteIcon } from '../../../assets';

import type {
  TeamAttachmentType,
  TeamChannelType,
  TeamCommandType,
  TeamEventType,
  TeamMessageType,
  TeamReactionType,
  TeamUserType
} from '../../../pages/dashboard/cohorts/messaging/Messaging';

const ListContainer: React.FC = (props) => {
  const { children } = props;

  return (
    <div className="user-list__container">
      <div className="user-list__header">
        <p>User</p>
        <p>Last Active</p>
        <p>Invite</p>
      </div>
      {children}
    </div>
  );
};

type ItemProps = {
  index: number;
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  user: UserResponse<TeamUserType>;
  member: boolean;
};

const UserItem: React.FC<ItemProps> = (props) => {
  const { index, setSelectedUsers, user, member } = props;

  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    if (selected) {
      setSelectedUsers((prevUsers) => prevUsers?.filter((prevUser) => prevUser !== user.id));
    } else {
      setSelectedUsers((prevUsers) => (prevUsers ? [...prevUsers, user.id] : [user.id]));
    }
    setSelected(!selected);
  };

  return (
    <div
      className="user-item__wrapper"
      role="button"
      onKeyPress={() => {}}
      tabIndex={0}
      onClick={handleClick}
    >
      <div className="user-item__name-wrapper">
        <Avatar image={user.image} name={user.name || user.id} size={32} />
        <p className="user-item__name">{user.name || user.id}</p>
      </div>
      <p className="user-item__last-active">
        {user.last_active && moment(user.last_active).fromNow()}
      </p>
      {!member && (selected ? <InviteIcon /> : <div className="user-item__invite-empty" />)}
    </div>
  );
};

type Props = {
  filters: ChannelFilters[];
  cohortUsers: any;
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  showMembers: boolean;
};

export const UserList: React.FC<Props> = (props) => {
  const { filters, setSelectedUsers, cohortUsers, showMembers } = props;

  const { client, channel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const { user } = useAuth();
  const [error, setError] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserResponse<TeamUserType>[] | undefined>();
  const [members, setMembers] = useState<any>();

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);

      try {
        let newMembers = cohortUsers;
        if (showMembers && channel) {
          const joinedUsers = await channel?.queryMembers({});
          const joinedMembers = joinedUsers?.members.map((member) => member.user);
          setMembers(joinedMembers);
          const memberIDs = joinedMembers?.map((member) => member?.id);
          newMembers = cohortUsers.filter((u: any) => !memberIDs?.includes(u));
        }
        let response;
        if (newMembers.length === 0) {
          response = { users: [], duration: '1.12ms' };
        } else {
          response = await client.queryUsers({ id: { $in: newMembers } });
        }
        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (event) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">Error loading, please refresh and try again.</div>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <div className="user-list__message">No users found.</div>
      </ListContainer>
    );
  }

  return (
    <>
      {showMembers && (
        <>
          <ListContainer>
            {loading ? (
              <div className="user-list__message">Loading users...</div>
            ) : (
              members?.length &&
              members.map((member: any, i: number) => (
                <UserItem
                  index={i}
                  key={member.id}
                  setSelectedUsers={setSelectedUsers}
                  member={true}
                  user={member}
                />
              ))
            )}
          </ListContainer>

          <div className="channel-name-input__wrapper">
            <p>Add Members</p>
          </div>
        </>
      )}
      <ListContainer>
        {loading ? (
          <div className="user-list__message">Loading users...</div>
        ) : (
          users?.length &&
          users.map((user, i) => (
            <UserItem
              index={i}
              key={user.id}
              setSelectedUsers={setSelectedUsers}
              member={false}
              user={user}
            />
          ))
        )}
      </ListContainer>
    </>
  );
};
