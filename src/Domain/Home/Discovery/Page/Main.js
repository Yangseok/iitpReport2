import React, { useState } from 'react';
import 'Assets/Css/Discovery.css';
import ic_guide from 'Assets/Images/ic_guide.png';
import ic_analysis from 'Assets/Images/ic_analysis.png';
import ic_reset from 'Assets/Images/ic_reset.png';
import ic_filter from 'Assets/Images/ic_filter.png';
import ic_arrow from 'Assets/Images/ic_arrow02.svg';
import arr_drop from 'Assets/Images/arr_drop.svg';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import Button from 'Domain/Home/Common/Componet/Button';
import CategoryWrap from '../Component/CategoryWrap';

export default function Main() {
  const tabButtons1 = [
    { id: 0, name: '디스커버리 검색', onClick: () => setTabActive1(0) },
    { id: 1, name: '통합 검색', onClick: () => setTabActive1(1) },
  ];
  const tabButtons2 = [
    { id: 0, name: '키워드 분석', onClick: () => setTabActive2(0) },
    { id: 1, name: '파일 분석', onClick: () => setTabActive2(1) },
    { id: 2, name: '과제 정보 분석', onClick: () => setTabActive2(2) },
  ];
  const tabButtons3 = [
    { id: 0, name: '국가 R&D 과제', onClick: () => setTabActive3(0) },
    { id: 1, name: 'IITP 내부 과제', onClick: () => setTabActive3(1) },
  ];

  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [tabActive3, setTabActive3] = useState(0);

  return (
    <Layout>
      {/* 탭 버튼 & 키워드 찾기 */}
      <section>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-20'>
              <TabButtons style='1' tabs={tabButtons1} active={tabActive1} />
              <TabButtons style='3' tabs={tabButtons2} active={tabActive2} />
            </div>
            <button type='button' className='gap-1'>
              <img src={ic_guide} alt='검색 가이드' className='w-6' />
              검색 가이드
            </button>
          </div>
          <div className='search_wrap type02 mt-10'>
            <label htmlFor='search' className=''>키워드 검색</label>
            <input type='text' name='search' id='search' value='' placeholder='찾고 싶은 검색어를 입력해보세요.' />
            <Button name='키워드 찾기' icon={ic_analysis} />
          </div>
        </div>
      </section>
      {/* 키워드 결과 */}
      <section>
        <div className='container'>
          <div className='flex items-center justify-between mt-10 px-4'>
            <h3 className='text-xl font-bold text-color-dark'>키워드 결과</h3>
            <div className='flex items-center gap-6'>
              <button type='button' className='text-sm font-medium text-color-placeholder'>선택 초기화 <img src={ic_reset} alt='선택 초기화' className='w-6' /></button>
              <button type='button' className='text-sm font-medium text-color-regular'>접기 <img src={arr_drop} alt='화살표' /></button>
            </div>
          </div>
          <div className='keywords_wrap mt-4'>
            <div className='title'>
              <h4>1depth 키워드</h4>
              <button type='button'>1depth 키워드 접기</button>
            </div>
            <ul>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword01" /></li>
              <li><Button name="증강현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword01" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword01" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword02" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword02" /></li>
              <li><Button name="실감미디어" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword02" /></li>
              <li><Button name="현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="인터렉션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="실감디바이스" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="실감미디어" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="위치기반" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword05" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword05" /></li>
              <li><Button name="실감미디어" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword05" /></li>
            </ul>
          </div>
          <div className='keywords_btn'>
            <button type='button' disabled>키워드 확장 <img src={ic_analysis} alt='키워드 확장' /></button>
          </div>
          <Button className='gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='디스커버리' icon={ic_analysis} />
        </div>
      </section>
      {/* 분석 결과 */}
      <section className='mt-10'>
        <div className='container'>
          <div className='mb-10'>
            <h5 className='text-xl font-bold text-color-regular text-center mb-10'>
              “<span className='text-color-main'>인공지능</span>”에 대한 분석 결과는 총 <span className='text-color-main'>10,300건</span> 입니다.
            </h5>
            <CategoryWrap />
          </div>

          <TabButtons style='2' tabs={tabButtons3} active={tabActive3} />

          <div className='flex items-center justify-between mt-6'>
            <p className='text-base font-bold text-color-dark'>국가 R&D 과제 <span className='text-color-main'>50,150건</span></p>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='list_style01 mt-2'>
            <ul>
              <li>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                    <span className='tag_style01'>진행중</span>
                    <p className='text-base font-bold text-color-dark'>인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발</p>
                  </div>
                  <a href='#' className='flex items-center justify-center h-5 px-1.5 rounded-sm text-xs font-bold text-color-white bg-color-light1'>자세히 보기↗</a>
                </div>
                <div className='text_box'>
                  <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>10억</span></p>
                  <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>2023.04.01 ~ 2023.04.30</span></p>
                  <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>주식회사 오름</span></p>
                  <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>홍길동</span></p>
                  <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>중소벤처기업부</span></p>
                  <br />
                  <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>논문(1), 특허(3)</span></p>
                  <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>정보 / 통신 / 소프트웨어 / S/W솔루션 </span></p>
                  <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정...</span></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
