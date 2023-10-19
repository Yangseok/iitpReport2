import React, { useCallback } from 'react';
import WordCloud from 'react-d3-cloud';

export default function WordClouds({wordCloudSurveyFile}) {
  const newData = useCallback(wordCloudSurveyFile?.map(o => { return {'text': o.keyword, 'value': Math.floor(o.weight * 1000)}; }), [wordCloudSurveyFile]);

  const fontSizeMapper = useCallback((word) => word.value / 20, []);
  const rotate =  useCallback(() => 0, []);

  return (
    <WordCloud
      width={1000}
      height={300}
      data={newData}
      font={'Pretendard'}
      fontSizeMapper={fontSizeMapper}
      rotate={rotate}
      padding={2}
    />
  );
}
