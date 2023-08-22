import { faker } from '@faker-js/faker';
import common from 'Utill';

export const options = {
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
      color: '#000',
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
        color: '#333',
        font: {
          size: 20,
          lineHeight: 1.2
        },
        padding: {top: 30, left: 0, right: 0, bottom: 0}
      },
      beginAtZero: true,
    },
  },
};

const sctLabels = ['플랫폼','learning','빅데이터','딥러닝','모니터링','네트워크','솔루션','고도','모델링','소프트웨어'];
const sctColor = ['#2376B2','#FE822A','#2E9F33','#D53031','#9467BB','#8B574C','#E279C1','#7F7F7F','#BBBD34','#21BCCE'];
let datasets = [];
for (let i=0; i<sctLabels.length; i++) {
  datasets.push({
    label: sctLabels[i],
    data: [
      {
        x: faker.number.int({ min: 0, max: 100 }),
        y: faker.number.int({ min: -100, max: 600 }),
      }
    ],
    backgroundColor: sctColor[i],
    borderColor: sctColor[i],
    pointStyle: 'circle',
    pointRadius: 10,
    pointHoverRadius: 12,
  });
}


export const data = {
  datasets: datasets,
};
