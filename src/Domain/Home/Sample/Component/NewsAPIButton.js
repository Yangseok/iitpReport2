import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as newsAPI from 'Domain/Home/Discovery/API/NewsCall';

export default function NewsAPIButton(props) {
  const newsTest = async (filter=false,search=false) => {
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
      const data = await newsAPI.news('search',10,1,'인공지능',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="뉴스 검색" onClick={() => newsTest(false,false)} /></li>
      <li className='mb-1'><Button text="뉴스 검색 - 필터" onClick={() => newsTest(true,false)} /></li>
      <li className='mb-1'><Button text="뉴스 검색 - 상세검색" onClick={() => newsTest(false,true)} /></li>
    </>
  );
}