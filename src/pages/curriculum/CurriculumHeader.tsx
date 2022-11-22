import { Stack, Typography } from '@material-ui/core';

export default function CurriculumHeader() {
  return (
    <Stack spacing={2} sx={{ padding: '64px', alignItems: 'center', justifyContent: 'center' }}>
      <Typography variant="h1" sx={{ color: '#082139', fontSize: '4.25rem', lineHeight: '1.4' }}>
        Data & ML Courses
      </Typography>
      <Typography sx={{ color: '#30364d', fontSize: '20px' }}>
        Our courses are led by world class experts and designed to help you impact business KPIs
      </Typography>
    </Stack>
  );
}
