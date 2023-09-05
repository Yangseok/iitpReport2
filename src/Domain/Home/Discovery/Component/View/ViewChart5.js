import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import moment from 'moment';

export default function ViewChart(props) {
  const { labels, lineStartData, lineEndData, barData } = props;

  const projectData = barData;
  const minUnix = moment(projectData.map(o => o.min).reduce((min, curr) => min > curr ? curr : min)).subtract(1, 'month').unix();
  const dataUnixMinMax = labels.map((v,i) => {
    let min = moment(projectData[i].min).unix();
    let max = moment(projectData[i].max).unix();
    if (projectData[i].max === undefined) {
      min = 0;
      max = 0;
    }
    return [min, max];
  });
  const line1 = moment(lineStartData).unix();
  const line2 = moment(lineEndData).unix();

  const data = {
    labels,
    datasets: [
      {
        type:'line',
        data: labels.map(() => line1),
        borderColor: '#ff0000',
        fill: false,
        lineTension: 0,
        pointStyle: false,
        borderWidth: 2,
      },
      {
        type:'line',
        data: labels.map(() => line2),
        borderColor: '#ff0000',
        fill: false,
        lineTension: 0,
        pointStyle: false,
        borderWidth: 2,
      },
      {
        label: 'Dataset 1',
        data: dataUnixMinMax,
        barThickness: 40,
        backgroundColor: 'rgb(82, 163, 255)',
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
            if (context?.parsed?._custom?.min !== null) {
              label += moment.unix(context.parsed._custom.min).format('YYYY-MM-DD') + ' ~ ' + moment.unix(context.parsed._custom.max).format('YYYY-MM-DD');
            }
            return label;
          }
        }
      },
      legend: {
        display: false,
        position: 'top',
      },
      datalabels: {
        // formatter: function (value) {
        //   return common.setPriceInput(value) + '건2';
        // },
        display: false,
        color: '#000',
        anchor: 'start', //start, end
        align: 'end', //top, bottom, middle, start, end
        clamp: false
      }
    },
    scales: {
      x: {
        display: true,
        title: {
          display: false,
        },
        ticks: {
          callback: function(value) {
            return moment.unix(value).format('YYYY-MM');
          }
        },
        min: minUnix,
        offset: true
      },
      y: {
        display: true,
        title: {
          display: false,
        },
        offset: false
      }
    }
  };
  
  return (
    <Chart data={data} options={options} type='multitype1' width={560} height={240} />
  );
}