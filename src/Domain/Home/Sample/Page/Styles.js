import React, { useState } from 'react';
import 'Assets/Css/Discovery.css';
import ic_analysis from 'Assets/Images/ic_analysis.png';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import CategoryWrap from 'Domain/Home/Discovery/Component/CategoryWrap';

export default function Styles() {
  const tabButtons1 = [
    { id: 0, name: '디스커버리 검색', onClick: () => setTabActive1(0) },
    { id: 1, name: '통합 검색', onClick: () => setTabActive1(1) },
  ];
  const tabButtons2 = [
    { id: 0, name: '키워드 분석', onClick: () => setTabActive2(0) },
    { id: 1, name: '파일 분석', onClick: () => setTabActive2(1) },
    { id: 2, name: '과제 정보 분석', onClick: () => setTabActive2(2) },
  ];
  const tabButtons3 = [
    { id: 0, name: '국가 R&D 과제', onClick: () => setTabActive3(0) },
    { id: 1, name: 'IITP 내부 과제', onClick: () => setTabActive3(1) },
  ];
  
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [tabActive3, setTabActive3] = useState(0);
  
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">Styles</h2>
      <div className='container'>
        <div className='flex items-center gap-2'>
          <Button name="키워드 찾기" icon={ic_analysis} className="gap-2 py-3 px-4 rounded-3xl text-base font-bold btn_style02" />
          <Button name="디스커버리" icon={ic_analysis} className="gap-2 py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
          <Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword01" />
          <Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword02" />
          <Button name="현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" />
          <Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" />
          <Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword05" />
        </div>
        <br />
        <input type='text' name='' id='' value='' placeholder='검색' />
        <br />
        <br />
        <select name='' id=''>
          <option value=''>최신순</option>
          <option value=''>정확도순</option>
          <option value=''>유사도순</option>
        </select>
        <br />
        <br />
        <TabButtons style='1' tabs={tabButtons1} active={tabActive1} />
        <br />
        <TabButtons style='3' tabs={tabButtons2} active={tabActive2} />
        <br />
        <TabButtons style='2' tabs={tabButtons3} active={tabActive3} />
        <br />
        <br />
        <CategoryWrap />
        <br />
        <br />
      </div>
    </SampleLayout>
  );
}


