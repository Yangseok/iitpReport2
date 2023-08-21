import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Chart from "Domain/Home/Common/Componet/Chart";
import {data,options} from "Domain/Home/Sample/Data/Graph2Data";

export default function Graph2() {
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">가로형 그래프</h2>
      <Chart data={data} options={options} />
    </SampleLayout>
  );
}
