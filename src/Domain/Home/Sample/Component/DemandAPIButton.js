import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as viewCallAPI from 'Domain/Home/Discovery/API/ViewCall';
import * as demandCallAPI from 'Domain/Home/DemandBanking/API/Call';

export default function DemandAPIButton(props) {
  const demandSurveyViewTest = async () => {
    const apiFn = async () => {
      const data = await viewCallAPI.surveyView('DSP2018006','201800000218');
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const surveyCount = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.surveyCount();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const noticeList = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.noticeList('2022','2023','ALL','PROGRESS','10000000','10010000','10010300','10010303',10,1);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const ictClass = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.ictClass('SCLS','60020100');
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const surveyList = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.surveyList('DSP2017011|DSP2017012','2017-09-01','2022-01-01','10000000','10010000','10010300','10010303','한국전자통신연구원','임선환','지능',10,1);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const surveyListDownload = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.surveyListDownload('DSP2017004|DSP2017005',10000,1);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const similarSurvey = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.similarSurvey('ALL','DSP2017002','201700000079',10,1);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const mergedSurvey = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.mergedSurvey('merged1234',10,1);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const surveyFile = async () => {
    const apiFn = async () => {
      const data = await demandCallAPI.surveyFile('DSP2017002','201700000037',10,1);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="상세 페이지(수요뱅킹 상세)" onClick={demandSurveyViewTest} /></li>
      <li className='mb-1'><Button text="수요뱅킹 전체 현황" onClick={surveyCount} /></li>
      <li className='mb-1'><Button text="수요뱅킹 공고 목록" onClick={noticeList} /></li>
      <li className='mb-1'><Button text="수요뱅킹 ICT 기술 분류" onClick={ictClass} /></li>
      <li className='mb-1'><Button text="수요뱅킹 접수서 목록 조회" onClick={surveyList} /></li>
      <li className='mb-1'><Button text="수요뱅킹 조회 목록 다운로드" onClick={surveyListDownload} /></li>
      <li className='mb-1'><Button text="수요뱅킹 유사기술수요조사서 조회" onClick={similarSurvey} /></li>
      <li className='mb-1'><Button text="수요뱅킹 병합 수요 목록 조회" onClick={mergedSurvey} /></li>
      <li className='mb-1'><Button text="수요뱅킹 접수서 파일 분석" onClick={surveyFile} /></li>
    </>
  );
}