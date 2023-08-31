import React, { useEffect, useState } from 'react';
import ic_arrow from 'Assets/Images/ic_arrow02.png';
import ic_filter from 'Assets/Images/ic_filter.png';
import img_building01 from 'Assets/Images/building_img01.png';
import img_building02 from 'Assets/Images/building_img02.png';
import img_building03 from 'Assets/Images/building_img03.png';
import img_building04 from 'Assets/Images/building_img04.png';
import img_building05 from 'Assets/Images/building_img05.png';
import img_building06 from 'Assets/Images/building_img06.png';
import img_building07 from 'Assets/Images/building_img07.png';
import img_building08 from 'Assets/Images/building_img08.png';
import img_building09 from 'Assets/Images/building_img09.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';

export default function DiscoveryResult() {
  const tempData1 = [
    {
      id: 0,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '10',
      patent: '10',
      institue: null,
      safety: 2,
      sales: 10,
      followup: true,
    },
    {
      id: 1,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '43',
      patent: '10',
      institue: 'OOO연구소',
      safety: 0,
      sales: 5,
      followup: false,
    },
    {
      id: 2,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '10',
      patent: '10',
      institue: 'OOO연구소',
      safety: 1,
      sales: 25,
      followup: true,
    },
  ];
  const tempData2 = [
    {
      id: 0,
      name: '주식회사 마인즈랩',
      relation: 0,
    },
    {
      id: 1,
      name: '솔트룩스',
      relation: 1,
    },
    {
      id: 2,
      name: '아이브릭스',
      relation: 2,
    },
    {
      id: 3,
      name: '주식회사 빅스터',
      relation: 3,
    },
    {
      id: 4,
      name: '주식회사 빅스터',
      relation: 4,
    },
    {
      id: 5,
      name: '주식회사 빅스터',
      relation: 5,
    },
  ];
  const tempData3 = [
    {
      id: 0,
      progress: true,
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
      progress: false,
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

  const [orgnActive, setOrgnActive] = useState({});

  // 기관 선택 시
  const onOrgnSelect = (e, id, name) => {
    if(e.target.nodeName !== 'BUTTON') {
      setOrgnActive({ id, name });
    }
  };

  useEffect(() => {
    // 처음 데이터 노출
    setOrgnActive({ id: 0, name: '주식회사 마인즈랩(MINDS LAB., INC.)' });
  }, []);

  return (
    <DiscoveryResultLayout>
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              기관 <span className='text-color-main'>100,300건</span>
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
                  {(tempData1?.length > 0)
                    ? tempData1?.map((e) => {
                      return (
                        <li 
                          key={e.id} 
                          className={`flex items-center gap-4${(e.id === orgnActive.id) ? ' on' : ''}`}
                          onClick={(event) => onOrgnSelect(event, e.id, e.name)} 
                          onKeyUp={(event) => (event.key === 'Enter') && onOrgnSelect(event, e.id)} 
                          role={'button'}
                          tabIndex={0}
                        >
                          <div className='tooltip_wrap' tabIndex={0}>
                            {(e.safety === 0) 
                              ? <>
                                <img src={img_building01} alt='기관 재무안전성: 위험 이미지' className='w-11' />
                                <span className='tooltip_style02 min-w-23'>재무안전성: 위험</span>
                              </>
                              : (e.safety === 1) 
                                ? <>
                                  <img src={img_building02} alt='기관 재무안전성: 보통 이미지' className='w-11' />
                                  <div className='tooltip_style03 min-w-23'>재무안전성: 보통</div>
                                </>
                                : <>
                                  <img src={img_building03} alt='기관 재무안전성: 안정 이미지' className='w-11' />
                                  <div className='tooltip_style04 min-w-23'>재무안전성: 안정</div>
                                </>}
                          </div>
                          <div className='flex-1'>
                            <div className='flex items-center gap-2'>
                              <p className='text-base font-bold text-color-main'>{e.name}</p>
                              <div className='tooltip_wrap' tabIndex={0}>
                                <span className="tag_style03">{e.sales}</span>
                                <div className='tooltip_style01 min-w-30'>해당 산업 매출상위(%)</div>
                              </div>
                              {(e.followup)
                                && (
                                  <div className='tooltip_wrap' tabIndex={0}>
                                    <span className="tag_style04">사후</span>
                                    <div className='tooltip_style01 min-w-25'>사후관리 대상 기업</div>
                                  </div>
                                )
                              }
                            </div>
                            <div className='text_style01'>
                              <p className='text-sm text-color-regular'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                              <p className='text-sm text-color-regular'>특허: <span className='font-medium text-color-main'>{e.patent}건</span></p>
                              {(e?.institue) && <p className='text-sm text-color-regular'>부설연구소: <span className='font-medium text-color-main'>{e.institue}</span></p>}
                            </div>
                          </div>
                        </li>
                      );
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
            <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
              <div>
                <h5 className='text-base font-bold text-color-dark'>{orgnActive.name} 유사 기관</h5>
                <ul className='flex mt-4'>
                  {tempData2?.map((e, i) => {
                    let imgSrc = '';
                    if(e.relation === 0) {
                      imgSrc = img_building04;
                    } else if(e.relation === 1) {
                      imgSrc = img_building05;
                    } else if(e.relation === 2) {
                      imgSrc = img_building06;
                    } else if(e.relation === 3) {
                      imgSrc = img_building07;
                    } else if(e.relation === 4) {
                      imgSrc = img_building08;
                    } else if(e.relation === 5) {
                      imgSrc = img_building09;
                    }

                    return <li key={e.id} className='w-1/6 px-1'>
                      <div className={`img_wrap rounded-full w-15 h-15 mx-auto ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
                        <img src={imgSrc} alt='기관 이미지' className='w-11' />
                      </div>
                      <p className={`mt-1 text-sm text-center ${(i === 0) ? 'text-color-main' : 'text-color-dark'}`}>{e.name}</p>
                    </li>;
                  })}
                </ul>
              </div>
              <div className='mt-10'>
                <div className='flex items-center gap-5'>
                  <h5 className='text-base font-bold text-color-dark'>{orgnActive.name}</h5>
                  <div className='tab_btns tab_style04'>
                    <ul>
                      <li className='on'>
                        <button type='button' onClick={() => {}}>과제(83)</button>
                      </li>
                      <li>
                        <button type='button' onClick={() => {}}>특허(10)</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tempData3?.length > 0) 
                      ? tempData3?.map((e) => {
                        return  <ListItem 
                          key={e.id}
                          tag={(e?.progress !== null) 
                            ? (e.progress) ? 1 : 2 
                            : ''}
                          title={e.title}
                          contents={<>
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
                          </>}
                          desc={<>
                            <a href={`${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</a>
                          </>}
                        />;
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
