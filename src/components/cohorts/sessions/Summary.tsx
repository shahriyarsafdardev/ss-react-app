import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type SummaryProps = {
  innerContent: ReactNode;
};

const SummaryContainer = styled(Container)((props) => ({
  h2: {
    lineHeight: '80px'
  },
  ul: {
    marginLeft: '25px'
  }
}));

export default function Summary({ innerContent }: SummaryProps) {
  return <SummaryContainer>{innerContent}</SummaryContainer>;
}
