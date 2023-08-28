import {faker} from '@faker-js/faker';
import common from 'Utill';
import moment from 'moment';

export const options = {
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
        color: '#333',
        font: {
          size: 20,
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
        text: '이자보상비율(%)',
        color: '#333',
        font: {
          size: 20,
          lineHeight: 1.2
        },
        padding: {top: 30, left: 0, right: 0, bottom: 0}
      }
    }
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
      label: '이자보상비율',
      borderColor: 'rgb(0, 0, 0)',
      backgroundColor: 'rgb(0, 0, 0)',
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.number.float({ min: 80, max: 100 })),
      pointStyle: 'circle',
      pointBackgroundColor: 'rgba(0,0,0,1)',
      pointRadius: 3,
      pointHoverRadius: 4,
      yAxisID: 'y1',
    },
    {
      type: 'bar',
      label: '영업이익',
      backgroundColor: 'rgb(53, 162, 235)',
      data: labels.map(() => faker.number.float({ min: 0, max: 1.1 })),
      borderColor: 'white',
      borderWidth: 2,
      yAxisID: 'y',
    },
    {
      type: 'bar',
      label: '지급이자',
      backgroundColor: 'rgb(251, 109, 33)',
      data: labels.map(() => faker.number.float({ min: 0, max: 1 })),
      yAxisID: 'y',
    },
  ],
};
