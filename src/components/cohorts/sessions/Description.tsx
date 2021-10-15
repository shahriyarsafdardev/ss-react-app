import { useEffect } from 'react';
import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import Message from '../../Message';

type DescriptionProps = {
  innerContent: string;
  onTrack: Function;
};

const DescriptionContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0
  },
  ul: {
    marginLeft: '25px'
  }
}));

export default function Description({ innerContent, onTrack }: DescriptionProps) {
  useEffect(() => {
    if (innerContent) {
      onTrack();
    }
  }, [innerContent]);

  return (
    <DescriptionContainer>
      {innerContent && innerContent !== '' ? (
        <div className="ql-editor" dangerouslySetInnerHTML={{ __html: innerContent }} />
      ) : (
        <Message content="The session resources will be available 2 days before the session." />
      )}
    </DescriptionContainer>
  );
}
