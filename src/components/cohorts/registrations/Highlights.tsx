import moment from 'moment';
import { Grid, Stack } from '@material-ui/core';
import { KeyMetricHighlight, InfoTooltip, changeOccur } from './Common';
import { Enrollment } from '../../../@types/cohorts';

export default function Summary({ enrollments }: { enrollments: Enrollment[] }) {
  const startOfWeek = moment().startOf('week').add(1, 'days').format('Do of MMMM');
  return (
    <Stack sx={{ margin: '0 1rem 1.2rem 1rem' }} maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <KeyMetricHighlight
            metric={enrollments.length}
            currentTimePeriodLabel={<span>Partial Registrations</span>}
            difference={changeOccur(enrollments, [], 'time', false)}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>
                      {`${difference} new application${
                        difference > 1 ? 's were ' : ' was '
                      } received`}
                      <br />
                      {`since Monday the ${startOfWeek}`}
                    </strong>
                  </div>
                }
              />
            )}
            description="All users who have submitted their email"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KeyMetricHighlight
            metric={
              enrollments.filter(
                (e: { status: string }) =>
                  !['Partial Application Received', 'Not Interested'].includes(e.status)
              ).length
            }
            difference={changeOccur(enrollments, ['Exclude Partial'], 'time', true)}
            currentTimePeriodLabel={<span>Registrations</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>
                      {`${difference} new application${
                        difference > 1 ? 's were ' : ' was '
                      } received with details`}
                      <br />
                      {`since Monday the ${startOfWeek}`}
                    </strong>
                  </div>
                }
              />
            )}
            description="All users who have submitted their personal details"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                ['Application Accepted', 'Payment link opened', 'Paid', 'Attending'].includes(
                  e.status
                )
              ).length
            }
            difference={changeOccur(
              enrollments,
              ['Application Accepted', 'Payment link opened', 'Paid', 'Attending'],
              'application_accepted_time',
              false
            )}
            currentTimePeriodLabel={<span>Applications Accepted</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>
                      {`${difference} new application${
                        difference > 1 ? 's were ' : ' was '
                      } accepted`}
                      <br />
                      {`since Monday the ${startOfWeek}`}
                    </strong>
                  </div>
                }
              />
            )}
            description="All users who have been accepted"
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                ['Paid', 'Attending'].includes(e.status)
              ).length
            }
            difference={changeOccur(enrollments, ['Paid', 'Attending'], 'paid_time', false)}
            currentTimePeriodLabel={<span>Paid</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>
                      {`${difference} new payment${
                        difference > 1 ? 's were ' : ' was '
                      } received since`}
                      <br />
                      {`Monday the ${startOfWeek}`}
                    </strong>
                  </div>
                }
              />
            )}
            description="All users who have paid"
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
