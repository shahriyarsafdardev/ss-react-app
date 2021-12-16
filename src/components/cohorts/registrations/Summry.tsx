import { uniq } from 'lodash';
import { KeyMetricHighlight, InfoTooltip } from './Common';
import { Enrollment } from '../../../@types/cohorts';

export default function Summary({ enrollments }: { enrollments: Enrollment[] }) {
  const streams = uniq(enrollments?.filter((e: any) => e.stream));

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
          />
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                ['Application Accepted', 'Payment link opened', 'Paid'].includes(e.status)
              ).length
            }
            currentTimePeriodLabel={
              <span>
                Applications Accepted
                <InfoTooltip
                  title={
                    <div>
                      <strong>Stream Breakdown</strong>
                      <ul>
                        {streams.map((e: any, index: any) => (
                          <li key={index}>
                            {e || 'Empty'} ===&gt;{' '}
                            {
                              enrollments.filter(
                                (r: { status: string; stream: any }) =>
                                  ['Application Accepted', 'Payment link opened', 'Paid'].includes(
                                    r.status
                                  ) && r.stream == e
                              ).length
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </span>
            }
          />
          <KeyMetricHighlight
            metric={
              enrollments.filter((e: { status: string }) =>
                ['Payment link opened', 'Paid'].includes(e.status)
              ).length
            }
            currentTimePeriodLabel={
              <span>
                Payment Links Opened
                <InfoTooltip
                  title={
                    <div>
                      <strong>Stream Breakdown</strong>
                      <ul>
                        {streams.map((e: any, index: any) => (
                          <li key={index}>
                            {e || 'Empty'} ===&gt;{' '}
                            {
                              enrollments.filter(
                                (r: { status: string; stream: any }) =>
                                  ['Payment link opened', 'Paid'].includes(r.status) &&
                                  r.stream == e
                              ).length
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </span>
            }
          />
          <KeyMetricHighlight
            metric={enrollments.filter((e: { status: string }) => e.status == 'Paid').length}
            currentTimePeriodLabel={
              <span>
                Paid
                <InfoTooltip
                  title={
                    <div>
                      <strong>Stream Breakdown</strong>
                      <ul>
                        {streams.map((e: any, index: any) => (
                          <li key={index}>
                            {e || 'Empty'} ===&gt;{' '}
                            {
                              enrollments.filter(
                                (r: { status: string; stream: any }) =>
                                  r.status == 'Paid' && r.stream == e
                              ).length
                            }
                          </li>
                        ))}
                      </ul>
                    </div>
                  }
                />
              </span>
            }
          />
        </div>
      </>
    </div>
  );
}
