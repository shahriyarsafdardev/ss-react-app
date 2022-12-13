import { Stack, useMediaQuery } from '@material-ui/core';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import { useTheme } from '@material-ui/core/styles';
import { SmallImage, MainImage, CarouselIconButton, DotStyle, ActiveDotStyle } from './Common';

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
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
                onClick={() => {
                  setActiveCertificate(index);
                }}
              />
            )
        )}
      </Stack>
      {isMobile && (
        <Stack direction="row" width="100%" justifyContent="space-between" alignItems="center">
          <CarouselIconButton
            onClick={() => {
              activeCertificate === 0
                ? setActiveCertificate(certificates.length)
                : setActiveCertificate(activeCertificate - 1);
            }}
          >
            <Icon icon={arrowIosBackFill} color="white" width="20px" height="40px" />
          </CarouselIconButton>
          <CarouselIconButton
            onClick={() => {
              activeCertificate === certificates.length - 1
                ? setActiveCertificate(0)
                : setActiveCertificate(activeCertificate + 1);
            }}
          >
            <Icon icon={arrowIosForwardFill} color="white" width="20px" height="40px" />
          </CarouselIconButton>
        </Stack>
      )}
    </Stack>
  );
}
