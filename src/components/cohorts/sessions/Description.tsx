import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

type DescriptionProps = {
  innerContent: string;
};

const DescriptionContainer = styled(Container)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    padding: 0
  },
  h2: {
    lineHeight: '80px'
  },
  ul: {
    marginLeft: '25px'
  }
}));

export default function Description({ innerContent }: DescriptionProps) {
  return (
    <DescriptionContainer>
      <div dangerouslySetInnerHTML={{ __html: innerContent }} />
    </DescriptionContainer>
  );
}
