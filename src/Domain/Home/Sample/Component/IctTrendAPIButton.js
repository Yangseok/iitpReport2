import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as ictTrendCallAPI from 'Domain/Home/ICTTrend/API/Call';

export default function ICTTrendAPIButton(props) {


  const ictTrendTest = async (category,label) => {
    const apiFn = async () => {
      const data = await ictTrendCallAPI.ictSearchWordCloud(category,label);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const ictTrendwordCloud = async (category) => {
    const apiFn = async () => {
      const data = await ictTrendCallAPI.ictSearchWordCloud(category,'wordCloud');
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  return (
    <>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(전체)" onClick={() => ictTrendwordCloud('all','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(국가 R&D 과제)" onClick={() => ictTrendwordCloud('rnd_project','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(IITP 내부 과제)" onClick={() => ictTrendwordCloud('iitp_project','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(특허)" onClick={() => ictTrendwordCloud('patent','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(논문)" onClick={() => ictTrendwordCloud('paper', 'wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(ICT 자료)" onClick={() => ictTrendwordCloud('ict_report', 'wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(정부정책)" onClick={() => ictTrendwordCloud('policy', 'wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(뉴스)" onClick={() => ictTrendwordCloud('news', 'wordCloud')} /></li>

      <li className='mb-1'><Button text="ICT 키워드 트렌드(전체)" onClick={() => ictTrendTest('all')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드(과제)" onClick={() => ictTrendTest('rnd_project')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드(과제)" onClick={() => ictTrendTest('iitp_project')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드(특허)" onClick={() => ictTrendTest('patent')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드(논문)" onClick={() => ictTrendTest('paper')} /></li>
    </>
  );
}