import React, { useState } from 'react';
import IctResultLayout from 'Domain/Home/ICTTrend/Layout/IctResultLayout';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart2 from 'Domain/Home/ICTTrend/Component/IctChart2';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListPopup from 'Domain/Home/ICTTrend/Component/Popup/ListPopup';
import RcSlider from 'rc-slider';
import moment from 'moment';

export default function Result() {
  const tempWordCloudData = [
    {
      'text': '제스처',
      'value': 500
    },
    {
      'text': '의료',
      'value': 600
    },
    {
      'text': '제공방법',
      'value': 500
    },
    {
      'text': '발음',
      'value': 300
    },
    {
      'text': '뉴럴',
      'value': 300
    },
    {
      'text': '습득',
      'value': 300
    },
    {
      'text': '자율주행',
      'value': 500
    },
    {
      'text': '로봇',
      'value': 600
    },
    {
      'text': '음성인식',
      'value': 500
    },
    {
      'text': '데스크탑',
      'value': 300
    },
    {
      'text': '가상현실',
      'value': 300
    },
    {
      'text': '통계',
      'value': 600
    },
    {
      'text': 'DNN',
      'value': 700
    },
    {
      'text': '어휘',
      'value': 300
    },
    {
      'text': '소유',
      'value': 300
    },
    {
      'text': '습관',
      'value': 300
    },
    {
      'text': 'learning',
      'value': 800
    },
    {
      'text': '온라인',
      'value': 700
    },
    {
      'text': '엔터테인먼트',
      'value': 300
    },
    {
      'text': 'GUI',
      'value': 500
    },
    {
      'text': '사물',
      'value': 600
    },
    {
      'text': '애플리케이션',
      'value': 2000
    },
    {
      'text': '그래픽',
      'value': 800
    },
    {
      'text': '어노테이션',
      'value': 300
    },
    {
      'text': '인물',
      'value': 300
    },
    {
      'text': '검색어',
      'value': 300
    },
    {
      'text': '체험',
      'value': 300
    },
    {
      'text': '감정',
      'value': 600
    },
    {
      'text': '발음',
      'value': 300
    },
    {
      'text': '뉴럴',
      'value': 300
    },
    {
      'text': 'DNN',
      'value': 700
    },
    {
      'text': '신경망',
      'value': 800
    },
    {
      'text': '클라우드',
      'value': 900
    },
    {
      'text': '학습자',
      'value': 300
    },
    {
      'text': '소셜',
      'value': 300
    },
    {
      'text': '참여자',
      'value': 300
    },
    {
      'text': '표정',
      'value': 300
    },
    {
      'text': '상담',
      'value': 300
    },
    {
      'text': '성향',
      'value': 300
    },
    {
      'text': 'UI 앱',
      'value': 700
    },
    {
      'text': '증강현실',
      'value': 300
    },
    {
      'text': '키워드',
      'value': 600
    },
    {
      'text': '검색어',
      'value': 300
    },
    {
      'text': '체험',
      'value': 300
    },
    {
      'text': '발음',
      'value': 600
    },
    {
      'text': '뉴럴',
      'value': 300
    },
    {
      'text': '하드웨어',
      'value': 3000
    },
    {
      'text': '소프트웨어',
      'value': 1700
    },
    {
      'text': '소프트웨어',
      'value': 1700
    },
    {
      'text': '애플리케이션',
      'value': 2500
    },
    {
      'text': '소프트웨어',
      'value': 1700
    },
    {
      'text': '소프트웨어',
      'value': 1700
    },
    {
      'text': '컴퓨팅',
      'value': 1600
    },
    {
      'text': '빅데이터',
      'value': 1000
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
  const tempData2 = [
    {
      id: 0,
      title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
      project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
      division: '출원',
      num: '1020200077142',
      date: '2021.01.08',
      agency: '행정안전부국립재난안전연구원',
      name: '홍길동',
      link: null,
    },
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
    <IctResultLayout>
      <section className='mt-10'>
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
      <section className='mt-14'>
        <div className='container'>
          <h3 className='text-base font-bold text-color-dark'>출원 특허 <span className='text-color-main'>50,150건</span></h3>
          <div className='list_style01 mt-5'>
            <ul>
              {(tempData2?.length > 0)
                ? tempData2?.map((e) => {
                  return (
                    <ListItem 
                      key={e.id}
                      title={e.title}
                      contents={<>
                        <div>
                          <p className='text-sm text-color-regular'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
                          <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                          <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                        </div>
                        <div>
                          <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                        </div>
                      </>}
                      btns={<>
                        <a href={`/view/patent/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</a>
                        {(e.link && e.link !== '') ? <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a> : null}
                      </>}
                    />
                  );
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
      {(popup) 
        ? <ListPopup popup={popup} setPopup={setPopup} category={'patent'} /> 
        : null}
    </IctResultLayout>
  );
}