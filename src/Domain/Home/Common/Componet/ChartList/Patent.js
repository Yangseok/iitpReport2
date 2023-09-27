import React, { useState } from 'react';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart2 from 'Domain/Home/ICTTrend/Component/IctChart2';
import ListPopup from 'Domain/Home/ICTTrend/Component/Popup/ListPopup';
import RcSlider from 'rc-slider';
import moment from 'moment';

export default function Result () {
  const tempWordCloudData = [
    {
      'key': '제스처',
      'doc_count': 500
    },
    {
      'key': '의료',
      'doc_count': 600
    },
    {
      'key': '제공방법',
      'doc_count': 500
    },
    {
      'key': '발음',
      'doc_count': 300
    },
    {
      'key': '뉴럴',
      'doc_count': 300
    },
    {
      'key': '습득',
      'doc_count': 300
    },
    {
      'key': '자율주행',
      'doc_count': 500
    },
    {
      'key': '로봇',
      'doc_count': 600
    },
    {
      'key': '음성인식',
      'doc_count': 500
    },
    {
      'key': '데스크탑',
      'doc_count': 300
    },
    {
      'key': '가상현실',
      'doc_count': 300
    },
    {
      'key': '통계',
      'doc_count': 600
    },
    {
      'key': 'DNN',
      'doc_count': 700
    },
    {
      'key': '어휘',
      'doc_count': 300
    },
    {
      'key': '소유',
      'doc_count': 300
    },
    {
      'key': '습관',
      'doc_count': 300
    },
    {
      'key': 'learning',
      'doc_count': 800
    },
    {
      'key': '온라인',
      'doc_count': 700
    },
    {
      'key': '엔터테인먼트',
      'doc_count': 300
    },
    {
      'key': 'GUI',
      'doc_count': 500
    },
    {
      'key': '사물',
      'doc_count': 600
    },
    {
      'key': '애플리케이션',
      'doc_count': 2000
    },
    {
      'key': '그래픽',
      'doc_count': 800
    },
    {
      'key': '어노테이션',
      'doc_count': 300
    },
    {
      'key': '인물',
      'doc_count': 300
    },
    {
      'key': '검색어',
      'doc_count': 300
    },
    {
      'key': '체험',
      'doc_count': 300
    },
    {
      'key': '감정',
      'doc_count': 600
    },
    {
      'key': '발음',
      'doc_count': 300
    },
    {
      'key': '뉴럴',
      'doc_count': 300
    },
    {
      'key': 'DNN',
      'doc_count': 700
    },
    {
      'key': '신경망',
      'doc_count': 800
    },
    {
      'key': '클라우드',
      'doc_count': 900
    },
    {
      'key': '학습자',
      'doc_count': 300
    },
    {
      'key': '소셜',
      'doc_count': 300
    },
    {
      'key': '참여자',
      'doc_count': 300
    },
    {
      'key': '표정',
      'doc_count': 300
    },
    {
      'key': '상담',
      'doc_count': 300
    },
    {
      'key': '성향',
      'doc_count': 300
    },
    {
      'key': 'UI 앱',
      'doc_count': 700
    },
    {
      'key': '증강현실',
      'doc_count': 300
    },
    {
      'key': '키워드',
      'doc_count': 600
    },
    {
      'key': '검색어',
      'doc_count': 300
    },
    {
      'key': '체험',
      'doc_count': 300
    },
    {
      'key': '발음',
      'doc_count': 600
    },
    {
      'key': '뉴럴',
      'doc_count': 300
    },
    {
      'key': '하드웨어',
      'doc_count': 3000
    },
    {
      'key': '소프트웨어',
      'doc_count': 1700
    },
    {
      'key': '소프트웨어',
      'doc_count': 1700
    },
    {
      'key': '애플리케이션',
      'doc_count': 2500
    },
    {
      'key': '소프트웨어',
      'doc_count': 1700
    },
    {
      'key': '소프트웨어',
      'doc_count': 1700
    },
    {
      'key': '컴퓨팅',
      'doc_count': 1600
    },
    {
      'key': '빅데이터',
      'doc_count': 1000
    },
  ];
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

  const [popup, setPopup] = useState(false);
  const [cloudsRangeValue, setCloudsRangeValue] = useState([2022, 2023]);
  const [chartRangeValue, setChartRangeValue] = useState(2022);

  // rc-slider 범위 지정
  const getRanges = (min, max) => {
    let marks = {};    
    for(let i = min; i <= max; i++) {
      marks[i] = i;
    }

    return { min, max, marks };
  };

  const ranges1 = getRanges(2014, 2023);
  const ranges2 = getRanges(2013, 2022);

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

  return (
    <>
      <section className='mt-10 mb-10'>
        <div className='container'>
          <div className='list_wrap_style02 grid02'>
            <div>
              <h3 className='text-base font-bold text-color-dark'>연관어 클라우드</h3>
              <div className='mt-4'>
                <IctWordClouds data={tempWordCloudData} height={660} />
              </div>
              <div className='rc_custom max-w-lg mt-4 mx-auto'>
                <RcSlider
                  range
                  min={ranges1.min}
                  max={ranges1.max}
                  marks={ranges1.marks}
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
                  min={ranges2.min}
                  max={ranges2.max}
                  marks={ranges2.marks}
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
        ? <ListPopup popup={popup} setPopup={setPopup} category={'patent'} /> 
        : null}
    </>
  );
}