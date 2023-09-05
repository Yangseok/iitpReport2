import React, { useState } from 'react';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import Button from 'Domain/Home/Common/Componet/Button';

export default function Filter() {
  /* tabButtons
    1: 과제 - 국가 R&D 과제 / 2: 과제 - IITP 내부 과제
    3: 특허 / 4: 논문 / 5: ICT 자료 / 6: 정부정책 / 7: 연구자 / 8: 기관 / 9: 뉴스
  */
  const tabButtons1 = [
    { id: 0, name: '기준연도', cnt: '12,931', onClick: () => setTabActive1(0) },
    { id: 1, name: '연구개발비', cnt: '12,931', onClick: () => setTabActive1(1) },
    { id: 2, name: '연구 개발기관', cnt: '12,931', onClick: () => setTabActive1(2) },
    { id: 3, name: '부처명', cnt: '12,931', onClick: () => setTabActive1(3) },
    { id: 4, name: '국제과학기술표준분류', cnt: '12,931', onClick: () => setTabActive1(4) },
  ];
  // const tabButtons2 = [
  //   { id: 0, name: '기준연도', cnt: '12,931', onClick: () => setTabActive1(0) },
  //   { id: 1, name: '연구개발비', cnt: '12,931', onClick: () => setTabActive1(1) },
  //   { id: 2, name: '연구 개발기관', cnt: '12,931', onClick: () => setTabActive1(2) },
  //   { id: 3, name: 'ICT 기술분류', cnt: '12,931', onClick: () => setTabActive1(3) },
  //   { id: 4, name: '연구수행주체', cnt: '12,931', onClick: () => setTabActive1(4) },
  // ];
  // const tabButtons3 = [
  //   { id: 0, name: '성과연도', cnt: '12,931', onClick: () => setTabActive1(0) },
  //   { id: 1, name: '출원등록 구분', cnt: '12,931', onClick: () => setTabActive1(1) },
  //   { id: 2, name: '출원인', cnt: '12,931', onClick: () => setTabActive1(2) },
  //   { id: 3, name: '해외출원여부', cnt: '12,931', onClick: () => setTabActive1(3) },
  // ];
  // const tabButtons4 = [ 
  //   { id: 0, name: '성과연도', cnt: '12,931', onClick: () => setTabActive1(0) },
  //   { id: 1, name: '논문 구분', cnt: '12,931', onClick: () => setTabActive1(1) },
  // ];
  // const tabButtons5 = [
  //   { id: 0, name: '발행연도', cnt: '12,931', onClick: () => setTabActive1(0) },
  //   { id: 1, name: '발행기관명', cnt: '12,931', onClick: () => setTabActive1(1) },
  // ];
  // const tabButtons6 = [
  //   { id: 0, name: '발행연도', cnt: '12,931', onClick: () => setTabActive1(0) },
  //   { id: 1, name: '출처명', cnt: '12,931', onClick: () => setTabActive1(1) },
  //   { id: 2, name: '부처명', cnt: '12,931', onClick: () => setTabActive1(2) },
  // ];
  // const tabButtons7 = [
  //   { id: 0, name: '제작기관', cnt: '12,931', onClick: () => setTabActive1(0) },
  // ];
  // const tabButtons8 = [
  //   { id: 0, name: '기관유형', cnt: '12,931', onClick: () => setTabActive1(0) },
  //   { id: 1, name: '업종명', cnt: '12,931', onClick: () => setTabActive1(1) },
  //   { id: 2, name: '지역', cnt: '12,931', onClick: () => setTabActive1(2) },
  // ];
  // const tabButtons9 = [
  //   { id: 0, name: '기준연도', cnt: '12,931', onClick: () => setTabActive1(0) },
  //   { id: 1, name: '주제별', cnt: '12,931', onClick: () => setTabActive1(1) },
  //   { id: 2, name: '출처명', cnt: '12,931', onClick: () => setTabActive1(2) },
  // ];
  const [tabActive1, setTabActive1] = useState(0);
  const [filterDisabled, setFilterDisabled] = useState(false);

  return (
    <section className='mb-10'>
      <div className='tab_btns tab_style04 grid_auto'>
        <ul>
          {tabButtons1?.map((e) => {
            return (
              <li key={e.id} className={(e.id === tabActive1) ? 'on' : ''}>
                <button type='button' onClick={e.onClick}>
                  <b>{e.name}</b>({e.cnt})
                </button>
              </li>
            );
          })}
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