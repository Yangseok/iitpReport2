import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Chart from 'Domain/Home/Common/Componet/Chart';
import {data,options} from 'Domain/Home/Sample/Data/Graph38Data';

export default function Graph38() {
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">세로형그래프2(38)</h2>
      <Chart data={data} options={options} />
    </SampleLayout>
  );
}
