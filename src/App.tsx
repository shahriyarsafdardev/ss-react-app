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
import { getCohorts, getCohortsTimeline } from './redux/slices/cohort';

require('dotenv').config({ path: '../.env' });

// ----------------------------------------------------------------------

declare global {
  interface Window {
    analytics: any;
  }
}

// 10 minutes delay for fetching amplitude timeline events
const FETCH_EVENT_DELAY = 10 * 60;

export default function App() {
  const { isInitialized, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    initAmplitude();
    let fetchCohortsTimeline: NodeJS.Timer;
    if (isAuthenticated) {
      dispatch(getCohorts());
      dispatch(getReferralsCount());
      fetchCohortsTimeline = setInterval(() => {
        dispatch(getCohortsTimeline());
      }, FETCH_EVENT_DELAY * 1000);
      setSegmentUserProperties(user);
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
