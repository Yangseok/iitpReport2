import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

export default function IctChart4(props) {
  const { labels, datas, height } = props;

  const data = {
    labels,
    datasets: [
      {
        label: '건수',
        data: datas,
        backgroundColor: ['#3BB1D4','#498CD3','#5269D2','#735FD2','#9E5DD2','#CB5CD2','#E65AC4','#E7599F'],
      },
    ],
  };

  const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        position: 'nearest',
        callbacks: {
          label: function(context) {
            let label = '';
            if (context.parsed.x !== null) {
              label += common.setPriceInput(context.parsed.x) + '건';
            }
            return label;
          }
        }
      },
      legend: {
        display: false,
        position: 'right',
      },
      interaction: {
        mode: 'index',
        intersect: false
      },
      datalabels: {
        formatter: function (value) {
          return common.setPriceInput(value) + '건';
        },
        display: true,
        color: '#0F172A',
        anchor: 'start', //start, end
        align: 'end', //top, bottom, middle, start, end
        clamp: false
      }
    },
  };
  

  return (
    <Chart data={data} options={options} height={height} />
  );
}