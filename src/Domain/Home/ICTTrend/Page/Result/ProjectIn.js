import React, { useState } from 'react';
import IctResultLayout from 'Domain/Home/ICTTrend/Layout/IctResultLayout';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart2 from 'Domain/Home/ICTTrend/Component/IctChart2';
import IctChart3 from 'Domain/Home/ICTTrend/Component/IctChart3';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
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
  const tempChartData3 = [
    [4, 5, 2, 3, 5, 4, 4, 5, 6, 8],
    [1, 1, 4, 2, 3, 5, 8, 7, 6, 10],
    [5, 4, 6, 9, 8, 6, 10, 13, 17, 15],
    [3, 4, 5, 6, 7, 9, 10, 12, 15, 20],
  ];
  // 데이터는 10개씩 뿌려줌
  const tempData = [
    {
      id: 0,
      tag: 1,
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];

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
  const labels3_1 = getLabels(10);
  const labels3_2 = ['서울대', '연세대', '고려대', '전남대'];

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
              <h3 className='text-base font-bold text-color-dark'>과제 수행기관별 비교</h3>
              <div className='chart_wrap mt-10'>
                <IctChart3 xLabels={labels3_1} dataLabels={labels3_2} datas={tempChartData3} />
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
          <h3 className='text-base font-bold text-color-dark'>IITP 내부 과제 <span className='text-color-main'>50,150건</span></h3>
          <div className='list_style01 mt-5'>
            <ul>
              {(tempData?.length > 0)
                ? tempData?.map((e) => {
                  return (
                    <ListItem 
                      key={e.id}
                      tag={e.tag}
                      title={e.title}
                      contents={<>
                        <div>
                          <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                          <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                          <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                          <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                        </div>
                        <div>
                          <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                          <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                          <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                        </div>
                      </>}
                      btns={<>
                        <a href={`/view/projectout/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</a>
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
    </IctResultLayout>
  );
}