import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Chart from 'Domain/Home/Common/Componet/Chart';
import {data,options} from "Domain/Home/Sample/Data/Graph32Data";

export default function Graph32() {
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">엑셀 요청한 그래프</h2>
      <Chart data={data} options={options} />
    </SampleLayout>
  );
}
