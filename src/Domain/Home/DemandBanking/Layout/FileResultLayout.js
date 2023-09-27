import React from 'react';
import 'Assets/Css/Demand.css';
import Layout from 'Domain/Home/Common/Layout/Sub';
import WordClouds from 'Domain/Home/DemandBanking/Component/WordClouds';
import CategoryWrap from 'Domain/Home/Common/Componet/CategoryWrap';
import { useParams } from 'react-router-dom';

export default function FileResultLayout({children, tabCount, wordCloudSurveyFile, surveyFileTitle}) {
  const params = useParams();
  const noticeId = params?.noticeId ?? '';
  const surveyId = params?.surveyId ?? '';
  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-xl font-bold text-color-regular text-center'>
            “<span className='text-color-main'>{surveyFileTitle}</span>” 기술수요조사서 파일 분석 결과입니다.
          </h2>
          <div className='mt-5'>
            <WordClouds wordCloudSurveyFile={wordCloudSurveyFile} />
          </div>
          <div className='mt-10'>
            <CategoryWrap tabCount={tabCount} path={'/demandbanking/file/'+noticeId+'/'+surveyId+'/result'} />
          </div>
        </div>
      </section>
      {children}
    </Layout>
  );
}
