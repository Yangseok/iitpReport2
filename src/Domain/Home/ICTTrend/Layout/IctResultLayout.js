import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'Assets/Css/Ict.css';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import ProjectOutChart from 'Domain/Home/Common/Componet/ChartList/ProjectOut';
import ProjectInChart from 'Domain/Home/Common/Componet/ChartList/ProjectIn';
import PatentChart from 'Domain/Home/Common/Componet/ChartList/Patent';
import PaperChart from 'Domain/Home/Common/Componet/ChartList/Paper';
import IctChart from 'Domain/Home/Common/Componet/ChartList/Ict';
import PolicyChart from 'Domain/Home/Common/Componet/ChartList/Policy';
import NewsChart from 'Domain/Home/Common/Componet/ChartList/News';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import { getCategory, getEndYear, getKeywordTrend, getStartYear, setCategory, setKeywordTrend } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import * as ictTrendAPI from 'Domain/Home/ICTTrend/API/Call';
import common from 'Utill';

export default function IctResultLayout({children, filterKey}) {
  const dispatch = useDispatch();
  const locations = useLocation();
  const pathName = locations.pathname;

  const category = useSelector(getCategory);
  const keywordTrend = useSelector(getKeywordTrend);
  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [page, setPage] = useState('');

  const [wordCloudData, setWordCloudData] = useState([]);

  const se = common.getSegment();
  const paramSe2 = se[2] ?? '';
  const paramSe4 = se[4] ?? '';

  const getKeywordCloud = useCallback(async (category, keyword, startYear, endYear) => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await ictTrendAPI.ictSearchWordCloud(category, 'wordCloud', keyword, 100, startYear, endYear);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    // console.log('getKeywordCloud', category, startYear, endYear, data?.data?.result);
    setWordCloudData(data?.data?.result ?? []);
  }, []);
  
  const handleWordClick = useCallback((_, d) => {
    dispatch(setKeywordTrend(d.text));
  }, [keywordTrend]);

  useEffect(() => {
    let tab1 = [], tab2 = [];
    let ictCategory = paramSe4;
    
    if(paramSe4 === 'projectout') {
      ictCategory = 'rnd_project';
    } else if (paramSe4 === 'projectin') {
      ictCategory = 'iitp_project';
    } else if (paramSe4 === 'ict') {
      ictCategory = 'ict_report';
    }

    if(paramSe2 !== 'technology') {
      tab1 = [
        { id: 1, name: '과제', to: `/icttrend/${paramSe2}/result/projectout` },
        { id: 2, name: '특허', to: `/icttrend/${paramSe2}/result/patent` },
        { id: 3, name: '논문', to: `/icttrend/${paramSe2}/result/paper` },
        { id: 4, name: 'ICT 자료', to: `/icttrend/${paramSe2}/result/ict` },
        { id: 5, name: '정부정책', to: `/icttrend/${paramSe2}/result/policy` },
        { id: 6, name: '뉴스', to: `/icttrend/${paramSe2}/result/news` },
      ];
    } else {
      tab1 = [
        { id: 1, name: '과제', to: `/icttrend/${paramSe2}/result/projectout` },
        { id: 2, name: '특허', to: `/icttrend/${paramSe2}/result/patent` },
        { id: 3, name: '논문', to: `/icttrend/${paramSe2}/result/paper` },
        { id: 5, name: '정부정책', to: `/icttrend/${paramSe2}/result/policy` },
      ];
    }

    tab2 = [
      { id: 0, name: '국가 R&D 과제', to: `/icttrend/${paramSe2}/result/projectout` },
      { id: 1, name: 'IITP 내부 과제', to: `/icttrend/${paramSe2}/result/projectin` },
    ];

    dispatch(setCategory(ictCategory));
    setPage(paramSe2);
    setTabButtons1(tab1);
    setTabButtons2(tab2);
  }, [locations]);

  useEffect(() => {
    tabButtons1?.forEach((e) => {
      if(e.to === pathName) {
        setTabActive1(e.id);
      }
    });
    tabButtons2?.forEach((e) => {
      if(e.to === pathName) {
        setTabActive1(1);
        setTabActive2(e.id);
      }
    });
  }, [tabButtons1, tabButtons2]);

  // 연관어 클라우드
  useEffect(() => {
    getKeywordCloud(category, keywordTrend, startYear, endYear);
  }, [category, keywordTrend, startYear, endYear]);

  const getChartComponent = (filterKey) => {
    switch (filterKey) {
    case 'search/projectOut':
      return <ProjectOutChart wordCloudData={wordCloudData} onWordClick={handleWordClick} />;
    case 'search/projectIn':
      return <ProjectInChart wordCloudData={wordCloudData} onWordClick={handleWordClick} />;
    case 'search/patent':
      return <PatentChart wordCloudData={wordCloudData} onWordClick={handleWordClick} />;
    case 'search/paper':
      return <PaperChart wordCloudData={wordCloudData} onWordClick={handleWordClick} />;
    case 'search/ict':
      return <IctChart wordCloudData={wordCloudData} onWordClick={handleWordClick} />;
    case 'search/policy':
      return <PolicyChart wordCloudData={wordCloudData} onWordClick={handleWordClick} />;
    case 'search/news':
      return <NewsChart wordCloudData={wordCloudData} onWordClick={handleWordClick} />;
    default:
      return null;
    }
  };

  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-xl font-bold text-color-regular text-center mb-10'>
            “<span className='text-color-main'>{keywordTrend}</span>”에 대한
            {(page !== 'technology')
              ? ' ICT 키워드 트렌드 '
              : ' ICT 기술분류 트렌드 '}
            검색 결과입니다.
          </h2>
          
          <TabButtons style='4-2' tabs={tabButtons1} active={tabActive1} />
          {(tabActive1 === 1) 
            && <div className='mt-4'>
              <TabButtons style='2' tabs={tabButtons2} active={tabActive2} />
            </div>
          }
        </div>
      </section>

      {getChartComponent(filterKey)}
      
      {children}
    </Layout>
  );
}
