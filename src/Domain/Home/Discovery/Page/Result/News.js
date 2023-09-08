import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import NewsWordClouds from 'Domain/Home/Discovery/Component/NewsWordClouds';
import common from 'Utill';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchKeyword, getSelectKeyword, getFilterActive, setLoading, getSearchDetailData } from 'Domain/Home/Common/Status/CommonSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import * as newsAPI from 'Domain/Home/Discovery/API/NewsCall';
import Filter from 'Domain/Home/Discovery/Component/Filter';
import parse from 'html-react-parser';
import ToggleListItem from 'Domain/Home/Common/Componet/ToggleListItem';

export default function DiscoveryResult() {
  const dispatch = useDispatch();
  const se = common.getSegment();
  const se1 = se[1] ?? '';
  const se2 = se[2] ?? '';
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
  const filterKey = 'search/news';

  const globalSearchDetailData = useSelector(getSearchDetailData);
  const searchDetailKey = 7;

  const getList = useCallback(async () => {
    await (async () => {
      let similarity = [];
      let filterObj = {
        year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
        newsCategory: (filterActive[filterKey]?.selected?.category ?? []).join('|'),
        source: (filterActive[filterKey]?.selected?.source ?? []).join('|'),
      };
      // console.log('filterObj:', filterObj);
      let searchParam = {};
      let etcParam = { aggs: true };
      let data = [];

      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          searchParam = globalSearchDetailData[searchDetailKey];
          data = await newsAPI.news('search',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            similarity = common.procSimilarity(selectKeyword);
            data = await newsAPI.news('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
          } else if (se2 == 'file') {
            data = await newsAPI.news('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
          } else if (se2 == 'project') {
            data = await newsAPI.news('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    
      console.log(data?.data?.result);
      setTotalCount(data?.data?.result?.totalCount ?? 0);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const date = data?.data?.result?.dataList?.[i]?.publishedDate ?? '';
        const dateArr = date.split(' ');
        const pushData = {
          id: i,
          title: parse(data?.data?.result?.dataList?.[i]?.title ?? ''),
          content: data?.data?.result?.dataList?.[i]?.contents ?? '',
          source: parse(data?.data?.result?.dataList?.[i]?.source ?? ''),
          date: (dateArr[0] ?? '').replaceAll('-','.'),
          link: data?.data?.result?.dataList?.[i]?.link ?? '',
          wordCloud: data?.data?.result?.dataList?.[i]?.similarity ?? [],
        };
        procData.push(pushData);
      }
  
      setFileterItem(data?.data?.result?.aggsInfo ?? {});
      setProjectData(procData);
      setSearchButtonClick(false);
    })();
  }, [keyword, searchButtonClick, page, size, sort, se1, se2, filterActive, globalSearchDetailData]);

  const downExcel = useCallback(async () => {
    const excelSize = 1000;
    await (async () => {
      let similarity = [];
      let filterObj = {
        year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
        newsCategory: (filterActive[filterKey]?.selected?.category ?? []).join('|'),
        source: (filterActive[filterKey]?.selected?.source ?? []).join('|'),
      };
      let searchParam = {};
      let data = [];
      
      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          searchParam = globalSearchDetailData[searchDetailKey];
          data = await newsAPI.news('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            similarity = common.procSimilarity(selectKeyword);
            data = await newsAPI.news('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
          } else if (se2 == 'file') {
            data = await newsAPI.news('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
          } else if (se2 == 'project') {
            data = await newsAPI.news('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
          }
        }} catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }

      console.log(data?.data?.result);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const date = data?.data?.result?.dataList?.[i]?.publishedDate ?? '';
        const dateArr = date.split(' ');
        const pushData = [
          common.deHighlight(data?.data?.result?.dataList?.[i]?.title ?? ''),
          data?.data?.result?.dataList?.[i]?.contents ?? '',
          common.deHighlight(data?.data?.result?.dataList?.[i]?.source ?? ''),
          (dateArr[0] ?? '').replaceAll('-','.'),
        ];
        procData.push(pushData);
      }
      await common.excelExport('down', ['뉴스 제목', '내용', '출처', '출처일'], procData);
    })();
  }, [keyword, sort, se1, se2, filterActive, globalSearchDetailData]);

  useEffect(() => {
    getList();
  }, [keyword, page, size, sort, filterActive, globalSearchDetailData]);

  useEffect(() => {
    if (searchButtonClick) {
      setPage(1); 
      getList();
    }
  }, [searchButtonClick]);

  useEffect(() => {
    (async () => {
      let data = [];
      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          data = await discoveryAPI.searchCount('search',keyword);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            const procKeyword = common.procCountKeyword(keyword, selectKeyword);
            // console.log('procKeyword:', procKeyword);
            data = await discoveryAPI.searchCount('discovery',procKeyword.join('|'));
          } else if (se2 == 'file') {
            data = await discoveryAPI.searchCount('discovery',keyword);
          } else if (se2 == 'project') {
            data = await discoveryAPI.searchCount('discovery',keyword);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
      // console.log('count:', data?.data?.result);

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
  }, [keyword, se1, se2, selectKeyword]);

  // const tempData = [
  //   {
  //     id: 0,
  //     title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
  //     link: '#',
  //     source: '서울신문',
  //     date: '2023.06.08',
  //   },
  //   {
  //     id: 1,
  //     title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
  //     link: '#',
  //     source: '서울신문',
  //     date: '2023.06.08',
  //   },
  // ];

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              뉴스 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
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

          {filterShow && <Filter filterItem={filterItem} filterKey={filterKey} />}

          <div className='list_style03 mt-2' id='newsList'>
            <ul>
              {(projectData?.length > 0)
                ? projectData?.map((e) => {
                  return (
                    <ToggleListItem 
                      key={e.id} 
                      id={e.id}
                      title={<>
                        <p className='flex-1 text-base font-bold text-color-dark'>{e.title}</p>
                        <div className='text_style01 flex items-center gap-4'>
                          <div>
                            <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                            <p className='text-sm text-color-regular'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          </div>
                          <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                        </div>
                      </>}
                      contents={<>
                        <NewsWordClouds wordCloudData={e.wordCloud ?? []} />
                      </>}
                    />
                  );
                })
                : <li className='nodata'>
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
