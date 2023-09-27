import React, { useState, useCallback, useEffect } from 'react';
import WordCloud from 'react-d3-cloud';
// import { select } from 'd3-selection';
// import data from 'Domain/Home/Sample/Data/WordCloud.json';

export default function IctWordClouds(props) {
  const { data, height, onWordClick, valueSize } = props;

  const [newData, setNewData] = useState([]);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);

  useEffect(() => {
    // console.log('data', data);
    if(data?.length > 0) {
      const digitCount = valueSize ?? 4;
      const valueLengths = data.map(o => o.doc_count.toString().length);
      const maxLength = Math.max(...valueLengths);
      const maxValue = data.map(o => o.doc_count).reduce((min, curr) => min < curr ? curr : min);
      console.log('maxValue:',maxValue);

      setNewData(
        data.map((item) => {
          let itemValue = 0;

          const gap = Math.abs(maxLength - digitCount);
          if(maxLength > digitCount) {
            // itemValue = Math.floor(item.doc_count / Math.pow(10, gap));
            itemValue = Math.floor(item.doc_count / Math.pow(10, gap));
          } else if (maxLength < digitCount) {
            itemValue = Math.floor(item.doc_count * Math.pow(5, gap));
          } else {
            itemValue = item.doc_count;
          }
          console.log(item.doc_count, itemValue);

          return {
            text: item.key,
            value: itemValue
          };
        })
      );
      console.log('');
    } else {
      setNewData([]);
    }
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
