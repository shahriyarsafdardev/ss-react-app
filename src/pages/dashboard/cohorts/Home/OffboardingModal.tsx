import { Stack, styled, Card, Typography } from '@material-ui/core';
import { Modal } from 'components/animate';

export default function OffboardingModal({ modalState }: { modalState: boolean }) {
  return (
    <Modal open={modalState}>
      <Card>
        <Stack>
          <Typography>Share your accomplishment with your network</Typography>
        </Stack>
      </Card>
    </Modal>
  );
}
