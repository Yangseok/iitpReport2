import moment from 'moment';
// import common from 'Utill';

let labels = ['','Project A','Project B','Project C','Project D','Project E','Project F','Project G','Project H',''];
let projectData = [
  {
    min: '2021-02-10',
  },
  {
    min: '2021-02-10',
    max: '2022-03-10'
  },
  {
    min: '2021-06-10',
    max: '2022-07-10'
  },
  {
    min: '2021-09-10',
    max: '2022-02-10'
  },
  {
    min: '2021-12-20',
    max: '2023-03-10'
  },
  {
    min: '2021-12-10',
    max: '2023-05-10'
  },
  {
    min: '2022-11-10',
    max: '2023-07-10'
  },
  {
    min: '2022-11-08',
    max: '2023-09-20'
  },
  {
    min: '2022-11-08',
    max: '2023-05-20'
  },
  {
    min: '2021-02-10',
  },
];
const minUnix = moment(projectData.map(o => o.min).reduce((min, curr) => min > curr ? curr : min)).subtract(1, 'month').unix();
const dataUnixMinMax = labels.map((v,i) => {
  let min = moment(projectData[i].min).unix();
  let max = moment(projectData[i].max).unix();
  if (projectData[i].max === undefined) {
    min = 0;
    max = 0;
  }
  return [min, max];
});
const line1 = moment('2021-12-30').unix();
const line2 = moment('2022-12-01').unix();

export const data = {
  labels,
  datasets: [
    {
      type:'line',
      data: labels.map(() => line1),
      borderColor: '#ff0000',
      fill: false,
      lineTension: 0,
      pointStyle: false,
      borderWidth: 1,
    },
    {
      type:'line',
      data: labels.map(() => line2),
      borderColor: '#ff0000',
      fill: false,
      lineTension: 0,
      pointStyle: false,
      borderWidth: 1,
    },
    {
      label: 'Dataset 1',
      data: dataUnixMinMax,
      backgroundColor: 'rgb(82, 163, 255)',
    },
  ],
};

export const options = {
  indexAxis: 'y',
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      position: 'nearest',
      callbacks: {
        label: function(context) {
          let label = '';
          if (context?.parsed?._custom?.min !== null) {
            label += moment.unix(context.parsed._custom.min).format('YYYY-MM-DD') + ' ~ ' + moment.unix(context.parsed._custom.max).format('YYYY-MM-DD');
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
      // formatter: function (value) {
      //   return common.setPriceInput(value) + '건2';
      // },
      display: false,
      color: '#000',
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
      },
      ticks: {
        callback: function(value) {
          return moment.unix(value).format('YYYY-MM');
        }
      },
      min: minUnix,
      offset: true
    },
    y: {
      display: true,
      title: {
        display: false,
      },
      offset: false
    }
  }
};
