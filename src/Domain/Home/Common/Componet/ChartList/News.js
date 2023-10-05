import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart4 from 'Domain/Home/ICTTrend/Component/IctChart4';
import RcSlider from 'rc-slider';
import moment from 'moment';
import { getEndYear, getSingleYear, getStartYear, setEndYear, setSingleYear, setStartYear } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';

export default function Result (props) {
  const { wordCloudData, onWordClick, trendData, orgnData, cateData } = props;

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
  const [newOrgnData, setNewOrgnData] = useState([]);
  const [orgnLabels, setOrgnLabels] = useState([]);
  const [newCateData, setNewCateData] = useState([]);
  const [cateLabels, setCateLabels] = useState([]);

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

  // 뉴스 언급 기업 건수 데이터
  const getOrgnLabelData = () => {
    let datas = [], labels = [];

    if(orgnData?.length > 0) {
      for (let i in []) {
        const pushData = orgnData[i].doc_count ?? 0;
        const labelData = orgnData[i].key ?? '';
        datas.push(pushData);
        labels.push(labelData);
      }
      setNewOrgnData(datas);
      setOrgnLabels(labels);
    }
  };

  // 뉴스 카테고리별 건수 데이터
  const getCategoryLabelData = () => {
    let datas = [], labels = [];

    if(cateData?.length > 0) {
      for (let i in cateData ?? []) {
        const pushData = cateData[i].doc_count ?? 0;
        const labelData = cateData[i].key ?? '';
        datas.push(pushData);
        labels.push(labelData);
      }
      setNewCateData(datas);
      setCateLabels(labels);
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
    getOrgnLabelData();
  }, [orgnData]);

  useEffect(() => {
    getCategoryLabelData();
  }, [cateData]);

  return (
    <>
      <section className='mt-10 mb-10'>
        <div className='container'>
          <div className='list_wrap_style02 grid02'>
            <div>
              <h3 className='text-base font-bold text-color-dark'>연관어 클라우드</h3>
              {(wordCloudData?.length > 0)
                ? <div className='wordcloud_cursor_wrap mt-4'>
                  <IctWordClouds data={wordCloudData} onWordClick={onWordClick} height={660} />
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
              <h3 className='text-base font-bold text-color-dark'>뉴스 언급 기업 건수</h3>
              {(orgnData?.length > 0)
                ? <div className='mt-4'>
                  <IctChart4 labels={orgnLabels} datas={newOrgnData} />
                </div>
                : <div className='pt-5 pb-64'>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </div>
              }
            </div>
            <div>
              <h3 className='text-base font-bold text-color-dark'>뉴스 카테고리별 건수</h3>
              {(cateData?.length > 0)
                ? <div className='mt-4'>
                  <IctChart4 labels={cateLabels} datas={newCateData} />
                </div>
                : <div className='pt-5 pb-64'>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </div>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
}