import {faker} from '@faker-js/faker';
import common from 'Utill';
import moment from 'moment';

let labels = [];
const date = new Date();
const yearTo = Number(moment(date).format('YYYY'));
const year = Number(moment(date).subtract(2, 'years').format('YYYY'));
labels.push('');
for (let i=year; i<=yearTo; i++) {
  labels.push(i);
}
labels.push('');
const graphRangeData = labels.map((e) => {
  if (e === '') return 0;
  return faker.number.int({ min: -300, max: 500 });
});
// const graphRangeData = [0,129,-300,390,0];

export const data = {
  labels,
  datasets: [
    {
      type:'line',
      data: labels.map(() => 200),
      borderColor: '#ff0000',
      borderWidth: 5,
      backgroundColor: 'rgba(255,0,0,0.3)',
      fill: 'start', //false, origin, start, end,
      lineTension: 0,
      pointStyle: false,
    },
    {
      label: 'Dataset 1',
      data: graphRangeData,
      backgroundColor: common.stockBgColor(graphRangeData),
    },
  ],
};

export const options = {
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
      formatter: function (value, context) {
        if (context.datasetIndex == 0) return '';
        if (value == 0) return '';
        return common.setPriceInput(value) + '건';
      },
      display: true,
      color: '#000',
      anchor: common.datalabelPoision(graphRangeData), //center, start, end
      align: common.datalabelPoision(graphRangeData), //top, bottom, middle, start, end
      clamp: true
    }
  },
  scales: {
    x: {
      offset: false
    },
    y: {
      offset: true
    }
  }
};

