import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import WordCloud from 'react-d3-cloud';
// import { select } from 'd3-selection';
import { getCategory, setKeywordTrend } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import common from 'Utill';

// import data from 'Domain/Home/Sample/Data/WordCloud.json';

export default function IctWordClouds(props) {
  const { data, height } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const se = common.getSegment();
  const se2 = se[2] ?? '';

  const [newData, setNewData] = useState([]);
  const category = useSelector(getCategory);

  const fontSizeMapper = useCallback((word) => Math.log2(word.value) * 5, []);
  const rotate =  useCallback(() => 0, []);

  const onWordClick = useCallback((_, d) => {
    dispatch(setKeywordTrend(d.text));
    navigate(`/icttrend/${se2}/result/${(category !== '') ? category : 'projectout'}`);
  });

  useEffect(() => {
    console.log('data', data);
    // const minValue = data?.map(o => o.doc_count).reduce((min, curr) => min > curr ? curr : min);
    if(data?.length > 0) {
      const minValue = data.map(o => o.doc_count).reduce((min, curr) => min > curr ? curr : min) - 10;
  
      setNewData(
        data.map((item) => {
          console.log(item.doc_count - minValue);
          return {
            text: item.key,
            value: Number(Math.floor(Math.floor((item.doc_count - minValue) * 12) / 10))
          };
        })
      );
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
