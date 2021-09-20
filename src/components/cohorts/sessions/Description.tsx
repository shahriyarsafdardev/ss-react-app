import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

import { ReactNode } from 'react';

type DescriptionProps = {
  innerContent: ReactNode;
};

const DescriptionContainer = styled(Container)((props) => ({
  h2: {
    lineHeight: '80px'
  },
  ul: {
    marginLeft: '25px'
  }
}));

export default function Description({ innerContent }: DescriptionProps) {
  return <DescriptionContainer>{innerContent}</DescriptionContainer>;
}
