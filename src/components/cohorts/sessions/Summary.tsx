import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Message from '../../Message';

type SummaryProps = {
  innerContent: string;
};

const SummaryContainer = styled(Container)((props) => ({
  ul: {
    marginLeft: '25px'
  }
}));

export default function Summary({ innerContent }: SummaryProps) {
  return (
    <SummaryContainer>
      {innerContent && innerContent !== '' ? (
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: innerContent }} />
      ) : (
        <Message content="The session summary will be available shortly after this session." />
      )}
    </SummaryContainer>
  );
}
