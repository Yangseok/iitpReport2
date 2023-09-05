import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import imgResearcher01 from 'Assets/Images/researcher_img01.png';
import imgResearcher02 from 'Assets/Images/researcher_img02.png';
import imgResearcher03 from 'Assets/Images/researcher_img03.png';
import imgResearcher04 from 'Assets/Images/researcher_img04.png';
import imgResearcher05 from 'Assets/Images/researcher_img05.png';
import imgResearcher06 from 'Assets/Images/researcher_img06.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import common from 'Utill';
import { useSelector } from 'react-redux';
import { getSearchKeyword, getSelectKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import * as researcherAPI from 'Domain/Home/Discovery/API/ResearcherCall';

export default function DiscoveryResult() {
  const se = common.getSegment();
  const selectKeyword = useSelector(getSelectKeyword);
  const keyword = useSelector(getSearchKeyword);
  const [tabCount, setTabCount] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [projectData, setProjectData] = useState([]);
  const [researcherActive, setResearcherActive] = useState({id: -1, name: ''});
  const [simialityResearcher, setSimialityResearcher] = useState([]);
  const [subList, setSubList] = useState([]);

  const [searchButtonClick, setSearchButtonClick] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('score');

  const getList = useCallback(async () => {
    const se1 = se[1] ?? '';
    const se2 = se[2] ?? '';
    (async () => {
      const similarity = common.procSimilarity(selectKeyword);
      let filterObj = {};
      let searchParam = {};
      let data = [];
      if (se1 == 'search') {
        data = await researcherAPI.researcher('search',size,page,keyword,similarity,sort,filterObj,searchParam);
      } else if (se1 == 'discovery') {
        if (se2 == 'keyword') {
          data = await researcherAPI.researcher('discovery',size,page,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'file') {
          data = await researcherAPI.researcher('discovery',size,page,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'project') {
          data = await researcherAPI.researcher('discovery',size,page,keyword,similarity,sort,filterObj,searchParam);
        }
      }
      console.log(data?.data?.result);
      setTotalCount(data?.data?.result?.totalCount ?? 0);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const pushData = {
          id: data?.data?.result?.dataList?.[i]?.id ?? i,
          name: common.maskingName(data?.data?.result?.dataList?.[i]?.indvName ?? ''),
          agency: data?.data?.result?.dataList?.[i]?.orgn ?? '',
          assign: data?.data?.result?.dataList?.[i]?.projectCount ?? 0,
          link: data?.data?.result?.dataList?.[i]?.link ?? '#',
        };
        procData.push(pushData);
      }
  
      setProjectData(procData);
      setSearchButtonClick(false);
      setResearcherActive({ id: data?.data?.result?.dataList?.[0]?.id ?? -1, name: data?.data?.result?.dataList?.[0]?.indvName ?? '' });
    })();
  }, [searchButtonClick, page, size, sort, se]);

  const downExcel = useCallback(async () => {
    const se1 = se[1] ?? '';
    const se2 = se[2] ?? '';
    const excelSize = 1000;
    (async () => {
      const similarity = common.procSimilarity(selectKeyword);
      let filterObj = {};
      let searchParam = {};
      let data = [];
      if (se1 == 'search') {
        data = await researcherAPI.researcher('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
      } else if (se1 == 'discovery') {
        if (se2 == 'keyword') {
          data = await researcherAPI.researcher('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'file') {
          data = await researcherAPI.researcher('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'project') {
          data = await researcherAPI.researcher('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        }
      }
      console.log(data?.data?.result);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const pushData = [
          data?.data?.result?.dataList?.[i]?.title ?? '',
          data?.data?.result?.dataList?.[i]?.source ?? '',
          data?.data?.result?.dataList?.[i]?.contents ?? '',
          (data?.data?.result?.dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
        ];
        procData.push(pushData);
      }
      common.excelExport('down', ['ICT 자료명', '출처', '본문', '발행일'], procData);
    })();
  }, [sort, se]);

  const getDetail = useCallback(async () => {
    if (researcherActive.id === -1) return null;
    const se1 = se[1] ?? '';
    const se2 = se[2] ?? '';
    (async () => {
      let data = [];
      if (se1 == 'search') {
        data = await researcherAPI.researcherDetail(researcherActive.id);
      } else if (se1 == 'discovery') {
        if (se2 == 'keyword') {
          data = await researcherAPI.researcherDetail(researcherActive.id);
        } else if (se2 == 'file') {
          data = await researcherAPI.researcherDetail(researcherActive.id);
        } else if (se2 == 'project') {
          data = await researcherAPI.researcherDetail(researcherActive.id);
        }
      }
      // const data = await orgnAPI.orgnDetail('0008634982');
      console.log(data?.data?.result);
      let simiality = [];
      for (let i in data?.data?.result?.simialityIndvList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const simialityPushData = {
          id: i,
          name: data?.data?.result?.simialityIndvList?.[i]?.orgnName ?? '',
          relation: common.colorSet(data?.data?.result?.simialityIndvList?.[i]?.weight ?? 0)
        };
        simiality.push(simialityPushData);
      }
      setSimialityResearcher(simiality);

      let subList = [];
      for (let i in data?.data?.result?.indvResultInfo?.projectIn ?? []) {
        // console.log(i, data?.data?.result?.indvResultInfo?.projectIn?.[i]);
        const period = data?.data?.result?.indvResultInfo?.projectIn?.[i]?.period ?? '';
        const division = [];
        const keywordt = data?.data?.result?.indvResultInfo?.projectIn?.[i]?.keywords ?? [];
        const subListPushData = {
          id: data?.data?.result?.indvResultInfo?.projectIn?.[i]?.projectNumber ?? i,
          progress: data?.data?.result?.indvResultInfo?.projectIn?.[i]?.progress ?? false,
          title: data?.data?.result?.indvResultInfo?.projectIn?.[i]?.bigProjectName ?? '',
          price: (data?.data?.result?.indvResultInfo?.projectIn?.[i]?.fund ?? '') + '억',
          period: period.replaceAll('-','.'), 
          agency: data?.data?.result?.indvResultInfo?.projectIn?.[i]?.researchAgencyName ?? '',
          name: data?.data?.result?.indvResultInfo?.projectIn?.[i]?.researchManagerName ?? '',
          department: data?.data?.result?.indvResultInfo?.projectIn?.[i]?.orderAgencyName ?? '',
          performance: data?.data?.result?.indvResultInfo?.projectIn?.[i]?.performance ?? '',
          division: division.join(' / '),
          keyword: keywordt.join(', '),
        };
        subList.push(subListPushData);
      }
      setSubList(subList);
    })();
  }, [researcherActive, se]);

  // 연구자 선택 시
  const onResearcherSelect = (e, id, name) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      setResearcherActive({ id, name });
    }
  };

  useEffect(() => {
    getList();
  }, [page, size, sort]);

  useEffect(() => {
    if (searchButtonClick) {
      setPage(1); 
      getList();
    }
  }, [searchButtonClick]);

  useEffect(() => {
    (async () => {
      const data = await discoveryAPI.searchAll(keyword,1);
      setTabCount({
        'all': data?.data?.result?.countInfo?.all ?? 0,
        1: data?.data?.result?.countInfo?.project ?? 0,
        2: data?.data?.result?.countInfo?.patent ?? 0,
        3: data?.data?.result?.countInfo?.paper ?? 0,
        4: data?.data?.result?.countInfo?.ict_report ?? 0,
        5: data?.data?.result?.countInfo?.policy ?? 0,
        6: data?.data?.result?.countInfo?.indv ?? 0,
        7: data?.data?.result?.countInfo?.orgn ?? 0,
        8: data?.data?.result?.countInfo?.news ?? 0,
      });
    })();
  }, [keyword]);

  useEffect(() => {
    getDetail();
  }, [researcherActive]);

  // const tempData1 = [
  //   {
  //     id: 0,
  //     name: '장*탁',
  //     agency: '서울대학교',
  //     assign: '43',
  //     link: '#',
  //   },
  //   {
  //     id: 1,
  //     name: '장*탁',
  //     agency: '서울대학교',
  //     assign: '43',
  //     link: '#',
  //   },
  // ];
  // const tempData2 = [
  //   {
  //     id: 0,
  //     name: '장*탁',
  //     relation: 0,
  //   },
  //   {
  //     id: 1,
  //     name: '차*훈',
  //     relation: 1,
  //   },
  //   {
  //     id: 2,
  //     name: '임*원',
  //     relation: 2,
  //   },
  //   {
  //     id: 3,
  //     name: '정*은',
  //     relation: 3,
  //   },
  //   {
  //     id: 4,
  //     name: '이*호',
  //     relation: 4,
  //   },
  //   {
  //     id: 5,
  //     name: '장*탁',
  //     relation: 5,
  //   },
  // ];
  // const tempData3 = [
  //   {
  //     id: 0,
  //     progress: true,
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //     department: '중소벤처기업부',
  //     performance: '논문(1), 특허(3)',
  //     division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
  //     keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
  //   },
  //   {
  //     id: 1,
  //     progress: false,
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //     department: '중소벤처기업부',
  //     performance: '논문(1), 특허(3)',
  //     division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
  //     keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
  //   },
  // ];

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              연구자 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={icArrow} onClick={downExcel} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order' onChange={(e) => {setPage(1); setSort(e.target.value);}}>
                  <option value='score'>관련도순</option>
                  <option value='name'>이름순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num' onChange={(e) => {setPage(1); setSize(e.target.value);}}>
                  <option value='10'>10</option>
                  <option value='20'>20</option>
                  <option value='30'>30</option>
                  <option value='50'>50</option>
                  <option value='100'>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={icFilter} />
            </div>
          </div>
          
          <div className='flex items-start gap-6 mt-2'>
            <div className='w-120'>
              <div className='list_style02'>
                <ul>
                  {(projectData?.length > 0)
                    ? projectData?.map((e) => (
                      <li 
                        key={e.id} 
                        className={`flex items-center gap-4${(e.id === researcherActive.id) ? ' on' : ''}`}
                        onClick={(event) => onResearcherSelect(event, e.id, e.name)} 
                        onKeyUp={(event) => (event.key === 'Enter') && onResearcherSelect(event, e.id, e.name)} 
                        role={'button'}
                        tabIndex={0}
                      >
                        <img src={imgResearcher01} alt='연구자 프로필 이미지' className='w-11' />
                        <div className='flex-1'>
                          <div className='flex items-center justify-between gap-2'>
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
                <Pagination total={totalCount} page={page} onClick={(page) => setPage(page)} />
              </div>
            </div>
            <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
              <div>
                <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 관련 연구자</h5>
                <ul className='flex mt-4'>
                  {simialityResearcher?.map((e, i) => {
                    let imgSrc = '';
                    if(e.relation === 0) {
                      imgSrc = imgResearcher01;
                    } else if(e.relation === 1) {
                      imgSrc = imgResearcher02;
                    } else if(e.relation === 2) {
                      imgSrc = imgResearcher03;
                    } else if(e.relation === 3) {
                      imgSrc = imgResearcher04;
                    } else if(e.relation === 4) {
                      imgSrc = imgResearcher05;
                    } else if(e.relation === 5) {
                      imgSrc = imgResearcher06;
                    }

                    return <li key={e.id} className='w-1/6 px-1'>
                      <div className={`img_wrap rounded-full w-15 h-15 mx-auto ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
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
                    {(subList?.length > 0) 
                      ? subList?.map((e) => {
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}
