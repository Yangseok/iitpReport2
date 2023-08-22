import React from 'react';
import { NavLink } from 'react-router-dom';
import ic_arrow from 'Assets/Images/ic_arrow01.svg';
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
          <p>
            대전광역시 유성구 유성대로 1548 (정보통신기획평가원) 동향분석팀 담장자 E-mail: key@iitp.kr <br/>
            ALL RIGHTS RESERVED ⓒ 정보통신기획평가원
          </p>
        </div>
        <div className='link_box'>
          <div className='top_link_box'>
            <select name='' id=''>
              <option value=''>내부사이트 바로가기</option>
            </select>
            <Button className="flex items-center gap-2 py-2.75 px-4.5 rounded text-sm btn_style01" text="유관기관 바로가기" icon={ic_arrow} onClick={() => location.href='/'} />
          </div>
          <ul>
            <li><a href='javascript:;' className='ic_sns01'>트위터 바로가기</a></li>
            <li><a href='javascript:;' className='ic_sns02'>페이스북 바로가기</a></li>
            <li><a href='javascript:;' className='ic_sns03'>와이파이 바로가기</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
