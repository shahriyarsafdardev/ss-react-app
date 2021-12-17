import { KeyMetricHighlight, InfoTooltip, changeOccur } from './Common';
import { Enrollment } from '../../../@types/cohorts';

export default function Summary({ enrollments }: { enrollments: Enrollment[] }) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <>
        <div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10"
          style={{
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-around',
            margin: 'auto'
          }}
        >
          <KeyMetricHighlight
            metric={enrollments.length}
            currentTimePeriodLabel={<span>Applications Recieved</span>}
            difference={changeOccur(enrollments, [])}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`${difference} new Application${
                      difference > 1 ? 's' : ''
                    } Received this week`}</strong>
                  </div>
                }
              />
            )}
          />
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                ['Application Accepted', 'Payment link opened', 'Paid'].includes(e.status)
              ).length
            }
            difference={changeOccur(enrollments, [
              'Application Accepted',
              'Payment link opened',
              'Paid'
            ])}
            currentTimePeriodLabel={<span>Applications Accepted</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`${difference} Application${
                      difference > 1 ? 's' : ''
                    } Accepted this week`}</strong>
                  </div>
                }
              />
            )}
          />
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                ['Payment link opened', 'Paid'].includes(e.status)
              ).length
            }
            difference={changeOccur(enrollments, ['Payment link opened', 'Paid'])}
            currentTimePeriodLabel={<span>Payment Links Opened</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`${difference} user${
                      difference > 1 ? 's' : ''
                    } opened payment link this week`}</strong>
                  </div>
                }
              />
            )}
          />
          <KeyMetricHighlight
            metric={enrollments.filter((e: { status: string }) => e.status === 'Paid').length}
            difference={changeOccur(enrollments, ['Paid'])}
            currentTimePeriodLabel={<span>Paid</span>}
            infoTooltip={(difference: number) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`${difference} new payment${
                      difference > 1 ? 's were ' : ' was '
                    } processed this week`}</strong>
                  </div>
                }
              />
            )}
          />
        </div>
      </>
    </div>
  );
}
