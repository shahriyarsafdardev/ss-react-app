import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { BaseOptionChart } from '../../components/charts';

export default function ReferralProgress({
  enrolled,
  referralsSent,
  requiredReferees
}: {
  enrolled: number;
  referralsSent: number;
  requiredReferees: number;
}) {
  const CHART_DATA = [enrolled, referralsSent - enrolled, 7];
  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    labels: ['Referrals Enrolled', 'Referrals waiting for Acceptance', 'Required Referees'],
    colors: ['#ffffff', '#ffffff', '#ffffff'],
    plotOptions: {
      pie: {
        startAngle: 0,
        expandOnClick: false,
        endAngle: 360,
        customScale: 1.0,
        donut: {
          size: '80%',
          labels: {
            show: true,
            name: {
              show: true,
              showAlways: true,
              offsetY: 0,
              formatter: () => `${enrolled} referral${enrolled !== 1 ? 's' : ''}`
            },
            total: {
              show: true,
              showAlways: true,
              offsetY: 0,
              formatter: () => `accepted`
            }
          }
        }
      }
    },
    tooltip: {
      enabled: true,
      theme: false,
      style: {
        fontSize: '12px',
        background: '#fff'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: false
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.1,
        gradientToColors: ['#007B55', '#5BE584', '#EDEFF2'],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100]
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          }
        }
      }
    ]
  });

  return (
    <ReactApexChart
      type="donut"
      series={CHART_DATA}
      options={chartOptions}
      width={280}
      style={{ margin: 'auto' }}
    />
  );
}
