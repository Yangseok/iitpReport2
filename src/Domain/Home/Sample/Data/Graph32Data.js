import {faker} from '@faker-js/faker';
import common from 'Utill';
import moment from 'moment';

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
      formatter: function (value) {
        return common.setPriceInput(value) + '건';
      },
      display: true,
      color: '#000',
      anchor: 'start', //start, end
      align: 'end', //top, bottom, middle, start, end
      clamp: false
    }
  },
  scales: {
    x: {
      offset: false
    }
  }
};

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
const bgColor = (graphRangeData) => {
  return graphRangeData.map((d) => {
    return (d > 0) ? '#5081BD' : '#ff0000';
  });
};

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
      backgroundColor: bgColor(graphRangeData),
    },
  ],
};
