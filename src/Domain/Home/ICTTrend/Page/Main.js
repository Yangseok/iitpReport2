import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import arrRight from 'Assets/Images/arr_right.png';
import icSearch from 'Assets/Images/ic_search.png';
import icArrow from 'Assets/Images/ic_arrow02.png';
import IctLayout from 'Domain/Home/ICTTrend/Layout/IctLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import RcSlider from 'rc-slider';
import common from 'Utill';

export default function Main() {
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
  const tempIssueKeyword = [
    {id: 0, text: '인공지능'},
    {id: 1, text: '디지털안전'},
    {id: 2, text: '네트워크'},
    {id: 3, text: '메타버스'},
    {id: 4, text: '반도체'},
    {id: 5, text: '우주'},
    {id: 6, text: '패권경쟁'},
    {id: 7, text: '디지털안보'},
    {id: 8, text: '모빌리티'},
    {id: 9, text: '로봇'},
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
  const labels1 = ['플랫폼','learning','빅데이터','딥러닝','모니터링','네트워크','솔루션','고도','모델링','소프트웨어'];
  
  const navigate = useNavigate();
  const locations = useLocation();
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [page, setPage] = useState('');
  const [keywordRangeValue, setKeywordRangeValue] = useState([2022, 2023]);
  const [issueRangeValue, setIssueRangeValue] = useState(2023);

  const se = common.getSegment();
  const paramSe2 = se[2] ?? '';

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

  useEffect(() => {
    let tab1 = [], tab2 = [];

    if(paramSe2 === 'keyword') {
      tab1 = [
        { id: 0, name: '전체', onClick: () => setTabActive1(0) },
        { id: 1, name: '과제', onClick: () => setTabActive1(1) },
        { id: 2, name: '특허', onClick: () => setTabActive1(2) },
        { id: 3, name: '논문', onClick: () => setTabActive1(3) },
        { id: 4, name: 'ICT 자료', onClick: () => setTabActive1(4) },
        { id: 5, name: '정부정책', onClick: () => setTabActive1(5) },
        { id: 6, name: '뉴스', onClick: () => setTabActive1(6) },
      ];
      tab2 = [
        { id: 0, name: '국가 R&D 과제', onClick: () => setTabActive2(0) },
        { id: 1, name: 'IITP 내부 과제', onClick: () => setTabActive2(1) },
      ];
      setTabActive1(0);
    } else if(paramSe2 === 'technology') {
      tab1 = [
        { id: 1, name: '과제', onClick: () => setTabActive1(1) },
        { id: 2, name: '특허', onClick: () => setTabActive1(2) },
        { id: 3, name: '논문', onClick: () => setTabActive1(3) },
        { id: 5, name: '정부정책', onClick: () => setTabActive1(5) },
      ];
      tab2 = [
        { id: 0, name: '국가 R&D 과제', onClick: () => setTabActive2(0) },
        { id: 1, name: 'IITP 내부 과제', onClick: () => setTabActive2(1) },
      ];
      setTabActive1(1);
    }

    setPage(paramSe2);
    setTabButtons1(tab1);
    setTabButtons2(tab2);
  }, [locations]);

  useEffect(() => {
    tabButtons1?.forEach((e) => {
      if(e.id === tabActive1) {
        setTabActive1(e.id);
      }
    });
    tabButtons2?.forEach((e) => {
      if(tabActive1 === 1 && e.id === tabActive2) {
        setTabActive2(e.id);
      }
    });
  }, [tabButtons1, tabButtons2]);

  useEffect(() => {
    if(paramSe2 === 'issue') {
      const marks = document.querySelectorAll('.rc_custom.type02 .rc-slider-mark-text');
  
      marks.forEach((item) => {
        item.classList.remove('rc-slider-mark-text-active');
        if(+item.textContent === issueRangeValue) {
          item.classList.add('rc-slider-mark-text-active');
        }
      });
    }
  }, [issueRangeValue, se]);

  return (
    <IctLayout>
      {(page === 'keyword' || page === 'technology')
        ? <div className='section'>
          <div className='container'>
            <TabButtons style='4-2' tabs={tabButtons1} active={tabActive1} />
            {(tabActive1 === 1) 
          && <div className='mt-4'>
            <TabButtons style='2' tabs={tabButtons2} active={tabActive2} />
          </div>
            }
          </div>
        </div>
        : ''
      }
      {(page === 'keyword')
        ? // ICT 키워드 트렌드
        <div className='section mt-4'>
          <div className='container'>
            <IctWordClouds data={tempWordCloudData} height={600} />
            <div className='rc_custom max-w-4.5xl mt-4 mx-auto'>
              <RcSlider
                range
                min={ranges1.min}
                max={ranges1.max}
                marks={ranges1.marks}
                value={keywordRangeValue}
                onChange={(e) => setKeywordRangeValue(e)}
              />
            </div>
          </div>
        </div>
        : (page === 'technology')
          ? // ICT 기술분류 트렌드
          <div className='section mt-10'>
            <div className='container'>
              <IctTreeMap data={tempTreeMapData} />

              <div className='flex items-center justify-between'>
                {/* 
                  TreeMap 에서 텍스트 선택하면 아래의 분류명에 하나씩 입력되며, 
                  이를 토대로 결과 보기
                */}
                <div className='flex items-center gap-2'>
                  <p className='text-xl font-bold text-color-regular'>대분류명</p>
                  <img src={arrRight} alt='분류 화살표' className='w-6' />
                  <p className='text-xl font-bold text-color-regular'>중분류명</p>
                  <img src={arrRight} alt='분류 화살표' className='w-6' />
                  <p className='text-xl font-bold text-color-regular'>소분류명</p>
                </div>
                <Button name="결과 보기" icon={icSearch} className="gap-2 py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
              </div>
            </div>
          </div>
          : // ICT 10대 이슈
          <>
            <div className='section mt-6'>
              <div className='container'>
                <div className='flex items-center'>
                  <div className='flex-1 px-11'>
                    <div className='rc_custom type02'>
                      <RcSlider
                        included={false}
                        min={ranges2.min}
                        max={ranges2.max}
                        marks={ranges2.marks}
                        value={issueRangeValue}
                        onChange={(e) => setIssueRangeValue(e)}
                      />
                    </div>
                  </div>
                  <Button name='보고서 다운로드' icon={icArrow} className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04' />
                </div>
              </div>
            </div>
            <section className='mt-10'>
              <div className='container'>
                <h2 className='text-base font-bold text-color-dark text-center'>
                  <span className='text-color-main'>2023년</span> ICT 10대 이슈 키워드
                </h2>
                <div className='flex items-center justify-center gap-6 mt-6'>
                  {tempIssueKeyword?.map((e) => {
                    return <button 
                      key={e.id}
                      onClick={() => navigate('/icttrend/issue/result/projectout')} 
                      className='h-10 px-4 rounded text-base font-bold btn_style08'
                    >
                      {e.text}
                    </button>;
                  })}
                </div>
              </div>
            </section>
            <section className='mt-15'>
              <div className='container'>
                <h2 className='text-base font-bold text-color-dark'>이슈 키워드 추이</h2>
                <div className='mt-4'>
                  <IctChart1 labels={labels1} datas={tempChartData1} height={320} />
                </div>
                <p className='text-sm text-color-regular text-center mt-2'>누적 출현 수(건)</p>
              </div>
            </section>
          </>
      }
    </IctLayout>
  );
}
