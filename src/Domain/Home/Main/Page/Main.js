import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import 'Assets/Css/Main.css';
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
import ic_search from 'Assets/Images/ic_search.png';
import Layout from 'Domain/Home/Common/Layout/Main';
import Tail from 'Domain/Home/Common/Componet/Tail';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import RecommandKeyword from 'Domain/Home/Main/Component/RecommandKeyword';
import common from 'Utill';
import AutoCompleteSearch from 'Domain/Home/Common/Componet/AutoCompleteSearch';
import $ from 'jquery';
import { FullPage, Slide } from 'react-full-page';
import { useSelector } from 'react-redux';
import { getSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';

export default function Main() {
  const keyword = useSelector(getSearchKeyword);
  const [dataCount, setDataCount] = useState({});
  const [dataSearch, setDataSearch] = useState([]);
  const fullpageRef = useRef(null);

  useEffect(() => {
    (async () => {
      const data = await mainAPI.dataCount();
      setDataCount(data?.data?.result);
    })();

    // Fullpage.js
    const getFullPage = () => {
      $('.fp-nav-custom button:first-of-type, .fp-nav-custom button:last-of-type').attr('aria-hidden', true);

      // Shift 눌렀는지 확인
      let _shift = false;
      $(document).on('keydown',function(event){
        if(event.keyCode === 16) _shift = true;
      });
      $(document).on('keyup',function(event){
        if(event.keyCode === 16) _shift = false;
      });

      // Tab, Shift + Tab 키 관련 스크립트
      $('[class*=\'section\']').attr('tabindex', '0');

      $('#header .right_menu a').last().on('keydown', (event) => {
        if(event.keyCode === 9 && !_shift) {
          $('#section1').focus();
          return false;
        }
      });
      $(document).on('keydown', '#section1 .keywords_box button:last-of-type', (event) => {
        if(event.keyCode === 9 && !_shift){
          $('.fp-nav-custom button:eq(2)').focus();
          return false;
        }
      });
      $('#section2 a').last().on('keydown', (event) => {
        if(event.keyCode === 9 && !_shift){
          $('.fp-nav-custom button:eq(3)').focus();
          return false;
        }
      });
      $('#section2 a').first().on('keydown', (event) => {
        if(event.keyCode == 9 && _shift) {
          // $('#section2').focus();
          fullpageRef.current.scrollToSlide(0);
          $('#section1').focus();
          return false;
        }
      });
      $('#section3').on('keydown', (event) => {
        if(event.keyCode == 9 && !_shift) {
          fullpageRef.current.scrollToSlide(3);
          $('#section4').focus();
          return false;
        } else if(event.keyCode == 9 && _shift) {
          fullpageRef.current.scrollToSlide(1);
          $('#section2').focus();
          return false;
        }
      });
      $('#section4 a').first().on('keydown', (event) => {
        if(event.keyCode == 9 && _shift) {
          // $('#section4').focus();
          fullpageRef.current.scrollToSlide(2);
          $('#section3').focus();
          return false;
        }
      });

      $('.fp-nav-custom button').on('focus', function () {
        const idx = $(this).index();

        if(idx === 2){
          fullpageRef.current.scrollToSlide(1);
          $('#section2').focus();
        } else if(idx === 3){
          fullpageRef.current.scrollToSlide(2);
          $('#section3').focus();
        } else if(idx === 4){
          fullpageRef.current.scrollToSlide(3);
          $('#section4').focus();
        }
        return false;
      });
    };

    return () => {
      getFullPage();
    };
  }, []);

  useEffect(() => {
    (async () => {
      if(keyword !== '') {
        const data = await mainAPI.autocomplete(keyword);
        setDataSearch(data?.data?.result);
      }
    })();
  }, [keyword]);

  return (
    <Layout>
      <FullPage controls controlsProps={{className: 'fp-nav-custom'}} ref={fullpageRef}>
        <Slide>
          <section className='section main_sec01' id='section1'>
            <div className='container'>
              <AutoCompleteSearch
                data={dataSearch}
                style={{ type: 1, name: 'ICT 키워드 검색', icon: ic_search }}
              />
              <div className='keywords_box mt-3'>
                <p>추천 키워드</p>
                <RecommandKeyword />
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
        </Slide>
        <Slide>
          <section className='section main_sec02' id='section2'>
            <div className='container'>
              <div className='main_title text-center mb-20'>
                <h3>제공 서비스 소개</h3>
              </div>
              <ul>
                <li>
                  <NavLink to='/discovery/keyword'>
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
        </Slide>
        <Slide>
          <section className='section main_sec03' id='section3'>
            <div className='container'>
              <div className='main_title text-center mb-20'>
                <h3>제공 데이터 현황</h3>
              </div>
              <div className='conts_box'>
                <div className='all_conts'>
                  <img src={img_category00} alt='전체 데이터 현황' />
                  <p>전체</p>
                  <span>{common.setPriceInput(dataCount.all ?? 0)}</span>
                </div>
                <ul>
                  <li>
                    <img src={img_category01} alt='과제 데이터 현황' />
                    <p>과제</p>
                    <span>{common.setPriceInput(dataCount.project ?? 0)}</span>
                  </li>
                  <li>
                    <img src={img_category02} alt='논문 데이터 현황' />
                    <p>논문</p>
                    <span>{common.setPriceInput(dataCount.paper ?? 0)}</span>
                  </li>
                  <li>
                    <img src={img_category03} alt='특허 데이터 현황' />
                    <p>특허</p>
                    <span>{common.setPriceInput(dataCount.patent ?? 0)}</span>
                  </li>
                  <li>
                    <img src={img_category04} alt='ICT 자료 데이터 현황' />
                    <p>ICT 자료</p>
                    <span>{common.setPriceInput(dataCount.ict_report ?? 0)}</span>
                  </li>
                  <li>
                    <img src={img_category05} alt='정부정책 데이터 현황' />
                    <p>정부정책</p>
                    <span>{common.setPriceInput(dataCount.policy ?? 0)}</span>
                  </li>
                  <li>
                    <img src={img_category06} alt='연구자 데이터 현황' />
                    <p>연구자</p>
                    <span>{common.setPriceInput(dataCount.indv ?? 0)}</span>
                  </li>
                  <li>
                    <img src={img_category07} alt='기업 데이터 현황' />
                    <p>기업</p>
                    <span>{common.setPriceInput(dataCount.orgn ?? 0)}</span>
                  </li>
                  <li>
                    <img src={img_category08} alt='뉴스 데이터 현황' />
                    <p>뉴스</p>
                    <span>{common.setPriceInput(dataCount.news ?? 0)}</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </Slide>
        <Slide className='fp-auto-height'>
          <section className='section' id='section4'>
            <Tail />
          </section>
        </Slide>
      </FullPage>
    </Layout>
  );
}
