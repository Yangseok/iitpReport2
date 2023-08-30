import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as ictAPI from 'Domain/Home/Discovery/API/IctCall';

export default function ICTAPIButton(props) {

  const ictTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          year: '2023',
          source: '정보통신',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '2010',
          yearEnd: '2020',
          title: '싱가포르 인공지능',
          sourceName: '정보통신'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await ictAPI.ict('search',10,1,'인공지능',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };
  
  const company3ViewTest = async () => {
    const apiFn = async () => {
      const data = await ictAPI.company3View();
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="ICT 자료 검색" onClick={() => ictTest(false, false)} /></li>
      <li className='mb-1'><Button text="ICT 자료 검색 - 필터" onClick={() => ictTest(true, false)} /></li>
      <li className='mb-1'><Button text="ICT 자료 검색 - 상세검색" onClick={() => ictTest(false, true)} /></li>
      <li className='mb-1'><Button text="상세 페이지(수요뱅킹 ICT 기술 분류)" onClick={company3ViewTest} /></li>
    </>
  );
}