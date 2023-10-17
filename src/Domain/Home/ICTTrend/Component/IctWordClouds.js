import React, { useState, useCallback, useEffect } from 'react';
import WordCloud from 'react-d3-cloud';
import * as d3 from 'd3';
import $ from 'jquery';
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory10 } from 'd3-scale-chromatic';
// import { select } from 'd3-selection';
// import data from 'Domain/Home/Sample/Data/WordCloud.json';

import { useSelector } from 'react-redux';
import { getIctKeyword } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';

export default function IctWordClouds(props) {
  const { data, height, onWordClick, size = 100 } = props;

  const ictKeyword = useSelector(getIctKeyword);
  const [newData, setNewData] = useState([]);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);
  // const fill = useCallback((d, i) => scaleOrdinal(schemeCategory10)(i), []);
  const fill = d3.scaleOrdinal().range(['rgb(214, 39, 40)','rgb(255, 127, 14)','rgb(188, 189, 34)','rgb(44, 160, 44)','rgb(31, 119, 180)','rgb(23, 190, 207)','rgb(148, 103, 189)','rgb(227, 119, 194)','rgb(140, 86, 75)','rgb(127, 127, 127)']);

  const procWordCloudData = useCallback(() => {
    // console.log('data', data);
    if(data?.length > 0) {
      const digitCount = 4;
      const maxValue = data.map(o => o.doc_count).reduce((max, curr) => max < curr ? curr : max);
      const minValue = data.map(o => o.doc_count).reduce((min, curr) => min > curr ? curr : min);
      const minValuePercent = minValue / 3; // 0% 를 최소값보다 적게 잡음
      const smallValues = data.filter(o => o.doc_count < (maxValue / 10));
      // const valueLengths = data.map(o => o.doc_count.toString().length);
      // const maxLength = Math.max(...valueLengths);
      // const firstValue = Number((maxValue + '').slice(0,1));
      // const gap = Math.abs(maxLength - digitCount);
      console.log('minValue, maxValue:', minValuePercent, minValue, maxValue, smallValues.length, size);

      setNewData(
        data?.map((item) => {
          let itemValue = 0;
          if(minValue === maxValue) {
            itemValue = 1200;
          } else {
            itemValue = Math.floor((item.doc_count - minValuePercent) * 100 / (maxValue - minValuePercent)  * Math.pow(9, digitCount - 2));
            
            if (smallValues.length >= size * 0.85) {
              itemValue = itemValue * 2;
            }
          }

          // let itemValue = 0;

          // if(maxLength > digitCount) {
          //   // itemValue = Math.floor(item.doc_count / Math.pow(10, gap));
          //   itemValue = Math.floor(item.doc_count * Math.abs(digitCount - gap) / Math.pow(10, gap));
          // } else if (maxLength < digitCount) {
          //   itemValue = Math.floor(Math.pow(Math.log10(item.doc_count) * 5, gap + 2) / firstValue) * gap * Math.abs(digitCount - gap + 2);
          // } else {
          //   itemValue = Math.floor(Math.log10(item.doc_count * 3) * 300);
          // }
          // if (i < 10) console.log(item.doc_count, itemValue);

          return {
            text: item.key,
            value: itemValue
          };
        })
      );
      // console.log('');
    } else {
      setNewData([]);
    }
  }, [data]);

  useEffect(() => {
    procWordCloudData();

    const addTabIndex = () => {
      return setTimeout(() => {
        // console.log('addTabIndex');
        d3.selectAll('.wordcloud_cursor_wrap text').each(function(){
          this.setAttribute('tabindex', 0);
          if ($(this).text() === ictKeyword) {
            $(this).addClass('active');
          }
        });
        
        $(document).unbind('keydown').on('keydown', '.wordcloud_cursor_wrap svg text', function (event) {
          if(event.key === 'Enter') {
            const text = this.textContent;
            onWordClick(event, { text });
          }
        });
      }, 300);
    };
    const addTabIndexSetTimeout = addTabIndex();
    return () => clearTimeout(addTabIndexSetTimeout);
  }, [data]);

  // const onWordMouseOver =  useCallback((word) => {
  //   // Specify where to put label of text
  //   select('svg')
  //     .append('text')
  //     .text(function () {
  //       return [word.x, word.y]; // Value of the text
  //     })
  //     .attr('x', () => 300)
  //     .attr('y', () => 400)
  //     .attr('id', 't' + word.x + '-' + word.y);
  // }, []);
  // const onWordMouseOut =  useCallback((word) => {
  //   // Select text by id and then remove
  //   select('#t' + word.x + '-' + word.y).remove(); // Remove text location
  // }, []);

  return (
    <WordCloud
      width={1000}
      height={height}
      data={newData}
      font={'Pretendard'}
      fontSizeMapper={fontSizeMapper}
      rotate={rotate}
      padding={2}
      fill={fill}
      // bgColor={'#f00'}
      onWordClick={onWordClick}
      // onWordMouseOver={onWordMouseOver}
      // onWordMouseOut={onWordMouseOut}
    />
  );
}
