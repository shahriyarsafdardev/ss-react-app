// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.png`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  chatbot: getIcon('ic_chatbot')
};

const chatbotConfig = {
  subheader: '',
  items: [
    {
      title: 'AI Search Assistant',
      path: PATH_DASHBOARD.chat.chatbot,
      icon: ICONS.chatbot
    }
  ]
};

export default chatbotConfig;
