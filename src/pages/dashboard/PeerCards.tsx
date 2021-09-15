import { useEffect, useState } from 'react';
// material
import { Container, Grid, Skeleton, Box, Typography } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
// modal
import { Modal } from 'components/animate';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getUsers } from '../../redux/slices/user';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import { PeerCard } from '../../components/_dashboard/cohort/cards';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(8)].map((_, index) => (
      <Grid item xs={12} sm={6} md={4} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

const StyledContainer = styled(Box)(() => ({
  backgroundColor: '#fff',
  boxShadow:
    '0px 0px 4.60729px rgba(145, 158, 171, 0.24), 0px 36.8583px 73.7167px -9.21459px rgba(145, 158, 171, 0.24)',
  borderRadius: 20,
  padding: '20px 30px',
  marginBottom: 16
}));

const StyledRow = styled(Box)(() => ({
  display: 'flex',
  marginBottom: 20
}));

const Title = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  fontWeight: 'bold',
  fontSize: 22,
  color: '#212B36',
  marginBottom: 30
}));

const Text = styled(Typography)(() => ({
  fontFamily: 'Public Sans',
  color: '#212B36',
  fontSize: 12,
  whiteSpace: 'nowrap'
}));
const TagsContainer = styled(Box)(() => ({
  display: 'flex',
  flex: 1,
  alignItems: 'center',
  flexWrap: 'wrap'
}));
const ColoredText = styled(Box)((props: any) => ({
  display: 'flex',
  fontFamily: 'Public Sans',
  fontWeight: 'bold',
  color: props.color,
  backgroundColor: props.backgroundColor,
  borderRadius: 10,
  padding: '3px 10px',
  marginRight: 10,
  whiteSpace: 'nowrap',
  marginBottom: 10
}));

export default function UserCards() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { users } = useSelector((state: RootState) => state.user);
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => setOpenModal(!openModal);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  return (
    <Page title="Peers | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="Peers Tab" links={[]} />
        <Grid container spacing={3}>
          {users.map((user) => (
            <Grid key={user.id} item xs={12} sm={6} md={4}>
              <PeerCard user={user} openModal={toggleModal} />
            </Grid>
          ))}

          {!users.length && SkeletonLoad}
          <Modal open={openModal} onClose={toggleModal}>
            <StyledContainer>
              <Title>Information</Title>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/job.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>Adobe</Text>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/mail.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>nihalhakim@gmail.com</Text>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/done_all.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text style={{ marginRight: 10 }}>What I am looking for</Text>
                <TagsContainer>
                  <ColoredText color="#229A16" backgroundColor="rgba(84, 214, 44, 0.16)">
                    mentor
                  </ColoredText>
                  <ColoredText color="#1890FF" backgroundColor="rgba(24, 144, 255, 0.16)">
                    Networking
                  </ColoredText>
                  <ColoredText color="#B78103" backgroundColor="rgba(255, 193, 7, 0.16)">
                    Discuss Materials
                  </ColoredText>
                </TagsContainer>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/star.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text style={{ marginRight: 10 }}>What I am good at</Text>
                <TagsContainer>
                  <ColoredText color="#229A16" backgroundColor="rgba(84, 214, 44, 0.16)">
                    Marketing
                  </ColoredText>
                  <ColoredText color="#1890FF" backgroundColor="rgba(24, 144, 255, 0.16)">
                    Content Recommendation System
                  </ColoredText>
                  <ColoredText color="#FF4842" backgroundColor="rgba(255, 72, 66, 0.16)">
                    Personalization
                  </ColoredText>
                  <ColoredText color="#637381" backgroundColor="#C4CDD5">
                    User tracking
                  </ColoredText>
                </TagsContainer>
              </StyledRow>
            </StyledContainer>
            <StyledContainer>
              <Title>Social</Title>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/discord.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>Message Nihal on Discord here</Text>
              </StyledRow>
              <StyledRow>
                <img
                  alt="sketch icon"
                  src="/static/peers/linkedin.svg"
                  width={20}
                  height={20}
                  style={{ marginRight: 15 }}
                />
                <Text>Connect with Nihal on LinkedIn Here</Text>
              </StyledRow>
            </StyledContainer>
          </Modal>
        </Grid>
      </Container>
    </Page>
  );
}
