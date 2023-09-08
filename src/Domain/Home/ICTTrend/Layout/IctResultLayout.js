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

  useEffect(() => {
    let tab1 = [], tab2 = [];
    const se = common.getSegment();
    const paramSe2 = se[2] ?? '';

    tab1 = [
      { id: 1, name: '과제', to: `/icttrend/${paramSe2}/result/projectout` },
      { id: 2, name: '특허', to: `/icttrend/${paramSe2}/result/patent` },
      { id: 3, name: '논문', to: `/icttrend/${paramSe2}/result/paper` },
      { id: 4, name: 'ICT 자료', to: `/icttrend/${paramSe2}/result/ict` },
      { id: 5, name: '정부정책', to: `/icttrend/${paramSe2}/result/policy` },
      { id: 6, name: '뉴스', to: `/icttrend/${paramSe2}/result/news` },
    ];
    tab2 = [
      { id: 0, name: '국가 R&D 과제', to: `/icttrend/${paramSe2}/result/projectout` },
      { id: 1, name: 'IITP 내부 과제', to: `/icttrend/${paramSe2}/result/projectin` },
    ];

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
