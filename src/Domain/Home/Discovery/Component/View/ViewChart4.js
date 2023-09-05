import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

export default function ViewChart(props) {
  const { title, labels, data1, data2, data3 } = props;

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: title.label[1],
        borderColor: 'rgb(0, 0, 0)',
        backgroundColor: 'rgb(0, 0, 0)',
        borderWidth: 2,
        fill: false,
        data: data1,
        pointStyle: 'circle',
        pointBackgroundColor: 'rgba(0,0,0,1)',
        pointRadius: 3,
        pointHoverRadius: 4,
        yAxisID: 'y1',
      },
      {
        type: 'bar',
        label: title.label[2],
        backgroundColor: 'rgb(53, 162, 235)',
        data: data2,
        borderColor: 'white',
        borderWidth: 2,
        yAxisID: 'y',
      },
      {
        type: 'bar',
        label: title.label[3],
        backgroundColor: 'rgb(251, 109, 33)',
        data: data3,
        yAxisID: 'y',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
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
        color: '#000',
        anchor: 'start', //start, end
        align: 'end', //top, bottom, middle, start, end
        clamp: false
      }
    },
    scales: {
      y: {
        display: true,
        position: 'left',
        title: {
          display: true,
          text: '금액(천억원) ',
          color: '#334155',
          font: {
            size: 14,
            lineHeight: 1.2
          },
          padding: {top: 30, left: 0, right: 0, bottom: 0}
        }
      },
      y1: {
        display: true,
        position: 'right',
        title: {
          display: true,
          text: title.y,
          color: '#334155',
          font: {
            size: 14,
            lineHeight: 1.2
          },
          padding: {top: 30, left: 0, right: 0, bottom: 0}
        }
      }
    }
  };
  
  return (
    <Chart data={data} options={options} type='multitype1' width={560} height={380} />
  );
}