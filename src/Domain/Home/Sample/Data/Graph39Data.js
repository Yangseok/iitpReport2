import {faker} from '@faker-js/faker';
import common from 'Utill';
import moment from 'moment';

export const options = {
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
      color: '#000',
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
        text: '과제수행건수',
        color: '#333',
        font: {
          size: 20,
          lineHeight: 1.2
        },
        padding: {top: 30, left: 0, right: 0, bottom: 0}
      }
    },
  }
};

let labels = [];
const date = new Date();
const yearTo = Number(moment(date).format('YYYY'));
const year = Number(moment(date).subtract(10, 'years').format('YYYY'));
for (let i=year; i<=yearTo; i++) {
  labels.push(i);
}

export const data = {
  labels,
  datasets: [
    {
      type: 'line',
      label: '서울대',
      borderColor: 'rgb(0, 165, 68)',
      backgroundColor: 'rgb(0, 165, 68)',
      borderWidth: 3,
      fill: false,
      data: labels.map(() => faker.number.float({ min: 0, max: 20 })),
      pointStyle: 'circle',
      pointBackgroundColor: 'rgb(0, 165, 68)',
      pointRadius: 3,
      pointHoverRadius: 4,
    },
    {
      type: 'line',
      label: '연세대',
      borderColor: 'rgb(252, 108, 15)',
      backgroundColor: 'rgb(252, 108, 15)',
      borderWidth: 3,
      fill: false,
      data: labels.map(() => faker.number.float({ min: 0, max: 20 })),
      pointStyle: 'circle',
      pointBackgroundColor: 'rgb(252, 108, 15)',
      pointRadius: 3,
      pointHoverRadius: 4,
    },
    {
      type: 'line',
      label: '고려대',
      borderColor: 'rgb(125, 60, 132)',
      backgroundColor: 'rgb(125, 60, 132)',
      borderWidth: 3,
      fill: false,
      data: labels.map(() => faker.number.float({ min: 0, max: 20 })),
      pointStyle: 'circle',
      pointBackgroundColor: 'rgb(125, 60, 132)',
      pointRadius: 3,
      pointHoverRadius: 4,
    },
    {
      type: 'line',
      label: '전남대',
      borderColor: 'rgb(82, 163, 255)',
      backgroundColor: 'rgb(82, 163, 255)',
      borderWidth: 3,
      fill: false,
      data: labels.map(() => faker.number.float({ min: 0, max: 20 })),
      pointStyle: 'circle',
      pointBackgroundColor: 'rgb(82, 163, 255)',
      pointRadius: 3,
      pointHoverRadius: 4,
    },
  ],
};
