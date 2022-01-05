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
            currentTimePeriodLabel={<span>Applications Recieved</span>}
            difference={changeOccur(enrollments, [], 'time')}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>
                      {`${difference} new application${
                        difference > 1 ? 's were ' : ' was '
                      } recieved`}
                      <br />
                      {`since Monday the ${startOfWeek}`}
                    </strong>
                  </div>
                }
              />
            )}
          />{' '}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                [
                  'Application Accepted',
                  'Application Accepted (R)',
                  'Payment link opened',
                  'Paid'
                ].includes(e.status)
              ).length
            }
            difference={changeOccur(
              enrollments,
              [
                'Application Accepted',
                'Application Accepted (R)',
                'Payment link opened',
                'Paid',
                'Application Rejected',
                'No Longer Interested'
              ],
              'application_accepted_time'
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
          />{' '}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                ['Payment link opened', 'Paid'].includes(e.status)
              ).length
            }
            difference={changeOccur(
              enrollments,
              ['Payment link opened', 'Paid', 'Application Rejected', 'No Longer Interested'],
              'payment_link_opened_time'
            )}
            currentTimePeriodLabel={<span>Payment Links Opened</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>
                      {`${difference} new payment link${
                        difference > 1 ? 's were ' : ' was '
                      } opened`}
                      <br />
                      {`since Monday the ${startOfWeek}`}
                    </strong>
                  </div>
                }
              />
            )}
          />{' '}
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <KeyMetricHighlight
            metric={enrollments.filter((e: { status: string }) => e.status === 'Paid').length}
            difference={changeOccur(enrollments, ['Paid'], 'paid_time')}
            currentTimePeriodLabel={<span>Paid</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>
                      {`${difference} new payment${
                        difference > 1 ? 's were ' : ' was '
                      } recveived since`}
                      <br />
                      {`Monday the ${startOfWeek}`}
                    </strong>
                  </div>
                }
              />
            )}
          />{' '}
        </Grid>
      </Grid>
    </Stack>
  );
}
