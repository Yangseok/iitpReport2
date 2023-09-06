import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'Assets/Css/Discovery.css';
import icGuide from 'Assets/Images/ic_guide.png';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import common from 'Utill';

export default function DiscoveryLayout({children}) {
  const pathName = useLocation().pathname;
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);

  const tabButtons1 = [
    { id: 0, name: '디스커버리 검색', to:'/discovery/keyword'},
    { id: 1, name: '통합 검색', to:'/search'},
  ];
  const tabButtons2 = [
    { id: 0, name: '키워드 분석', to:'/discovery/keyword'},
    { id: 1, name: '파일 분석', to:'/discovery/file'},
    { id: 2, name: '과제 정보 분석', to:'/discovery/project'},
  ];

  const se = common.getSegment();
  const paramSe1 = se[1] ?? '';
  const paramSe2 = se[2] ?? '';

  useEffect(() => {
    let url = '';

    if(paramSe1 === 'discovery') {
      url = `/${paramSe1}/${paramSe2}`;
    } else if(paramSe1 === 'search') {
      url = `/${paramSe1}`;
    }

    tabButtons1?.forEach((e) => {
      if(e.to === pathName || e.to === url) {
        setTabActive1(e.id);
      }
    });
    tabButtons2?.forEach((e) => {
      if(e.to === pathName || e.to === url) {
        setTabActive1(0);
        setTabActive2(e.id);
      }
    });
  }, [se]);

  return (
    <Layout>
      <section>
        <div className='container'>
          <div className='flex items-center justify-between mb-10'>
            <div className='flex items-center gap-20'>
              <TabButtons style='1' tabs={tabButtons1} active={tabActive1} />
              {(tabActive1 === 0) 
                ? <TabButtons style='3' tabs={tabButtons2} active={tabActive2} /> 
                : ''
              }
            </div>
            <button type='button' className='gap-1'>
              <img src={icGuide} alt='검색 가이드' className='w-6' />
              검색 가이드
            </button>
          </div>
        </div>
      </section>
      {children}
    </Layout>
  );
}
