import React from 'react';
import { Box, Button, Divider, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { capitalCase } from 'change-case';
import Label from '../../Label';

import { StudentProfile } from '../../../@types/cohorts';

const StyledBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '325px',
  boxShadow: '0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%);',
  padding: '10px',
  display: 'flex',
  background: '#F7F8F9',
  borderRadius: '25px',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  [theme.breakpoints.down('sm')]: {
    height: '530px',
    hr: {
      display: 'none'
    }
  }
}));

const StyledProfile = styled('img')(({ theme }) => ({
  width: '120px',
  height: '120px',
  boxShadow: '0px 4px 20px 0px rgba(0, 0, 0, 0.08)',
  borderRadius: '14.5691px',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    width: '192px',
    height: '157px'
  }
}));

const TagsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: 10
}));

const Text = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  color: '#637381',
  fontSize: 14,
  fontWeight: 500
}));

const StyledRow = styled(Box)(() => ({
  display: 'flex',
  marginBottom: 10
}));

const StyledProfileContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    flexBasis: '60%'
  }
}));

const ActionButtons = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  button: {
    width: '48%'
  },
  [theme.breakpoints.down('sm')]: {
    flexBasis: '18%',
    flexDirection: 'column',
    button: {
      width: '100%'
    }
  }
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({}));

const StyledCompanyContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.down('sm')]: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  [theme.breakpoints.up('sm')]: {
    img: { display: 'none !important' }
  }
}));

const StyledContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  paddingLeft: '25px',
  flexDirection: 'column',
  flexBasis: '75%',
  [theme.breakpoints.down('sm')]: {
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

const StyledNameContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
}));

export default function PeerCard({
  item,
  onHandleNext,
  onHandlePrevious
}: {
  item: StudentProfile;
  onHandleNext: any;
  onHandlePrevious: any;
}) {
  console.log(item);
  return (
    <StyledBox>
      <StyledProfileContainer>
        <StyledImageContainer>
          <StyledProfile src={item.profile_image_url} alt={item.first_name} />
        </StyledImageContainer>
        <StyledContainer>
          <StyledCompanyContainer>
            {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src="/static/cohorts-home/left-arrow.svg"
              onClick={onHandlePrevious}
              onKeyDown={onHandlePrevious}
              alt="left arrow"
            />
            <StyledNameContainer>
              <Typography sx={{ fontSize: '20px', fontWeight: 700 }}>
                {item.first_name} {item.last_name}
              </Typography>
              <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#637381' }}>
                {item.current_position} @{' '}
                <span style={{ color: 'rgba(99, 115, 129, 1)', fontWeight: 'bold' }}>
                  {' '}
                  {item.current_company.name}{' '}
                </span>
              </Typography>
            </StyledNameContainer>
            {/*  eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
            <img
              src="/static/cohorts-home/right-arrow.svg"
              onClick={onHandleNext}
              onKeyDown={onHandleNext}
              alt="right arrow"
            />
          </StyledCompanyContainer>
          <Typography sx={{ fontSize: '12px', fontWeight: 400, color: '#637381' }}>
            {item.introduction}
          </Typography>
        </StyledContainer>
      </StyledProfileContainer>
      <Divider variant="middle" sx={{ margin: '10px 0px' }} />
      <Box>
        <StyledRow>
          <img
            alt="sketch icon"
            src="/static/peers/star.svg"
            width={20}
            height={20}
            style={{ marginRight: 15 }}
          />
          <Text>What they're good at</Text>
        </StyledRow>
        <TagsContainer>
          {item.strengths.map((strength: string, index: number) => (
            <Label key={index} variant="ghost" color="success">
              {capitalCase(strength)}
            </Label>
          ))}
        </TagsContainer>
      </Box>
      <Divider variant="middle" sx={{ margin: '10px 0px' }} />
      <ActionButtons>
        <Button variant="outlined">View Profile</Button>
        <Button variant="contained">Send message</Button>
      </ActionButtons>
    </StyledBox>
  );
}
