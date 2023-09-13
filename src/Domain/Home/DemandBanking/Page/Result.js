import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import arrDrop from 'Assets/Images/arr_drop.png';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import Layout from 'Domain/Home/Common/Layout/Sub';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import CheckListWrap from 'Domain/Home/DemandBanking/Component/CheckListWrap';
import DemandListItem from 'Domain/Home/DemandBanking/Component/DemandListItem';
import DemandListItemDetail from 'Domain/Home/DemandBanking/Component/DemandListItemDetail';
import $ from 'jquery';

export default function DemandResult() {
  const tempData1 = [
    {
      id: 0,
      status: 1,
      type: 2,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 210,
      active: true,
    },
    {
      id: 1,
      status: 1,
      type: 1,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 210,
      active: true,
    },
    {
      id: 2,
      status: 2,
      type: 1,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 210,
      active: true,
    },
    {
      id: 3,
      status: 2,
      type: 2,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 0,
      active: true,
    },
  ];
  const tempData2 = [
    {
      id: 0,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 1,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 2,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
  ];
  const tempData3 = [
    {
      id: 0,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 1,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 2,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
  ];

  const [data, setData] = useState([]);
  const [fold, setFold] = useState(false);
  const [filterShow, setFilterShow] = useState(false);
  const [demandActive, setDemandActive] = useState(null);
  
  const handleItemClick = (id) => {
    const newData = data?.map(e => {
      if(e.id === id) {
        return {...e, active: !e.active};
      }
      return e;
    });
    setData(newData);
  };

  // 유사 기술 조사서 버튼 클릭
  const onItemSlide = (e, id) => {
    const pd = 24;
    const liEl = $(e.currentTarget).parents('li');
    const contsEl = liEl.find('.conts_box');

    setDemandActive(id);
    liEl.siblings().removeClass('on');
    liEl.siblings().find('.conts_box').css({ 'height': 0, 'paddingTop': 0, 'paddingBottom': 0 });

    if(!liEl.hasClass('on')) {
      liEl.addClass('on');
      contsEl.css({ 
        'height': `${contsEl.prop('scrollHeight') + pd * 2}px`, 
        'paddingTop': `${pd}px`, 
        'paddingBottom': `${pd}px` 
      });
    } else {
      liEl.removeClass('on');
      contsEl.css({ 'height': 0, 'paddingTop': 0, 'paddingBottom': 0 });
      setDemandActive(null);
    }
  };

  useEffect(() => {
    setData(tempData1);
  }, []);
  
  return (
    <Layout>
      <section>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h2 className='test-base font-bold text-color-dark'>선택한 공고</h2>
            <button type='button' className={`btn_fold${(fold) ? ' fold' : ''}`} onClick={() => setFold(state => !state)}>
              {(fold) ? '펼치기' : '접기'} 
              <img src={arrDrop} alt='화살표' className='w-6' />
            </button>
          </div>
          {(!fold)
            && <div className='mt-4'>
              <CheckListWrap data={data} onClick={handleItemClick} />
            </div>
          }
        </div>
      </section>
      <section className='mt-10'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h3 className='text-base font-bold text-color-dark'>
              기술수요조사서 <span className='text-color-main'>4,200건</span>
            </h3>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={icArrow} onClick={() => {}} />
              <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
            </div>
          </div>

          {(filterShow) 
            ? <div className='relative mt-2 mb-10'>
              <div className='sorting_wrap'>
                <dl>
                  <dt>접수기간</dt>
                  <dd>
                    <input type='date' name='' id='' defaultValue='' />
                    <span className='text-base font-medium text-color-dark mx-3'> - </span>
                    <input type='date' name='' id='' defaultValue='' />
                  </dd>
                </dl>
                <dl className='w-full'>
                  <dt>ICT 기술분류</dt>
                  <dd className='sorting_ict'>
                    <div>
                      <label htmlFor='sortBig' className='hidden_text'>대분류</label>
                      <select name='sortBig' id='sortBig'>
                        <option value=''>대분류</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortMiddle' className='hidden_text'>중분류</label>
                      <select name='sortMiddle' id='sortMiddle'>
                        <option value=''>중분류</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortSmall' className='hidden_text'>소분류</label>
                      <select name='sortSmall' id='sortSmall'>
                        <option value=''>소분류</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor='sortDetail' className='hidden_text'>세분류</label>
                      <select name='sortDetail' id='sortDetail'>
                        <option value=''>세분류</option>
                      </select>
                    </div>
                  </dd>
                </dl>
                <dl>
                  <dt>접수기관명</dt>
                  <dd>
                    <input type='text' name='' id='' defaultValue='' />
                  </dd>
                </dl>
                <dl>
                  <dt>신청인</dt>
                  <dd>
                    <input type='text' name='' id='' defaultValue='' />
                  </dd>
                </dl>
                <dl className='flex-1'>
                  <dt>기술수요조사명</dt>
                  <dd className='flex-1'>
                    <input type='text' name='' id='' defaultValue='' className='w-full' />
                  </dd>
                </dl>
              </div>
              <button type='button' className='sorting_reset_btn text-sm font-medium text-color-placeholder'>선택 초기화 <img src={icReset ?? icReset02} alt='선택 초기화' className='w-6' /></button>
              <Button name="필터 적용" icon={icSearch} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
            </div>
            : ''
          }

          <div className='list_style01 toggle_type mt-2'>
            <ul>
              {(tempData2?.length > 0)
                ? tempData2?.map(e => {
                  return <DemandListItem 
                    key={e.id}
                    className={(e.id === demandActive) ? 'on' : ''}
                    title={'초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발'}
                    contents={<>
                      <div className='text_style01'>
                        <p className='text-sm text-color-regular'>기관명: <span className='font-medium text-color-main'>{e.agency}</span></p>
                        <p className='text-sm text-color-regular'>신청인: <span className='font-medium text-color-main'>{e.name}</span></p>
                        <p className='text-sm text-color-regular'>등록 ICT 분류: <span className='font-medium text-color-main'>{e.registration}</span></p>
                        <p className='text-sm text-color-regular'>추천 ICT 분류: <span className='font-medium text-color-main'>{e.recommend}</span></p>
                      </div>
                    </>}
                    desc={<>
                      <p className='text-sm font-medium text-color-regular mb-2'>{e.pblanc}</p>
                    </>}
                    btns={<>
                      <div className='flex items-start gap-4'>
                        {/* 파일이 존재하면 파일 분석 버튼 생성 */}
                        <NavLink to={`/demandbanking/file/result/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05'>파일 분석</NavLink>
                        <div className='flex flex-col gap-2.5'>
                          <NavLink to={`/demandbanking/view/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</NavLink>
                          <NavLink to={`/demandbanking/merge/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05'>병합수요↗</NavLink>
                          <button type='button' className={`h-5 px-1.5 rounded-sm text-xs font-medium btn_style05${(e.id === demandActive) ? ' on' : ''}`} onClick={(event) => onItemSlide(event, e.id)}>유사기술조사서</button>
                        </div>
                      </div>
                    </>}
                  >
                    <DemandListItemDetail data={tempData3} />
                  </DemandListItem>;
                })
                : <li className='nodata'>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }

            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
    </Layout>
  );
}