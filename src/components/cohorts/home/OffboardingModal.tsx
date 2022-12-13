import { Stack, Typography } from '@material-ui/core';
import { Modal } from 'components/animate';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import baselineFileDownload from '@iconify/icons-ic/baseline-file-download';
import baselineEmail from '@iconify/icons-ic/baseline-email';
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
  StyledStack
} from './Common';

export default function OffboardingModal({
  modalState,
  setModalState
}: {
  modalState: boolean;
  setModalState: Function;
}) {
  return (
    <Modal
      open={modalState}
      onClose={() => {
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
            <StyledImage
              alt="certificate-download"
              src="https://sphere-public.s3.eu-west-2.amazonaws.com/certificate4.png"
            />
            <StyledModalButton variant="contained">Share to LinkedIn</StyledModalButton>
            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              alignItems="center"
              sx={{ color: '#101658', marginTop: '20px' }}
            >
              <Typography variant="h6">Share via:</Typography>
              <StyledIconButton>
                <StyledIcon icon={twitterFill} />
              </StyledIconButton>
              <StyledIconButton>
                <StyledIcon icon={baselineEmail} />
              </StyledIconButton>
              <StyledIconButton>
                <StyledIcon icon={baselineFileDownload} />
              </StyledIconButton>
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
            <GreyCard>
              <Typography sx={{ fontSize: '15px' }}>
                I’m excited to share that I recently completed a course on Applied Causal Inference
                taught by @Rob Donnelly through @Sphere where I learned: The motivation and basics
                of A/B testing (e.g., causality, surprising examples, metrics, interpreting results,
                trust and pitfalls, Twyman’s law, A/A tests) Cultural challenges, humbling results
                (e.g., failing often, pivoting, iterating), experimentation platform, institutional
                memory and meta-analysis, ethics Hierarchy of evidence, Expected Value of
                Information (EVI), complementary techniques, risks in observational causal studies
                If this course sounds useful to you and your professional development goals,
                register using my referral link
                https://getsphere.com/cohorts/applied-causal-inference?referrer=firstname-lastname&alumni=true
                or check out https:/getsphere.com to explore more courses. #causalinference
                #onilnecourse #ml #datascience
              </Typography>
            </GreyCard>
            <OutlinedButton variant="outlined">Copy caption with referral link</OutlinedButton>
            <Stack direction="row" justifyContent="center" alignItems="center" spacing={1}>
              <ThinLine />
              <SemiBoldText>or</SemiBoldText>
              <ThinLine />
            </Stack>
            <GreyCard justifyContent="center">
              <Typography sx={{ fontSize: '16px', fontWeight: 600 }}>
                https://getsphere.com/cohorts/applied-causal-inference?referrer=firstname-lastname&alumni=true
              </Typography>
            </GreyCard>
            <OutlinedButton variant="outlined">Copy link only</OutlinedButton>
          </StyledStack>
        </Stack>
      </ModalStyle>
    </Modal>
  );
}
