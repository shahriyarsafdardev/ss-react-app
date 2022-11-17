import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { BaseOptionChart } from '../../components/charts';

export default function ReferralProgress({
  enrolled,
  referralsSent,
  requiredReferrees
}: {
  enrolled: number;
  referralsSent: number;
  requiredReferrees: number;
}) {
  const CHART_DATA = [enrolled, referralsSent, requiredReferrees];
  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    labels: ['Enrolled', 'Referrals sent', 'Required referrees'],
    colors: ['#637381', '#637381', '#637381'],
    plotOptions: {
      pie: {
        startAngle: 0,
        endAngle: 360,
        customScale: 1.0,
        donut: {
          size: '80%',
          labels: {
            show: true,
            name: {
              show: true,
              offsetY: 0,
              fontFamily: 'Public Sans',
              color: '#637381',
              fontWeight: '600',
              fontSize: '16px',
              formatter: () => `${enrolled} Referrals Accepted`
            },
            total: {
              show: true,
              showAlways: false
            },
            value: {
              show: false
            }
          }
        }
      }
    },
    tooltip: {
      enabled: false
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
