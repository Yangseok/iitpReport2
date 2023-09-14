import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'Assets/Css/Ict.css';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import common from 'Utill';

export default function IctResultLayout({children}) {
  const locations = useLocation();
  const pathName = locations.pathname;
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [page, setPage] = useState('');

  useEffect(() => {
    let tab1 = [], tab2 = [];
    const se = common.getSegment();
    const paramSe2 = se[2] ?? '';

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

  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-xl font-bold text-color-regular text-center mb-10'>
            “<span className='text-color-main'>인공지능</span>”에 대한
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
      {children}
    </Layout>
  );
}
