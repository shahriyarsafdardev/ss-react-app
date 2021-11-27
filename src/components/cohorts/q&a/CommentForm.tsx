import useAuth from 'hooks/useAuth';
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import { LoadingButton } from '@material-ui/lab';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';

// material
import { Box, Avatar, ListItem, TextField, ListItemAvatar } from '@material-ui/core';

// ----------------------------------------------------------------------

type FormValues = {
  comment: string;
};

const StyledForm = styled(Form)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column'
  }
}));

const StyledLoadingButton = styled(LoadingButton)(({ theme }) => ({
  width: '130px',
  marginLeft: 10,
  padding: '14px',
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 'auto',
    marginTop: 20
  }
}));

export default function CommentForm({
  questionID,
  addComment
}: {
  questionID: string;
  addComment: Function;
}) {
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const CommentSchema = Yup.object().shape({
    comment: Yup.string().required('Comment is required')
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      comment: ''
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await axios
          .post(`/questions_feed/${questionID}/add_comment.json`, { comment: values.comment })
          .then((res) => {
            resetForm();
            addComment({
              id: res.data.id,
              text: res.data.text,
              time: res.data.created_at,
              user_name: user?.displayName,
              user_image: user?.profile_image_url
            });
            setSubmitting(false);
            enqueueSnackbar('Comment Added', { variant: 'success' });
          });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'center',
          py: 3,
          width: '100%'
        }}
      >
        <ListItemAvatar>
          <Avatar
            alt={user?.displayName}
            src={user?.profile_image_url}
            sx={{ width: 48, height: 48 }}
          />
        </ListItemAvatar>
        <FormikProvider value={formik}>
          <StyledForm noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              multiline
              label="New Comment"
              placeholder="Add new comment"
              {...getFieldProps('comment')}
              error={Boolean(touched.comment && errors.comment)}
              helperText={touched.comment && errors.comment}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <StyledLoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Post comment
              </StyledLoadingButton>
            </Box>
          </StyledForm>
        </FormikProvider>
      </ListItem>
    </>
  );
}
