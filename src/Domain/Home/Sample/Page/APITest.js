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

  const projectOutTest1 = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.projectOut('search',10,1,'아이',[],'date');
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const projectOutTest2 = async () => {
    const apiFn = async () => {
      const filterObj = {
        year: 2023
      };
      const data = await discoveryAPI.projectOut('search',10,1,'아이',[],'date', filterObj);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const projectOutTest3 = async () => {
    const apiFn = async () => {
      const filterObj = {
        fund: 10000000
      };
      const data = await discoveryAPI.projectOut('search',10,1,'아이',[],'date', filterObj);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const projectOutTest4 = async () => {
    const apiFn = async () => {
      const filterObj = {
        proejctOrganization: '주식회사 오톰'
      };
      const data = await discoveryAPI.projectOut('search',10,1,'아이',[],'date', filterObj);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const projectOutTest5 = async () => {
    const apiFn = async () => {
      const filterObj = {
        orderAgency: '교육부'
      };
      const data = await discoveryAPI.projectOut('search',10,1,'아이',[],'date', filterObj);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const projectOutTest6 = async () => {
    const apiFn = async () => {
      const filterObj = {
        technicalClassification: '보건의료'
      };
      const data = await discoveryAPI.projectOut('search',10,1,'아이',[],'date', filterObj);
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const projectOutTest8 = async () => {
    const apiFn = async () => {
      const similarity = [{term: '인공지능', weight: 0.94}, {term: '자율주행', weight: 0.87}, {term: '빅데이터', weight: 0.77}];
      const data = await discoveryAPI.projectOut('discovery',10,1,'',similarity,'date');
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };

  const projectInTest = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.projectIn('search',10,1,'아이',[],'date');
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
        <li className='mb-1'><Button text="과제 검색(외부) - 통합검색" onClick={projectOutTest1} /></li>
        <li className='mb-1'><Button text="과제 검색(외부) - 통합검색 - 필터 - 추가 년도검색" onClick={projectOutTest2} /></li>
        <li className='mb-1'><Button text="과제 검색(외부) - 통합검색 - 필터 - 추가 연구 개발비 규모" onClick={projectOutTest3} /></li>
        <li className='mb-1'><Button text="과제 검색(외부) - 통합검색 - 필터 - 과제 수행기관" onClick={projectOutTest4} /></li>
        <li className='mb-1'><Button text="과제 검색(외부) - 통합검색 - 필터 - 부처명" onClick={projectOutTest5} /></li>
        <li className='mb-1'><Button text="과제 검색(외부) - 통합검색 - 필터 - 국가과학기술표준분류 / ICT 기술분류" onClick={projectOutTest6} /></li>
        <li className='mb-1'><Button text="과제 검색(외부) - 디스커버리" onClick={projectOutTest8} /></li>
        <li className='mb-1'><Button text="과제 검색(내부)" onClick={projectInTest} /></li>
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


