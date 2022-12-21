import { useState, useRef, memo } from 'react';
import useAuth from 'hooks/useAuth';
import { Icon } from '@iconify/react';
import roundSend from '@iconify/icons-ic/round-send';
import cancel from '@iconify/icons-ic/cancel';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack5';
import { styled } from '@material-ui/core/styles';
import axios from 'utils/axios';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';

// material
import {
  Box,
  Avatar,
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  CircularProgress
} from '@material-ui/core';

import EmojiPicker from '../../EmojiPicker';

// ----------------------------------------------------------------------

type FormValues = {
  comment: string;
  file: File | any;
};

const CrossIconButton = styled(IconButton)(({ theme }) => ({
  // marginLeft: '-32px',
  cursor: 'pointer'
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  display: 'flex',
  marginRight: '15px',
  [theme.breakpoints.down('sm')]: {
    display: 'none',
    marginRight: '0'
  }
}));

const StyledSpinner = styled(CircularProgress)(({ theme }) => ({
  width: '20px',
  height: '20px',
  mx: 'auto'
}));

const StyledImageContainer = styled(Box)(({ theme }) => ({
  marginLeft: '70px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start'
}));

const StyledPreview = styled('img')(({ theme }) => ({
  width: '120px',
  height: '120px',
  borderRadius: '14.5691px',
  objectFit: 'cover',
  [theme.breakpoints.down('sm')]: {
    width: '192px',
    height: '157px'
  }
}));

const StyledForm = styled(Form)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%'
}));

function CommentForm({ questionID, addComment }: { questionID: string; addComment: Function }) {
  const { user } = useAuth();
  const cohort_id = window.location.pathname.split('/')[2] || '';
  const { enqueueSnackbar } = useSnackbar();
  const commentInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState('');

  const formik = useFormik<FormValues>({
    initialValues: {
      comment: '',
      file: null
    },
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      if (values.file || values.comment) {
        try {
          const uploadData = new FormData();
          uploadData.append('image', values.file);
          uploadData.append('comment', values.comment);
          uploadData.append('cohort_id', cohort_id);
          await axios
            .post(`/questions_feed/${questionID}/add_comment.json`, uploadData)
            .then((res) => {
              resetForm();
              setPreview('');
              addComment(res.data);
              setSubmitting(false);
              enqueueSnackbar('Comment Added', { variant: 'success' });
            });
        } catch (error) {
          console.error(error);
          setSubmitting(false);
        }
      }
    }
  });

  const handleClickAttach = () => {
    fileInputRef.current?.click();
  };

  const { values, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const uploadeImage = (event: any) => {
    if (event?.target?.files[0]) {
      setFieldValue('file', event.target.files[0]);
      setPreview(URL.createObjectURL(event.target.files[0]));
      event.currentTarget.value = '';
    } else {
      setPreview('');
      setFieldValue('file', null);
    }
  };
  return (
    <>
      <Stack
        direction="row"
        alignItems="center"
        sx={{
          pt: 2,
          width: '100%'
        }}
      >
        <UserAvatar
          alt={user?.displayName}
          src={user?.profile_image_url}
          sx={{ width: 48, height: 48 }}
        />
        <FormikProvider value={formik}>
          <StyledForm noValidate autoComplete="off">
            <TextField
              fullWidth
              disabled={isSubmitting}
              size="small"
              {...getFieldProps('comment')}
              inputRef={commentInputRef}
              multiline
              placeholder="Write a comment…"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={handleClickAttach}>
                      <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
                    </IconButton>
                    <EmojiPicker
                      alignRight
                      value={values.comment}
                      setValue={(val) => setFieldValue('comment', val)}
                    />
                  </InputAdornment>
                )
              }}
              sx={{
                mr: 1,
                '& fieldset': {
                  borderWidth: `1px !important`,
                  borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
                }
              }}
            />
            {isSubmitting ? (
              <StyledSpinner />
            ) : (
              <IconButton
                onClick={() => {
                  handleSubmit();
                }}
              >
                <Icon icon={roundSend} width={24} height={24} />
              </IconButton>
            )}
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              accept=".jpg, .jpeg, .png, .gif, .jfif"
              onChange={(e) => uploadeImage(e)}
            />
          </StyledForm>
        </FormikProvider>
      </Stack>

      {preview && (
        <StyledImageContainer>
          <StyledPreview src={preview} alt="comment image" />
          <CrossIconButton
            onClick={() => {
              uploadeImage(null);
            }}
          >
            <Icon icon={cancel} width={24} height={24} />
          </CrossIconButton>
        </StyledImageContainer>
      )}
    </>
  );
}

export default memo(CommentForm);
