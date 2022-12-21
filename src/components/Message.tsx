import { styled } from '@material-ui/core/styles';
import { memo } from 'react';

const MessageContainer = styled('div')((props) => ({
  textAlign: 'center'
}));

function Message({ content }: { content: string }) {
  return <MessageContainer data-testid="session-message">{content}</MessageContainer>;
}

export default memo(Message);
