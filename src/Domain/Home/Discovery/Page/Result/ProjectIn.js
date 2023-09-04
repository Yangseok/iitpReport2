import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import common from 'Utill';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSearchKeyword, getSelectKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import * as projectAPI from 'Domain/Home/Discovery/API/ProjectCall';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';

export default function Result() {
  const params = useParams();
  const paramSe2 = params?.se2;
  const selectKeyword = useSelector(getSelectKeyword);
  const keyword = useSelector(getSearchKeyword);
  const [tabCount, setTabCount] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [projectData, setProjectData] = useState([]);

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
        const data = await projectAPI.projectOut('discovery',size,page,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        setTotalCount(data?.data?.result?.totalCount ?? 0);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          const period = data?.data?.result?.dataList?.[i]?.period ?? '';
          const periodArr = period.split('~');
          const keywordt = data?.data?.result?.dataList?.[i]?.keywords ?? [];
          procData.push({
            id: data?.data?.result?.dataList?.[i]?.projectNumber ?? i,
            tag : ((periodArr?.[1]??'').replaceAll(' ','') === '9999-12-31') ? 1 : 2,
            title: data?.data?.result?.dataList?.[i]?.title ?? '',
            price: (data?.data?.result?.dataList?.[i]?.fund ?? '') + '억',
            period: period.replaceAll('-','.'), 
            agency: data?.data?.result?.dataList?.[i]?.researchAgencyName ?? '',
            name: data?.data?.result?.dataList?.[i]?.researchManagerName ?? '',
            ict: 'ICT 기술 분류',
            keyword: keywordt.join(', '),
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
        const data = await projectAPI.projectOut('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          const period = data?.data?.result?.dataList?.[i]?.period ?? '';
          const keywordt = data?.data?.result?.dataList?.[i]?.keywords ?? [];
          procData.push([
            data?.data?.result?.dataList?.[i]?.title ?? '',
            (data?.data?.result?.dataList?.[i]?.fund ?? '') + '억',
            period.replaceAll('-','.'),
            data?.data?.result?.dataList?.[i]?.researchAgencyName ?? '',
            data?.data?.result?.dataList?.[i]?.researchManagerName ?? '',
            'ICT 기술 분류',
            keywordt.join(', '),
          ]);
        }
        common.excelExport('down', ['과제명', '연구 개발비', '연구 개발기간', '연구 개발기관', '연구 책임자', 'ICT 기술 분류', '한글 키워드'], procData);
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

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              IITP 내부 과제 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
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
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={icFilter} />
            </div>
          </div>

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
                        </div>
                        <div>
                          <p className='text-sm text-color-regular'>ICT 기술 분류: <span className='font-medium text-color-main'>{e.ict}</span></p>
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
