import { BaseOptionChart } from 'components/charts';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { Box, Card, CardHeader } from '@material-ui/core';
import { styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const ChartCard = styled(Card)(({ theme }) => ({
  width: '50%',
  marginRight: '10px',
  [theme.breakpoints.down('sm')]: {
    width: '100%'
  }
}));

export default function StackedBarChart({
  data_points,
  title,
  label,
  xaxisType
}: {
  data_points: any;
  title: string;
  label: string;
  xaxisType: string;
}) {
  const CHART_DATA = data_points.data;

  const chartOptions = merge(BaseOptionChart(), {
    chart: {
      stacked: true,
      zoom: { enabled: true }
    },
    legend: { itemMargin: { vertical: 8 }, position: 'right', offsetY: 20 },
    plotOptions: { bar: { columnWidth: '60%' } },
    stroke: { show: false },
    xaxis: {
      type: xaxisType,
      categories: data_points.dates
    },
    tooltip: {
      y: {
        formatter: (val: number) => `${val} ${label}`
      }
    }
  });
  return (
    <ChartCard>
      <CardHeader title={title} data-testid="stack_bar_chart" />
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={320} />
      </Box>
    </ChartCard>
  );
}
