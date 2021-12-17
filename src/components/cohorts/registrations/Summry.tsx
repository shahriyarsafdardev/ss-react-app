import { uniq } from 'lodash';
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
            infoTooltip={(difference: string) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`Applications Received this week ${difference} vs last week`}</strong>
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
            infoTooltip={(difference: string) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`Applications Accepted this week ${difference} vs last week`}</strong>
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
            infoTooltip={(difference: string) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`Payment Links Opened this week ${difference} vs last week`}</strong>
                  </div>
                }
              />
            )}
          />
          <KeyMetricHighlight
            metric={enrollments.filter((e: { status: string }) => e.status === 'Paid').length}
            difference={changeOccur(enrollments, ['Paid'])}
            currentTimePeriodLabel={<span>Paid</span>}
            infoTooltip={(difference: string) => (
              <InfoTooltip
                title={
                  <div>
                    <strong>{`Paid this week ${difference} vs last week`}</strong>
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
