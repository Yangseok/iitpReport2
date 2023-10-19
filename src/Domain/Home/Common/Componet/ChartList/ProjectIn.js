import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IctSubWordClouds from 'Domain/Home/ICTTrend/Component/IctSubWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart2 from 'Domain/Home/ICTTrend/Component/IctChart2';
import IctChart3 from 'Domain/Home/ICTTrend/Component/IctChart3';
import { getEndYear, getSingleYear, getStartYear, setEndYear, setSingleYear, setStartYear } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import RcSlider from 'rc-slider';
import moment from 'moment';
import common from 'Utill';

export default function Result (props) {
  const { wordCloudData, onWordClick, trendData, yearData, orgnData, classData } = props;

  let rangeMarks = {};
  const rangeMin = 2014;
  const rangeMax = Number(moment().format('YYYY'));
  for(let i = rangeMin; i <= rangeMax; i++) {
    rangeMarks[i] = i;
  }
  
  const dispatch = useDispatch();
  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const singleYear = useSelector(getSingleYear);
  const [cloudsRangeValue, setCloudsRangeValue] = useState([Number(moment().subtract(1, 'year').format('YYYY')), rangeMax]);
  const [chartRangeValue, setChartRangeValue] = useState(rangeMax);
  const [newTrendData, setNewTrendData] = useState([]);
  const [trendLabels, setTrendLabels] = useState([]);
  const [newYearData, setNewYearData] = useState([]);
  const [yearLabels, setYearLabels] = useState([]);
  const [newOrgnData, setNewOrgnData] = useState([]);
  const [orgnLabels1, setOrgnLabels1] = useState([]);
  const [orgnLabels2, setOrgnLabels2] = useState([]);
  const [newClassData, setNewClassData] = useState([]);

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
      const maxYear = orgnData?.map(o => o.year?.map(o2 => o2.key).reduce((max, curr) => max < curr ? curr : max)).reduce((max, curr) => max < curr ? curr : max);
      const minYear = orgnData?.map(o => o.year?.map(o2 => o2.key).reduce((min, curr) => min > curr ? curr : min)).reduce((min, curr) => min > curr ? curr : min);
      for (let i = Number(minYear); i <= Number(maxYear); i++) {
        labels1.push(i);
      }

      for (let i in orgnData ?? []) {
        const labelData1 = orgnData[i].key ?? '';
        let prevValue = 0;
        labels2.push(labelData1);

        const orgnYearData = orgnData[i]?.year?.sort((a, b) => a.key.localeCompare(b.key));

        const tempPushData = labels1.map((i2) => {
          const yearItem = orgnYearData.find((i3) => i2 === Number(i3.key));
          return yearItem ? (yearItem.doc_count || 0) : undefined;
        });

        const newTempPushData = tempPushData.map((value) => {
          if (typeof value === 'undefined') {
            return prevValue;
          }
          prevValue = value;
          return value;
        });

        datas.push(newTempPushData);
      }

      setNewOrgnData(datas);
      setOrgnLabels1(labels1);
      setOrgnLabels2(labels2);
    }
  };
  
  // 국제과학기술표준분류 데이터
  const getClassLabelData = () => {
    let datas = [], labels = [], parents = [];

    if (classData?.length > 0) {
      labels.push('');
      parents.push('');
      for (let i in classData ?? []) {
        const labelData = classData[i].key ?? '';
        labels.push(labelData);
        parents.push('');

        if (classData[i]?.middle?.length > 0) {
          for (let j in classData[i].middle) {
            const middleData = classData[i].middle[j].key ?? '';
            const middleCnt = common.setPriceInput(classData[i].middle[j].doc_count ?? '');
            const middleRate = classData[i].middle[j].rate ?? '';
            labels.push(`${middleData}<br>${middleCnt}개<br>${middleRate}%`);
            parents.push(labelData);
          }
        }
      }

      datas.push({
        'type': 'treemap',
        'labels': labels,
        'parents': parents,
      });
      setNewClassData(datas);
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

  useEffect(() => {
    getClassLabelData();
  }, [classData]);
  
  return (
    <section className='mt-10 mb-10'>
      <div className='container'>
        <div className='list_wrap_style02 grid02'>
          <div>
            <h3 className='text-base font-bold text-color-dark'>연관어 클라우드</h3>
            {(wordCloudData?.length > 0)
              ? <div className='wordcloud_cursor_wrap mt-4'>
                <IctSubWordClouds data={wordCloudData} onWordClick={onWordClick} height={376} />
              </div>
              : <div className='pt-5 pb-86'>
                <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
              </div>
            }
            <div className='rc_custom max-w-lg mt-4 mx-auto'>
              <RcSlider
                range
                min={rangeMin}
                max={rangeMax}
                marks={rangeMarks}
                value={cloudsRangeValue}
                onChange={(e) => setCloudsRangeValue(e)}
              />
            </div>
          </div>
          <div>
            <h3 className='text-base font-bold text-color-dark'>관련 키워드 추이</h3>
            {(trendData?.length > 0)
              ? <div className='mt-4'>
                <IctChart1 labels={trendLabels} datas={newTrendData} height={660} />
              </div>
              : <div className='pt-5 pb-86'>
                <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
              </div>
            }
            <div className='rc_custom type02 max-w-lg mt-4 mx-auto'>
              <RcSlider
                included={false}
                min={rangeMin}
                max={rangeMax}
                marks={rangeMarks}
                value={chartRangeValue}
                onChange={(e) => setChartRangeValue(e)}
              />
            </div>
          </div>
          <div>
            <h3 className='text-base font-bold text-color-dark'>연도별 과제 건수</h3>
            {(yearData?.length > 0)
              ? <div className='chart_wrap mt-10'>
                <IctChart2 labels={yearLabels} datas={newYearData} />
              </div>
              : <div className='pt-5 pb-86'>
                <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
              </div>
            }
          </div>
          <div>
            <h3 className='text-base font-bold text-color-dark'>과제 수행기관별 비교</h3>
            {(orgnData?.length > 0)
              ? <div className='chart_wrap mt-10'>
                <IctChart3 xLabels={orgnLabels1} dataLabels={orgnLabels2} datas={newOrgnData} />
              </div>
              : <div className='pt-5 pb-86'>
                <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
              </div>
            }
          </div>
        </div>
        <div className='mt-14'>
          <h3 className='text-base font-bold text-color-dark'>국제과학기술표준분류</h3>
          {(classData?.length > 0)
            ? <div className='mt-5'>
              <IctTreeMap data={newClassData} />
            </div>
            : <div className='pt-5 pb-12'>
              <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
            </div>
          }
        </div>
      </div>
    </section>
  );
}