import React, { useState } from 'react';
import { Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

const Step3Container = styled(Box)(() => ({
  marginTop: '3rem'
}));

const Title = styled(Typography)(() => ({
  fontWeight: 'bold',
  fontSize: 24,
  marginBottom: '2rem'
}));

const Card = styled(Box)(() => ({
  background: '#fff',
  boxShadow: '0px 0px 2px rgba(145, 158, 171, 0.24), 0px 16px 32px -4px rgba(145, 158, 171, 0.24)',
  borderRadius: 16,
  padding: '34px 6%'
}));

const CardContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between'
}));

const LeftCard = styled(Card)(() => ({
  width: '31%',
  marginRight: '1.5rem'
}));

const RightCard = styled(Card)(() => ({
  width: '67%'
}));

const ImageUploadDescription = styled(Typography)(() => ({
  fontSize: '0.75rem',
  color: '#6C7885',
  textAlign: 'center'
}));

export default function BuildYourProfile() {
  return (
    <Step3Container>
      <Title>Build your profile</Title>
      <CardContainer>
        <LeftCard>
          <ImageUploadDescription>
            Allowed *.jpeg, *.jpg, *.png, *.gif Max size of 3.1 MB
          </ImageUploadDescription>
        </LeftCard>
        <RightCard>testing</RightCard>
      </CardContainer>
    </Step3Container>
  );
}
