import { useEffect } from 'react';

// event tracker
import { initAmplitude } from 'utils/amplitude';

import Feedback from 'components/Feedback';

// routes
import GoogleTagManager from 'components/GoogleTagManager';
import FullStoryScript from 'components/FullStoryScript';
import SegmentScript from 'components/SegmentScript';
import { setSegmentUserProperties } from 'utils/eventTracking';
import { getReferralsCount } from 'redux/slices/referral';
import { createBrowserHistory as createHistory } from 'history';
import axios from 'utils/axios';
import { useNavigate } from 'react-router-dom';
import { setSession } from 'utils/jwt';
import Router from './routes';
// theme
import ThemeConfig from './theme';
// hooks
import useAuth from './hooks/useAuth';
// components
// import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import GoogleAnalytics from './components/GoogleAnalytics';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import ThemeLocalization from './components/ThemeLocalization';
import { useDispatch } from './redux/store';
import { setCohorts, getCohortsTimeline } from './redux/slices/cohort';
import { getPaths } from './redux/slices/path';

require('dotenv').config({ path: '../.env' });

// ----------------------------------------------------------------------

declare global {
  interface Window {
    analytics: any;
    strum: Function;
  }
}

// 10 minutes delay for fetching amplitude timeline events
const FETCH_EVENT_DELAY = 10 * 60;

export default function App() {
  const { isInitialized, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const history = createHistory();

  const getAllCohorts = () => {
    const accessToken = window.localStorage.getItem('accessToken');
    setSession(accessToken);
    axios.get('/cohorts.json').then((res) => {
      if (res.data.cohorts.length === 0) {
        window.location.pathname === '/' && navigate('/all-courses');
      } else {
        dispatch(setCohorts(res.data.cohorts));
      }
    });
  };

  useEffect(() => {
    history.listen((action: any) => {
      if (action !== 'REPLACE') {
        window.strum('routeChange', window.location.href);
      }
    });
  }, [history]);

  useEffect(() => {
    if (isAuthenticated) {
      setSegmentUserProperties(user);
    }
  }, [user, isAuthenticated]);

  useEffect(() => {
    initAmplitude();
    let fetchCohortsTimeline: NodeJS.Timer;
    dispatch(getPaths());
    if (isAuthenticated) {
      getAllCohorts();
      dispatch(getReferralsCount());
      fetchCohortsTimeline = setInterval(() => {
        dispatch(getCohortsTimeline());
      }, FETCH_EVENT_DELAY * 1000);
    }

    return () => {
      clearInterval(fetchCohortsTimeline);
    };
  }, [dispatch, isAuthenticated]);

  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <ThemeLocalization>
          <RtlLayout>
            <NotistackProvider>
              {/* <Settings /> */}
              <ScrollToTop />
              <GoogleTagManager />
              <GoogleAnalytics />
              <SegmentScript />
              {isInitialized && <FullStoryScript />}
              {isAuthenticated && <Feedback />}
              {isInitialized ? <Router /> : <LoadingScreen />}
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
