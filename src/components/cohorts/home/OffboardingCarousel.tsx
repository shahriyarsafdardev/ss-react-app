/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Stack, useMediaQuery } from '@material-ui/core';
import { useContext } from 'react';
import { AnalyticsContext } from 'contexts/AnalyticsContext';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useTheme } from '@material-ui/core/styles';
import { SmallImage, MainImage, CarouselIconButton, useStyles } from './Common';

export default function OffboardingCarousel({
  activeCertificate,
  setActiveCertificate,
  certificates
}: {
  activeCertificate: number;
  setActiveCertificate: Function;
  certificates: string[];
}) {
  const theme = useTheme();
  const classes = useStyles();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sendAnalyticsData } = useContext(AnalyticsContext);

  const handleActiveCertificate = (index: number) => {
    sendAnalyticsData('Cohort Offboarding - Asset selected', {
      'Asset URL': certificates[activeCertificate]
    });
    setActiveCertificate(index);
  };

  const handleCarouselArrows = (arrow: string) => {
    sendAnalyticsData('Cohort Offboarding - Asset selected', {
      'Asset URL': certificates[activeCertificate]
    });
    if (arrow === 'left') {
      activeCertificate === 0
        ? setActiveCertificate(certificates.length - 1)
        : setActiveCertificate(activeCertificate - 1);
    } else {
      activeCertificate === certificates.length - 1
        ? setActiveCertificate(0)
        : setActiveCertificate(activeCertificate + 1);
    }
  };

  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center">
      <MainImage alt="certificate-download" src={certificates[activeCertificate]} />
      <Stack
        width={{ md: '25%', xs: '100%' }}
        justifyContent="space-between"
        direction={{ xs: 'row', md: 'column' }}
      >
        {certificates.map(
          (img, index) =>
            index !== activeCertificate && (
              <SmallImage
                key={index}
                alt="certificate-download"
                src={img}
                onClick={() => handleActiveCertificate(index)}
              />
            )
        )}
      </Stack>
      {isMobile && (
        <Stack
          direction="row"
          width="100%"
          justifyContent="space-between"
          alignItems="center"
          sx={{ '&.isActive': { opacity: '1 !important', transform: 'scale(1.1)' } }}
        >
          <CarouselIconButton onClick={() => handleCarouselArrows('left')}>
            <Icon icon={arrowIosBackFill} color="white" width="20px" height="40px" />
          </CarouselIconButton>
          {certificates.map((img, index) => (
            <span
              className={`${classes.dotStyle} ${index === activeCertificate && classes.activeDot}`}
              key={index}
              onClick={() => handleActiveCertificate(index)}
            />
          ))}
          <CarouselIconButton onClick={() => handleCarouselArrows('right')}>
            <Icon icon={arrowIosForwardFill} color="white" width="20px" height="40px" />
          </CarouselIconButton>
        </Stack>
      )}
    </Stack>
  );
}
