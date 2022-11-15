import react, { useState } from 'react';
import { Card, Stack, Typography, TextField } from '@material-ui/core';
import { useFormik, Form, FormikProvider } from 'formik';
import * as Yup from 'yup';
import { useStyles, StyledLoadingButton } from './Common';

export default function SendReferralInviteForm() {
  const [isFormSubmit, setIsFormSubmit] = useState(false);
  const classes = useStyles();

  const ValidationSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: ValidationSchema,
    validateOnChange: isFormSubmit,
    validateOnBlur: isFormSubmit,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      console.log('Form submitted!');
    }
  });

  const {
    values,
    isSubmitting,
    touched,
    errors,
    getFieldProps,
    isValid,
    handleSubmit,
    submitForm
  } = formik;

  return (
    <Card className={classes.formCard}>
      <Typography className={classes.greyBGFont22Bold}>
        Send more referrals to give and receive more rewards 🎁
      </Typography>
      <FormikProvider value={formik}>
        <Form>
          <Stack
            alignItems="center"
            direction={{ xs: 'column', md: 'row' }}
            sx={{ mt: '2rem' }}
            spacing={2}
          >
            <TextField
              label="Team Lead Email"
              fullWidth
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <StyledLoadingButton
              data-testid="purchase-button"
              type="submit"
              variant="contained"
              color="primary"
              loading={isSubmitting}
              disabled={!isValid || !values.email}
              onClick={() => {
                handleSubmit();
                setIsFormSubmit(true);
              }}
            >
              Send Invite
            </StyledLoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
