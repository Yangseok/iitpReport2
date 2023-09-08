import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import arrRight from 'Assets/Images/arr_right.png';
import icSearch from 'Assets/Images/ic_search.png';
import icArrow from 'Assets/Images/ic_arrow02.png';
import IctLayout from 'Domain/Home/ICTTrend/Layout/IctLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import KeywordWordClouds from 'Domain/Home/ICTTrend/Component/KeywordWordClouds';
import TechnologyTreeMap from 'Domain/Home/ICTTrend/Component/TechnologyTreemap';
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

  let keywordRangeMarks = {}, issueRangeMarks = {};
  const keywordRangeMin = 2012;
  const keywordRangeMax = 2023;
  const issueRangeMin = 2011;
  const issueRangeMax = 2023;
  for(let i = keywordRangeMin; i <= keywordRangeMax; i++) {
    keywordRangeMarks[i] = i;
  }
  for(let i = issueRangeMin; i <= issueRangeMax; i++) {
    issueRangeMarks[i] = i;
  }

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
        ? <section>
          <div className='container'>
            <TabButtons style='4-2' tabs={tabButtons1} active={tabActive1} />
            {(tabActive1 === 1) 
          && <div className='mt-4'>
            <TabButtons style='2' tabs={tabButtons2} active={tabActive2} />
          </div>
            }
          </div>
        </section>
        : ''
      }
      {(page === 'keyword')
        ? // ICT 키워드 트렌드
        <section className='mt-4'>
          <div className='container'>
            <KeywordWordClouds data={tempWordCloudData} height={600} />
            <div className='rc_custom max-w-4.5xl mt-4 mx-auto'>
              <RcSlider
                range
                min={keywordRangeMin}
                max={keywordRangeMax}
                marks={keywordRangeMarks}
                value={keywordRangeValue}
                onChange={(e) => setKeywordRangeValue(e)}
              />
            </div>
          </div>
        </section>
        : (page === 'technology')
          ? // ICT 기술분류 트렌드
          <section className='mt-10'>
            <div className='container'>
              <TechnologyTreeMap data={tempTreeMapData} />

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
          </section>
          : // ICT 10대 이슈
          <section className='mt-6'>
            <div className='container'>
              <div className='flex'>
                <div className='flex-1 px-11'>
                  <div className='rc_custom type02'>
                    <RcSlider
                      included={false}
                      min={issueRangeMin}
                      max={issueRangeMax}
                      marks={issueRangeMarks}
                      value={issueRangeValue}
                      onChange={(e) => setIssueRangeValue(e)}
                    />
                  </div>
                </div>
                <Button name='보고서 다운로드' icon={icArrow} className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04' />
              </div>
            </div>
          </section>
      }
    </IctLayout>
  );
}
