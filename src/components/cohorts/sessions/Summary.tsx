import { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Message from '../../Message';

type SummaryProps = {
  innerContent: string;
  onTrack: Function;
};

const SummaryContainer = styled(Container)((props) => ({
  ul: {
    marginLeft: '25px'
  }
}));

export default function Summary({ innerContent, onTrack }: SummaryProps) {
  useEffect(() => {
    if (innerContent) {
      onTrack();
    }
  }, [innerContent]);

  return (
    <SummaryContainer>
      {innerContent && innerContent !== '' ? (
        <div
          className="ql-editor"
          data-testid="summary-notes"
          dangerouslySetInnerHTML={{ __html: innerContent }}
        />
      ) : (
        <Message content="The session summary will be available shortly after this session." />
      )}
    </SummaryContainer>
  );
}
