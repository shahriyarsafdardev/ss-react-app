import { Typography, Stack, Card, Box, Link } from '@material-ui/core';
import Page from 'components/Page';
import { useSnackbar } from 'notistack5';
import { useEffect, useState } from 'react';
import axiosV2 from 'utils/axiosV2';
import { DotsLoader, useStyles } from './Common';

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
      .get('/chats.json', {
        params: {
          query: message
        }
      })
      .then((res) => {
        const responseMessage = {
          ...res?.data?.result,
          resources: res?.data?.resources
        };
        setLoading(false);
        setMessagesList([...messagesList, newMessage, responseMessage]);
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
              {message?.role === 'assistant' && message?.resources && (
                <>
                  <Typography variant="h6" sx={{ marginTop: '16px' }}>
                    Resources
                  </Typography>
                  <Stack>
                    <ol style={{ marginLeft: '32px' }}>
                      {message?.resources?.map(
                        (res, index) =>
                          message?.role === 'assistant' && (
                            <li>
                              <Link
                                key={index}
                                target="_blank"
                                data-testid="resource-link"
                                variant="body2"
                                href={res.url}
                                sx={{
                                  fontWeight: 600,
                                  fontSize: '16px',
                                  width: 'fit-content',
                                  textDecoration: 'underline'
                                }}
                              >
                                {res.name}
                              </Link>
                            </li>
                          )
                      )}
                    </ol>
                  </Stack>
                </>
              )}
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
