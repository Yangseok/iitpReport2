import React from 'react';
import 'Assets/Css/Demand.css';
import Layout from 'Domain/Home/Common/Layout/Sub';
import WordClouds from 'Domain/Home/Common/Componet/Features/WordClouds';
import CategoryWrap from 'Domain/Home/Common/Componet/CategoryWrap';

export default function FileResultLayout({children, tabCount}) {
  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-xl font-bold text-color-regular text-center'>
            “<span className='text-color-main'>{'실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발'}</span>” 기술수요조사서 파일 분석 결과입니다.
          </h2>
          <div className='mt-5'>
            <WordClouds />
          </div>
          <div className='mt-10'>
            <CategoryWrap tabCount={tabCount} path={'/demandbanking/file/result'} />
          </div>
        </div>
      </section>
      {children}
    </Layout>
  );
}
