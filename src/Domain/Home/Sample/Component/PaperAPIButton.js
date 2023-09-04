import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as paperAPI from 'Domain/Home/Discovery/API/PaperCall';

export default function PaperAPIButton(props) {
  const paperTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          year: '2020',
          paperType: 'JAKO',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '1999',
          yearEnd: '2010',
          title: '고무차륜형 AGT 주행장치의 구조 및 피로해석',
          journalTitle: '한국철도학회',
          issn: '1738-6225|2288-2235',
          author: '유형선|권혁수|윤성호',
          abstract: 'Automated Guideway Transit'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await paperAPI.paper('search',10,1,'인공지능',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  const paperViewTest = async () => {
    const apiFn = async () => {
      const data = await paperAPI.paperView('JAKO202307545468397');
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="논문 검색" onClick={() => paperTest(false,false)} /></li>
      <li className='mb-1'><Button text="논문 검색 - 필터" onClick={() => paperTest(true,false)} /></li>
      <li className='mb-1'><Button text="논문 검색 - 상세검색" onClick={() => paperTest(false,true)} /></li>
      <li className='mb-1'><Button text="상세 페이지(논문)" onClick={paperViewTest} /></li>
    </>
  );
}