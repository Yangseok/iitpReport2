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
import * as patentAPI from 'Domain/Home/Discovery/API/PatentCall';

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
        const data = await patentAPI.patent('search',size,page,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        setTotalCount(data?.data?.result?.totalCount ?? 0);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          const agency = data?.data?.result?.dataList?.[i]?.applicantName ?? [];
          const name = data?.data?.result?.dataList?.[i]?.inventorName ?? [];
          const date = data?.data?.result?.dataList?.[i]?.applDate ?? '';
          procData.push({
            id: data?.data?.result?.dataList?.[i]?.applNumber ?? i,
            title: data?.data?.result?.dataList?.[i]?.title ?? '',
            project: data?.data?.result?.dataList?.[i]?.projectName ?? '',
            division: data?.data?.result?.dataList?.[i]?.type ?? '',
            num: data?.data?.result?.dataList?.[i]?.applNumber ?? '',
            date: date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
            agency: agency.join(', '),
            name: name.join(', '),
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
        const data = await patentAPI.patent('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        console.log(data?.data?.result);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          // console.log(i, data?.data?.result?.dataList?.[i]);
          const agency = data?.data?.result?.dataList?.[i]?.applicantName ?? [];
          const name = data?.data?.result?.dataList?.[i]?.inventorName ?? [];
          const date = data?.data?.result?.dataList?.[i]?.applDate ?? '';
          procData.push([
            data?.data?.result?.dataList?.[i]?.title ?? '',
            data?.data?.result?.dataList?.[i]?.projectName ?? '',
            data?.data?.result?.dataList?.[i]?.type ?? '',
            data?.data?.result?.dataList?.[i]?.applNumber ?? '',
            date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
            agency.join(', '),
            name.join(', '),
          ]);
        }
        common.excelExport('down', ['과제명', '유발 과제', '출원등록구분', '출원(등록)번호', '출원(등록)일', '출원(등록)인', '발명자'], procData);
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
  //     title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
  //     project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
  //     division: '출원',
  //     num: '1020200077142',
  //     date: '2021.01.08',
  //     agency: '행정안전부국립재난안전연구원',
  //     name: '홍길동',
  //     link: '#',
  //   },
  // ];

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              특허 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
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
                      <div>
                        <p className='text-sm text-color-regular'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
                        <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                        <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                      </div>
                      <div>
                        <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                        <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                        <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                      </div>
                    </>}
                    btns={<>
                      <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                      <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
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
