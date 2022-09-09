import React from 'react';
import { Card, Stack, Button } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { useNavigate } from 'react-router';
import { PATH_DASHBOARD } from 'routes/paths';
import { Cohort } from '../../../@types/cohorts';
import { SessionDescription } from './NewHomeTabStyles';

const StyledStack = styled(Stack)(({ theme }) => ({
  height: '450px',
  width: '100%',
  padding: '24px 32px'
}));

const StyledButton = styled(Button)(({ theme }) => ({
  width: '100%',
  borderRadius: '50px',
  marginTop: 'auto'
}));

export default function GoodbyeSection({ cohort }: { cohort: Cohort }) {
  const navigate = useNavigate();

  return (
    <Stack direction="column" spacing={2} width="100%">
      <Card>
        <StyledStack>
          <SessionDescription innerContent={cohort?.goodbye_message || ''} />
          <StyledButton
            variant="contained"
            onClick={() => {
              navigate(`${PATH_DASHBOARD.cohorts.messaging(cohort.id)}`);
            }}
          >
            Open Messaging
          </StyledButton>
        </StyledStack>
      </Card>
    </Stack>
  );
}
