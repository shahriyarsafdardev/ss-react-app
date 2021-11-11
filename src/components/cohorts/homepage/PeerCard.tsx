import React from 'react';
import { Box, Button, Divider, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import Label from '../../Label';

import { StudentProfile } from '../../../@types/cohorts';

const StyledBox = styled(Box)(() => ({
  width: '100%',
  height: '286px',
  boxShadow: '0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%);',
  padding: '16px',
  display: 'flex',
  background: '#F7F8F9',
  borderRadius: '25px',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const StyledProfile = styled('img')(() => ({
  width: '77px',
  height: '106px',
  boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.08)',
  borderRadius: '14.5691px'
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 10,
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}));

const Text = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  color: '#637381',
  fontSize: 14,
  fontWeight: 500
}));

const StyledRow = styled(Box)(() => ({
  display: 'flex',
  marginBottom: 20
}));

const dummyStrengths = ['Marketing', 'Finance', 'Hiring'];

export default function PeerCard({ item }: { item: StudentProfile }) {
  return (
    <StyledBox>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Box sx={{ flexBasis: '20%' }}>
          <StyledProfile
            src="https://scholarsite-public.s3.eu-west-2.amazonaws.com/waqas-nazir-e36a51"
            alt={item.first_name}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', flexBasis: '75%' }}>
          <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>{item.first_name}</Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#637381' }}>
            Technical Marketing Associate @{' '}
            <span style={{ color: 'rgba(99, 115, 129, 1)', fontWeight: 'bold' }}> Adobe </span>
          </Typography>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#637381' }}>
            I’m a Technical Marketing assciate that really likes ... and ... I want to branch out
            and grow my network. Let me know what you’re looking...
          </Typography>
        </Box>
      </Box>
      <Divider variant="middle" />
      <Box>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/star.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>What he’s good at</Text>
        </StyledRow>
        <TagsContainer>
          {dummyStrengths.map((strength: string, index: number) => (
            <Label key={index} variant="ghost" color="success">
              {capitalCase(strength)}
            </Label>
          ))}
        </TagsContainer>
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button variant="outlined" sx={{ width: '166px' }}>
          View Profile
        </Button>
        <Button variant="contained" sx={{ width: '166px' }}>
          Send message
        </Button>
      </Box>
    </StyledBox>
  );
}
