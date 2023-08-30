import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as policyAPI from 'Domain/Home/Discovery/API/PolicyCall';

export default function PolicyAPIButton(props) {

  const policyTest = async (filter=false,search=false) => {
    const apiFn = async () => {
      let filterObj = {};
      if (filter) {
        filterObj = {
          year: '2023',
          source: '정보통신정책',
          ministry: '과학기술정보통신',
        };
      }
      let searchParam = {};
      if (search) {
        searchParam = {
          yearStart: '2023',
          yearEnd: '2023',
          title: '소프트웨어 진흥 전략(2023)',
          ministryName: '과학기술정보통신'
        };
      }
      let similarity = [];
      if (filter || search) {
        similarity = [{
          term: '인공지능',
          weight: 0.94
        }];
      }
      const data = await policyAPI.policy('search',10,1,'인공지능',similarity,'date',filterObj,searchParam);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="정부 정책 검색" onClick={() => policyTest(false, false)} /></li>
      <li className='mb-1'><Button text="정부 정책 검색 - 필터" onClick={() => policyTest(true, false)} /></li>
      <li className='mb-1'><Button text="정부 정책 검색 - 상세검색" onClick={() => policyTest(false, true)} /></li>
    </>
  );
}