import React from 'react';
import Plot from 'react-plotly.js';

// 레퍼런스
// https://plotly.com/javascript/treemaps/
// https://github.com/plotly/react-plotly.js

export default function TechnologyTreeMap(props) {
  const { data } = props;
  
  const layout = {
    // width: 1000,
    // height: 500,
    title: false,
    font: {size: 18},
    margin: {
      l: 20,
      r: 20,
      b: 30,
      t: 30,
      pad: 5
    }
  };
  
  const treeConfig = {
    responsive: true
  };

  return (
    <>
      <Plot
        data={data}
        layout={layout}
        config={treeConfig}
        style={{position: 'relative', display: 'block'}}
      />
    </>
  );
}
