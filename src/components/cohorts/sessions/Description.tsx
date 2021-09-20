import { Container, Typography, List, ListItemText } from '@material-ui/core';

type DescriptionProps = {
  innerContent: string;
};

export default function Description({ innerContent }: DescriptionProps) {
  return (
    <Container>
      <Typography variant="h3">{innerContent}</Typography>
      {/* <Typography variant="h3">About this session</Typography> */}
      {/* <List>
        <ListItemText>Hey there</ListItemText>
      </List> */}
    </Container>
  );
}
