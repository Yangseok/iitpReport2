import React, { useState, useEffect } from 'react';
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
import Layout from 'Domain/Home/Common/Layout/Main';
import Tail from 'Domain/Home/Common/Componet/Tail';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import RecommandKeyword from 'Domain/Home/Main/Component/RecommandKeyword';
import common from 'Utill';
import AutoComplete from '../Component/AutoComplete';
import $ from 'jquery';
import 'fullpage.js';
import 'fullpage.js/dist/jquery.fullpage.min.css';

export default function Main() {
  const [dataCount, setDataCount] = useState({});

  useEffect(() => {
    const dataCount = async () => {
      const apiFn = async () => {
        const data = await mainAPI.dataCount();
        // console.log(data?.data?.result);
        setDataCount(data?.data?.result);
      };
      await apiFn();
    };

    // Fullpage.js
    const getFullPage = () => {
      // Shift 눌렀는지 확인
      let _shift = false;
      $(document).on('keydown',function(event){
        if(event.keyCode === 16) _shift = true;
      });
      $(document).on('keyup',function(event){
        if(event.keyCode === 16) _shift = false;
      });

      $('#fullpage').fullpage({
        verticalCentered: true,
        responsiveWidth: 1320,

        onLeave: (_, idx) => {
          $('#fp-nav-custom li').removeClass('on');
          $(`#fp-nav-custom li[data-section='${idx}']`).addClass('on');
        },
      });

      // $('[class*=\'section\']').attr('tabindex', '0');
      $(document).on('keydown', '#section1 .keywords_box button:last-of-type', function(event){
        if(event.keyCode === 9 && !_shift){
          $('#fp-nav-custom > ul > li:eq(1) button').focus();
          return false;
        }
      });
      $('#section2 a').first().on('keydown', function(event){
        if(event.keyCode === 9 && _shift){
          $('#fp-nav-custom > ul > li:eq(1) button').focus();
          return false;
        }
      });
      $('#section2 a').last().on('keydown', function(event){
        if(event.keyCode === 9 && !_shift){
          $('#fp-nav-custom > ul > li:eq(2) button').focus();
          return false;
        }
      });
      $('#section4 a').first().on('keydown', function(event){
        if(event.keyCode === 9 && _shift){
          $('#fp-nav-custom > ul > li:eq(3) button').focus();
          return false;
        }
      });
      
      $('#fp-nav-custom > ul > li:eq(1) button').on('keydown', function(event){
        if(event.keyCode === 9 && _shift){
          $('#fp-nav-custom > ul > li:eq(0) button').focus();
          $.fn.fullpage.moveTo(1,0);
          return false;
        }
      });
      $('#fp-nav-custom > ul > li:eq(2) button').on('keydown', function(event){
        if(event.keyCode === 9 && !_shift){
          $('#fp-nav-custom > ul > li:eq(3) button').focus();
          $.fn.fullpage.moveTo(4,0);
          return false;
        } else  if(event.keyCode == 9 && _shift) {
          $('#fp-nav-custom > ul > li:eq(1) button').focus();
          $.fn.fullpage.moveTo(2,0);
          return false;
        }
      });
      $('#fp-nav-custom > ul > li:eq(3) button').on('keydown', function(event){
        if(event.keyCode === 9 && _shift){
          $('#fp-nav-custom > ul > li:eq(2) button').focus();
          $.fn.fullpage.moveTo(3,0);
          return false;
        }
      });

      $('#fp-nav-custom ul li button').on('focus', function(){
        var idx = $(this).parent().index();

        if(idx === 0){
          $.fn.fullpage.moveTo(1,0);
        } else if(idx === 1){
          $.fn.fullpage.moveTo(2,0);
        } else if(idx === 2){
          $.fn.fullpage.moveTo(3,0);
        } else if(idx === 3){
          $.fn.fullpage.moveTo(4,0);
        }
        return false;
      });
      
      // 네비게이션
      $('#fp-nav-custom ul li button').on('click', function(e) {
        e.preventDefault();
        const targetSection = $(this).parent().attr('data-section');
        $.fn.fullpage.moveTo(targetSection);
      });
    };

    return () => {
      dataCount();
      getFullPage();
    };
  }, []);
  
  return (
    <Layout>
      <div id='fp-nav-custom'>
        <ul>
          <li data-section='1' className='on'><button type='button'>검색</button></li>
          <li data-section='2'><button type='button'>제공 서비스</button></li>
          <li data-section='3'><button type='button'>데이터 현황</button></li>
          <li data-section='4'><button type='button'>홈페이지 하단 정보</button></li>
        </ul>
      </div>
      <div id='fullpage'>
        <section className='section main_sec01' id='section1'>
          <div className='container'>
            <AutoComplete />
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
        <section className='section main_sec02' id='section2'>
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
        <section className='section fp-auto-height' id='section4'>
          <Tail />
        </section>
      </div>
      {/* </ReactFullpage.Wrapper>
        )}
      /> */}
    </Layout>
  );
}
