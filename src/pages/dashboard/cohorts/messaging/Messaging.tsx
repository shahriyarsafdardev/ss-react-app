import { useState, useEffect, memo } from 'react';
import { Box, useMediaQuery } from '@material-ui/core';
import { useTheme, styled } from '@material-ui/core/styles';
import { LiteralStringForUnion, StreamChat, ChannelSort } from 'stream-chat';
import { Chat, enTranslations, Streami18n } from 'stream-chat-react';
import { trackEvent } from 'utils/eventTracking';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { useLocation } from 'react-router-dom';
import BasicProfileForm from 'components/cohorts/onboarding/new-info-forms/BasicProfileForm';
import { RootState, useSelector, useDispatch } from '../../../../redux/store';
import { getPeers } from '../../../../redux/slices/cohort';

import LoadingScreen from '../../../../components/LoadingScreen';

import './Messaging.css';

import { ChannelContainer } from '../../../../components/stream-chat/ChannelContainer/ChannelContainer';
import { ChannelListContainer } from '../../../../components/stream-chat/ChannelListContainer/ChannelListContainer';

import SidePanel from './SidePanel';
import useAuth from '../../../../hooks/useAuth';
import Page from '../../../../components/Page';
import 'stream-chat-react/dist/css/index.css';

const apiKey = process.env.REACT_APP_STREAM_API_KEY || process.env.STREAM_API_KEY;
const i18nInstance = new Streami18n({
  language: 'en',
  translationsForLanguage: {
    ...enTranslations
  }
});

const DesktopView = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));

const MobileView = styled(Box)(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    display: 'block'
  }
}));

export type TeamAttachmentType = Record<string, unknown>;
export type TeamChannelType = Record<string, unknown>;
export type TeamCommandType = LiteralStringForUnion;
export type TeamEventType = Record<string, unknown>;
export type TeamMessageType = Record<string, unknown>;
export type TeamReactionType = Record<string, unknown>;
export type TeamUserType = { image?: string };

const options = { state: true, watch: true, presence: true };

function Messaging() {
  const [client, setChatClient] = useState<any>(null);
  const [isMobileNavVisible, setMobileNav] = useState(false);
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const theme = useTheme();
  const [analyticsSent, setAnalyticsSent] = useState(false);
  const { user } = useAuth();
  const dispatch = useDispatch();
  const loggedinUserID = user?.id;
  const cohortID = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohortID === cohort.id)[0]
  );
  const peers = cohort?.peers;
  const sort: ChannelSort<TeamChannelType> = {};
  const url = new URLSearchParams(useLocation().search);
  const enrollments = peers?.filter((peer) => peer.id !== loggedinUserID)?.map((peer) => peer.id);
  const desktopView = useMediaQuery(theme.breakpoints.up('md'));
  const [profileFormSubmitted, setProfileFormSubmitted] = useState(user?.basic_profile_completed);

  const LoadingContainer = styled(Box)(() => ({
    position: 'absolute',
    top: '50%',
    left: '50%'
  }));

  const sendAnalyticsData = (eventName: string, eventData: any) => {
    cohort && trackEvent(cohort, eventName, eventData);
  };

  useEffect(() => {
    if (cohort && !peers) {
      dispatch(getPeers(cohortID.toString(), loggedinUserID));
    }
  }, [dispatch, cohort]);

  useEffect(() => {
    setAnalyticsSent(false);
  }, [cohortID]);

  useEffect(() => {
    if (cohort && !analyticsSent) {
      sendAnalyticsData('Messaging Page - Page Loaded', {});
      if (url.get('email')) {
        sendAnalyticsData('Email - "What you missed" Email - Messaging Opened', {});
      }
      setAnalyticsSent(true);
    }
  }, [cohort, analyticsSent]);

  useEffect(() => {
    const initChat = async () => {
      const client = StreamChat.getInstance<
        TeamAttachmentType,
        TeamChannelType,
        TeamCommandType,
        TeamEventType,
        TeamMessageType,
        TeamReactionType,
        TeamUserType
      >(apiKey!);
      if (!client.user && user?.stream_token) {
        await client.connectUser(
          {
            id: user?.stream_id || user?.id,
            name: user?.full_name,
            image: user?.profile_picture_url
          },
          user?.stream_token
        );
      }
      setChatClient(client);
    };
    if (user?.stream_token) {
      initChat();
    }
  }, []);

  useEffect(() => {
    const mobileChannelList = document.querySelector('#mobile-channel-list');
    if (isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.add('show');
      document.body.style.overflow = 'hidden';
    } else if (!isMobileNavVisible && mobileChannelList) {
      mobileChannelList.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  }, [isMobileNavVisible]);

  if (!client || !client.user || !cohort) {
    return (
      <LoadingContainer>
        <LoadingScreen />
      </LoadingContainer>
    );
  }

  return (
    <Page title="Sphere | Messaging" id="page">
      {profileFormSubmitted ? (
        <AnalyticsContext.Provider value={{ sendAnalyticsData }}>
          <Box id="box">
            <div key={cohortID} className="chat_wrapper">
              <Chat {...{ client, i18nInstance }} theme="team light">
                <DesktopView>
                  <ChannelListContainer
                    {...{
                      isCreating,
                      options,
                      setCreateType,
                      setIsCreating,
                      setIsEditing,
                      cohortID,
                      cohortUsers: enrollments || [],
                      sort,
                      loggedinUserID,
                      canTrack: desktopView
                    }}
                  />
                </DesktopView>

                <ChannelContainer
                  {...{
                    createType,
                    isCreating,
                    isEditing,
                    setIsCreating,
                    setIsEditing,
                    cohortID,
                    cohortUsers: enrollments || []
                  }}
                />
                <MobileView>
                  <SidePanel
                    props={{
                      isCreating,
                      options,
                      setCreateType,
                      setIsCreating,
                      setIsEditing,
                      cohortID,
                      cohortUsers: enrollments || [],
                      sort,
                      loggedinUserID,
                      canTrack: !desktopView
                    }}
                  />
                </MobileView>
              </Chat>
            </div>
          </Box>
        </AnalyticsContext.Provider>
      ) : (
        <BasicProfileForm setProfileFormSubmitted={setProfileFormSubmitted} />
      )}
    </Page>
  );
}

export default memo(Messaging);
