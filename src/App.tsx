import { useEffect } from 'react';

// event tracker
import { initAmplitude, setAmplitudeUserProperties } from 'utils/amplitude';
// routes
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
import { getNotifications } from './redux/slices/notification';

require('dotenv').config({ path: '../.env' });

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCohorts());
      dispatch(getNotifications());
      initAmplitude();
      setAmplitudeUserProperties({
        full_name: user?.displayName,
        type: user?.type
      });
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
              <GoogleAnalytics />
              {isInitialized ? <Router /> : <LoadingScreen />}
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
