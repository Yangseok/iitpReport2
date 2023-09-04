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
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import * as policyAPI from 'Domain/Home/Discovery/API/PolicyCall';

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
        const data = await policyAPI.policy('search',size,page,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        setTotalCount(data?.data?.result?.totalCount ?? 0);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          const date = data?.data?.result?.dataList?.[i]?.publishedDate ?? '';
          const dateArr = date.split(' ');
          procData.push({
            id: data?.data?.result?.dataList?.[i]?.applNumber ?? i,
            title: data?.data?.result?.dataList?.[i]?.title ?? '',
            content: data?.data?.result?.dataList?.[i]?.contents ?? '',
            source: data?.data?.result?.dataList?.[i]?.source ?? '',
            date: (dateArr[0] ?? '').replaceAll('-','.'),
            link: data?.data?.result?.dataList?.[i]?.link ?? '',
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
        const data = await policyAPI.policy('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          const date = data?.data?.result?.dataList?.[i]?.publishedDate ?? '';
          const dateArr = date.split(' ');
          procData.push([
            data?.data?.result?.dataList?.[i]?.title ?? '',
            data?.data?.result?.dataList?.[i]?.source ?? '',
            (dateArr[0] ?? '').replaceAll('-','.'),
            data?.data?.result?.dataList?.[i]?.contents ?? '',
          ]);
        }
        common.excelExport('down', ['정부 정책 자료명', '출처', '작성일', '본문'], procData);
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


  // const tempData = [
  //   {
  //     id: 0,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     source: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //   },
  // ];

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              정부정책 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
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
                  return (<ListItem 
                    key={e.id}
                    title={e.title}
                    contents={<>
                      <p className='text-sm text-color-regular line2_text'>{e.content}</p>
                    </>}
                    desc={<>
                      <div className='text_style01 flex items-center gap-4'>
                        <div>
                          <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                          <p className='text-sm text-color-regular'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
                        </div>
                        <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                      </div>
                    </>}
                  />);
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
