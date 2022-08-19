import { useEffect } from 'react';

// event tracker
import { initAmplitude, setSegmentUserProperties } from 'utils/amplitude';

import Feedback from 'components/Feedback';

// routes
import GoogleTagManager from 'components/GoogleTagManager';
import FullStoryScript from 'components/FullStoryScript';
import SegmentScript from 'components/SegmentScript';
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
import { getCohorts } from './redux/slices/cohort';

require('dotenv').config({ path: '../.env' });

// ----------------------------------------------------------------------

declare global {
  interface Window {
    analytics: any;
  }
}

export default function App() {
  const { isInitialized, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    initAmplitude();
    if (isAuthenticated) {
      dispatch(getCohorts());
      setSegmentUserProperties(user);
    }
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
