import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import icArrow from 'Assets/Images/ic_arrow01.png';

export default function Tail() {
  const [siteShow, setSiteShow] = useState(false);

  return (
    <footer id='footer'>
      <div className='container'>
        <div className='text_box'>
          <div className='top_text_box'>
            <NavLink to='/' className='logo'>IITP 정보통신기획평가원</NavLink>
            <a href='/policy'>개인정보처리방침</a>
            <a href='/agree'>이용약관</a>
          </div>
          <p className='mt-8'>
            대전광역시 유성구 유성대로 1548 (정보통신기획평가원)<br/>
            ALL RIGHTS RESERVED ⓒ 정보통신기획평가원
          </p>
        </div>
        <div className='link_box'>
          <div className='top_link_box'>
            <div className='select_custom_wrap'>
              <div className={`select_custom${siteShow ? ' on' : ''}`}>
                <button type='button' onClick={() => setSiteShow(state => !state)}>내부사이트 바로가기</button>
                <ul>
                  <li><a href='https://www.iitp.kr/main.it' target='_blank' rel='noreferrer' title='새창이동, 정보통신기획평가원 사이트'>정보통신기획평가원</a></li>
                  <li><a href='https://annualreport.itfind.or.kr/ver2.rpt' target='_blank' rel='noreferrer' title='새창이동, 정보통신연차보고서 사이트'>정보통신연차보고서</a></li>
                </ul>
              </div>
            </div>
            <a href='https://www.itfind.or.kr/data/related/organ/list.do' className="gap-2 h-12 px-4.5 rounded text-sm btn_style01" target='_blank' rel='noreferrer' title='새창이동, 유관기관 바로가기 사이트'>
              유관기관 바로가기 <img src={icArrow} alt='화살표' className='w-6' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
