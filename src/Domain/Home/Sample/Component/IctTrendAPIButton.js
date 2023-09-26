import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';
import * as ictTrendCallAPI from 'Domain/Home/ICTTrend/API/Call';

export default function ICTTrendAPIButton(props) {




  // const ictTrendwordCloud = async (category) => {
  //   const apiFn = async () => {
  //     const data = await ictTrendCallAPI.ictSearchWordCloud(category,'wordCloud');
  //     console.log(data?.data?.result);
  //   };
  //   await props.apiCallWrap(apiFn);
  // };

  const ictTrend= async (category, labal) => {
    const apiFn = async () => {
      const data = await ictTrendCallAPI.ictSearchWordCloud(category,labal);
      console.log(data?.data?.result);
    };
    await props.apiCallWrap(apiFn);
  };



  return (
    <>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(전체)" onClick={() => ictTrend('all','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(국가 R&D 과제)" onClick={() => ictTrend('rnd_project','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(IITP 내부 과제)" onClick={() => ictTrend('iitp_project','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(특허)" onClick={() => ictTrend('patent','wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(논문)" onClick={() => ictTrend('paper', 'wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(ICT 자료)" onClick={() => ictTrend('ict_report', 'wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(정부정책)" onClick={() => ictTrend('policy', 'wordCloud')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 트렌드 단어클라우드(뉴스)" onClick={() => ictTrend('news', 'wordCloud')} /></li>
      <br>
      </br>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(전체)" onClick={() => ictTrend('all','trend')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(과제)" onClick={() => ictTrend('rnd_project','trend')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(과제)" onClick={() => ictTrend('iitp_project','trend')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(특허)" onClick={() => ictTrend('patent','trend')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(논문)" onClick={() => ictTrend('paper','trend')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(ICT 자료)" onClick={() => ictTrend('ict_report','trend')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(정부정책)" onClick={() => ictTrend('policy','trend')} /></li>
      <li className='mb-1'><Button text="ICT 키워드 키워드추이(뉴스)" onClick={() => ictTrend('news','trend')} /></li>
      <br>
      </br>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(전체)" onClick={() => ictTrend('all','year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(과제)" onClick={() => ictTrend('rnd_project','year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(과제)" onClick={() => ictTrend('iitp_project','year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(특허)" onClick={() => ictTrend('patent','year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(논문)" onClick={() => ictTrend('paper','year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(ICT 자료)" onClick={() => ictTrend('ict_report','year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(정부정책)" onClick={() => ictTrend('policy','year')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 연도별 과제 건수(뉴스)" onClick={() => ictTrend('news','year')} /></li>
      <br>
      </br>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업 (전체)" onClick={() => ictTrend('all','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업(과제)" onClick={() => ictTrend('rnd_project','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업(과제)" onClick={() => ictTrend('iitp_project','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업(특허)" onClick={() => ictTrend('patent','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업(논문)" onClick={() => ictTrend('paper','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업(ICT 자료)" onClick={() => ictTrend('ict_report','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업(정부정책)" onClick={() => ictTrend('policy','orgn')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 수행기관별 비교, 발행기관별 건수, 뉴스 언급 기업(뉴스)" onClick={() => ictTrend('news','orgn')} /></li>
      <br>
      </br>

      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(전체)" onClick={() => ictTrend('all','appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(과제)" onClick={() => ictTrend('rnd_project','appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(과제)" onClick={() => ictTrend('iitp_project','appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(특허)" onClick={() => ictTrend('patent','appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(논문)" onClick={() => ictTrend('paper','appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(ICT 자료)" onClick={() => ictTrend('ict_report','appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(정부정책)" onClick={() => ictTrend('policy','appl')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 출원인 순위(뉴스)" onClick={() => ictTrend('news','appl')} /></li>
      <br>
      </br>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(전체)" onClick={() => ictTrend('all','category')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(과제)" onClick={() => ictTrend('rnd_project','category')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(과제)" onClick={() => ictTrend('iitp_project','category')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(특허)" onClick={() => ictTrend('patent','category')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(논문)" onClick={() => ictTrend('paper','category')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(ICT 자료)" onClick={() => ictTrend('ict_report','category')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(정부정책)" onClick={() => ictTrend('policy','category')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 뉴스 카테고리별 건수(뉴스)" onClick={() => ictTrend('news','category')} /></li>
      <br>
      </br>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(전체)" onClick={() => ictTrend('all','class')}/></li>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(과제)" onClick={() => ictTrend('rnd_project','class')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(과제)" onClick={() => ictTrend('iitp_project','class')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(특허)" onClick={() => ictTrend('patent','class')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(논문)" onClick={() => ictTrend('paper','class')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(ICT 자료)" onClick={() => ictTrend('ict_report','class')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(정부정책)" onClick={() => ictTrend('policy','class')} /></li>
      <li className='mb-1'><Button text="ICT 트렌드 국제과학기술표준분류, ICT 기술분류(뉴스)" onClick={() => ictTrend('news','class')} /></li>

    </>
  );
}