import { useEffect } from 'react';

// event tracker
import { initAmplitude, setAmplitudeUserProperties } from 'utils/amplitude';

import Feedback from 'components/Feedback';

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

require('dotenv').config({ path: '../.env' });

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized, isAuthenticated, user } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    initAmplitude();
    if (isAuthenticated) {
      dispatch(getCohorts());
      setAmplitudeUserProperties({
        full_name: user?.displayName,
        type: user?.type,
        company: user?.current_company,
        position: user?.current_position,
        industry: user?.current_industry_category_selections?.join(),
        live_attandance: `${user?.user_live_attendance_percentage}%`
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
              {isAuthenticated && <Feedback />}
              {isInitialized ? <Router /> : <LoadingScreen />}
            </NotistackProvider>
          </RtlLayout>
        </ThemeLocalization>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
