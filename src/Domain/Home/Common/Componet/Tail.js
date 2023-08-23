import React from 'react';
import { NavLink } from 'react-router-dom';
import ic_arrow from 'Assets/Images/ic_arrow01.svg';
import ic_rss from 'Assets/Images/ic_rss.png';
import Button from 'Domain/Home/Common/Componet/Button';

export default function Tail() {
  return (
    <footer id='footer'>
      <div className='container'>
        <div className='text_box'>
          <div className='top_text_box'>
            <NavLink to='/' className='logo'>IITP 정보통신기획평가원</NavLink>
            <a href='#'>개인정보처리방침</a>
            <a href='#'>이용약관</a>
          </div>
          <p className='mt-8'>
            대전광역시 유성구 유성대로 1548 (정보통신기획평가원) 동향분석팀 담장자 E-mail: key@iitp.kr <br/>
            ALL RIGHTS RESERVED ⓒ 정보통신기획평가원
          </p>
        </div>
        <div className='link_box'>
          <div className='top_link_box'>
            <select name='' id='' title='새창이동, 내부사이트 바로가기'>
              <option value=''>내부사이트 바로가기</option>
              <option value=''>정보통신기획평가원</option>
              <option value=''>정보통신연차보고서</option>
            </select>
            <Button className="py-2.75 px-4.5 rounded text-sm btn_style01" name="유관기관 바로가기" icon={ic_arrow} onClick={() => location.href='/'} />
          </div>
          <ul className='mt-6'>
            <li><a href='#' target='_blank' className='icon01' title='새창이동, 트위터'>트위터 바로가기</a></li>
            <li><a href='#' target='_blank' className='icon02' title='새창이동, 페이스북'>페이스북 바로가기</a></li>
            <li><a href='#' target='_blank' className='icon03' title='새창이동'><img src={ic_rss} alt='RSS' /></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
