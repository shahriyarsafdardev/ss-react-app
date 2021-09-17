import {
  Box,
  Button,
  Container,
  Typography,
  DialogActions,
  List,
  BoxProps,
  Collapse,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemButton,
  ListItemButtonProps
} from '@material-ui/core';

export default function Description() {
  return (
    <Container>
      <Typography variant="h3">About this session</Typography>
      <List>
        <ListItemText>Hey there</ListItemText>
      </List>
    </Container>
  );
}
