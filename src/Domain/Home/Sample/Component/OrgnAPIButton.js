import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as orgnAPI from 'Domain/Home/Discovery/API/OrgnCall';

export default function OrgnAPIButton(props) {
  const orgnTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          orgnType: '법인기업',
          industry: '제조',
          address: '서울특별시',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          title: '소테리아에이트',
          industryName: '응용 소프트웨어 개발 및 공급업',
          researchInstitute: 'ALL'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await orgnAPI.orgn('search',10,1,'인공지능',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const orgnViewTest = async () => {
    const apiFn = async () => {
      const data = await orgnAPI.orgnView();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="기관 검색" onClick={() => orgnTest(false,false)} /></li>
      <li className='mb-1'><Button text="기관 검색 - 필터" onClick={() => orgnTest(true,false)} /></li>
      <li className='mb-1'><Button text="기관 검색 - 상세검색" onClick={() => orgnTest(false,true)} /></li>
      <li className='mb-1'><Button text="상세 페이지(기관)" onClick={orgnViewTest} /></li>
    </>
  );
}