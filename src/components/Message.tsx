import { styled } from '@material-ui/core/styles';

const MessageContainer = styled('div')((props) => ({
  textAlign: 'center'
}));

export default function Message({ content }: { content: string }) {
  return <MessageContainer data-testid="session-message">{content}</MessageContainer>;
}
