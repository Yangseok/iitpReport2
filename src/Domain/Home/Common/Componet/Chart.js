import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {TreemapController, TreemapElement} from 'chartjs-chart-treemap';
import { Bar, Line, Scatter, Chart as Chart2 } from 'react-chartjs-2';

ChartJS.register(
  ChartDataLabels,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  LineController,
  BarController,
  TreemapController,
  TreemapElement,
);

export default function Chart(props) {
  const {data, options, type} = props;
  const barType = (type === undefined) ? 'bar' : (type === 'bar') ? 'bar' : type;
  return ((barType === 'line') ? <Line options={options} data={data} /> : (barType === 'scatter') ? <Scatter options={options} data={data} /> : (barType === 'treemap') ? <Chart2 options={options} data={data} type="treemap" /> : (barType === 'multitype1') ? <Chart2 data={data} options={options} type="bar" /> : (barType === 'reg') ? <></> : <Bar options={options} data={data}/>);
}
