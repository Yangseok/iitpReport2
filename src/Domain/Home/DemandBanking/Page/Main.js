import React, { useEffect, useState } from 'react';
import 'Assets/Css/Demand.css';
import icGuide from 'Assets/Images/ic_guide.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import Layout from 'Domain/Home/Common/Layout/Sub';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import CheckListWrap from 'Domain/Home/DemandBanking/Component/CheckListWrap';
import RcSlider from 'rc-slider';
import { useNavigate } from 'react-router-dom';

export default function Main() {
  const tempData = [
    {
      id: 0,
      status: 1,
      type: 2,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 210,
      active: false,
    },
    {
      id: 1,
      status: 1,
      type: 1,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 210,
      active: false,
    },
    {
      id: 2,
      status: 2,
      type: 1,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 210,
      active: false,
    },
    {
      id: 3,
      status: 2,
      type: 2,
      period: '2023.01.05 ~ 2023.03.30',
      title: '2023년 정보통신방송 R&D 신규사업 기획을 위한 사업요조사',
      count: 0,
      active: false,
    },
  ];

  const navigate = useNavigate();
  const [rangeValue, setRangeValue] = useState([2022, 2023]);
  const [filterShow, setFilterShow] = useState(false);
  const [sortType, setSortType] = useState(0);
  const [sortStatus, setSortStatus] = useState(0);
  const [checkAll, setCheckAll] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [data, setData] = useState([]);

  let rangeMarks = {};
  const rangeMin = 2012;
  const rangeMax = 2023;
  for(let i = rangeMin; i <= rangeMax; i++) {
    rangeMarks[i] = i;
  }

  // 전체 선택 클릭
  const onAllItemClick = () => {
    const newData = data?.map(e => {
      return {...e, active: !checkAll};
    });
    setData(newData);
    setCheckAll(state => !state);
  };

  const handleItemClick = (id) => {
    const newData = data?.map(e => {
      if(e.id === id) {
        return {...e, active: !e.active};
      }
      return e;
    });
    setData(newData);
  };

  useEffect(() => {
    const activeItems = data.filter(e => e.active === true);
    if(activeItems.length > 0) {
      setBtnDisabled(false);

      if(activeItems.length === data.length) {
        setCheckAll(true);
      } else {
        setCheckAll(false);
      }
    } else {
      setBtnDisabled(true);
    }
  }, [data]);

  useEffect(() => {
    setData(tempData);
  }, []);

  return (
    <Layout>
      <section>
        <div className='container relative'>
          <div className='reception_wrap'>
            <p className='text-base font-bold text-color-dark'>
              <strong>수요조사 접수현황</strong>
            </p>
            <div className='flex items-center justify-between mt-2'>
              <p className='text-base font-bold text-color-dark'>전체</p>
              <p className='text-base font-bold text-color-main'>2,155건</p>
            </div>
            <div className='flex items-center justify-between mt-2'>
              <p className='text-base font-bold text-color-dark'>정기</p>
              <p className='text-base font-bold text-color-main'>991건</p>
            </div>
            <div className='flex items-center justify-between mt-2'>
              <p className='text-base font-bold text-color-dark'>수시</p>
              <p className='text-base font-bold text-color-main'>1,164건</p>
            </div>
          </div>

          <div className='flex items-center gap-10'>
            <h2 className='py-3 px-10 rounded-3xl text-base font-bold text-color-white bg-color-main'>
              공고별 보기
            </h2>
            <div className='rc_custom flex-1'>
              <RcSlider
                range
                min={rangeMin}
                max={rangeMax}
                marks={rangeMarks}
                value={rangeValue}
                onChange={(e) => setRangeValue(e)}
              />
            </div>
            <button type='button' className='gap-1'>
              <img src={icGuide} alt='서비스 가이드' className='w-6' />
              서비스 가이드
            </button>
          </div>
          <div className='flex items-center justify-between mt-6'>
            <div className='sorting_wrap'>
              <dl>
                <dt>공고유형</dt>
                <dd className='tab_btns tab_style06'>
                  <ul>
                    <li className={(sortType === 0) ? 'on' : ''}>
                      <button type='button' onClick={() => setSortType(0)}>전체</button>
                    </li>
                    <li className={(sortType === 1) ? 'on' : ''}>
                      <button type='button' onClick={() => setSortType(1)}>정기</button>
                    </li>
                    <li className={(sortType === 2) ? 'on' : ''}>
                      <button type='button' onClick={() => setSortType(2)}>수시</button>
                    </li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt>공고상태</dt>
                <dd className='tab_btns tab_style06'>
                  <ul>
                    <li className={(sortStatus === 0) ? 'on' : ''}>
                      <button type='button' onClick={() => setSortStatus(0)}>진행중</button>
                    </li>
                    <li className={(sortStatus === 1) ? 'on' : ''}>
                      <button type='button' onClick={() => setSortStatus(1)}>마감</button>
                    </li>
                  </ul>
                </dd>
              </dl>
            </div>
            <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
          </div>
          {(filterShow)
            ? <div className='relative mt-6'>
              <div className='sorting_wrap'>
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
              </div>
              <button type='button' className='sorting_reset_btn text-sm font-medium text-color-placeholder'>선택 초기화 <img src={icReset ?? icReset02} alt='선택 초기화' className='w-6' /></button>
              <Button name="필터 적용" icon={icSearch} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
            </div>
            : ''
          }
        </div>
      </section>
      <div className='section mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <button type='button' className={`btn_check_text${checkAll ? ' check' : ''}`} onClick={onAllItemClick}>
              전체 선택
            </button>
            <Button name='선택보기' className={`h-12 px-4 rounded text-sm font-bold btn_style07${!btnDisabled ? ' on' : ''}`} onClick={() => (!btnDisabled) && navigate('/demandbanking/result')}></Button>
          </div>
          <div className='mt-2'>
            <CheckListWrap data={data} onClick={handleItemClick} />
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
