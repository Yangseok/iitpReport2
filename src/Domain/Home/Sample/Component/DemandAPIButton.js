import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as viewCallAPI from 'Domain/Home/Discovery/API/ViewCall';
// import * as callAPI from 'Domain/Home/DemandBanking/API/Call';

export default function DemandAPIButton(props) {
  const demandSurveyViewTest = async () => {
    const apiFn = async () => {
      const data = await viewCallAPI.demandSurveyView();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="상세 페이지(수요뱅킹 상세)" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 전체 현황" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 공고 목록" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 ICT 기술 분류" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 접수서 목록 조회" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 조회 목록 다운로드" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 유사기술수요조사서 조회" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 병합 수요 목록 조회" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 접수서 파일 분석" onClick={demandSurveyViewTest} /></li>
    </>
  );
}