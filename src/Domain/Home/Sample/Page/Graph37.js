import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Chart from 'Domain/Home/Common/Componet/Chart';
import {data, options} from 'Domain/Home/Sample/Data/Graph37Data';

export default function Graph37() {
  return (
    <SampleLayout>
      <h2 className='text-center mb-10'>엑셀 요청한 그래프4</h2>
      <Chart data={data} options={options} type='multitype1' />
    </SampleLayout>
  );
}
