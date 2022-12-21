import { useContext, memo } from 'react';
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

const OffboardingModal = ({
  modalState,
  setModalState,
  activeImage
}: {
  modalState: boolean;
  setModalState: Function;
  activeImage: string;
}) => {
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
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${activeImage}`, '_blank');
  };

  const handleShareViaTwitter = () => {
    sendAnalyticsData('Cohort Offboarding - Share modal - "Share via Twitter" button clicked', {});
    window.open(
      `https://twitter.com/intent/tweet?text=${getCaption('Twitter', user?.slug)}`,
      '_blank'
    );
  };

  const handleShareViaEmail = () => {
    window.open(`mailto:?body=${getCaption('Email', user?.slug)}`, '_blank');
    sendAnalyticsData('Cohort Offboarding - Share modal - "Share via Email" button clicked', {});
  };

  const handleDownload = () => {
    sendAnalyticsData('Cohort Offboarding - Share modal - "Download asset" button clicked', {});
  };

  const handleCopyCaption = () => {
    const caption = document.createRange();
    const target = document.getElementById('linkedin-caption');

    try {
      if (target) {
        caption.selectNode(target);
        window.getSelection()?.removeAllRanges();
        window.getSelection()?.addRange(caption);
        document.execCommand('copy');
        window.getSelection()?.removeAllRanges();
      }
    } catch (error) {
      handleCopy(getCaption('LinkedIn', user?.slug));
    }
    enqueueSnackbar('Copied to Clipboard!', { variant: 'success' });
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
            <Typography variant="h3" sx={{ fontSize: '24px !important' }}>
              Share your accomplishment to give and get $100 📣
            </Typography>
            <Typography>
              Anyone who uses your referral link will receive $100 to use towards future Sphere
              courses.
            </Typography>
            <Typography>
              Once they have enrolled in [Applied Causal Inference], you will also receive $100
              credit to use towards your next Sphere course.
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
              <StyledIconButton onClick={() => handleShareViaTwitter()}>
                <StyledIcon icon={twitterFill} />
              </StyledIconButton>
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
            <GreyCard sx={{ fontSize: '15px' }}>
              <div>
                <div id="linkedin-caption">
                  <Typography>
                    I’m excited to share that I recently completed a course on Applied Causal
                    Inference taught by <b>@Robert Donnelly</b> through <b>@Sphere</b> where I
                    learned to:
                  </Typography>
                  <br />
                  <ul>
                    <li>
                      Formulate valid causal inference questions from business problems and
                      available data
                    </li>
                    <li>
                      Understand the use case and assumptions of both classic and cutting-edge
                      causal inference methods, including double ML
                    </li>
                    <li>
                      Leverage causal inference tools for better informed decisions about groups or
                      individuals
                    </li>
                  </ul>
                  <br />
                  <Typography>
                    If this course sounds useful to you and your professional development goals,
                    register using my referral link to earn $100 to use towards future Sphere
                    course:
                  </Typography>
                  <br />
                  <ul>
                    <li>
                      <b>{courseLink}</b>
                    </li>
                    <li>Or, check out https://getsphere.com to explore more courses.</li>
                  </ul>
                  <br />
                  <b>#causalinference #onlinecourse #ml #datascience</b>
                </div>
              </div>
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
};

export default memo(OffboardingModal);
