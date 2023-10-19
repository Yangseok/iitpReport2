import React, {useRef} from 'react';
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
import { 
  Bar, 
  Line, 
  Scatter, 
  Chart as Chart2,
  getDatasetAtEvent,
  getElementAtEvent,
  getElementsAtEvent,
} from 'react-chartjs-2';

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
  const {data, options, type, width, height, onClick} = props;

  const chartRef = useRef(null);

  const printDatasetAtEvent = (dataset) => {
    if (!dataset.length) return;

    // const datasetIndex = dataset[0].datasetIndex;

    // console.log(data.datasets[datasetIndex].label);
  };

  const printElementAtEvent = (element) => {
    if (!element.length) return;

    const { datasetIndex, index } = element[0];

    if (onClick !== undefined) {
      onClick(data.labels[index], data.datasets[datasetIndex].data[index]);
    }
  };

  const printElementsAtEvent = (elements) => {
    if (!elements.length) return;

    // console.log(elements.length);
  };

  const onClickEvent = (event) => {
    const { current: chart } = chartRef;

    if (!chart) {
      return;
    }

    printDatasetAtEvent(getDatasetAtEvent(chart, event));
    printElementAtEvent(getElementAtEvent(chart, event));
    printElementsAtEvent(getElementsAtEvent(chart, event));
  };

  const barType = (type === undefined) ? 'bar' : type;
  return (
    (barType === 'line') 
      ? <Line ref={chartRef} onClick={onClickEvent} options={options} data={data} width={width} height={height} /> 
      : (barType === 'scatter') 
        ? <Scatter ref={chartRef} onClick={onClickEvent} options={options} data={data} width={width} height={height} /> 
        : (barType === 'treemap') 
          ? <Chart2  ref={chartRef} onClick={onClickEvent} options={options} data={data} width={width} height={height} type="treemap" /> 
          : (barType === 'multitype1') 
            ? <Chart2 ref={chartRef} onClick={onClickEvent} options={options} data={data} width={width} height={height} type="bar" /> 
            : (barType === 'reg') 
              ? <></> 
              : <Bar ref={chartRef} onClick={onClickEvent} options={options} data={data} width={width} height={height}/>
  );
}
