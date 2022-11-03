import { useState } from 'react';

// material
import { Grid, Card, Stack, TextField, FormControl } from '@material-ui/core';
import { NavigationButtons } from './dataTypes';

export default function HouseKeepingForm({
  onSubmit,
  goalsValue,
  onPrevHandler,
  isSubmitting = false
}: {
  onSubmit: Function;
  onPrevHandler: Function;
  goalsValue: string;
  isSubmitting?: boolean;
}) {
  const [goals, setGoals] = useState<any>(goalsValue || '');

  return (
    <>
      <br />
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3, height: 1, overflow: 'visible' }}>
            <Stack spacing={{ xs: 2, md: 3 }}>
              <FormControl fullWidth>
                <TextField
                  label="What key result are you looking to achieve by attending this course?"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  multiline
                  rows={3}
                />
              </FormControl>
            </Stack>
          </Card>
        </Grid>
      </Grid>
      <NavigationButtons
        showPrevButton={true}
        disabled={!goals}
        onPreviousHandler={onPrevHandler}
        onNextHandler={() => {
          onSubmit({ goals });
        }}
        isSubmitBtn={true}
        isSubmitting={isSubmitting}
      />
    </>
  );
}
