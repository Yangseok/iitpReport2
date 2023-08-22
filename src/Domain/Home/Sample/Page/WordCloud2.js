import React, { useState, useCallback } from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import WordCloud from 'react-d3-cloud';
import { select } from 'd3-selection';

import data from '../Data/WordCloud.json';

export default function WordCloud2() {
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

  const fontSizeMapper = useCallback((word) => word.value / 20, []);
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
    <SampleLayout>
      <h2 className="text-center">
        워드클라우드2
      </h2>
      <WordCloud
        width={1000}
        height={750}
        data={newData}
        fontSizeMapper={fontSizeMapper}
        rotate={rotate}
        padding={2}
        onWordMouseOver={onWordMouseOver}
        onWordMouseOut={onWordMouseOut}
      />
    </SampleLayout>
  );
}
