import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

// 막대 그래프
export default function ViewChart(props) {
  const { labels, datas, title, color, height, unit, type, onClick } = props;

  const data = {
    labels,
    datasets: [
      {
        label: (title?.label) ?? 'Dataset 1',
        data: datas,
        backgroundColor: (color) ?? 'rgb(82, 163, 255)',
        hoverBackgroundColor: 'rgb(82, 163, 255)',
        maxBarThickness: 38,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: (title?.label !== undefined) ? true : false,
        position: 'top',
      },
      tooltip: {
        enabled: true,
        position: 'nearest',
        callbacks: {
          label: function(context) {
            let label = '';
            if (context.parsed.y !== null) {
              if (type === undefined)
                label += common.setPriceInput(context.parsed.y) + (unit ?? '');
              else if (type === 1)
                label += context.parsed.y + (unit ?? '');
            }
            return label;
          }
        }
      },
      datalabels: {
        formatter: function (value) {
          if (type === undefined)
            return common.setPriceInput(value) + (unit ?? '');
          else if (type === 1)
            return value + (unit ?? '');
        },
        display: false,
        color: '#0F172A',
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
          text: '연도',
          color: '#334155',
          font: {
            size: 14,
            lineHeight: 1.2,
          },
          padding: {top: 20, left: 0, right: 0, bottom: 0}
        }
      },
      y: {
        display: true,
        title: {
          display: (title?.y !== undefined) ? true : false,
          text: (title?.y) ?? 'y축',
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
    <Chart data={data} onClick={onClick} options={options} width={560} height={height ?? 400} />
  );
}