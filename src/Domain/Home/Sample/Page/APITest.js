import React from 'react';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';
import Button from 'Domain/Home/Sample/Component/Button';
import MainAPIButton from 'Domain/Home/Sample/Component/MainAPIButton';
import ProjectAPIButton from 'Domain/Home/Sample/Component/ProjectAPIButton';
import PatentAPIButton from 'Domain/Home/Sample/Component/PatentAPIButton';
import PaperAPIButton from 'Domain/Home/Sample/Component/PaperAPIButton';
import IctAPIButton from 'Domain/Home/Sample/Component/IctAPIButton';
import PolicyAPIButton from 'Domain/Home/Sample/Component/PolicyAPIButton';
import ResearcherAPIButton from 'Domain/Home/Sample/Component/ResearcherAPIButton';
import OrgnAPIButton from 'Domain/Home/Sample/Component/OrgnAPIButton';
import NewsAPIButton from 'Domain/Home/Sample/Component/NewsAPIButton';
import ViewAPIButton from 'Domain/Home/Sample/Component/ViewAPIButton';
import DemandAPIButton from 'Domain/Home/Sample/Component/DemandAPIButton';
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
      <div className='border-2 border-gray-400 border-solid rounded-lg mx-auto mr-10 ml-10 pt-10 pb-10 mb-10'>
        <ul className='text-center'>
          <h2>통합검색&디스커버리</h2>
          <h2>메인</h2>
          <MainAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>과제</h2>
          <ProjectAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>특허</h2>
          <PatentAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>논문</h2>
          <PaperAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>ict</h2>
          <IctAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>정부정책</h2>
          <PolicyAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>연구자</h2>
          <ResearcherAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>기관</h2>
          <OrgnAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>뉴스</h2>
          <NewsAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>기타 상세</h2>
          <ViewAPIButton apiCallWrap={apiCallWrap} />
          <hr className='mt-4 pt-3' />
          <h2>이외 api</h2>
          <li className='mb-1'><Button text="디스커버리 파일 분석" onClick={discoveryKeywordTest} /></li>
          <li className='mb-1'><Button text="디스커버리 키워드 분석" onClick={discoveryKeywordTest} /></li>
        </ul>
      </div>
      <div className='border-2 border-gray-400 border-solid rounded-lg mx-auto mr-10 ml-10 pt-10 pb-10 mb-10'>
        <ul className='text-center'>
          <h2>수요뱅킹</h2>
          <DemandAPIButton apiCallWrap={apiCallWrap} />
        </ul>
      </div>
    </SampleLayout>
  );
}


