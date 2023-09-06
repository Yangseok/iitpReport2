import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import common from 'Utill';
import { useSelector } from 'react-redux';
import { getSearchKeyword, getSelectKeyword, getFilterActive } from 'Domain/Home/Common/Status/CommonSlice';
import * as projectAPI from 'Domain/Home/Discovery/API/ProjectCall';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import Filter from 'Domain/Home/Discovery/Component/Filter';
import parse from 'html-react-parser';

export default function Result() {
  const se = common.getSegment();
  const selectKeyword = useSelector(getSelectKeyword);
  const keyword = useSelector(getSearchKeyword);
  const [tabCount, setTabCount] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [projectData, setProjectData] = useState([]);

  const [searchButtonClick, setSearchButtonClick] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState('score');
  const [filterShow, setFilterShow] = useState(false);
  const [filterItem, setFileterItem] = useState({});

  const filterActive = useSelector(getFilterActive);
  const filterKey = 'search/projectOut';

  const getList = useCallback(async () => {
    const se1 = se[1] ?? '';
    const se2 = se[2] ?? '';

    (async () => {
      const similarity = common.procSimilarity(selectKeyword);
      let filterObj = {
        year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
        fund: (filterActive[filterKey]?.selected?.fund ?? []).join('|'),
        researchAgency: (filterActive[filterKey]?.selected?.researchAgency ?? []).join('|'),
        ministry: (filterActive[filterKey]?.selected?.ministry ?? []).join('|'),
        technicalClassification: (filterActive[filterKey]?.selected?.technicalClassification ?? []).join('|'),
      };
      // console.log('filterObj:', filterObj);
      let searchParam = {};
      let etcParam = { aggs: true };
      let data = [];
      if (se1 == 'search') {
        data = await projectAPI.projectOut('search',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
      } else if (se1 == 'discovery') {
        if (se2 == 'keyword') {
          data = await projectAPI.projectOut('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
        } else if (se2 == 'file') {
          data = await projectAPI.projectOut('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
        } else if (se2 == 'project') {
          data = await projectAPI.projectOut('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
        }
      }
      
      console.log(data?.data?.result);
      setTotalCount(data?.data?.result?.totalCount ?? 0);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const period = data?.data?.result?.dataList?.[i]?.period ?? '';
        const periodArr = period.split('~');
        const division = data?.data?.result?.dataList?.[i]?.technicalClassification ?? [];
        const keywordt = data?.data?.result?.dataList?.[i]?.keywords ?? [];
        const pushData = {
          id: data?.data?.result?.dataList?.[i]?.projectNumber ?? i,
          tag : ((periodArr?.[1]??'').replaceAll(' ','') === '9999-12-31') ? 1 : 2,
          title: parse(data?.data?.result?.dataList?.[i]?.title ?? ''),
          price: (data?.data?.result?.dataList?.[i]?.fund ?? '') + '억',
          period: period.replaceAll('-','.'), 
          agency: parse(data?.data?.result?.dataList?.[i]?.researchAgencyName ?? ''),
          name: parse(data?.data?.result?.dataList?.[i]?.researchManagerName ?? ''),
          department: parse(data?.data?.result?.dataList?.[i]?.orderAgencyName ?? ''),
          performance: data?.data?.result?.dataList?.[i]?.performance ?? '',
          division: division.join(' / '),
          keyword: keywordt.join(', '),
        };
        procData.push(pushData);
      }
  
      setFileterItem(data?.data?.result?.aggsInfo ?? {});
      setProjectData(procData);
      setSearchButtonClick(false);
    })();

  }, [searchButtonClick, page, size, sort, se, filterActive]);

  const downExcel = useCallback(async () => {
    const se1 = se[1] ?? '';
    const se2 = se[2] ?? '';
    const excelSize = 1000;
    (async () => {
      const similarity = common.procSimilarity(selectKeyword);
      let filterObj = {
        year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
        fund: (filterActive[filterKey]?.selected?.fund ?? []).join('|'),
        researchAgency: (filterActive[filterKey]?.selected?.researchAgency ?? []).join('|'),
        ministry: (filterActive[filterKey]?.selected?.ministry ?? []).join('|'),
        technicalClassification: (filterActive[filterKey]?.selected?.technicalClassification ?? []).join('|'),
      };
      let searchParam = {};
      let data = [];
      if (se1 == 'search') {
        data = await projectAPI.projectOut('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
      } else if (se1 == 'discovery') {
        if (se2 == 'keyword') {
          data = await projectAPI.projectOut('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'file') {
          data = await projectAPI.projectOut('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'project') {
          data = await projectAPI.projectOut('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        }
      }
      console.log(data?.data?.result);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const period = data?.data?.result?.dataList?.[i]?.period ?? '';
        const division = data?.data?.result?.dataList?.[i]?.technicalClassification ?? [];
        const keywordt = data?.data?.result?.dataList?.[i]?.keywords ?? [];
        const pushData = [
          common.deHighlight(data?.data?.result?.dataList?.[i]?.title ?? ''),
          (data?.data?.result?.dataList?.[i]?.fund ?? '') + '억',
          period.replaceAll('-','.'),
          common.deHighlight(data?.data?.result?.dataList?.[i]?.researchAgencyName ?? ''),
          common.deHighlight(data?.data?.result?.dataList?.[i]?.researchManagerName ?? ''),
          common.deHighlight(data?.data?.result?.dataList?.[i]?.orderAgencyName ?? ''),
          data?.data?.result?.dataList?.[i]?.performance ?? '',
          division.join(', '),
          keywordt.join(', '),
        ];
        procData.push(pushData);
      }
      common.excelExport('down', ['과제명', '연구 개발비', '연구 개발기간', '연구 개발기관', '연구 책임자', '부처명', '연구 개발성과', '국가과학기술표준분류', '한글 키워드'], procData);
    })();
  }, [sort, se, filterActive]);

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

  // const tempData = [
  //   {
  //     id: 0,
  //     progress: '진행중',
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
  //     progress: '진행중',
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
              국가 R&D 과제 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={icArrow} onClick={downExcel} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order' onChange={(e) => {setPage(1); setSort(e.target.value);}}>
                  <option value='score'>관련도순</option>
                  <option value='date'>최신순</option>
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
              <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
            </div>
          </div>

          {filterShow && <Filter filterItem={filterItem} filterKey={filterKey} setSearchButtonClick={setSearchButtonClick} />}

          <div className='list_style01 mt-2'>
            <ul>
              {(projectData?.length > 0) 
                ? projectData?.map((e) => {
                  return (
                    <ListItem 
                      key={e.id}
                      tag={e.tag}
                      title={e.title}
                      contents={<>
                        <div>
                          <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                          <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                          <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                          <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                        </div>
                        <div>
                          <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                          <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                          <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                        </div>
                      </>}
                      btns={<>
                        <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                      </>}
                    />
                  );
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
      </section>
    </DiscoveryResultLayout>
  );
}
