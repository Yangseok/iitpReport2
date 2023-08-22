import React, { 
  // useMemo, 
  useCallback } from 'react';
import styled from 'styled-components';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import WordCloud from 'react-d3-cloud';
// import { scaleOrdinal } from 'd3-scale';
// import { schemeCategory10 } from 'd3-scale-chromatic';

import data from '../Data/WordCloud.json';

const WordcloudWrap = styled.div`
  width: 70vw;
  height: 70vh;
  margin: 0 auto;
`;

export default function WordCloud1() {

  // const data = useMemo(() => {
  //   return [
  //     { text: 'Hey', value: 1000 },
  //     { text: 'lol', value: 200 },
  //     { text: 'first impression', value: 800 },
  //     { text: 'very cool', value: 1000000 },
  //     { text: 'duck', value: 10 },
  //   ];
  // }, []);

  // const fontSize = useCallback((word) => Math.log2(word.value) * 5, []);
  // const rotate = useCallback((word) => word.value % 360, []);
  // const fill = useCallback((d, i) => scaleOrdinal(schemeCategory10)(i), []);
  const onWordClick = useCallback((word) => {
    console.log(`onWordClick: ${word}`);
  }, []);
  const onWordMouseOver = useCallback((word) => {
    console.log(`onWordMouseOver: ${word}`);
  }, []);
  const onWordMouseOut = useCallback((word) => {
    console.log(`onWordMouseOut: ${word}`);
  }, []);

  return (
    <SampleLayout>
      <h2 className="text-center">
        워드클라우드1
      </h2>
      <WordcloudWrap>
        <WordCloud
          data={data}
          // width={1000}
          // height={750}
          // font="Times"
          // fontStyle="italic"
          // fontWeight="bold"
          // fontSize={fontSize}
          // spiral="rectangular"
          // rotate={rotate}
          // padding={5}
          // random={Math.random}
          // fill={fill}
          onWordClick={onWordClick}
          onWordMouseOver={onWordMouseOver}
          onWordMouseOut={onWordMouseOut}
        />
      </WordcloudWrap>
    </SampleLayout>
  );
}
