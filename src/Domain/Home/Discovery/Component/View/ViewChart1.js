import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

// 막대 + 선 그래프
export default function ViewChart(props) {
  const { labels, lineFill, lineData, barData } = props;

  const graphRangeData = barData;
  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        data: labels.map(() => lineData),
        borderColor: '#ff0000',
        borderWidth: 4,
        backgroundColor: 'rgba(255,0,0,0.3)',
        fill: lineFill, //false, origin, start, end,
        lineTension: 0,
        pointStyle: false,
      },
      {
        label: 'Dataset 1',
        data: graphRangeData,
        backgroundColor: common.stockBgColor(graphRangeData),
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
        position: 'top',
      },
      title: {
        display: false,
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        callbacks: {
          label: function(context) {
            let label = '';
            if (context.parsed.y !== null) {
              label += common.setPriceInput(context.parsed.y);
            }
            return label;
          }
        }
      },
      datalabels: {
        formatter: function (value, context) {
          if (context.datasetIndex == 0) return '';
          if (value == 0) return '';
          return common.setPriceInput(value);
        },
        display: true,
        color: '#0F172A',
        anchor: common.datalabelPoision(graphRangeData), //start, end
        align: common.datalabelPoision(graphRangeData), //top, bottom, middle, start, end
        clamp: true
      }
    },
    scales: {
      x: {
        offset: false
      },
      y: {
        offset: true
      }
    }
  };

  return (
    <Chart data={data} options={options} width={560} height={430} />
  );
}