import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart2 from 'Domain/Home/ICTTrend/Component/IctChart2';
import IctChart3 from 'Domain/Home/ICTTrend/Component/IctChart3';
import { getEndYear, getSingleYear, getStartYear, setEndYear, setSingleYear, setStartYear } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import RcSlider from 'rc-slider';
import moment from 'moment';

export default function Result (props) {
  const { wordCloudData, onWordClick, trendData, yearData, orgnData } = props;

  const tempTreeMapData = [
    {
      'type': 'treemap',
      'labels': ['전체', '물리학', '관리용', '금융용', '전기에 의한 디지털 데이터처리', '생활필수품', '진단', '전기', '처리조작', '운전 제어 시스템', '기계공학', '섬유'],
      'parents': ['', '전체', '물리학', '물리학', '관리용', '전체', '생활필수품', '전체', '전체', '처리조작', '전체', '전체' ]
    }
  ];
  const tempChartData3 = [
    [4, 5, 2, 3, 5, 4, 4, 5, 6, 8],
    [1, 1, 4, 2, 3, 5, 8, 7, 6, 10],
    [5, 4, 6, 9, 8, 6, 10, 13, 17, 15],
    [3, 4, 5, 6, 7, 9, 10, 12, 15, 20],
  ];

  let rangeMarks1 = {}, rangeMarks2 = {};
  const rangeMin = 2014;
  const rangeMax = Number(moment().format('YYYY'));
  for(let i = rangeMin; i <= rangeMax; i++) {
    rangeMarks1[i] = i;
  }
  for(let i = (rangeMin-1); i <= (rangeMax-1); i++) {
    rangeMarks2[i] = i;
  }

  const dispatch = useDispatch();
  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const singleYear = useSelector(getSingleYear);
  const [cloudsRangeValue, setCloudsRangeValue] = useState([Number(moment().subtract(1, 'year').format('YYYY')), rangeMax]);
  const [chartRangeValue, setChartRangeValue] = useState(rangeMax - 1);
  const [newTrendData, setNewTrendData] = useState([]);
  const [trendLabels, setTrendLabels] = useState([]);
  const [newYearData, setNewYearData] = useState([]);
  const [yearLabels, setYearLabels] = useState([]);
  const [orgnLabels1, setOrgnLabels1] = useState([]);
  const [orgnLabels2, setOrgnLabels2] = useState([]);

  // 관련 키워드 추이 데이터 
  const getTrendLabelData = () => {
    let datas = [], labels = [];
    
    if (trendData?.length > 0) {
      for (let i in trendData ?? []) {
        const pushData = {
          x: trendData[i].doc_count ?? 0,
          y: trendData[i].rate ?? 0,
        };
        const pushLabel = trendData[i].key ?? '';
        datas.push(pushData);
        labels.push(pushLabel);
      }
      setNewTrendData(datas);
      setTrendLabels(labels);
    }
  };

  // 연도별 과제 건수 데이터
  const getYearLabelData = () => {
    let datas = [], labels = [];
    
    if (yearData?.length > 0) {
      for (let i in yearData ?? []) {
        const pushData = yearData[i].doc_count ?? 0;
        const labelData = yearData[i].key ?? '';
        datas.push(pushData);
        labels.push(labelData);
      }
      setNewYearData(datas);
      setYearLabels(labels);
    }
  };

  // 과제 수행기관별 데이터
  const getOrgnLabelData = () => {
    let datas = [], labels1 = [], labels2 = [];
    
    if (orgnData?.length > 0) {
      const maxYear = orgnData?.map(o => o.count2?.buckets?.map(o2 => o2.key).reduce((max, curr) => max < curr ? curr : max)).reduce((max, curr) => max < curr ? curr : max);
      const minYear = orgnData?.map(o => o.count2?.buckets?.map(o2 => o2.key).reduce((min, curr) => min > curr ? curr : min)).reduce((min, curr) => min > curr ? curr : min);
      for (let i = Number(minYear); i <= Number(maxYear); i++) {
        labels1.push(i);
      }

      // 데이터 연도 순서가 안맞음
      for (let i in orgnData ?? []) {
        const labelData1 = orgnData[i].key ?? '';
        let tempPushData = [];
        labels2.push(labelData1);

        orgnData[i]?.count2?.buckets?.map((i2) => {
          const labelData3 = i2.doc_count ?? 0;
          tempPushData.push(labelData3);
          // console.log(i2);
        });
        datas.push(tempPushData);
      }
      setOrgnLabels1(labels1);
      setOrgnLabels2(labels2);
      console.log('Data & LABEL', datas, labels1, labels2);
    }
  };

  useEffect(() => {
    dispatch(setStartYear(cloudsRangeValue[0]));
    dispatch(setEndYear(cloudsRangeValue[1]));
  }, [cloudsRangeValue]);

  useEffect(() => {
    dispatch(setSingleYear(chartRangeValue));
  }, [chartRangeValue]);

  useEffect(() => {
    setCloudsRangeValue([startYear, endYear]);
    setChartRangeValue(singleYear);
  }, []);

  useEffect(() => {
    getTrendLabelData();
  }, [trendData]);

  useEffect(() => {
    getYearLabelData();
  }, [yearData]);

  useEffect(() => {
    getOrgnLabelData();
  }, [orgnData]);
  
  return (
    <>
      <section className='mt-10 mb-10'>
        <div className='container'>
          <div className='list_wrap_style02 grid02'>
            <div>
              <h3 className='text-base font-bold text-color-dark'>연관어 클라우드</h3>
              <div className='wordcloud_cursor_wrap mt-4'>
                <IctWordClouds data={wordCloudData} onWordClick={onWordClick} height={660} />
              </div>
              <div className='rc_custom max-w-lg mt-4 mx-auto'>
                <RcSlider
                  range
                  min={rangeMin}
                  max={rangeMax}
                  marks={rangeMarks1}
                  value={cloudsRangeValue}
                  onChange={(e) => setCloudsRangeValue(e)}
                />
              </div>
            </div>
            <div>
              <h3 className='text-base font-bold text-color-dark'>관련 키워드 추이</h3>
              <div className='mt-4'>
                <IctChart1 labels={trendLabels} datas={newTrendData} height={660} />
              </div>
              <div className='rc_custom type02 max-w-lg mt-4 mx-auto'>
                <RcSlider
                  included={false}
                  min={rangeMin - 1}
                  max={rangeMax - 1}
                  marks={rangeMarks2}
                  value={chartRangeValue}
                  onChange={(e) => setChartRangeValue(e)}
                />
              </div>
            </div>
            <div>
              <h3 className='text-base font-bold text-color-dark'>연도별 과제 건수</h3>
              <div className='chart_wrap mt-10'>
                <IctChart2 labels={yearLabels} datas={newYearData} />
              </div>
            </div>
            <div>
              <h3 className='text-base font-bold text-color-dark'>과제 수행기관별 비교</h3>
              <div className='chart_wrap mt-10'>
                <IctChart3 xLabels={orgnLabels1} dataLabels={orgnLabels2} datas={tempChartData3} />
              </div>
            </div>
          </div>
          <div className='mt-14'>
            <h3 className='text-base font-bold text-color-dark'>국제과학기술표준분류</h3>
            <div className='mt-5'>
              <IctTreeMap data={tempTreeMapData} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}