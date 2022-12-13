import { Stack } from '@material-ui/core';
import { SmallImage, MainImage } from './Common';

export default function OffboardingCarousel({
  activeImage,
  setActiveImage,
  images,
  setImages
}: {
  activeImage: string;
  setActiveImage: Function;
  images: string[];
  setImages: Function;
}) {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} justifyContent="center">
      <MainImage
        alt="certificate-download"
        src={`https://sphere-public.s3.eu-west-2.amazonaws.com/${activeImage}.png`}
      />
      <Stack
        width={{ md: '25%', xs: '100%' }}
        justifyContent="space-between"
        direction={{ xs: 'row', md: 'column' }}
      >
        {images.map((img, index) => (
          <SmallImage
            key={index}
            alt="certificate-download"
            src={`https://sphere-public.s3.eu-west-2.amazonaws.com/${img}.png`}
            onClick={() => {
              images[index] = activeImage;
              setActiveImage(img);
            }}
          />
        ))}
      </Stack>
    </Stack>
  );
}
