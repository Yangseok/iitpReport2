import {faker} from '@faker-js/faker';
import common from 'Utill';

let labels = ['기타','기술개발진행중','기술개발완료','특허만신청(등록)','시제품단계','아이디어창안','실용화단계','시장개척단계'];

export const data = {
  labels,
  datasets: [
    {
      label: '건수',
      data: labels.map(() => faker.number.int({ min: 0, max: 10000 })),
      backgroundColor: ['#3BB1D4','#498CD3','#5269D2','#735FD2','#9E5DD2','#CB5CD2','#E65AC4','#E7599F'],
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
          if (context.parsed.x !== null) {
            label += common.setPriceInput(context.parsed.x) + '건';
          }
          return label;
        }
      }
    },
    legend: {
      display: false,
      position: 'right',
    },
    interaction: {
      mode: 'index',
      intersect: false
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
};
