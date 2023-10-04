import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

// 분포형 그래프
export default function IctChart(props) {
  const { labels, datas, height } = props;

  const sctColor = ['#2376B2','#FE822A','#2E9F33','#D53031','#9467BB','#8B574C','#E279C1','#7F7F7F','#BBBD34','#21BCCE'];
  let datasets = [];
  for (let i=0; i<labels.length; i++) {
    datasets.push({
      label: labels[i],
      data: [ datas[i] ],
      backgroundColor: sctColor[(i % sctColor.length)],
      borderColor: sctColor[(i % sctColor.length)],
      pointStyle: 'circle',
      pointRadius: 6,
      pointHoverRadius: 8,
    });
  }
  const data = { datasets };
  
  const options = {
    plugins: {
      tooltip: {
        enabled: true,
        position: 'nearest',
        callbacks: {
          label: function(context) {
            let label = context?.dataset?.label ?? '';
            if (label !== '') {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += common.setPriceInput(context.parsed.y) + '건';
            }
            return label;
          }
        }
      },
      legend: {
        display: true,
        position: 'right',
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
      x: {
        beginAtZero: false,
        ticks: {
          // Include a dollar sign in the ticks
          callback: function(value) {
            return (value === 0) ? value : value + 'K';
          }
        }
      },
      y: {
        display: true,
        title: {
          display: true,
          text: '전년대비 출현 증가율(%)',
          color: '#334155',
          font: {
            size: 14,
            lineHeight: 1.2
          },
          padding: {top: 30, left: 0, right: 0, bottom: 0}
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <Chart data={data} options={options} type='scatter' width={1000} height={height} />
  );
}