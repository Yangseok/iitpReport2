import React from 'react';
import Chart from 'Domain/Home/Common/Componet/Chart';
import common from 'Utill';

export default function IctChart(props) {
  const { labels, datas } = props;

  const data = {
    labels,
    datasets: [
      {
        type: 'bar',
        label: '연도별 과제 건수',
        backgroundColor: '#52A3FF',
        data: datas,
        borderColor: 'white',
        borderWidth: 2,
        yAxisID: 'y',
      }
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
        display: true,
        color: '#0F172A',
        font: {
          size: 10,
          lineHeight: 1.2,
        },
        // anchor: 'start', //start, end
        // align: 'end', //top, bottom, middle, start, end
        anchor: common.datalabelPoision(datas), //start, end
        align: common.datalabelPoision(datas), //top, bottom, middle, start, end
        clamp: false
      },
    },
  };

  return (
    <Chart data={data} options={options} type='multitype1' height={160} />
  );
}