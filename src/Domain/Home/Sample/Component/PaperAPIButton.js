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
          applType: '신규',
          applicant: '대한민국(행정안전부 국립재난안전연구원장)',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '2010',
          yearEnd: '2023',
          title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
          applNumber: '1020200077142',
          applicantName: '대한민국(행정안전부 국립재난안전연구원장)',
          inventorName: '신동윤'
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
      const data = await paperAPI.paperView();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="논문 검색" onClick={() => paperTest(false,false)} /></li>
      <li className='mb-1'><Button text="논문 검색 - 필터" onClick={paperTest(false,false)} /></li>
      <li className='mb-1'><Button text="논문 검색 - 상세검색" onClick={paperTest(false,false)} /></li>
      <li className='mb-1'><Button text="상세 페이지(논문)" onClick={paperViewTest} /></li>
    </>
  );
}