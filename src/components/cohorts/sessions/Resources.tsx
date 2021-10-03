import { Container } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

type ResourcesProps = {
  resources: string;
};

const ResourcesContainer = styled(Container)(({ theme }) => ({
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

export default function Resources({ resources }: ResourcesProps) {
  return <ResourcesContainer>{JSON.stringify(resources)}</ResourcesContainer>;
}
