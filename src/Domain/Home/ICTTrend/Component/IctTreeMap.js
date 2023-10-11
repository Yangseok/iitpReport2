import React, { useEffect } from 'react';
import Plot from 'react-plotly.js';
import $ from 'jquery';

// 레퍼런스
// https://plotly.com/javascript/treemaps/
// https://github.com/plotly/react-plotly.js

export default function IctTreeMap(props) {
  const { data, onClick } = props;

  useEffect(() => {
    // console.log(data);
    const addTabIndex = () => {
      return setTimeout(() => {
        // console.log('addTabIndex');
        $('.js-plotly-plot svg .slice.cursor-pointer').each(function(){
          // console.log($(this).text(), $(this).data('unformatted'));
          $(this).attr('tabindex', 0);
        });
        
        $(document).unbind('keydown').on('keydown', '.js-plotly-plot svg .slice.cursor-pointer', function (event) {
          if(event.key === 'Enter') {
            const label = $(this).text();
            const idx = data?.[0].labels?.indexOf(label);
            let currentPath = '/';
            if (data?.[0].parents?.[idx] !== '') {
              currentPath = `/${data?.[0].parents?.[idx]}/`;
            }
            // console.log('event:', this, text);
            onClickHandle(undefined, { currentPath, label });
          }
        });
      }, 300);
    };
    const addTabIndexSetTimeout = addTabIndex();
    return () => clearTimeout(addTabIndexSetTimeout);
  }, [data]);
  
  const onClickHandle = (e, pointsObj) => {
    if (e !== undefined) {
      onClick(e);
    } else {
      let pushData = {};
      pushData.points = [pointsObj];
      onClick(pushData);
    }
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
