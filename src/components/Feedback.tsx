import { Helmet } from 'react-helmet-async';
import useAuth from '../hooks/useAuth';

export default function Feedback() {
  const { isAuthenticated, user } = useAuth();
  return (
    <Helmet key={String(isAuthenticated)}>
      {isAuthenticated && (
        <script>
          {`
        window.onUsersnapCXLoad = (api) => {
          api.init({
            user: {
              email: "${user?.email}",
              userId: "${user?.id}"
            }
          });
        };
        var script = document.createElement('script');
        script.defer = 1;
        script.src =
          "https://widget.usersnap.com/global/load/${process.env.REACT_APP_FEEDBACK_API_KEY}?onload=onUsersnapCXLoad";
        document.getElementsByTagName('head')[0].appendChild(script);
      `}
        </script>
      )}
    </Helmet>
  );
}
