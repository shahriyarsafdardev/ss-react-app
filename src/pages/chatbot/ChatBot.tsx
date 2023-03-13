import { Typography, Stack, Card, Box } from '@material-ui/core';
import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import axiosV2 from 'utils/axiosV2';
import { trackEvent } from 'utils/eventTracking';
import useAuth from 'hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { DotsLoader, useStyles } from './Common';
import ResourcesGrid from './ResourcesGrid';
import { RootState, useSelector } from '../../redux/store';

type Resource = {
  name: string;
  url: string;
};

type Message = {
  role: string;
  content: string;
  resources?: Resource[];
};

function ChatBot() {
  const { cohorts } = useSelector((state: RootState) => state.cohort);
  const { isAuthenticated } = useAuth();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    trackEvent(null, 'AI Search Assistant Page - Page Opened');
  }, []);

  useEffect(() => {
    const element = document.getElementById('end-of-messages');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesList?.length]);

  useEffect(() => {
    const tsf = cohorts?.filter((cohort) => cohort.code === 'TSF')[0];
    if (!isAuthenticated || (!tsf && cohorts.length > 0)) {
      navigate(-1);
    }
  }, [cohorts]);

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const getMessageResponse = (newMessage: any) => {
    trackEvent(null, 'AI Search Assistant Page - Query Submitted', {
      Query: message,
      History: messagesList
    });
    setLoading(true);
    axiosV2
      .post('/chats/get_response.json', {
        query: message,
        history: JSON.stringify(messagesList.map(({ resources, ...rest }) => rest))
      })
      .then((res) => {
        const responseMessage = {
          ...res?.data?.result,
          resources: res?.data?.resources
        };
        setLoading(false);
        const newList = [...messagesList, newMessage, responseMessage];
        setMessagesList(newList);
        trackEvent(null, 'AI Search Assistant Page - Response Received', {
          Query: message,
          History: newList
        });
      })
      .catch((err) => {
        enqueueSnackbar(err?.message || 'Something went wrong!', { variant: 'error' });
      });
  };

  const handleSendMessage = () => {
    if (!message) {
      enqueueSnackbar("Can't send empty message!", { variant: 'warning' });
      return;
    }
    const newMessage = {
      role: 'user',
      content: message
    };
    setMessagesList([...messagesList, newMessage]);
    setMessage('');
    getMessageResponse(newMessage);
  };

  const handleKeyDown = (e: any) => {
    if (e?.key === 'Enter') {
      handleSendMessage();
      e?.preventDefault();
    }
  };

  return (
    <Page title="Sphere | ChatBot" className={classes.rootPage} id="chatbot">
      <Stack className={classes.rootStack}>
        <Typography variant="h4" sx={{ color: '#fff', textAlign: 'center' }}>
          Get personalized responses based on expert insights
        </Typography>
        <Stack spacing={5} sx={{ marginTop: '60px' }}>
          {messagesList.map((message, index) => (
            <>
              <Card
                className={classes?.messageCard}
                sx={{
                  marginLeft: message?.role === 'user' ? 'auto !important' : '0px !important',
                  marginRight: message?.role !== 'user' ? 'auto !important' : '0px !important',
                  backgroundColor: message?.role === 'user' ? '#F1F1FB' : '#F4F6F8'
                }}
              >
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              </Card>
              {message?.role === 'assistant' && message?.resources && (
                <ResourcesGrid resources={message?.resources} messagesList={messagesList} />
              )}
            </>
          ))}
          <Box id="end-of-messages" />
        </Stack>
        <Box className={classes.questionCardBox}>
          {loading && <DotsLoader />}
          <Card className={classes.questionCard} sx={{ boxShadow: '0px 0px 50px 50px #2A1D4D' }}>
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <img width="24" src="/static/icons/ic-search.svg" alt="search" />
              <textarea
                placeholder="Ask me anything about forecasting..."
                className={classes.questionInput}
                value={message}
                rows={3}
                onChange={(e) => handleMessageChange(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
              />
            </Stack>
            <Box onClick={handleSendMessage}>
              <img
                width="24"
                src="/static/icons/ic-send.svg"
                alt="search"
                style={{ marginLeft: 'auto', cursor: 'pointer' }}
              />
            </Box>
          </Card>
        </Box>
      </Stack>
    </Page>
  );
}

export default ChatBot;
