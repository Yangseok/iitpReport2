import React, { useState } from 'react';
import IctResultLayout from 'Domain/Home/ICTTrend/Layout/IctResultLayout';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import IctChart4 from 'Domain/Home/ICTTrend/Component/IctChart4';
import NewsWordClouds from 'Domain/Home/ICTTrend/Component/NewsWordClouds';
import ToggleListItem from 'Domain/Home/Common/Componet/ToggleListItem';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import RcSlider from 'rc-slider';

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
  // 데이터는 10개씩 뿌려줌
  const tempData = [
    {
      id: 0,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
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

  const labels1 = ['플랫폼','learning','빅데이터','딥러닝','모니터링','네트워크','솔루션','고도','모델링','소프트웨어'];
  const labels2 = ['기타','기술개발진행중','기술개발완료','특허만신청(등록)','시제품단계','아이디어창안','실용화단계','시장개척단계'];
  const labels3 = ['기타','기술개발진행중','기술개발완료','특허만신청(등록)','시제품단계','아이디어창안','실용화단계','시장개척단계'];

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
      <section className='mt-14'>
        <div className='container'>
          <h3 className='text-base font-bold text-color-dark'>뉴스 <span className='text-color-main'>50,150건</span></h3>
          <div className='list_style03 mt-5'>
            <ul>
              {(tempData?.length > 0)
                ? tempData?.map((e) => {
                  return (
                    <ToggleListItem 
                      key={e.id}
                      id={e.id}
                      title={<>
                        <p className='flex-1 text-base font-bold text-color-dark'>{e.title}</p>
                        <div className='text_style01'>
                          <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                          <p className='text-sm text-color-regular'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                        </div>
                      </>}
                      btn={(e.link) ? <>
                        <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                      </> : null}
                      contents={<>
                        <NewsWordClouds data={tempWordCloudData} />
                      </>}
                    />
                  );
                })
                : <li className='nodata'>
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