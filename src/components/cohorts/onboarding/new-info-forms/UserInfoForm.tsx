import { Stack, Typography } from '@material-ui/core';
import { UploadAvatar } from 'components/upload';
import { NavigationButtons } from './dataTypes';
import { checkFormValidity } from '../Common';

export default function UserInfoForm({
  onSubmit,
  onUpload,
  onPrevHandler,
  profile_image_url,
  showPrevButton = true,
  isSubmitable = false,
  isSubmitting = false
}: {
  onSubmit: Function;
  onUpload: Function;
  onPrevHandler: Function;
  profile_image_url: File | any;
  showPrevButton?: boolean;
  isSubmitable?: boolean;
  isSubmitting?: boolean;
}) {
  const handleDrop = (files: any) => {
    onUpload({
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

  return (
    <>
      <br />
      <Stack justifyContent="center" width="100%">
        <Stack
          flexDirection="column"
          alignItems="center"
          data-testid="user-avatar-upload"
          sx={{ mt: '3.5rem' }}
        >
          <UploadAvatar
            accept={['.jpg', '.jpeg', '.png', '.gif', '.jfif']}
            file={profile_image_url}
            maxSize={3145728}
            onDrop={handleDrop}
            caption={
              <Typography
                variant="caption"
                sx={{
                  mt: 3,
                  fontSize: '16px',
                  fontWeight: 'bold',
                  textDecoration: 'underline',
                  color: 'primary.main'
                }}
              >
                Upload New Image
              </Typography>
            }
          />
        </Stack>
      </Stack>
      <NavigationButtons
        isSubmitting={isSubmitting}
        isSubmitBtn={isSubmitable}
        showPrevButton={showPrevButton}
        disabled={checkFormValidity({ profile_image_url })}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit()}
        nextButtonText="Submit"
      />
    </>
  );
}
