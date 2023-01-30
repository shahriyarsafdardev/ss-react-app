import { Stack } from '@material-ui/core';
import { memo } from 'react';
import { MainImage, useStyles } from './Common';

const OffboardingCarousel = ({
  activeCertificate,
  setActiveCertificate,
  certificates
}: {
  activeCertificate: number;
  setActiveCertificate: Function;
  certificates: string[];
}) => {
  const classes = useStyles();

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} width="100%" spacing={2} justifyContent="center">
      <MainImage
        className={`${activeCertificate === 0 && classes.activeCertificate}`}
        alt="certificate-download"
        src={certificates[0]}
        onClick={() => setActiveCertificate(0)}
      />
      <MainImage
        className={`${activeCertificate === 1 && classes.activeCertificate}`}
        alt="certificate-download"
        src={certificates[1]}
        onClick={() => setActiveCertificate(1)}
      />
    </Stack>
  );
};

export default memo(OffboardingCarousel);
