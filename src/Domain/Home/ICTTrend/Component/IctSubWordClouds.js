import React, { useState, useCallback, useEffect, useRef } from 'react';
import Wordcloud from 'wordcloud';
import * as d3 from 'd3';
import $ from 'jquery';
import { useSelector } from 'react-redux';
import { getIctKeyword } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';

export default function IctSubWordClouds(props) {
  const { data, height, onWordClick, size = 100 } = props;

  const divRef = useRef(null);
  const ictKeyword = useSelector(getIctKeyword);

  const fill = d3.scaleOrdinal().range(['rgb(214, 39, 40)','rgb(255, 127, 14)','rgb(188, 189, 34)','rgb(44, 160, 44)','rgb(31, 119, 180)','rgb(23, 190, 207)','rgb(148, 103, 189)','rgb(227, 119, 194)','rgb(140, 86, 75)','rgb(127, 127, 127)']);

  const [newData, setNewData] = useState([]);

  const procWordCloudData = useCallback(() => {
    const maxValue = data.map(o => o.doc_count).reduce((max, curr) => max < curr ? curr : max);
    const minValue = data.map(o => o.doc_count).reduce((min, curr) => min > curr ? curr : min);
    const minValuePercent = minValue / 3; // 0% 를 최소값보다 적게 잡음
    console.log('maxValue, minValue :', maxValue, minValue, size);

    setNewData(
      data?.map((item) => {
        let itemValue = 0;

        if(minValue === maxValue) {
          itemValue = 28;
        } else {
          itemValue = Math.ceil((item.doc_count - minValuePercent) * 100 / (maxValue - minValuePercent));
          
          itemValue = Math.log10(itemValue) * 36;
        }
        
        return [item.key, itemValue];
      })
    );
  }, [data]);

  useEffect(() => {
    procWordCloudData();

    const addTabIndex = () => {
      return setTimeout(() => {
        $('.wordcloud_cursor_wrap span').each(function(){
          $(this).attr('tabindex', 0);
          if ($(this).text() === ictKeyword) {
            $(this).addClass('active');
          }
        });
        
        $('.wordcloud_cursor_wrap span').unbind('keydown').on('keydown', function (event) {
          if(event.key === 'Enter') {
            onWordClick(undefined, undefined, event);
          }
        });
      }, 400);
    };
    const addTabIndexSetTimeout = addTabIndex();
    return () => clearTimeout(addTabIndexSetTimeout);
  }, [data]);

  useEffect(() => {
    Wordcloud(divRef.current, {
      list: newData,
      shape: 'circle',
      minRotation: 0,
      maxRotation: 0,
      shrinkToFit: true,
      minSize: 2,
      fontFamily: 'Pretendard',
      color: fill,
      click: onWordClick
    });
  }, [newData]);

  return (
    <div style={{ width: 570, height: height, margin: 'auto', }}>
      <div style={{ width: 570, height: height }} ref={divRef} />
      {/* <Wordcloud width={400} heigth={300} list={words} shape={"circle"} color={'red'} /> */}
    </div>
  );
}