import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart2 from 'Domain/Home/ICTTrend/Component/IctChart2';
import ListPopup from 'Domain/Home/ICTTrend/Component/Popup/ListPopup';
import { getEndYear, getStartYear, setEndYear, setStartYear } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import RcSlider from 'rc-slider';
import moment from 'moment';

export default function Result (props) {
  const { wordCloudData, onWordClick } = props;

  const tempTreeMapData = [
    {
      'type': 'treemap',
      'labels': ['전체', '물리학', '관리용', '금융용', '전기에 의한 디지털 데이터처리', '생활필수품', '진단', '전기', '처리조작', '운전 제어 시스템', '기계공학', '섬유'],
      'parents': ['', '전체', '물리학', '물리학', '관리용', '전체', '생활필수품', '전체', '전체', '처리조작', '전체', '전체' ]
    }
  ];
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
  const tempChartData2 = [18108, 26335, 22137, 34727, 35612, 8189, 18242, 15114, 28919, 20010];
  // 데이터는 10개씩 뿌려줌
  const tempData1 = [
    { id: 0, name: '엘지전자', count: 1086 },
    { id: 1, name: '삼성전자', count: 471 },
    { id: 2, name: '한국전자통신연구원', count: 215 },
    { id: 3, name: '한국전자기술연구원', count: 126 },
    { id: 4, name: '한국과학기술원', count: 111 },
    { id: 5, name: '크라우드웍스', count: 86 },
    { id: 6, name: '고려대학교 산학협력단', count: 75 },
    { id: 7, name: '케이티', count: 72 },
    { id: 8, name: '인피닉', count: 70 },
    { id: 9, name: '서울대학교 산학협력단', count: 69 },
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
  const [cloudsRangeValue, setCloudsRangeValue] = useState([Number(moment().subtract(1, 'year').format('YYYY')), rangeMax]);
  const [chartRangeValue, setChartRangeValue] = useState(rangeMax - 1);
  const [popup, setPopup] = useState(false);

  // label 생성
  const getLabels = (length, gap) => {
    let arr = [];
    const date = new Date();
    const year1 = Number(moment(date).format('YYYY'));
    const year2 = Number(moment(date).subtract(length, 'years').format('YYYY'));

    (gap) && arr.push('');
    for (let i=year2; i<year1; i++) {
      arr.push(i);
    }
    (gap) && arr.push('');

    return arr;
  };

  const labels1 = ['플랫폼','learning','빅데이터','딥러닝','모니터링','네트워크','솔루션','고도','모델링','소프트웨어'];
  const labels2 = getLabels(10);

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
            <div>
              <h3 className='text-base font-bold text-color-dark'>연도별 과제 건수</h3>
              <div className='chart_wrap mt-10'>
                <IctChart2 labels={labels2} datas={tempChartData2} />
              </div>
            </div>
            <div>
              <h3 className='text-base font-bold text-color-dark'>출원인 순위</h3>
              <div className='list_style06 mt-2'>
                <ul>
                  {(tempData1?.length > 0)
                    ? tempData1?.map((e, i) => {
                      return  <li key={e.id} className='flex items-center justify-between gap-2'>
                        <div className='flex items-center gap-4'>
                          <span className='flex items-center justify-center w-5 h-5 text-sm font-medium text-color-regular rounded-sm bg-color-line'>{i + 1}</span>
                          <p className='text-sm font-medium text-color-regular'>{e.name}</p>
                        </div>
                        <div className='flex items-center gap-4'>
                          <p className='text-sm font-medium text-color-regular'><b>{e.count}</b>건</p>
                          <button type='button' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' onClick={() => setPopup(true)}>자세히 보기↗</button>
                        </div>
                      </li>;
                    })
                    : <li>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
          <div className='mt-14'>
            <h3 className='text-base font-bold text-color-dark'>ICT 기술분류</h3>
            <div className='mt-5'>
              <IctTreeMap data={tempTreeMapData} />
            </div>
          </div>
        </div>
      </section>
      {(popup) 
        ? <ListPopup popup={popup} setPopup={setPopup} category={'paper'} /> 
        : null}
    </>
  );
}