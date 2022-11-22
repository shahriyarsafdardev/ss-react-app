import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { BaseOptionChart } from '../../components/charts';

export default function ReferralChart({
  enrolled,
  referralsSent,
  requiredReferees
}: {
  enrolled: number;
  referralsSent: number;
  requiredReferees: number;
}) {
  const CHART_DATA = [
    { name: 'Sent', data: [referralsSent] },
    {
      name: 'Awaiting',
      data: [referralsSent - enrolled]
    },
    {
      name: 'Referrals Until Free Course',
      data: [requiredReferees]
    }
  ];
  const chartOptions = merge(BaseOptionChart(), {
    colors: ['#007B55', '#5BE584', '#ffffff'],
    chart: {
      type: 'bar',
      stacked: true,
      columnWidth: '28%',
      borderRadius: 4,
      stackType: '100%'
    },
    plotOptions: {
      bar: {
        horizontal: true
      }
    },
    title: {
      show: false
    },
    xaxis: {
      labels: {
        show: false
      }
    },
    yaxis: {
      labels: {
        show: false
      }
    },
    fill: {
      opacity: 1
    },
    legend: {
      show: false
    },
    grid: {
      show: false
    }
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <ReactApexChart
        type="bar"
        series={CHART_DATA}
        options={chartOptions}
        width={200}
        height={60}
        style={{ margin: 'auto', minHeight: '60px' }}
      />
      <p style={{ marginLeft: '-15px', zIndex: 1, fontSize: '22px' }}>🎁</p>
    </div>
  );
}
