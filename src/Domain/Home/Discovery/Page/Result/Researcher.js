import React, { useState } from 'react';
import 'Assets/Css/Discovery.css';
import ic_arrow from 'Assets/Images/ic_arrow02.png';
import ic_filter from 'Assets/Images/ic_filter.png';
import img_researcher01 from 'Assets/Images/researcher_img01.png';
import img_researcher02 from 'Assets/Images/researcher_img02.png';
import img_researcher03 from 'Assets/Images/researcher_img03.png';
import img_researcher04 from 'Assets/Images/researcher_img04.png';
import img_researcher05 from 'Assets/Images/researcher_img05.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function DiscoveryResult() {
  const tempData6_1 = [
    {
      id: 0,
      name: '장*탁',
      agency: '서울대학교',
      assign: '43',
      link: '#',
    },
    {
      id: 1,
      name: '장*탁',
      agency: '서울대학교',
      assign: '43',
      link: '#',
    },
  ];
  const tempData6_2 = [
    {
      id: 0,
      name: '장*탁',
      relation: 0,
    },
    {
      id: 1,
      name: '차*훈',
      relation: 1,
    },
    {
      id: 2,
      name: '임*원',
      relation: 2,
    },
    {
      id: 3,
      name: '정*은',
      relation: 3,
    },
    {
      id: 4,
      name: '이*호',
      relation: 4,
    },
  ];
  const tempData6_3 = [
    {
      id: 0,
      progress: '종료',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
    {
      id: 1,
      progress: '종료',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];

  const [researcherActive, setResearcherActive] = useState({});

  const onResearcherSelect = (e, id, name) => {
    if(e.target.nodeName !== 'BUTTON') {
      setResearcherActive({ id, name });
      console.log(id, '연구원 선택!');
    }
  };

  return (
    <DiscoveryResultLayout>
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              연구자 <span className='text-color-main'>50,150건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>
          
          <div className='flex items-start gap-6 mt-2'>
            <div className='w-120'>
              <div className='list_style02'>
                <ul>
                  {(tempData6_1?.length > 0)
                    ? tempData6_1?.map((e) => (
                      <li 
                        key={e.id} 
                        className={`flex items-center gap-4${(e.id === researcherActive.id) ? ' on' : ''}`}
                        onClick={(event) => onResearcherSelect(event, e.id, e.name)} 
                        onKeyUp={(event) => (event.key === 'Enter') && onResearcherSelect(event, e.id)} 
                        tabIndex={0}
                      >
                        <img src={img_researcher01} alt='연구자 프로필 이미지' className='w-11' />
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <p className='text-base font-bold text-color-main'>{e.name}</p>
                            <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.name} 연구자 페이지`}>연구자 보기↗</a>
                          </div>
                          <div className='text_style01'>
                            <p className='text-sm text-color-regular'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                          </div>
                        </div>
                      </li>
                    ))
                    : <li>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
              <div className='mt-10'>
                <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
              </div>
            </div>
            <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
              <div>
                <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 관련 연구자</h5>
                <ul className='flex gap-16 px-8 mt-4'>
                  {tempData6_2?.map((e, i) => {
                    let imgSrc = '';
                    if(e.relation === 0) {
                      imgSrc = img_researcher01;
                    } else if(e.relation === 1) {
                      imgSrc = img_researcher02;
                    } else if(e.relation === 2) {
                      imgSrc = img_researcher03;
                    } else if(e.relation === 3) {
                      imgSrc = img_researcher04;
                    } else if(e.relation === 4) {
                      imgSrc = img_researcher05;
                    }

                    return <li key={e.id}>
                      <div className={`img_wrap rounded-full w-15 h-15 ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
                        <img src={imgSrc} alt='연구자 프로필 이미지' className='w-11' />
                      </div>
                      <p className={`mt-1 text-sm text-center ${(i === 0) ? 'text-color-main' : 'text-color-dark'}`}>{e.name}</p>
                    </li>;
                  })}
                </ul>
              </div>
              <div className='mt-10'>
                <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 과제</h5>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tempData6_3?.length > 0) 
                      ? tempData6_3?.map((e) => {
                        return <li key={e.id}>
                          <div className='flex justify-between gap-2'>
                            <div className='flex gap-2 flex-1'>
                              {/* 진행중: tag_style01 | 종료: tag_style02 */}
                              <span className='tag_style02 mt-0.5'>{e.progress}</span>
                              <p className='text-base font-bold text-color-dark flex-1'>{e.title}</p>
                            </div>
                            <a href={`${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</a>
                          </div>
                          <div className='text_style01 mt-2'>
                            <div>
                              <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            </div>
                            <div>
                              <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                              <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                            </div>
                            <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                          </div>
                        </li>;
                      })
                      : <li>
                        <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                      </li>
                    }
                  </ul>
                </div>
                <div className='mt-10'>
                  <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}
