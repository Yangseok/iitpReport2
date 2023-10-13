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
import { getCategory, getEndYear, getIctKeyword, getSingleYear, getStartYear, setCategory, setIctKeyword } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import { setSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import * as ictTrendAPI from 'Domain/Home/ICTTrend/API/Call';
import common from 'Utill';

export default function IctResultLayout({children, filterKey}) {
  const dispatch = useDispatch();
  const locations = useLocation();
  const pathName = locations.pathname;

  const category = useSelector(getCategory);
  const ictKeyword = useSelector(getIctKeyword);
  const startYear = useSelector(getStartYear);
  const endYear = useSelector(getEndYear);
  const singleYear = useSelector(getSingleYear);
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [page, setPage] = useState('');

  const [wordCloudData, setWordCloudData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [orgnData, setOrgnData] = useState([]);
  const [classData, setClassData] = useState([]);
  const [applData, setApplData] = useState([]);
  const [cateData, setCateData] = useState([]);

  const se = common.getSegment();
  const paramSe2 = se[2] ?? '';
  const paramSe4 = se[4] ?? '';

  const getChartDatas = useCallback(async (label, category, keyword, size, startYear, endYear, year) => {
    if (category === 'all') return ;
    let data = [];

    if (label && category) {
      try {
        dispatch(setLoading(true));
        data = await ictTrendAPI.ictSearchWordCloud(category, label, keyword, size, startYear, endYear, year);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));
      }

      const dataList = data?.data?.result ?? [];
  
      if(label === 'wordCloud') {
        setWordCloudData(dataList);
        // console.log('wordCloud', dataList);
      } else if (label === 'trend') {
        setTrendData(dataList);
        // console.log('trend', dataList);
      } else if (label === 'year') {
        setYearData(dataList);
        // console.log('year', dataList);
      } else if (label === 'orgn') {
        setOrgnData(dataList);
        // console.log('orgn', dataList);
      } else if (label === 'class') {
        setClassData(dataList);
        // console.log('class', dataList);
      } else if (label === 'appl') {
        setApplData(dataList);
        // console.log('appl', dataList);
      } else if (label === 'category') {
        setCateData(dataList);
        // console.log('category', dataList);
      }
    }
  }, []);
  
  // 워드 클라우드 클릭시
  const handleWordClick = useCallback((e, d) => {
    document.querySelectorAll('.wordcloud_cursor_wrap svg text').forEach(function(_this) {
      _this.blur();
    });
    dispatch(setIctKeyword(d.text));
  }, [ictKeyword]);

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

  useEffect(() => {
    getChartDatas('wordCloud', category, ictKeyword, 100, startYear, endYear);
  }, [category, ictKeyword, startYear, endYear]);

  useEffect(() => {
    getChartDatas('trend', category, ictKeyword, 16, undefined, undefined, singleYear);
  }, [category, ictKeyword, singleYear]);

  useEffect(() => {
    if (paramSe4 === 'projectout' || paramSe4 === 'projectin' || paramSe4 === 'patent' || paramSe4 === 'paper') {
      getChartDatas('year', category, ictKeyword, 10);
      getChartDatas('class', category, ictKeyword);
    }

    if (paramSe4 === 'projectout' || paramSe4 === 'projectin' || paramSe4 === 'ict' || paramSe4 === 'policy' || paramSe4 === 'news') {
      getChartDatas('orgn', category, ictKeyword, 10);
    }

    if (paramSe4 === 'patent' || paramSe4 === 'paper') {
      getChartDatas('appl', category, ictKeyword, 10);
    }

    if (paramSe4 === 'news') {
      getChartDatas('category', category, ictKeyword, 10);
    }
  }, [category, ictKeyword]);

  useEffect(() => {
    // console.log('리스트 초기화');
    dispatch(setSearchKeyword(ictKeyword));
  }, [ictKeyword]);

  const getChartComponent = (filterKey) => {
    switch (filterKey) {
    case 'search/projectOut':
      return <ProjectOutChart wordCloudData={wordCloudData} onWordClick={handleWordClick} trendData={trendData} yearData={yearData} orgnData={orgnData} classData={classData} applData={applData} cateData={cateData} />;
    case 'search/projectIn':
      return <ProjectInChart wordCloudData={wordCloudData} onWordClick={handleWordClick} trendData={trendData} yearData={yearData} orgnData={orgnData} classData={classData} applData={applData} cateData={cateData} />;
    case 'search/patent':
      return <PatentChart wordCloudData={wordCloudData} onWordClick={handleWordClick} trendData={trendData} yearData={yearData} orgnData={orgnData} classData={classData} applData={applData} cateData={cateData} />;
    case 'search/paper':
      return <PaperChart wordCloudData={wordCloudData} onWordClick={handleWordClick} trendData={trendData} yearData={yearData} orgnData={orgnData} classData={classData} applData={applData} cateData={cateData} />;
    case 'search/ict':
      return <IctChart wordCloudData={wordCloudData} onWordClick={handleWordClick} trendData={trendData} yearData={yearData} orgnData={orgnData} classData={classData} applData={applData} cateData={cateData} />;
    case 'search/policy':
      return <PolicyChart wordCloudData={wordCloudData} onWordClick={handleWordClick} trendData={trendData} yearData={yearData} orgnData={orgnData} classData={classData} applData={applData} cateData={cateData} />;
    case 'search/news':
      return <NewsChart wordCloudData={wordCloudData} onWordClick={handleWordClick} trendData={trendData} yearData={yearData} orgnData={orgnData} classData={classData} applData={applData} cateData={cateData} />;
    default:
      return null;
    }
  };

  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-xl font-bold text-color-regular text-center mb-10'>
            “<span className='text-color-main'>{ictKeyword}</span>”에 대한
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
