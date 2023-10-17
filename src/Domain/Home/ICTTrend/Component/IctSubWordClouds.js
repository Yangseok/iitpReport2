import React, { useState, useCallback, useEffect, useRef } from 'react';
import Wordcloud from 'wordcloud';

export default function IctSubWordClouds(props) {
  const { data, height, onWordClick, size = 100 } = props;

  const divRef = useRef(null);

  const [newData, setNewData] = useState([]);

  const procWordCloudData = useCallback(() => {
    console.log(data);
    console.log(onWordClick);
    console.log(size);
    setNewData([
      ['told', 64],
      ['mistake', 11],
      ['thought', 16],
      ['bad', 17],
      ['correct', 10],
      ['day', 54],
      ['prescription', 12],
      ['time', 77],
      ['thing', 45],
      ['left', 19],
      ['pay', 13],
      ['people', 32],
      ['month', 22],
      ['again', 35],
      ['review', 24],
      ['call', 38],
      ['doctor', 70],
      ['asked', 26],
      ['finally', 14],
      ['insurance', 29],
      ['week', 41],
      ['called', 49],
      ['problem', 20],
      ['going', 59],
      ['help', 49],
      ['felt', 45],
      ['discomfort', 11],
      ['lower', 22],
      ['severe', 12],
      ['free', 38],
      ['better', 54],
      ['muscle', 14],
      ['neck', 41],
      ['root', 24],
      ['adjustment', 16],
      ['therapy', 29],
      ['injury', 20],
      ['excruciating', 10],
      ['chronic', 13],
      ['chiropractor', 35],
      ['treatment', 59],
      ['tooth', 32],
      ['chiropractic', 17],
      ['dr', 77],
      ['relief', 19],
      ['shoulder', 26],
      ['nurse', 17],
      ['room', 22],
      ['hour', 35],
      ['wait', 38],
      ['hospital', 11],
      ['eye', 13],
      ['test', 10],
      ['appointment', 49],
      ['medical', 19],
      ['question', 20],
      ['office', 64],
      ['care', 54],
      ['minute', 29],
      ['waiting', 16],
      ['patient', 59],
      ['health', 49],
      ['alternative', 24],
      ['holistic', 19],
      ['traditional', 20],
      ['symptom', 29],
      ['internal', 17],
      ['prescribed', 26],
      ['acupuncturist', 16],
      ['pain', 64],
      ['integrative', 10],
      ['herb', 13],
      ['sport', 22],
      ['physician', 41],
      ['herbal', 11],
      ['eastern', 12],
      ['chinese', 32],
      ['acupuncture', 45],
      ['prescribe', 14],
      ['medication', 38],
      ['western', 35],
      ['sure', 38],
      ['work', 64],
      ['smile', 17],
      ['teeth', 26],
      ['pair', 11],
      ['wanted', 20],
      ['frame', 13],
      ['lasik', 10],
      ['amazing', 41],
      ['fit', 14],
      ['happy', 22],
      ['feel', 49],
      ['glasse', 19],
      ['vision', 12],
      ['pressure', 16],
      ['find', 29],
      ['experience', 59],
      ['year', 70],
      ['massage', 35],
      ['best', 54],
      ['mouth', 20],
      ['staff', 64],
      ['gum', 10],
      ['chair', 12],
      ['ray', 22],
      ['dentistry', 11],
      ['canal', 13],
      ['procedure', 32],
      ['filling', 26],
      ['gentle', 19],
      ['cavity', 17],
      ['crown', 14],
      ['cleaning', 38],
      ['hygienist', 24],
      ['dental', 59],
      ['charge', 24],
      ['cost', 29],
      ['charged', 13],
      ['spent', 17],
      ['paying', 14],
      ['pocket', 12],
      ['dollar', 11],
      ['business', 32],
      ['refund', 10]
    ]);
  }, [data]);

  useEffect(() => {
    procWordCloudData();
  }, [data]);

  useEffect(() => {
    Wordcloud(divRef.current, {
      list: newData,
      shape: 'circle',
      minRotation: 0,
      maxRotation: 0,
      shrinkToFit: true,
      minSize: 2
    });
  }, [newData]);

  return (
    <div style={{ width: 570, height: height, margin: 'auto', }}>
      <div style={{ width: 570, height: height }} ref={divRef} />
      {/* <Wordcloud width={400} heigth={300} list={words} shape={"circle"} color={'red'} /> */}
    </div>
  );
}