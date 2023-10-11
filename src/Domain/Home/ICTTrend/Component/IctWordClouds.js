import React, { useState, useCallback, useEffect } from 'react';
import WordCloud from 'react-d3-cloud';
import * as d3 from 'd3';
import $ from 'jquery';

// import { select } from 'd3-selection';
// import data from 'Domain/Home/Sample/Data/WordCloud.json';

export default function IctWordClouds(props) {
  const { data, height, onWordClick, valueSize } = props;

  const [newData, setNewData] = useState([]);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);

  const procWordCloudData = useCallback(() => {
    // console.log('data', data);
    if(data?.length > 0) {
      const digitCount = valueSize ?? 4;
      const valueLengths = data.map(o => o.doc_count.toString().length);
      const maxLength = Math.max(...valueLengths);
      const maxValue = data.map(o => o.doc_count).reduce((max, curr) => max < curr ? curr : max);
      // const minValue = data.map(o => o.doc_count).reduce((min, curr) => min > curr ? curr : min);
      const firstValue = Number((maxValue + '').slice(0,1));
      const gap = Math.abs(maxLength - digitCount);
      // console.log('maxValue:', maxValue);
      // console.log('firstValue:', firstValue);
      // console.log('maxLength:', maxLength);
      // console.log('digitCount:', digitCount);
      // console.log('gap:', gap);

      // if(maxLength > digitCount) {
      //   console.log('크다.');
      // } else if (maxLength < digitCount) {
      //   console.log('작다.');
      // } else {
      //   console.log('작지도 크지도 않다.');
      // }

      setNewData(
        data.map((item) => {
          let itemValue = 0;

          if(maxLength > digitCount) {
            // itemValue = Math.floor(item.doc_count / Math.pow(10, gap));
            itemValue = Math.floor(item.doc_count * Math.abs(digitCount - gap) / Math.pow(10, gap));
          } else if (maxLength < digitCount) {
            itemValue = Math.floor(Math.pow(Math.log10(item.doc_count) * 5, gap + 2) / firstValue) * gap * Math.abs(digitCount - gap + 2);
          } else {
            itemValue = Math.floor(Math.log10(item.doc_count * 3) * 300);
          }
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
        d3.selectAll('text').each(function(){
          // console.log('text:' ,d, this);
          this.setAttribute('tabindex', 0);
        });
        
        $(document).unbind('keydown').on('keydown', '.wordcloud_cursor_wrap svg text', function (event) {
          if(event.key === 'Enter') {
            const text = this.textContent;
            // console.log('event:', this, text);
            onWordClick(undefined, { text });
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
      onWordClick={onWordClick}
      // onWordMouseOver={onWordMouseOver}
      // onWordMouseOut={onWordMouseOut}
    />
  );
}
