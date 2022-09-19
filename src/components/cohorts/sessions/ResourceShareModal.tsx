import React, { useEffect } from 'react';
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { TextField, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import Modal from 'components/animate/Modal';
import axios from 'utils/axios';
import { useSnackbar } from 'notistack5';
import { RESOURCE_SHARE_EVENTS, trackGenericEvent } from 'utils/amplitude';
import { StyledShareModal, StyledTypography } from './Common';
import { RootState, useSelector } from '../../../redux/store';
import { SessionMaterial } from '../../../@types/cohorts';

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: '130px',
  borderRadius: '400px',
  maxHeight: '56px',
  [theme.breakpoints.down('md')]: {
    width: '100%'
  }
}));

const StyledImage = styled('img')(({ theme }) => ({
  width: '20%',
  [theme.breakpoints.down('sm')]: {
    width: '70%'
  }
}));

export default function ResourceShareModal({
  open,
  onClose,
  item,
  sessionId
}: {
  open: boolean;
  onClose: Function;
  item: SessionMaterial;
  sessionId: string;
}) {
  const emailValidation = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required')
  });
  const { enqueueSnackbar } = useSnackbar();

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: emailValidation,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      trackGenericEvent(cohort, 'Sessions Page - Share Resource Modal - "Share" Selected', {
        [RESOURCE_SHARE_EVENTS.shared_with]: values.email
      });
      axios
        .post(`cohort_sessions/${sessionId}/session_materials/${item.id}/send_readings_email`, {
          email: values.email
        })
        .then(() => {
          resetForm();
          setSubmitting(false);
          enqueueSnackbar('This resource has been shared via email!', { variant: 'success' });
        });
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps, values, isValid, resetForm } =
    formik;

  const cohort_id = window.location.pathname.split('/')[2] || '';
  const cohort = useSelector(
    (state: RootState) => state?.cohort?.cohorts?.filter((cohort) => cohort_id === cohort.id)[0]
  );

  useEffect(() => {
    if (open) {
      trackGenericEvent(cohort, 'Sessions Page - Share Resource Modal - Modal Opened');
    }
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={() => {
        onClose(false);
        resetForm();
        trackGenericEvent(cohort, 'Sessions Page - Share Resource Modal - Modal Closed');
      }}
    >
      <StyledShareModal sx={{ padding: '5% 10%', height: '700px' }}>
        <Stack
          width="100%"
          height="100%"
          direction="column"
          spacing={2}
          justifyContent="space-evenly"
        >
          <Stack direction="column" alignItems="center">
            <StyledTypography style={{ fontWeight: 700 }}>
              Share this resource with a friend or colleague
            </StyledTypography>
            <StyledImage src="https://sphere-public.s3.eu-west-2.amazonaws.com/document_icon.png" />
            <StyledTypography style={{ fontWeight: 500, fontSize: '16px' }}>
              "{item?.name}"
            </StyledTypography>
            <StyledTypography style={{ marginBottom: '5%', fontSize: '14px' }}>
              By {item?.info_text}
            </StyledTypography>
          </Stack>
          <FormikProvider value={formik}>
            <Form autoComplete="off" onSubmit={handleSubmit}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 2, md: 1 }}>
                <TextField
                  key="email-to"
                  fullWidth
                  label="Recipient email address"
                  placeholder="Email"
                  {...getFieldProps('email')}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && errors.email}
                  InputProps={{
                    sx: {
                      borderRadius: () => '500px'
                    }
                  }}
                />
                <StyledLoadingButton
                  type="submit"
                  variant="contained"
                  loading={isSubmitting}
                  id="btn-submit"
                  disabled={!isValid || !values.email}
                >
                  Share
                </StyledLoadingButton>
              </Stack>
            </Form>
          </FormikProvider>
        </Stack>
      </StyledShareModal>
    </Modal>
  );
}
