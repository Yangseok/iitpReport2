import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Button from 'Domain/Home/Sample/Component/Button';
import MainAPIButton from 'Domain/Home/Sample/Component/MainAPIButton';
import DiscoveryAPIButton from 'Domain/Home/Sample/Component/DiscoveryAPIButton';
import ProjectAPIButton from 'Domain/Home/Sample/Component/ProjectAPIButton';
import PatentAPIButton from 'Domain/Home/Sample/Component/PatentAPIButton';
import ViewAPIButton from 'Domain/Home/Sample/Component/ViewAPIButton';

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

  //viewCallAPI

  const discoveryKeywordTest = async () => {
    const apiFn = async () => {
      const data = await discoveryAPI.discoveryKeyword('아이');
      console.log(data?.data?.result);
    };
    await apiCallWrap(apiFn);
  };
  
  return (
    <SampleLayout>
      <h2 className="text-center mb-10">api 테스트</h2>
      <ul className='text-center'>
        <MainAPIButton apiCallWrap={apiCallWrap} />
        <hr />
        <ProjectAPIButton apiCallWrap={apiCallWrap} />
        <hr />
        <PatentAPIButton apiCallWrap={apiCallWrap} />
        <hr />
        <DiscoveryAPIButton apiCallWrap={apiCallWrap} />
        <hr />
        <ViewAPIButton apiCallWrap={apiCallWrap} />
        <hr />
        <li className='mb-1'><Button text="디스커버리 파일 분석" onClick={discoveryKeywordTest} /></li>
        <li className='mb-1'><Button text="디스커버리 키워드 분석" onClick={discoveryKeywordTest} /></li>
      </ul>
    </SampleLayout>
  );
}


