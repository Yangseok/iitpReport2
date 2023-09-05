import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import common from 'Utill';
import { useSelector } from 'react-redux';
import { getSearchKeyword, getSelectKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import * as ictAPI from 'Domain/Home/Discovery/API/IctCall';
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

  const getList = useCallback(async () => {
    const se1 = se[1] ?? '';
    const se2 = se[2] ?? '';
    (async () => {
      const similarity = common.procSimilarity(selectKeyword);
      let filterObj = {};
      let searchParam = {};
      let data = [];
      if (se1 == 'search') {
        data = await ictAPI.ict('search',size,page,keyword,similarity,sort,filterObj,searchParam);
      } else if (se1 == 'discovery') {
        if (se2 == 'keyword') {
          data = await ictAPI.ict('discovery',size,page,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'file') {
          data = await ictAPI.ict('discovery',size,page,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'project') {
          data = await ictAPI.ict('discovery',size,page,keyword,similarity,sort,filterObj,searchParam);
        }
      }
      console.log(data?.data?.result);
      setTotalCount(data?.data?.result?.totalCount ?? 0);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const pushData = {
          id: data?.data?.result?.dataList?.[i]?.applNumber ?? i,
          title: parse(data?.data?.result?.dataList?.[i]?.title ?? ''),
          content: parse(data?.data?.result?.dataList?.[i]?.contents ?? ''),
          date: (data?.data?.result?.dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
          agency: parse(data?.data?.result?.dataList?.[i]?.source ?? ''),
          link: data?.data?.result?.dataList?.[i]?.link ?? '',
          view: data?.data?.result?.dataList?.[i]?.view ?? '',
        };
        procData.push(pushData);
      }
  
      setProjectData(procData);
      setSearchButtonClick(false);
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
        data = await ictAPI.ict('search',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
      } else if (se1 == 'discovery') {
        if (se2 == 'keyword') {
          data = await ictAPI.ict('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'file') {
          data = await ictAPI.ict('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        } else if (se2 == 'project') {
          data = await ictAPI.ict('discovery',excelSize,1,keyword,similarity,sort,filterObj,searchParam);
        }
      }
      console.log(data?.data?.result);
      let procData = [];
      for (let i in data?.data?.result?.dataList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const pushData = [
          common.deHighlight(data?.data?.result?.dataList?.[i]?.title ?? ''),
          common.deHighlight(data?.data?.result?.dataList?.[i]?.source ?? ''),
          common.deHighlight(data?.data?.result?.dataList?.[i]?.contents ?? ''),
          (data?.data?.result?.dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
        ];
        procData.push(pushData);
      }
      common.excelExport('down', ['ICT 자료명', '출처', '본문', '발행일'], procData);
    })();
  }, [sort, se]);

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
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     agency: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //     view: null,
  //   },
  //   {
  //     id: 1,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     agency: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //     view: '#',
  //   },
  // ];

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              ICT 자료 <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
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
                        {(e?.view) ? <a href={e.view} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 뷰어 페이지`}>view 보기↗</a> : ''}
                        <div>
                          <p className='text-sm text-color-regular'>발행기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>발행일: <span className='font-medium text-color-main'>{e.date}</span></p>
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
