import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

type DescriptionProps = {
  innerContent: string | undefined;
  id?: string;
};

const DescriptionContainer = styled(Container)((props) => ({
  h2: {
    lineHeight: '80px'
  },
  ul: {
    marginLeft: '25px'
  }
}));

export default function Description({ innerContent, id = '' }: DescriptionProps) {
  if (!innerContent) return null;

  return (
    <DescriptionContainer id={id}>
      <div dangerouslySetInnerHTML={{ __html: innerContent }} />
    </DescriptionContainer>
  );
}
