import React, { useCallback } from 'react';
import WordCloud from 'react-d3-cloud';
import { select } from 'd3-selection';

// import data from 'Domain/Home/Sample/Data/WordCloud.json';

export default function WordClouds({wordCloudSurveyFile}) {
  // const tempData = [
  //   {
  //     'text': '제스처',
  //     'value': 500
  //   },]

  const newData = useCallback(wordCloudSurveyFile?.map(o => { return {'text': o.keyword, 'value': Math.floor(o.weight * 1000)}; }), [wordCloudSurveyFile]);

  // console.log('wordCloudSurveyFile:', wordCloudSurveyFile);
  // console.log('newData:', newData);

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
    <WordCloud
      width={1000}
      height={300}
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
