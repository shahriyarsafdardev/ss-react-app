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

  return certificates.length > 1 ? (
    <Stack
      direction={{ xs: 'column', md: 'row' }}
      width="100%"
      spacing={{ xs: 3, md: 7 }}
      justifyContent="center"
      alignItems="center"
    >
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
  ) : (
    <MainImage
      className={`${classes.activeCertificate} ${classes.onlyCertificate}`}
      alt="certificate-download"
      src={certificates[0]}
    />
  );
};

export default memo(OffboardingCarousel);
