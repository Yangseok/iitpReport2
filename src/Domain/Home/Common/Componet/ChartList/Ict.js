import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart4 from 'Domain/Home/ICTTrend/Component/IctChart4';
import { getEndYear, getStartYear, setEndYear, setStartYear } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import RcSlider from 'rc-slider';
import moment from 'moment';

export default function Result (props) {
  const { wordCloudData, onWordClick } = props;
  
  const tempChartData1 = [
    { x: 48, y: -90 },
    { x: 40, y: 510 },
    { x: 65, y: 490 },
    { x: 2, y: 210 },
    { x: 64, y: 410 },
    { x: 49, y: 390 },
    { x: 4, y: 150 },
    { x: 82, y: 380 },
    { x: 54, y: 50 },
    { x: 51, y: 120 },
  ];
  const tempChartData2 = [185, 83, 42, 30, 16, 6, 4, 2];

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
  const [cloudsRangeValue, setCloudsRangeValue] = useState([Number(moment().subtract(1, 'year').format('YYYY')), rangeMax]);
  const [chartRangeValue, setChartRangeValue] = useState(rangeMax - 1);

  const labels1 = ['플랫폼','learning','빅데이터','딥러닝','모니터링','네트워크','솔루션','고도','모델링','소프트웨어'];
  const labels2 = ['기타','기술개발진행중','기술개발완료','특허만신청(등록)','시제품단계','아이디어창안','실용화단계','시장개척단계'];

  useEffect(() => {
    dispatch(setStartYear(cloudsRangeValue[0]));
    dispatch(setEndYear(cloudsRangeValue[1]));
  }, [cloudsRangeValue]);

  useEffect(() => {
    setCloudsRangeValue([startYear, endYear]);
  }, []);

  return (
    <>
      <section className='mt-10 mb-10'>
        <div className='container'>
          <div className='list_wrap_style02 grid02'>
            <div>
              <h3 className='text-base font-bold text-color-dark'>연관어 클라우드</h3>
              <div className='mt-4'>
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
                <IctChart1 labels={labels1} datas={tempChartData1} height={660} />
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
          </div>
          <div className='list_wrap_style02 mt-14'>
            <div>
              <h3 className='text-base font-bold text-color-dark'>발행기관별 건수</h3>
              <div className='mt-4'>
                <IctChart4 labels={labels2} datas={tempChartData2} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}