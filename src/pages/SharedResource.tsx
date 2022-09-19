import { useEffect } from 'react';
import { LoadingContainer } from 'pages/admin/Common';
import LoadingScreen from 'components/LoadingScreen';
import { useLocation } from 'react-router-dom';
import { trackGenericEvent, RESOURCE_SHARE_EVENTS } from 'utils/amplitude';

export default function SharedResource() {
  const url = new URLSearchParams(useLocation().search);
  const material_id = url.get('material_id') || '';
  const email = url.get('email') || '';

  const handleNavigate = () => {
    trackGenericEvent({}, 'Email - Shared Resource - Open Resource', {
      [RESOURCE_SHARE_EVENTS.shared_with]: email
    });
    window.location.href = material_id;
  };
  useEffect(() => {
    handleNavigate();
  }, []);

  return (
    <LoadingContainer>
      <LoadingScreen />
    </LoadingContainer>
  );
}
