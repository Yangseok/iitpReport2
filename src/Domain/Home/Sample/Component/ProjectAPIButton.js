import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as projectAPI from 'Domain/Home/Discovery/API/ProjectCall';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';

export default function ProjectAPIButton(props) {

  const projectOutTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          year: 2023,
          fund: 100000000,
          researchAgency: '주식회사 오름',
          ministry: '중소벤처기업부',
          technicalClassification: '정보통신, 정보이론, 인공지능',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '2023',
          yearEnd: '2023',
          title: '나노리소그라피 기반 LED 기초 연구실',
          researchAgencyName: '주식회사 오톰',
          researchManagerName: '오준호',
          detailProjectNumber: '1425174675',
          projectNumber: '1425174675',
          ministryName: '중소벤처기업부',
          researchGoal: '생체신호 측정이 가능한 포터블 엑스레이',
          researchDescription: '영상판독을 위한 원격 진단 기술개발생체신호',
          expectationEffectiveness: '기초 영상진단 관련 장비·인력이 부재',
          keywordKorean: '엑스레이,포터블,응급,인공지능,원격진단',
          keywordEnglish: 'X-ray,Portable,Emergency,AI,Remote diagnosis'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await projectAPI.projectOut('search',10,1,'아이',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const projectOutDiscoveryTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          year: 2023,
          fund: 100000000,
          researchAgency: '주식회사 오름',
          ministry: '중소벤처기업부',
          technicalClassification: '정보통신, 정보이론, 인공지능',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '2023',
          yearEnd: '2023',
          title: '나노리소그라피 기반 LED 기초 연구실',
          researchAgencyName: '주식회사 오톰',
          researchManagerName: '오준호',
          detailProjectNumber: '1425174675',
          projectNumber: '1425174675',
          ministryName: '중소벤처기업부',
          researchGoal: '생체신호 측정이 가능한 포터블 엑스레이',
          researchDescription: '영상판독을 위한 원격 진단 기술개발생체신호',
          expectationEffectiveness: '기초 영상진단 관련 장비·인력이 부재',
          keywordKorean: '엑스레이,포터블,응급,인공지능,원격진단',
          keywordEnglish: 'X-ray,Portable,Emergency,AI,Remote diagnosis'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await projectAPI.projectOut('discovery',10,1,'',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const projectInTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          year: 2023,
          fund: 100000000,
          researchAgency: '주식회사 오름',
          ministry: '중소벤처기업부',
          technicalClassification: '정보통신, 정보이론, 인공지능',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '2023',
          yearEnd: '2023',
          title: '나노리소그라피 기반 LED 기초 연구실',
          researchAgencyName: '주식회사 오톰',
          researchManagerName: '오준호',
          detailProjectNumber: '1425174675',
          projectNumber: '1425174675',
          ministryName: '중소벤처기업부',
          researchGoal: '생체신호 측정이 가능한 포터블 엑스레이',
          researchDescription: '영상판독을 위한 원격 진단 기술개발생체신호',
          expectationEffectiveness: '기초 영상진단 관련 장비·인력이 부재',
          keywordKorean: '엑스레이,포터블,응급,인공지능,원격진단',
          keywordEnglish: 'X-ray,Portable,Emergency,AI,Remote diagnosis'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await projectAPI.projectIn('search',10,1,'아이',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const projectInDiscoveryTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          year: 2023,
          fund: 100000000,
          researchAgency: '주식회사 오름',
          ministry: '중소벤처기업부',
          technicalClassification: '정보통신, 정보이론, 인공지능',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '2023',
          yearEnd: '2023',
          title: '나노리소그라피 기반 LED 기초 연구실',
          researchAgencyName: '주식회사 오톰',
          researchManagerName: '오준호',
          detailProjectNumber: '1425174675',
          projectNumber: '1425174675',
          ministryName: '중소벤처기업부',
          researchGoal: '생체신호 측정이 가능한 포터블 엑스레이',
          researchDescription: '영상판독을 위한 원격 진단 기술개발생체신호',
          expectationEffectiveness: '기초 영상진단 관련 장비·인력이 부재',
          keywordKorean: '엑스레이,포터블,응급,인공지능,원격진단',
          keywordEnglish: 'X-ray,Portable,Emergency,AI,Remote diagnosis'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await projectAPI.projectIn('discovery',10,1,'',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const projectOutViewTest = async () => {
    const apiFn = async () => {
      const data = await projectAPI.projectOutView(1711100004);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const projectInViewTest = async () => {
    const apiFn = async () => {
      const data = await projectAPI.projectInView(1711100004);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const resultInfoViewTest = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.resultInfoView(1711100004);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="과제 검색(외부) - 통합검색" onClick={() => projectOutTest(false, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(외부) - 통합검색 - 필터" onClick={() => projectOutTest(true, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(외부) - 통합검색 - 상세검색" onClick={() => projectOutTest(false, true)} /></li>
      <li className='mb-1'><Button text="과제 검색(외부) - 디스커버리" onClick={() => projectOutDiscoveryTest(false, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(외부) - 디스커버리 - 필터" onClick={() => projectOutDiscoveryTest(true, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(외부) - 디스커버리 - 상세검색" onClick={() => projectOutDiscoveryTest(false, true)} /></li>
      <li className='mb-1'><Button text="과제 검색(내부) - 통합검색" onClick={() => projectInTest(false, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(내부) - 통합검색 - 필터" onClick={() => projectInTest(true, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(내부) - 통합검색 - 상세검색" onClick={() => projectInTest(false, true)} /></li>
      <li className='mb-1'><Button text="과제 검색(내부) - 디스커버리" onClick={() => projectInDiscoveryTest(false, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(내부) - 디스커버리 - 필터" onClick={() => projectInDiscoveryTest(true, false)} /></li>
      <li className='mb-1'><Button text="과제 검색(내부) - 디스커버리 - 상세검색" onClick={() => projectInDiscoveryTest(false, true)} /></li>
      <li className='mb-1'><Button text="상세 페이지(과제 외부)" onClick={projectOutViewTest} /></li>
      <li className='mb-1'><Button text="상세 페이지(과제 내부)" onClick={projectInViewTest} /></li>
      <li className='mb-1'><Button text="상세 페이지(과제) - 성과정보" onClick={resultInfoViewTest} /></li>
    </>
  );
}