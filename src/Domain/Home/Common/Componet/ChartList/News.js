import React, { useState } from 'react';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart4 from 'Domain/Home/ICTTrend/Component/IctChart4';
import RcSlider from 'rc-slider';

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
  const tempChartData3 = [185, 83, 42, 30, 16, 6, 4, 2];

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

  const labels1 = ['플랫폼','learning','빅데이터','딥러닝','모니터링','네트워크','솔루션','고도','모델링','소프트웨어'];
  const labels2 = ['기타','기술개발진행중','기술개발완료','특허만신청(등록)','시제품단계','아이디어창안','실용화단계','시장개척단계'];
  const labels3 = ['기타','기술개발진행중','기술개발완료','특허만신청(등록)','시제품단계','아이디어창안','실용화단계','시장개척단계'];

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
              <h3 className='text-base font-bold text-color-dark'>뉴스 언급 기업 건수</h3>
              <div className='mt-4'>
                <IctChart4 labels={labels2} datas={tempChartData2} />
              </div>
            </div>
            <div>
              <h3 className='text-base font-bold text-color-dark'>뉴스 카테고리별 건수</h3>
              <div className='mt-4'>
                <IctChart4 labels={labels3} datas={tempChartData3} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}