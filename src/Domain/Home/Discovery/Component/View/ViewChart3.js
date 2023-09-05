import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

export default function Viewchart(props) {
  const { labels, data1, data2 } = props;

  const data = {
    labels,
    datasets: [
      {
        type: 'line',
        label: '영엽이익률',
        borderColor: '#FC6C0F',
        backgroundColor: '#FC6C0F',
        borderWidth: 3,
        fill: false,
        data: data1,
        pointStyle: 'circle',
        pointBackgroundColor: '#FC6C0F',
        pointRadius: 4,
        pointHoverRadius: 5,
      },
      {
        type: 'line',
        label: '단기순이익률',
        borderColor: '#0F172A',
        backgroundColor: '#0F172A',
        borderWidth: 3,
        fill: false,
        data: data2,
        pointStyle: 'circle',
        pointBackgroundColor: '#0F172A',
        pointRadius: 4,
        pointHoverRadius: 4,
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
        color: '#0F172A',
        anchor: 'start', //start, end
        align: 'end', //top, bottom, middle, start, end
        clamp: false
      }
    },
    scales: {
      y: {
        display: true,
        title: {
          display: true,
          text: '이익률(%)',
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
    <Chart data={data} options={options} type={'line'} width={560} height={430} />
  );
}