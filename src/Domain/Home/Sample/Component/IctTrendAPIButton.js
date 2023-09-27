import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as ictTrendCallAPI from 'Domain/Home/ICTTrend/API/Call';

export default function ICTTrendAPIButton(props) {


  const ictTrend= async (category, labal) => {
    const apiFn = async () => {
      const data = await ictTrendCallAPI.ictSearchWordCloud(category, labal);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const ictTrendList= async (category) => {
    const apiFn = async () => {
      const data = await ictTrendCallAPI.ictList(category);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };

  const ictTrendPerformanceList= async (category) => {
    const apiFn = async () => {
      const data = await ictTrendCallAPI.ictPerformanceList(category);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };



  return (
    <>
      <li className='mb-1'><Button text="ICT 트렌드 국가 R&D 과제(연관어 클라우드)" onClick={() => ictTrend('rnd_project','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국가 R&D 과제(관련 키워드 추이)" onClick={() => ictTrend('rnd_project','trend')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국가 R&D 과제(연도별 과제 건수)" onClick={() => ictTrend('rnd_project', 'year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국가 R&D 과제(과제 수행기관별 비교)" onClick={() => ictTrend('rnd_project', 'orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국가 R&D 과제(국가과학기술분류)" onClick={() => ictTrend('rnd_project', 'class')} /></li>
      <br></br>

      <li className='mb-1'><Button text="ICT 트렌드 IITP 내부 과제(연관어 클라우드)" onClick={() => ictTrend('iitp_project','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 IITP 내부 과제(관련 키워드 추이)" onClick={() => ictTrend('iitp_project','trend')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 IITP 내부 과제(연도별 과제 건수)" onClick={() => ictTrend('iitp_project', 'year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 IITP 내부 과제(과제 수행기관별 비교)" onClick={() => ictTrend('iitp_project', 'orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 IITP 내부 과제(국가과학기술분류)" onClick={() => ictTrend('iitp_project', 'class')} /></li>

      <br></br>
      <li className='mb-1'><Button text="ICT 트렌드 특허(연관어 클라우드)" onClick={() => ictTrend('patent','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 특허(관련 키워드 추이)" onClick={() => ictTrend('patent','trend')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 특허(연도별 과제 건수)" onClick={() => ictTrend('patent', 'year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 특허(출원인 순위)" onClick={() => ictTrend('patent', 'appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 특허(ICT 기술 분류)" onClick={() => ictTrend('patent', 'class')} /></li>

      <br></br>
      <li className='mb-1'><Button text="ICT 트렌드 논문(연관어 클라우드)" onClick={() => ictTrend('paper','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 논문(관련 키워드 추이)" onClick={() => ictTrend('paper','trend')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 논문(연도별 과제 건수)" onClick={() => ictTrend('paper', 'year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 논문(출원인 순위)" onClick={() => ictTrend('paper', 'appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 논문(ICT 기술 분류)" onClick={() => ictTrend('paper', 'class')} /></li>
      <br></br>

      <li className='mb-1'><Button text="ICT 트렌드 ICT 자료(연관어 클라우드)" onClick={() => ictTrend('ict_report','wordCloud')}/></li>
      <li className='mb-1'><Button text="ICT 트렌드 ICT 자료(관련 키워드 추이)" onClick={() => ictTrend('ict_report','trend')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 ICT 자료(발행기관별 건수)" onClick={() => ictTrend('ict_report','orgn')} /></li>
      <br></br>
      
      <li className='mb-1'><Button text="ICT 트렌드 정부정책(연관어 클라우드)" onClick={() => ictTrend('policy','wordCloud')}/></li>
      <li className='mb-1'><Button text="ICT 트렌드 정부정책(관련 키워드 추이)" onClick={() => ictTrend('policy','trend')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 정부정책(발행기관별 건수)" onClick={() => ictTrend('policy','orgn')} /></li>

      <br></br>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스(연관어 클라우드)" onClick={() => ictTrend('news','wordCloud')}/></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스(관련 키워드 추이)" onClick={() => ictTrend('news','trend')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스(뉴스 언급 기업 순위)" onClick={() => ictTrend('news','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스(뉴스 카테고리별 건수)" onClick={() => ictTrend('news', 'category')} /></li>

      <br></br>
      <li className='mb-1'><Button text="ICT 트렌드 리스트(국가 R&D 과제)" onClick={() => ictTrendList('rnd_project')}/></li>
      <li className='mb-1'><Button text="ICT 트렌드 리스트(IITP 내부 과제)" onClick={() => ictTrendList('iitp_project')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 리스트(특허)" onClick={() => ictTrendList('patent')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 리스트(논문)" onClick={() => ictTrendList('paper')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 리스트(ICT 자료)" onClick={() => ictTrendList('ict_report')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 리스트(정부정책)" onClick={() => ictTrendList('policy')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 리스트(뉴스)" onClick={() => ictTrendList('news')} /></li>


      <br></br>
      <li className='mb-1'><Button text="ICT 성과 목록(특허)" onClick={() => ictTrendPerformanceList('patent')}/></li>
      <li className='mb-1'><Button text="ICT 성과 목록(논문)" onClick={() => ictTrendPerformanceList('paper')} /></li>

      
    </>
  );
}