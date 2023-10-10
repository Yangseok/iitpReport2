import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import $ from 'jquery';

// 레퍼런스
// https://plotly.com/javascript/treemaps/
// https://github.com/plotly/react-plotly.js

export default function IctTreeMap(props) {
  const { data, onClick } = props;

  const [isClick, setIsClick] = useState(0);

  useEffect(() => {
    // console.log(data);
    const addTabIndex = () => {
      return setTimeout(() => {
        console.log('addTabIndex');
        $('.js-plotly-plot text').each(function(i){
          // console.log($(this).text(), $(this).data('unformatted'));
          $(this).attr('tabindex', i + 2000);
        });
      }, 300);
    };
    addTabIndex();
    return () => clearTimeout(addTabIndex);
  }, [data, isClick]);
  
  const onClickHandle = (e) => {
    onClick(e);
    setIsClick(isClick + 1);
  };
  
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
    responsive: true,
    displayModeBar: false,
  };

  return (
    <>
      <Plot
        data={data}
        layout={layout}
        config={treeConfig}
        style={{position: 'relative', display: 'block', minHeight: '450px'}}
        onClick={onClickHandle}
      />
    </>
  );
}
