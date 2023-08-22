import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Plot from 'react-plotly.js';
import data from 'Domain/Home/Sample/Data/Treemap.json';
import {layout,treeConfig} from 'Domain/Home/Sample/Data/TreeMap2Data';

// 레퍼런스
// https://plotly.com/javascript/treemaps/
// https://github.com/plotly/react-plotly.js

export default function TreeMap2() {
  return (
    <SampleLayout>
      <h2 className="text-center">
        트리맵2
      </h2>
      <Plot
        data={data}
        layout={layout}
        config={treeConfig}
        style={{position: 'relative', display: 'block'}}
      />
    </SampleLayout>
  );
}
