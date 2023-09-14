import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

export default function IctChart(props) {
  const { xLabels, dataLabels, datas } = props;

  const multiColor = ['rgb(0, 165, 68)','rgb(252, 108, 15)','rgb(125, 60, 132)','rgb(82, 163, 255)'];
  let datasets = [];
  for (let i=0; i<dataLabels.length; i++) {
    datasets.push({
      type: 'line',
      label: dataLabels[i],
      borderColor: multiColor[(i % multiColor.length)],
      backgroundColor: multiColor[(i % multiColor.length)],
      borderWidth: 3,
      fill: false,
      data: datas[i],
      pointStyle: 'circle',
      pointBackgroundColor: multiColor[(i % multiColor.length)],
      pointRadius: 3,
      pointHoverRadius: 4,
    });
  }
  const data = {
    labels: xLabels,
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'right',
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
              label += common.setPriceInput(context.parsed.y) + '건';
            }
            return label;
          }
        }
      },
      datalabels: {
        formatter: function (value) {
          return common.setPriceInput(value) + '건';
        },
        display: false,
        color: '#0F172A',
        anchor: 'start', //start, end
        align: 'end', //top, bottom, middle, start, end
        clamp: false
      },
    },
  };

  return (
    <Chart data={data} options={options} type='multitype1' height={160} />
  );
}