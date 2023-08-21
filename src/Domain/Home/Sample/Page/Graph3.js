import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Chart from 'Domain/Home/Common/Componet/Chart';
import {data,options} from "Domain/Home/Sample/Data/Graph3Data";

export default function Graph3() {
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">꺽은선 그래프</h2>
      <Chart data={data} options={options} type={'line'} />
    </SampleLayout>
  );
}
