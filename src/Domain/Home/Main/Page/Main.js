import React from 'react';
import { NavLink } from 'react-router-dom';
import 'Assets/Css/Main.css';
import ic_search from 'Assets/Images/ic_search.png';
import ic_scroll from 'Assets/Images/main_scroll01.png';
import img_service01 from 'Assets/Images/service_img01.png';
import img_service02 from 'Assets/Images/service_img02.png';
import img_service03 from 'Assets/Images/service_img03.png';
import img_category00 from 'Assets/Images/cate_img00.png';
import img_category01 from 'Assets/Images/cate_img01.png';
import img_category02 from 'Assets/Images/cate_img02.png';
import img_category03 from 'Assets/Images/cate_img03.png';
import img_category04 from 'Assets/Images/cate_img04.png';
import img_category05 from 'Assets/Images/cate_img05.png';
import img_category06 from 'Assets/Images/cate_img06.png';
import img_category07 from 'Assets/Images/cate_img07.png';
import img_category08 from 'Assets/Images/cate_img08.png';
import Layout from 'Domain/Home/Common/Layout/Main';
import Button from 'Domain/Home/Common/Componet/Button';

export default function Main() {
  return (
    <Layout>
      <section className='main_sec01'>
        <div className='container'>
          <div className='search_wrap'>
            <label htmlFor='search' className=''>검색어로 검색</label>
            <input type='text' name='search' id='search' value='' placeholder='찾고 싶은 검색어를 입력해보세요.' />
            <Button name='ICT 키워드 검색' icon={ic_search} />
          </div>
          <div className='keywords_box mt-3'>
            <p>추천 키워드</p>
            <button type='button'>#인공지능</button>
            <button type='button'>#메타버스</button>
            <button type='button'>#이차전지</button>
            <button type='button'>#신소재</button>
            <button type='button'>#자율주행</button>
            <button type='button'>#디지털트윈</button>
            <button type='button'>#마이크로바이옴</button>
          </div>
          <div className='scroll_deco'>
            <img src={ic_scroll} alt='스크롤해서 보세요.' />
            <div></div>
          </div>
        </div>
        <div className='visual_bg_deco' aria-hidden='true'>
          <div></div><div></div><div></div>
        </div>
      </section>
      <section className='main_sec02'>
        <div className='container'>
          <div className='main_title text-center mb-20'>
            <h3>제공 서비스 소개</h3>
          </div>
          <ul>
            <li>
              <NavLink to='/discovery'>
                <img src={img_service01} alt='통합검색 & 디스커버리로 이동' />
                <h4>통합검색 & 디스커버리</h4>
                <p>
                  <b>Technical Feature 확장</b> 기능을 통해 <br/>
                  분야별 / 선택적 <b>기술 심층 분석</b> 결과 제공
                </p>
                <span>자세히 보기</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/demandbanking'>
                <img src={img_service02} alt='수요 뱅킹 서비스로 이동' />
                <h4>수요 뱅킹 서비스</h4>
                <p>
                  <b>ICT 기술 분류 체계</b>별 기술 수요 조사서 정보와 <br />
                  <b>유사 기술 수요 조사서</b> 정보 제공
                </p>
                <span>자세히 보기</span>
              </NavLink>
            </li>
            <li>
              <NavLink to='/icttrend'>
                <img src={img_service03} alt='ICT 트렌드로 이동' />
                <h4>ICT 트렌드</h4>
                <p>
                  키워드와 관련된 특허, 보고서, 논문 등의 정보를 <br />
                  다양한 형태로 <b>시각화</b>하여 제공
                </p>
                <span>자세히 보기</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
      <section className='main_sec03'>
        <div className='container'>
          <div className='main_title text-center mb-20'>
            <h3>제공 데이터 현황</h3>
          </div>
          <div className='conts_box'>
            <div className='all_conts'>
              <img src={img_category00} alt='전체 데이터 현황' />
              <p>전체</p>
              <span>2,340,000</span>
            </div>
            <ul>
              <li>
                <img src={img_category01} alt='과제 데이터 현황' />
                <p>과제</p>
                <span>100,300</span>
              </li>
              <li>
                <img src={img_category02} alt='논문 데이터 현황' />
                <p>논문</p>
                <span>100,300</span>
              </li>
              <li>
                <img src={img_category03} alt='특허 데이터 현황' />
                <p>특허</p>
                <span>100,300</span>
              </li>
              <li>
                <img src={img_category04} alt='ICT 자료 데이터 현황' />
                <p>ICT 자료</p>
                <span>100,300</span>
              </li>
              <li>
                <img src={img_category05} alt='정부정책 데이터 현황' />
                <p>정부정책</p>
                <span>100,300</span>
              </li>
              <li>
                <img src={img_category06} alt='연구자 데이터 현황' />
                <p>연구자</p>
                <span>100,300</span>
              </li>
              <li>
                <img src={img_category07} alt='기업 데이터 현황' />
                <p>기업</p>
                <span>100,300</span>
              </li>
              <li>
                <img src={img_category08} alt='뉴스 데이터 현황' />
                <p>뉴스</p>
                <span>100,300</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
}
