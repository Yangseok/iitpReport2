import {faker} from '@faker-js/faker';
import common from 'Utill';
import moment from "moment";

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
            label += common.setPriceInput(context.parsed.y) + "건";
          }
          return label;
        }
      }
    },
    datalabels: {
      formatter: function (value) {
        return common.setPriceInput(value) + "건";
      },
      display: false,
      color: '#000',
      anchor: 'start', //start, end
      align: 'end', //top, bottom, middle, start, end
      clamp: false
    }
  },
};

let labels = [];
const date = new Date();
const yearTo = Number(moment(date).format('YYYY'));
const year = Number(moment(date).subtract(16, "years").format('YYYY'));
for (let i=year; i<=yearTo; i++) {
  labels.push(i);
}

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => faker.number.int({ min: 0, max: 10000 })),
      borderColor: "#3BB1D4",
      backgroundColor: '#fff',
      pointStyle: 'circle',
      pointRadius: 4,
      pointHoverRadius: 5,
    },
  ],
};
