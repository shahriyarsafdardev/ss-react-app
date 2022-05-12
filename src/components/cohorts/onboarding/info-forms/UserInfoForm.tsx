import { useState } from 'react';
import { Stack, Typography } from '@material-ui/core';
import { UploadAvatar } from 'components/upload';
import { NavigationButtons, checkFormValidity } from './dataTypes';

type UserInfoType = {
  profile_image_url: File | any;
};

export default function UserInfoForm({
  onSubmit,
  onPrevHandler,
  profile_image_url,
  showPrevButton = true,
  isSubmitable = false,
  isSubmitting = false
}: {
  onSubmit: Function;
  onPrevHandler: Function;
  profile_image_url: File | any;
  showPrevButton?: boolean;
  isSubmitable?: boolean;
  isSubmitting?: boolean;
}) {
  const fillUserValues = () => ({
    profile_image_url
  });

  const [infoObject, setInfoObject] = useState<UserInfoType>(fillUserValues());

  const handleDrop = (files: any) => {
    onUpdateAttribute('profile_image_url', {
      image: files[0],
      preview: URL.createObjectURL(files[0])
    });
  };

  const onUpdateAttribute = async (attribute: string, value: any) => {
    let tempInfo = { ...infoObject };
    tempInfo = { ...tempInfo, [attribute]: value };
    setInfoObject(tempInfo);
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
            file={infoObject?.profile_image_url}
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
        disabled={checkFormValidity(infoObject)}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => onSubmit(infoObject)}
      />
    </>
  );
}
