import React, { useState, useEffect, useCallback } from 'react';
import WordCloud from 'react-d3-cloud';
// import { select } from 'd3-selection';

// import data from 'Domain/Home/Sample/Data/WordCloud.json';

export default function NewsWordClouds(props) {
  const {wordCloudData} = props;
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    // const maxValue = wordCloudData.map(o => o.weight).reduce((max, curr) => max < curr ? curr : max);
    const minValue = wordCloudData.map(o => o.weight).reduce((min, curr) => min > curr ? curr : min);
    // console.log(wordCloudData);
    setNewData(
      wordCloudData.map((item) => {
        return {
          text: item.keyword,
          value: Number(Math.floor(Math.floor((item.weight - minValue) * 500000) / 10))
        };
      })
    );
  }, [wordCloudData]);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);
  // const onWordMouseOver =  useCallback((word) => {
  //   console.log(word);
  //   console.log();

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
      height={300}
      data={newData}
      font={'Pretendard'}
      fontSize={fontSizeMapper}
      // fontSize={100}
      rotate={rotate}
      padding={2}
      // onWordMouseOver={onWordMouseOver}
      // onWordMouseOut={onWordMouseOut}
    />
  );
}
