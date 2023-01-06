// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  contact: getIcon('ic_contact')
};

export const communitySidebarConfig = {
  subheader: 'Community',
  items: [
    {
      title: 'Events',
      path: PATH_DASHBOARD.community.events,
      icon: ICONS.contact
    },
    {
      title: 'Messaging',
      path: PATH_DASHBOARD.community.messaging,
      icon: ICONS.contact
    },
    {
      title: 'Contact Us',
      path: PATH_DASHBOARD.community.publicContactUs,
      icon: ICONS.contact
    }
  ]
};
