import { useEffect, useState, memo } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { Navigate } from 'react-router-dom';
import './UserList.css';
import moment from 'moment';
import type { UserResponse } from 'stream-chat';

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

const ListContainer: React.FC = memo((props) => {
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
});

type ItemProps = {
  index: number;
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  user: UserResponse<TeamUserType>;
  member: boolean;
  cohortID: string;
};

const UserItem: React.FC<ItemProps> = memo((props) => {
  const { index, setSelectedUsers, user, member, cohortID } = props;
  const [navigate, setNavigate] = useState(false);

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
    <div className="user-item__wrapper">
      {member && navigate && <Navigate to={`/cohorts/${cohortID}/peers?user_id=${user.id}`} />}
      <div
        className="user-item__name-wrapper"
        role="button"
        onKeyPress={() => {}}
        tabIndex={0}
        onClick={member ? () => setNavigate(true) : handleClick}
      >
        <Avatar image={user.image} name={user.name || user.id} size={32} />
        <p className="user-item__name">{user.name || user.id}</p>
      </div>
      <p className="user-item__last-active">
        {user.last_active && moment(user.last_active).fromNow()}
      </p>

      <div
        className="user-item_invite"
        role="button"
        onKeyPress={() => {}}
        tabIndex={0}
        onClick={handleClick}
      >
        {!member && (selected ? <InviteIcon /> : <div className="user-item__invite-empty" />)}
      </div>
    </div>
  );
});

type Props = {
  enrolledUsers: any;
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  showMembers: boolean;
  admin: boolean;
  query: string;
};

export const UserList: React.FC<Props> = memo((props) => {
  const { setSelectedUsers, enrolledUsers, showMembers, admin, query } = props;
  const cohortID = window.location.pathname.split('/')[2] || '';

  const { client, channel } = useChatContext<
    TeamAttachmentType,
    TeamChannelType,
    TeamCommandType,
    TeamEventType,
    TeamMessageType,
    TeamReactionType,
    TeamUserType
  >();

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserResponse<TeamUserType>[] | undefined>();
  const [members, setMembers] = useState<any>();

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;
      setLoading(true);

      try {
        let newMembers = enrolledUsers;
        if (showMembers && channel) {
          const joinedUsers = await channel?.queryMembers({});
          const joinedMembers = joinedUsers?.members.map((member) => member.user);
          setMembers(joinedMembers);
          const memberIDs = joinedMembers?.map((member) => member?.id);
          newMembers = enrolledUsers.filter((u: any) => !memberIDs?.includes(u));
        }
        let response;
        if (newMembers.length === 0) {
          response = { users: [], duration: '1.12ms' };
        } else if (query) {
          response = await client.queryUsers(
            { id: { $in: newMembers }, $and: [{ name: { $autocomplete: query } }] },
            { name: 1 },
            { limit: 100 }
          );
        } else {
          response = await client.queryUsers(
            { id: { $in: newMembers } },
            { name: 1 },
            { limit: 100 }
          );
        }
        if (response.users.length) {
          setUsers(response.users);
        }
      } catch (event) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <ListContainer>
        <div className="user-list__message">Error loading, please refresh and try again.</div>
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
                  cohortID={cohortID}
                />
              ))
            )}
          </ListContainer>
          {admin && (
            <div className="channel-name-input__wrapper">
              <p>Add Members</p>
            </div>
          )}
        </>
      )}
      {admin && (
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
                cohortID={cohortID}
              />
            ))
          )}
        </ListContainer>
      )}
    </>
  );
});
