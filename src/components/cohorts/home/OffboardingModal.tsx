import { useContext } from 'react';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import { Stack, Typography } from '@material-ui/core';
import { Modal } from 'components/animate';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import baselineFileDownload from '@iconify/icons-ic/baseline-file-download';
import baselineEmail from '@iconify/icons-ic/baseline-email';
import copy from 'clipboard-copy';
import { useSnackbar } from 'notistack5';
import useAuth from 'hooks/useAuth';
import {
  StyledModalButton,
  StyledImage,
  SemiBoldText,
  OutlinedButton,
  ThinLine,
  ModalStyle,
  GreyCard,
  StyledIconButton,
  StyledIcon,
  getCaption,
  StyledStack
} from './Common';

export default function OffboardingModal({
  modalState,
  setModalState,
  activeImage
}: {
  modalState: boolean;
  setModalState: Function;
  activeImage: string;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const { user } = useAuth();
  const courseLink = `https://getsphere.com/cohorts/applied-causal-inference?referrer=${user?.slug}&alumni=true`;
  const handleCopy = (text: string) => {
    copy(text);
    enqueueSnackbar('Copied to Clipboard!', { variant: 'success' });
  };

  const handleShareToLinkedin = () => {
    sendAnalyticsData('Cohort Offboarding - Share modal - "Share to LinkedIn" button clicked', {});
  };

  const handleShareViaTwitter = () => {
    sendAnalyticsData('Cohort Offboarding - Share modal - "Share via Twitter" button clicked', {});
  };

  const handleShareViaEmail = () => {
    sendAnalyticsData('Cohort Offboarding - Share modal - "Share via Email" button clicked', {});
  };

  const handleDownload = () => {
    sendAnalyticsData('Cohort Offboarding - Share modal - "Download asset" button clicked', {});
  };

  const handleCopyCaption = () => {
    handleCopy(getCaption('LinkedIn', user?.slug));
    sendAnalyticsData(
      'Cohort Offboarding - Share modal - "Copy caption with referral link" button clicked',
      {}
    );
  };

  const handleCopyLink = () => {
    handleCopy(courseLink);
    sendAnalyticsData('Cohort Offboarding - Share modal - "Copy link only" button clicked', {});
  };

  return (
    <Modal
      open={modalState}
      onClose={() => {
        sendAnalyticsData('Cohort Offboarding - Share modal - Modal Closed', {});
        setModalState(!modalState);
      }}
    >
      <ModalStyle>
        <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" sx={{ height: '100%' }}>
          <StyledStack spacing={2} justifyContent="center">
            <Typography variant="h3" sx={{ fontSize: '28px !important' }}>
              Share your accomplishment to give and get $100 📣
            </Typography>
            <Typography>
              Anyone who uses your referral link will receive $100 to use towards Applied Causal
              Inference.
            </Typography>
            <Typography>
              Once they have enrolled, you will also receive $100 credit to use towards your next
              Sphere course.
            </Typography>
            <StyledImage alt="certificate-download" src={activeImage} />
            <StyledModalButton variant="contained" onClick={() => handleShareToLinkedin()}>
              Share to LinkedIn
            </StyledModalButton>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              alignItems="center"
              sx={{ color: '#101658', marginTop: '20px' }}
            >
              <Typography variant="h6">Share via:</Typography>
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://twitter.com/intent/tweet?url=${activeImage}&text=${getCaption(
                  'Twitter',
                  user?.slug
                )}`}
              >
                <StyledIconButton onClick={() => handleShareViaTwitter()}>
                  <StyledIcon icon={twitterFill} />
                </StyledIconButton>
              </a>
              <StyledIconButton onClick={() => handleShareViaEmail()}>
                <StyledIcon icon={baselineEmail} />
              </StyledIconButton>
              <a href={activeImage} download={activeImage} rel="noreferrer" target="_blank">
                <StyledIconButton onClick={() => handleDownload()}>
                  <StyledIcon icon={baselineFileDownload} />
                </StyledIconButton>
              </a>
            </Stack>
          </StyledStack>
          <StyledStack
            sx={{
              backgroundColor: '#FAFAFC',
              height: '100%'
            }}
            spacing={3}
            justifyContent="center"
          >
            <SemiBoldText>
              Don’t forget to use LinkedIn’s @ feature to tag Rob Donnelly and Sphere!
            </SemiBoldText>
            <GreyCard spacing={2} sx={{ fontSize: '15px' }}>
              <Typography>
                I’m excited to share that I recently completed a course on Applied Causal Inference
                taught by <b>Rob Donnelly</b> through <b>Sphere</b> where I learned:
              </Typography>
              <ul>
                <li>How to use a variety of tools common in the industry</li>
                <li>
                  When ignoring casuality can lead to making poor decisions by learning from
                  real-world examples
                </li>
                <li>The difference between causality and predictions</li>
              </ul>
              <Typography>
                If this course sounds useful to you and your professional development goals,
                register using my referral link to earn $100 to use towards the course:
              </Typography>
              <ul>
                <li>
                  <b>{courseLink}</b>
                </li>
                <li>Or, check out https:/getsphere.com to explore more courses.</li>
              </ul>
              <b>#causalinference #onilnecourse #ml #datascience</b>
            </GreyCard>
            <OutlinedButton onClick={() => handleCopyCaption()} variant="outlined">
              Copy caption with referral link
            </OutlinedButton>
            <Stack
              direction="row"
              width="100%"
              justifyContent="center"
              alignItems="center"
              spacing={1}
            >
              <ThinLine />
              <SemiBoldText>or</SemiBoldText>
              <ThinLine />
            </Stack>
            <GreyCard justifyContent="center">
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>{courseLink}</Typography>
            </GreyCard>
            <OutlinedButton onClick={() => handleCopyLink()} variant="outlined">
              Copy link only
            </OutlinedButton>
          </StyledStack>
        </Stack>
      </ModalStyle>
    </Modal>
  );
}
