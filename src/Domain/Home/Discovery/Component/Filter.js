import React, { useState } from 'react';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import Button from 'Domain/Home/Common/Componet/Button';

export default function Filter() {
  const [filterDisabled, setFilterDisabled] = useState(false);

  return (
    <section className='mb-10'>
      <div className='tab_btns tab_style04 grid_auto'>
        <ul>
          <li className='on'>
            <button type='button'>
              <b>기준연도</b>(12,931)
            </button>
          </li>
          <li>
            <button type='button'>
              <b>연구개발비</b>(12,931)
            </button>
          </li>
          <li>
            <button type='button'>
              <b>연구 개발기관</b>(12,931)
            </button>
          </li>
          <li>
            <button type='button'>
              <b>부처명</b>(12,931)
            </button>
          </li>
          <li>
            <button type='button'>
              <b>국제과학기술표준분류</b>(12,931)
            </button>
          </li>
        </ul>
      </div>
      <div className='filter_btns'>
        <ul>
          <li>
            <button type='button' className='on'>
              <b className='text-base'>2023</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button' className='on'>
              <b className='text-base'>2022</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button'>
              <b className='text-base'>2021</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button'>
              <b className='text-base'>2020</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button'>
              <b className='text-base'>2019</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button'>
              <b className='text-base'>2018</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button'>
              <b className='text-base'>2017</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button'>
              <b className='text-base'>2016</b> (2,000)
            </button>
          </li>
          <li>
            <button type='button'>
              <b className='text-base'>2015</b> (2,000)
            </button>
          </li>
        </ul>
      </div>
      <div className='filter_select_wrap mt-6'>
        <div>
          <div className='conts_box'>
            <p>기준연도</p>
            <ul>
              <li>
                <span>2023</span>
                <button type='button' className='x_btn'>선택 필터 삭제</button>
              </li>
              <li>
                <span>2022</span>
                <button type='button' className='x_btn'>선택 필터 삭제</button>
              </li>
            </ul>
          </div>
          <div className='conts_box'>
            <p>연구 개발비</p>
            <ul>
              <li>
                <span>1억이상~2억미만</span>
                <button type='button' className='x_btn'>선택 필터 삭제</button>
              </li>
            </ul>
          </div>
          <div className='conts_box'>
            <p>연구 개발기관</p>
            <ul>
              <li>
                <span>서울대학교</span>
                <button type='button' className='x_btn'>선택 필터 삭제</button>
              </li>
            </ul>
          </div>
          <div className='conts_box'>
            <p>부처명</p>
            <ul>
              <li>
                <span>미래창조과학부</span>
                <button type='button' className='x_btn'>선택 필터 삭제</button>
              </li>
            </ul>
          </div>
          <div className='conts_box'>
            <p>국제과학기술표준분류</p>
            <ul>
              <li>
                <span>생명과학</span>
                <button type='button' className='x_btn'>선택 필터 삭제</button>
              </li>
            </ul>
          </div>
        </div>
        <button type='button' className='filter_reset_btn' disabled={filterDisabled} onClick={() => setFilterDisabled(state => !state)}>
          선택 초기화
          <img src={(filterDisabled) ? icReset : icReset02} alt='선택 초기화' className='w-6' />
        </button>
      </div>
      <Button className='gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='필터 적용' icon={icSearch} onClick={() => {}} />
    </section>
  );
}