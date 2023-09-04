import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import img_researcher01 from 'Assets/Images/researcher_img01.png';
import img_researcher02 from 'Assets/Images/researcher_img02.png';
import img_researcher03 from 'Assets/Images/researcher_img03.png';
import img_researcher04 from 'Assets/Images/researcher_img04.png';
import img_researcher05 from 'Assets/Images/researcher_img05.png';
import img_researcher06 from 'Assets/Images/researcher_img06.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import common from 'Utill';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSearchKeyword, getSelectKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import * as ictAPI from 'Domain/Home/Discovery/API/IctCall';

export default function DiscoveryResult() {

  const params = useParams();
  const paramSe2 = params?.se2;
  const selectKeyword = useSelector(getSelectKeyword);
  const keyword = useSelector(getSearchKeyword);
  const [tabCount, setTabCount] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [projectData, setProjectData] = useState([]);
  console.log(projectData);

  const [searchButtonClick, setSearchButtonClick] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('score');

  const getKeywordList = useCallback(async () => {
    switch (paramSe2) {
    case 'keyword':
      (async () => {
        const similarity = common.procSimilarity(selectKeyword);
        let filterObj = {};
        let searchParam = {};
        const data = await ictAPI.ict('search',size,page,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        setTotalCount(data?.data?.result?.totalCount ?? 0);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          procData.push({
            id: data?.data?.result?.dataList?.[i]?.applNumber ?? i,
            title: data?.data?.result?.dataList?.[i]?.title ?? '',
            content: data?.data?.result?.dataList?.[i]?.contents ?? '',
            date: (data?.data?.result?.dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
            agency: data?.data?.result?.dataList?.[i]?.source ?? '',
            link: data?.data?.result?.dataList?.[i]?.link ?? '',
            view: data?.data?.result?.dataList?.[i]?.view ?? '',
          });
        }
    
        setProjectData(procData);
        setSearchButtonClick(false);
      })();
      break;
      
    default:
      break;
    }
  }, [searchButtonClick, page, size, sort]);

  const downExcel = useCallback(async () => {
    const excelSize = 1000;
    switch (paramSe2) {
    case 'keyword':
      (async () => {
        const similarity = common.procSimilarity(selectKeyword);
        let filterObj = {};
        let searchParam = {};
        const data = await ictAPI.ict('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        setTotalCount(data?.data?.result?.totalCount ?? 0);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          procData.push([
            data?.data?.result?.dataList?.[i]?.title ?? '',
            data?.data?.result?.dataList?.[i]?.source ?? '',
            data?.data?.result?.dataList?.[i]?.contents ?? '',
            (data?.data?.result?.dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
          ]);
        }
        common.excelExport('down', ['ICT 자료명', '출처', '본문', '발행일'], procData);
      })();
      break;
        
    default:
      break;
    }
  }, [sort]);

  useEffect(() => {
    getKeywordList();
  }, [page, size, sort]);

  useEffect(() => {
    if (searchButtonClick) {
      setPage(1); 
      getKeywordList();
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
        4: data?.data?.result?.countInfo?.ict ?? 0,
        5: data?.data?.result?.countInfo?.policy ?? 0,
        6: data?.data?.result?.countInfo?.researcher ?? 0,
        7: data?.data?.result?.countInfo?.orgn ?? 0,
        8: data?.data?.result?.countInfo?.news ?? 0,
      });
    })();
  }, [keyword]);

  const tempData1 = [
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
  const tempData2 = [
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
    {
      id: 5,
      name: '장*탁',
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

  const [researcherActive, setResearcherActive] = useState({});

  // 연구자 선택 시
  const onResearcherSelect = (e, id, name) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      setResearcherActive({ id, name });
    }
  };

  useEffect(() => {
    // 처음 데이터 노출
    setResearcherActive({ id: 0, name: '장*탁' });
  }, []);

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
                  {(tempData1?.length > 0)
                    ? tempData1?.map((e) => (
                      <li 
                        key={e.id} 
                        className={`flex items-center gap-4${(e.id === researcherActive.id) ? ' on' : ''}`}
                        onClick={(event) => onResearcherSelect(event, e.id, e.name)} 
                        onKeyUp={(event) => (event.key === 'Enter') && onResearcherSelect(event, e.id, e.name)} 
                        role={'button'}
                        tabIndex={0}
                      >
                        <img src={img_researcher01} alt='연구자 프로필 이미지' className='w-11' />
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
                <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
              </div>
            </div>
            <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
              <div>
                <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 관련 연구자</h5>
                <ul className='flex mt-4'>
                  {tempData2?.map((e, i) => {
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
                    } else if(e.relation === 5) {
                      imgSrc = img_researcher06;
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
                  <Pagination total={totalCount} page={page} onClick={(page) => setPage(page)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}