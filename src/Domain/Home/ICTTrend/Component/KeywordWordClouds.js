import React, { useState, useCallback } from 'react';
import WordCloud from 'react-d3-cloud';
import { select } from 'd3-selection';

// import data from 'Domain/Home/Sample/Data/WordCloud.json';

export default function KeywordWordClouds(props) {
  const { data, height } = props;
  const [newData] = useState(data);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setNewData(
  //       data.map((item) => ({
  //         text: item.text,
  //         value: Math.random() * 1000
  //       }))
  //     );
  //   }, 3000);
  //   return () => clearInterval(timer);
  // }, []);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);
  const onWordMouseOver =  useCallback((word) => {
    console.log(word);
    console.log();

    // Specify where to put label of text
    select('svg')
      .append('text')
      .text(function () {
        return [word.x, word.y]; // Value of the text
      })
      .attr('x', () => 300)
      .attr('y', () => 400)
      .attr('id', 't' + word.x + '-' + word.y);
  }, []);
  const onWordMouseOut =  useCallback((word) => {
    // Select text by id and then remove
    select('#t' + word.x + '-' + word.y).remove(); // Remove text location
  }, []);

  return (
    <WordCloud
      width={1000}
      height={height}
      data={newData}
      font={'Pretendard'}
      fontSizeMapper={fontSizeMapper}
      rotate={rotate}
      padding={2}
      onWordMouseOver={onWordMouseOver}
      onWordMouseOut={onWordMouseOut}
    />
  );
}
