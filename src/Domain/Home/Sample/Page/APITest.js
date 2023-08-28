import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Button from 'Domain/Home/Sample/Component/Button';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import { useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';

export default function APITest() {

  const dispatch = useDispatch();

  const apiCallWrap = async (f) => {
    try {
      dispatch(setLoading(true));
      // console.log('recommend call');
      await f();
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));  
    }
  };

  const recommendTest = async () => {
    const apiFn = async () => {
      const data = await mainAPI.recommend();
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const dataCountTest = async () => {
    const apiFn = async () => {
      const data = await mainAPI.dataCount();
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const autocompleteTest = async () => {
    const apiFn = async () => {
      const data = await mainAPI.autocomplete('아이');
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const searchAllTest = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.searchAll('아이',4);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

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
      const data = await discoveryAPI.projectOut('search',10,1,'아이',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
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
      const data = await discoveryAPI.projectOut('discovery',10,1,'',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
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
      const data = await discoveryAPI.projectIn('search',10,1,'아이',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
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
      const data = await discoveryAPI.projectIn('discovery',10,1,'',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const discoveryTest = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.discovery('아이');
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };
  
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">api 테스트</h2>
      <ul className='text-center'>
        <li className='mb-1'><Button text="메인 추천검색어 콜" onClick={recommendTest} /></li>
        <li className='mb-1'><Button text="전체 데이터 현황" onClick={dataCountTest} /></li>
        <li className='mb-1'><Button text="자동완성" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="통합검색" onClick={searchAllTest} /></li>
        <hr />
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
        <hr />
        <li className='mb-1'><Button text="특허 검색" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="논문 검색" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="ICT 자료 검색" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="정부 정책 검색" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="연구자 검색" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="기관 검색" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="뉴스 검색" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="상세 페이지(과제)" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="상세 페이지(과제) - 성과정보" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="상세 페이지(특허)" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="상세 페이지(논문)" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="상세 페이지(기관)" onClick={autocompleteTest} /></li>
        <li className='mb-1'><Button text="디스커버리 키워드 분석" onClick={discoveryTest} /></li>
      </ul>
    </SampleLayout>
  );
}


