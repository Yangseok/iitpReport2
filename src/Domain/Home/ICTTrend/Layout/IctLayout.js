import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'Assets/Css/Ict.css';
import icGuide from 'Assets/Images/ic_guide.png';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import common from 'Utill';
import GuidePopup from 'Domain/Home/Common/Componet/GuidePopup';

export default function IctLayout({children}) {
  const pathName = useLocation().pathname;
  const [tabActive, setTabActive] = useState(0);
  const [popup, setPopup] = useState(false);


  const tabButtons = [
    { id: 0, name: 'ICT 키워드 트렌드', to: '/icttrend/keyword' },
    { id: 1, name: 'ICT 기술분류 트렌드', to: '/icttrend/technology' },
    { id: 2, name: 'ICT 10대 이슈', to: '/icttrend/issue' },
  ];

  const se = common.getSegment();
  const paramSe1 = se[1] ?? '';
  const paramSe2 = se[2] ?? '';

  useEffect(() => {
    let url = `/${paramSe1}/${paramSe2}`;

    tabButtons?.forEach((e) => {
      if(e.to === pathName || e.to === url) {
        setTabActive(e.id);
      }
    });
  }, [se]);
  
  return (
    <Layout>
      <div className='section mb-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <TabButtons style='1' tabs={tabButtons} active={tabActive} />
            <button type='button' className='guide_btn gap-1' onClick={() => setPopup(true)}>
              <img src={icGuide} alt='검색 가이드' className='w-6' /> 서비스 가이드
            </button>
          </div>
        </div>
      </div>
      {children}
      {(popup) 
        ? <GuidePopup 
          popup={popup} 
          setPopup={setPopup} 
          title={'서비스 가이드'} 
          contents={<p>서비스 가이드 내용</p>} 
          focusClass={'guide_btn'}
        /> 
        : null}
    </Layout>
  );
}
