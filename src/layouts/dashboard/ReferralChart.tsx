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
    { name: 'Enrolled', data: [enrolled] },
    {
      name: 'Referrals Sent',
      data: [referralsSent]
    },
    {
      name: 'Required Referrals',
      data: [requiredReferees - enrolled]
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
    }
  });

  return (
    <ReactApexChart
      type="bar"
      series={CHART_DATA}
      options={chartOptions}
      width={200}
      style={{ margin: 'auto' }}
    />
  );
}
