import React, { useState, useCallback, useEffect } from 'react';
import WordCloud from 'react-d3-cloud';
import * as d3 from 'd3';
import $ from 'jquery';

import { useSelector } from 'react-redux';
import { getIctKeyword } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';

export default function IctWordClouds(props) {
  const { data, height, onWordClick, size = 100 } = props;

  const ictKeyword = useSelector(getIctKeyword);
  const [newData, setNewData] = useState([]);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);
  const fill = d3.scaleOrdinal().range(['rgb(214, 39, 40)','rgb(255, 127, 14)','rgb(188, 189, 34)','rgb(44, 160, 44)','rgb(31, 119, 180)','rgb(23, 190, 207)','rgb(148, 103, 189)','rgb(227, 119, 194)','rgb(140, 86, 75)','rgb(127, 127, 127)']);

  const procWordCloudData = useCallback(() => {
    if(data?.length > 0) {
      const digitCount = 4;
      const maxValue = data.map(o => o.doc_count).reduce((max, curr) => max < curr ? curr : max);
      const minValue = data.map(o => o.doc_count).reduce((min, curr) => min > curr ? curr : min);
      const minValuePercent = minValue / 3; // 0% 를 최소값보다 적게 잡음
      const smallValues = data.filter(o => o.doc_count < (maxValue / 10));
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

          return {
            text: item.key,
            value: itemValue
          };
        })
      );
    } else {
      setNewData([]);
    }
  }, [data]);

  useEffect(() => {
    procWordCloudData();

    const addTabIndex = () => {
      return setTimeout(() => {
        d3.selectAll('.wordcloud_cursor_wrap text').each(function(){
          $(this).attr('tabindex', 0);
          if ($(this).text() === ictKeyword) {
            $(this).addClass('active');
          }
        });
        
        $(document).unbind('keydown').on('keydown', '.wordcloud_cursor_wrap svg text', function (event) {
          if(event.key === 'Enter') {
            const text = $(this).text();
            onWordClick(event, { text });
          }
        });
      }, 300);
    };
    const addTabIndexSetTimeout = addTabIndex();
    return () => clearTimeout(addTabIndexSetTimeout);
  }, [data]);

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
      onWordClick={onWordClick}
    />
  );
}
