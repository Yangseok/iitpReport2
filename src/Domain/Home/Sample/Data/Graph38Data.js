import { faker } from '@faker-js/faker';
import moment from 'moment';
import common from 'Utill';

let labels = [];
const date = new Date();
const year = Number(moment(date).format('YYYY'));
const yearTo = Number(moment(date).subtract(22, 'years').format('YYYY'));
for (let i=year; i>yearTo; i--) {
  labels.push(i);
}
const graphRangeData = labels.map(() => faker.number.int({ min: 0, max: 10000 }));
export const data = {
  labels,
  datasets: [
    {
      label: '과제건수',
      data: graphRangeData,
      backgroundColor: 'rgba(76, 207, 252, 1)',
    },
  ],
};

export const options = {
  responsive: true,
  plugins: {
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
    legend: {
      display: false,
      position: 'top',
    },
    datalabels: {
      formatter: function (value) {
        return common.setPriceInput(value) + '건';
      },
      display: true,
      color: '#000',
      anchor: common.datalabelPoision(graphRangeData), //start, end
      align: common.datalabelPoision(graphRangeData), //top, bottom, middle, start, end
      clamp: false
    }
  },
  scales: {
    x: {
      display: true,
      title: {
        display: true,
        text: '연도',
        color: '#333',
        font: {
          size: 20,
          lineHeight: 1.2,
        },
        padding: {top: 20, left: 0, right: 0, bottom: 0}
      }
    },
    y: {
      display: true,
      offset: true,
      title: {
        display: true,
        text: '과제건수',
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
