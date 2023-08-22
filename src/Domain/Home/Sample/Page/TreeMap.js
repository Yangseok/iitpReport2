import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Chart from 'Domain/Home/Common/Componet/Chart';
import {data,options} from 'Domain/Home/Sample/Data/TreeMapData';

export default function TreeMap() {
  return (
    <SampleLayout>
      <h2 className="text-center">
        트리맵
      </h2>
      <Chart data={data} options={options} type="treemap" />
    </SampleLayout>
  );
}
