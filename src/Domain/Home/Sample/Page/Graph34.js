import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Plot from 'react-plotly.js';
import {data,layout,treeConfig} from 'Domain/Home/Sample/Data/Graph34Data';

export default function Graph34() {
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">엑셀 요청한 그래프3</h2>
      <Plot
        data={data}
        layout={layout}
        config={treeConfig}
        style={{position: 'relative', display: 'block'}}
      />
    </SampleLayout>
  );
}
