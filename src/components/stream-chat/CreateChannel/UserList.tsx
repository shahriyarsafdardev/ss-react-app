import { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import { Navigate } from 'react-router-dom';
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
    <div className="user-list__container" id="stream-users-list">
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
  cohortID: string;
};

const UserItem: React.FC<ItemProps> = (props) => {
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
      {navigate && <Navigate to={`/cohorts/${cohortID}/peers?user_id=${user.id}`} />}
      <div
        className="user-item__name-wrapper"
        role="button"
        onKeyPress={() => {}}
        tabIndex={0}
        onClick={() => setNavigate(true)}
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
};

type Props = {
  cohortUsers: any;
  setSelectedUsers: React.Dispatch<React.SetStateAction<string[] | undefined>>;
  showMembers: boolean;
  admin: boolean;
  query: string;
};

export const UserList: React.FC<Props> = (props) => {
  const { setSelectedUsers, cohortUsers, showMembers, admin, query } = props;
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

  const { user } = useAuth();
  const [error, setError] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserResponse<TeamUserType>[]>([]);
  const [members, setMembers] = useState<any>();
  const [offset, setOffset] = useState(0);
  const [usersResponse, setUsersResponse] = useState(0);
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
        } else if (query) {
          response = await client.queryUsers(
            { id: { $in: newMembers }, $and: [{ name: { $autocomplete: query } }] },
            { created_at: -1 },
            { limit: 80, offset }
          );
        } else {
          response = await client.queryUsers(
            { id: { $in: newMembers } },
            { created_at: -1 },
            { limit: 80, offset }
          );
        }
        if (query && response.users.length) {
          setUsers(response.users);
        } else if (response.users.length) {
          setUsers([...users, ...response.users]);
        }
        if (response.users.length === 0) {
          setListEmpty(true);
        }
        setUsersResponse(response.users.length);
      } catch (event) {
        setError(true);
      }

      setLoading(false);
    };

    if (client) getUsers();
  }, [query, offset]); // eslint-disable-line react-hooks/exhaustive-deps

  const offSetHandler = () => {
    if (offset < cohortUsers.length) {
      setOffset(offset + 80);
    }
  };
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
              <>
                {members?.length &&
                  members.map((member: any, i: number) => (
                    <UserItem
                      index={i}
                      key={member.id}
                      setSelectedUsers={setSelectedUsers}
                      member={true}
                      user={member}
                      cohortID={cohortID}
                    />
                  ))}
                {usersResponse !== 0 && (
                  <button
                    style={{
                      height: '45px',
                      padding: '10px 0',
                      backgroundColor: '#4d4dcd',
                      cursor: 'pointer',
                      color: '#FFFFFF',
                      fontSize: '18px'
                    }}
                    type="button"
                    onClick={() => offSetHandler()}
                  >
                    Load more
                  </button>
                )}
              </>
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
            <>
              {users?.length &&
                users.map((user, i) => (
                  <UserItem
                    index={i}
                    key={user.id}
                    setSelectedUsers={setSelectedUsers}
                    member={false}
                    user={user}
                    cohortID={cohortID}
                  />
                ))}
              {usersResponse !== 0 && (
                <button
                  style={{
                    height: '45px',
                    padding: '10px 0',
                    backgroundColor: '#4d4dcd',
                    cursor: 'pointer',
                    color: '#FFFFFF',
                    fontSize: '18px'
                  }}
                  type="button"
                  onClick={() => offSetHandler()}
                >
                  Load more
                </button>
              )}
            </>
          )}
        </ListContainer>
      )}
    </>
  );
};
