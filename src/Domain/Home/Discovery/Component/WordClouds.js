import React, { useState, useEffect, useCallback } from 'react';
import WordCloud from 'react-d3-cloud';

export default function NewsWordClouds(props) {
  const {wordCloudData} = props;
  const [newData, setNewData] = useState([]);

  useEffect(() => {
    if (wordCloudData !== undefined) {
      setNewData(
        wordCloudData.map((item) => {
          return {
            text: item.keyword,
            value: Number(Math.floor(Math.floor((item.weight) * 10000) / 10))
          };
        })
      );
    }
  }, [wordCloudData]);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);

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
    />
  );
}
