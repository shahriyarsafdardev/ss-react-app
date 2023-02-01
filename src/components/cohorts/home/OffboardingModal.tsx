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
  StyledStack,
  useStyles,
  displayLinkedIn
} from './Common';

const OffboardingModal = ({
  modalState,
  setModalState,
  activeImage,
  cohort
}: {
  modalState: boolean;
  setModalState: Function;
  activeImage: string;
  cohort: any;
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const { sendAnalyticsData } = useContext(AnalyticsContext);
  const { user } = useAuth();
  const courseLink = `${cohort?.registration_page_url}?referrer=${user?.slug}&alumni=true`;
  const classes = useStyles();

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
    const caption = getCaption('Twitter', user?.slug, cohort);
    window.open(`https://twitter.com/intent/tweet?text=${caption}`, '_blank');
  };

  const handleShareViaEmail = () => {
    window.open(`mailto:?body=${getCaption('Email', user?.slug, cohort)}`, '_blank');
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
      handleCopy(getCaption('LinkedIn', user?.slug, cohort));
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

  const handleModalClose = () => {
    sendAnalyticsData('Cohort Offboarding - Share modal - Modal Closed', {});
    setModalState(!modalState);
  };

  return (
    <Modal open={modalState} onClose={handleModalClose}>
      <ModalStyle>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ height: '100%', alignItems: 'center' }}
        >
          <StyledStack spacing={2} justifyContent="center">
            <Typography variant="h3" sx={{ fontSize: '24px !important' }}>
              Share your accomplishment to give and get $100 📣
            </Typography>
            <Typography>
              Anyone who uses your referral link will receive $100 to use towards future Sphere
              courses.
            </Typography>
            <Typography>
              Once they have enrolled in [{cohort?.name}], you will also receive $100 credit to use
              towards your next Sphere course.
            </Typography>
            <StyledImage alt="certificate-download" src={activeImage} />
            <StyledModalButton variant="contained" onClick={handleShareToLinkedin}>
              Share to LinkedIn
            </StyledModalButton>
            <Stack spacing={3} direction="row" className={classes.socialShareStack}>
              <Typography variant="h6">Share via:</Typography>
              <StyledIconButton onClick={handleShareViaTwitter}>
                <StyledIcon icon={twitterFill} />
              </StyledIconButton>
              <StyledIconButton onClick={handleShareViaEmail}>
                <StyledIcon icon={baselineEmail} />
              </StyledIconButton>
              <a href={activeImage} download={activeImage} rel="noreferrer" target="_blank">
                <StyledIconButton onClick={handleDownload}>
                  <StyledIcon icon={baselineFileDownload} />
                </StyledIconButton>
              </a>
            </Stack>
          </StyledStack>
          <StyledStack spacing={3}>
            <SemiBoldText>
              Don’t forget to use LinkedIn’s @ feature to tag Rob Donnelly and Sphere!
            </SemiBoldText>
            {displayLinkedIn(cohort, courseLink)}
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
