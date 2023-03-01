import { Typography, Stack, Card, Box } from '@material-ui/core';
import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import axiosV2 from 'utils/axiosV2';
import { DotsLoader, useStyles } from './Common';

type Message = {
  role: string;
  content: string;
  time: Date;
};

function ChatBot() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const element = document.getElementById('end-of-messages');
    if (element) {
      element?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messagesList?.length]);

  const handleMessageChange = (value: string) => {
    setMessage(value);
  };

  const getMessageResponse = (newMessage: any) => {
    setLoading(true);
    axiosV2
      .get('/chatbot.json', {
        params: {
          query: message
        }
      })
      .then((res) => {
        setLoading(false);
        setMessagesList([...messagesList, newMessage, res?.data?.result]);
      })
      .catch((err) => {
        enqueueSnackbar(err?.message || 'Something went wrong!', { variant: 'error' });
      });
  };

  const handleSendMessage = () => {
    const newMessage = {
      role: 'user',
      content: message,
      time: new Date()
    };
    setMessagesList([...messagesList, newMessage]);
    setMessage('');
    getMessageResponse(newMessage);
  };

  const handleKeyDown = (e: any) => {
    if (e?.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <Page title="Sphere | ChatBot" className={classes.rootPage} id="chatbot">
      <Stack className={classes.rootStack}>
        <Typography variant="h4" sx={{ color: '#fff', textAlign: 'center' }}>
          Get personalized resources curated by Sphere’s AI Mentor
        </Typography>
        <Stack spacing={5} sx={{ marginTop: '60px' }}>
          {messagesList.map((message, index) => (
            <Card
              className={classes?.messageCard}
              key={index}
              sx={{
                marginLeft: message?.role === 'user' ? 'auto !important' : '0px !important',
                backgroundColor: message?.role === 'user' ? '#F1F1FB' : '#F4F6F8'
              }}
            >
              {message.content}
            </Card>
          ))}
          <Box id="end-of-messages" />
        </Stack>
        <Box className={classes.questionCardBox}>
          {loading && <DotsLoader />}
          <Card className={classes.questionCard}>
            <Stack direction="row" spacing={1}>
              <img
                width="24"
                src="/static/icons/ic-search.svg"
                alt="search"
                style={{ paddingTop: '5px' }}
              />
              <input
                placeholder="Ask me anything about causal inference..."
                className={classes.questionInput}
                value={message}
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
