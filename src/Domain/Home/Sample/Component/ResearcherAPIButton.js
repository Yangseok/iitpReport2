import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as researcherAPI from 'Domain/Home/Discovery/API/ResearcherCall';

export default function ResearcherAPIButton(props) {

  const researcherTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          orgn: '중소벤처기업부',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          name: '정은',
          orgnName: '서울대'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await researcherAPI.researcher('search',10,1,'인공지능',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="연구자 검색" onClick={() => researcherTest(false, false)} /></li>
      <li className='mb-1'><Button text="연구자 검색 - 필터" onClick={() => researcherTest(true, false)} /></li>
      <li className='mb-1'><Button text="연구자 검색 - 상세검색" onClick={() => researcherTest(false, true)} /></li>
    </>
  );
}