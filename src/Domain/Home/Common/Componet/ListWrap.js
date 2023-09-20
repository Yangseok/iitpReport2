import React, { useEffect, useState, useCallback } from 'react';
import icArrow from 'Assets/Images/ic_arrow02.png';
import icFilter from 'Assets/Images/ic_filter.png';
import icFilter02 from 'Assets/Images/ic_filter02.png';
// import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import ResultListLayout from 'Domain/Home/Common/Layout/ResultListLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import common from 'Utill';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import { getSearchKeyword, getSelectKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import { getFilterActive, getSearchDetailData, getFileKeywordList, setInitalFilter, setInitalSearch, setSearchDetailData, setFilterActive } from 'Domain/Home/Discovery/Status/DiscoverySlice';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import * as researcherAPI from 'Domain/Home/Discovery/API/ResearcherCall';
import * as orgnAPI from 'Domain/Home/Discovery/API/OrgnCall';
import Filter from 'Domain/Home/Discovery/Component/Filter';
import * as List from 'Utill/List';
import ProjectOut from 'Domain/Home/Common/Componet/List/ProjectOut';
import ProjectIn from 'Domain/Home/Common/Componet/List/ProjectIn';
import Patent from 'Domain/Home/Common/Componet/List/Patent';
import Paper from 'Domain/Home/Common/Componet/List/Paper';
import Ict from 'Domain/Home/Common/Componet/List/Ict';
import Policy from 'Domain/Home/Common/Componet/List/Policy';
import Researcher from 'Domain/Home/Common/Componet/List/Researcher';
import Orgn from 'Domain/Home/Common/Componet/List/Orgn';
import News from 'Domain/Home/Common/Componet/List/News';
import { useLocation } from 'react-router-dom';

export default function ListWrap(props) {
  const location = useLocation();
  const prevPath = location?.state?.prevPath;
  const { filterKey, searchDetailKey } = props;

  const dispatch = useDispatch();
  const se = common.getSegment();
  const se1 = se[1] ?? '';
  const se2 = se[2] ?? '';
  const se3 = se[3] ?? '';
  const se4 = se[4] ?? '';
  const selectKeyword = useSelector(getSelectKeyword);
  const keyword = useSelector(getSearchKeyword);
  const [tabCount, setTabCount] = useState({});
  const [totalCount, setTotalCount] = useState(0);
  const [projectData, setProjectData] = useState([]);

  const [searchButtonClick, setSearchButtonClick] = useState(false);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState(List.getSortList(filterKey)?.default ?? 'score');
  const [filterShow, setFilterShow] = useState(false);
  const [filterItem, setFileterItem] = useState({});
  const filterActive = useSelector(getFilterActive);
  const globalSearchDetailData = useSelector(getSearchDetailData);
  const fileKeywordList = useSelector(getFileKeywordList);

  //연구자 관련
  const [researcherActive, setResearcherActive] = useState({id: -1, name: ''});
  const [simialityResearcher, setSimialityResearcher] = useState([]);
  const [subList, setSubList] = useState([]);

  //기관 관련
  const [orgnActive, setOrgnActive] = useState({id: -1, name: ''});
  const [simialityOrgn, setSimialityOrgn] = useState([]);
  const [subProjectList, setSubProjectList] = useState([]);
  const [subPatentList, setSubPatentList] = useState([]);
  const [subListMode, setSubListMode] = useState('project');

  const getList = useCallback(async () => {
    await (async () => {
      let filterObj = List.getFilterObj(filterKey, filterActive);
      // console.log('filterObj:', filterObj);
      let etcParam = { aggs: true };
      let data = [];
      try {
        dispatch(setLoading(true));
        data = await List.callListAPI(filterKey, se1, se2, globalSearchDetailData, searchDetailKey, selectKeyword, size, page, keyword, fileKeywordList, sort, filterObj, etcParam);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
      
      console.log('data?.data?.result:', data?.data?.result);
      setTotalCount(data?.data?.result?.totalCount ?? 0);
      setFileterItem(data?.data?.result?.aggsInfo ?? {});
      setProjectData(List.getProcData(filterKey, data?.data?.result?.dataList ?? []));
      setSearchButtonClick(false);
      if (filterKey === 'search/indv') {
        setResearcherActive({ id: data?.data?.result?.dataList?.[0]?.id ?? -1, name: data?.data?.result?.dataList?.[0]?.indvName ?? '' });
      } else if (filterKey === 'search/orgn') {
        setOrgnActive({ id: data?.data?.result?.dataList?.[0]?.id ?? -1, name: common.deHighlight(data?.data?.result?.dataList?.[0]?.orgnName ?? '') });
      }
    })();

  }, [keyword, searchButtonClick, page, size, sort, se1, se2, filterActive, filterKey, searchDetailKey, globalSearchDetailData, fileKeywordList]);

  const downExcel = useCallback(async () => {
    const excelSize = 1000;
    await (async () => {
      let filterObj = List.getFilterObj(filterKey, filterActive);
      let data = [];

      try {
        dispatch(setLoading(true));
        data = await List.callListAPI(filterKey, se1, se2, globalSearchDetailData, searchDetailKey, selectKeyword, excelSize, 1, keyword, fileKeywordList, sort, filterObj);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }

      console.log(data?.data?.result);
      let procData = List.getExcelProcData(filterKey, data?.data?.result?.dataList);
      await common.excelExport('down', procData?.title ?? [], procData?.data ?? []);
    })();
  }, [keyword, sort, se1, se2, filterActive, filterKey, searchDetailKey, globalSearchDetailData, fileKeywordList]);

  const getResearcherDetail = useCallback(async () => {
    if (researcherActive.id === -1) return null;
    await (async () => {
      let data = [];
      
      try {
        dispatch(setLoading(true));
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
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }

      // const data = await orgnAPI.orgnDetail('0008634982');
      console.log(data?.data?.result);
      let simiality = [];
      for (let i in data?.data?.result?.simialityIndvList ?? []) {
        // console.log(i, data?.data?.result?.simialityIndvList?.[i]);
        let link = data?.data?.result?.simialityIndvList?.[i]?.link ?? '#';
        if (link !== '#') link = 'https://' + link;
        const simialityPushData = {
          id: i,
          name: data?.data?.result?.simialityIndvList?.[i]?.indvName ?? '',
          relation: (i !== '0') ? common.colorSet(data?.data?.result?.simialityIndvList?.[i]?.weight ?? 0) : 0,
          link: link,
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
          price: common.setPriceInput(data?.data?.result?.indvResultInfo?.projectIn?.[i]?.fund ?? '') + '원',
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
  }, [researcherActive, se1, se2]);

  // 연구자 선택 시
  const onResearcherSelect = (e, id, name) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      setResearcherActive({ id, name });
    }
  };

  const getOrgnDetail = useCallback(async () => {
    if (orgnActive.id === -1) return null;
    await (async () => {
      let data = [];

      try {
        dispatch(setLoading(true));
        if (se1 == 'search') {
          data = await orgnAPI.orgnDetail(orgnActive.id);
        } else if (se1 == 'discovery') {
          if (se2 == 'keyword') {
            data = await orgnAPI.orgnDetail(orgnActive.id);
          } else if (se2 == 'file') {
            data = await orgnAPI.orgnDetail(orgnActive.id);
          } else if (se2 == 'project') {
            data = await orgnAPI.orgnDetail(orgnActive.id);
          }
        }
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    
      // const data = await orgnAPI.orgnDetail('0008634982');
      console.log(data?.data?.result);
      let simialityOrgn = [];
      for (let i in data?.data?.result?.simialityOrgnList ?? []) {
        // console.log(i, data?.data?.result?.dataList?.[i]);
        const simialityPushData = {
          id: i,
          name: data?.data?.result?.simialityOrgnList?.[i]?.orgnName ?? '',
          relation: (i !== '0') ? common.colorSet(data?.data?.result?.simialityOrgnList?.[i]?.weight ?? 0) : 0
        };
        simialityOrgn.push(simialityPushData);
      }
      setSimialityOrgn(simialityOrgn);

      let subProjectList = [];
      for (let i in data?.data?.result?.orgnResultInfo?.projectOut ?? []) {
        // console.log(i, data?.data?.result?.orgnResultInfo?.projectOut?.[i]);
        const period = data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.period ?? '';
        const periodArr = period.split('~');
        let division = data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.technicalClassification ?? [];
        if (division == '') division = [];
        let keywordt = data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.keywords ?? [];
        if (keywordt == '') keywordt = [];
        const subProjectListPushData = {
          id: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.projectNumber ?? i,
          tag : ((periodArr?.[1]??'').replaceAll(' ','') === '9999-12-31') ? 1 : 2,
          title: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.bigProjectName ?? '',
          price: common.setPriceInput(data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.fund ?? '') + '원',
          period: period.replaceAll('-','.'), 
          agency: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.researchAgencyName ?? '',
          name: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.researchManagerName ?? '',
          department: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.orderAgencyName ?? '',
          performance: data?.data?.result?.orgnResultInfo?.projectOut?.[i]?.performance ?? '',
          division: division.join(' / '),
          keyword: keywordt.join(', '),
        };
        subProjectList.push(subProjectListPushData);
      }
      setSubProjectList(subProjectList);

      let subPatentList = [];
      for (let i in data?.data?.result?.orgnResultInfo?.patent ?? []) {
        const agency = data?.data?.result?.orgnResultInfo?.patent?.[i]?.applicantName ?? [];
        const name = data?.data?.result?.orgnResultInfo?.patent?.[i]?.inventorName ?? [];
        const date = data?.data?.result?.orgnResultInfo?.patent?.[i]?.applDate ?? '';
        const subPatentListPushData = {
          id: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applNumber ?? i,
          title: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applName ?? '',
          project: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applName ?? '',
          division: data?.data?.result?.orgnResultInfo?.patent?.[i]?.registrationType ?? '',
          num: data?.data?.result?.orgnResultInfo?.patent?.[i]?.applNumber ?? '',
          date: date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
          agency: agency.join(', '),
          name: name.join(', '),
        };
        subPatentList.push(subPatentListPushData);
      }
      setSubPatentList(subPatentList);

      setSubListMode('project');
    })();
  }, [orgnActive, se1, se2]);

  // 기관 선택 시
  const onOrgnSelect = (e, id, name) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      setOrgnActive({ id, name });
    }
  };

  useEffect(() => {
    getList();
  }, [keyword, page, size, sort, filterActive, filterKey, searchDetailKey, globalSearchDetailData, fileKeywordList]);

  useEffect(() => {
    if (searchButtonClick) {
      setPage(1); 
      getList();
    }
  }, [searchButtonClick]);

  useEffect(() => {
    setPage(1);
  }, [se2,se3,se4]);

  useEffect(() => {
    getResearcherDetail();
  }, [researcherActive]);

  useEffect(() => {
    getOrgnDetail();
  }, [orgnActive]);

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

  useEffect(() => {
    if (prevPath !== undefined) {
      console.log('prevPath:', prevPath);
      dispatch(setSearchDetailData({}));
      dispatch(setFilterActive(items));
      dispatch(setInitalSearch(true));
      dispatch(setInitalFilter(true));
    }
  }, [prevPath]);

  const getListComponet = (filterKey) => {
    switch (filterKey) {
    case 'search/projectOut':
      return <ProjectOut projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} />;
    case 'search/projectIn':
      return <ProjectIn projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} />;
    case 'search/patent':
      return <Patent projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} />;
    case 'search/paper':
      return <Paper projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} />;
    case 'search/ict':
      return <Ict projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} />;
    case 'search/policy':
      return <Policy projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} />;
    case 'search/indv':
      return <Researcher projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} researcherActive={researcherActive} onResearcherSelect={onResearcherSelect} simialityResearcher={simialityResearcher} subList={subList} />;
    case 'search/orgn':
      return <Orgn projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} orgnActive={orgnActive} onOrgnSelect={onOrgnSelect} simialityOrgn={simialityOrgn} subListMode={subListMode} setSubListMode={setSubListMode} subProjectList={subProjectList} subPatentList={subPatentList} />;
    case 'search/news':
      return <News projectData={projectData} totalCount={totalCount} size={size} page={page} setPage={setPage} />;
    default:
      return null;
    }
  };

  return (
    <ResultListLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              {List.getTitle(filterKey)} <span className='text-color-main'>{common.setPriceInput(totalCount)}건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={icArrow} onClick={downExcel} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order' value={sort} onChange={(e) => {setPage(1); setSort(e.target.value);}}>
                  {(List.getSortList(filterKey, se1)?.list ?? []).map((e,i) => {
                    return <option key={i} value={e.value ?? ''}>{e.text ?? ''}</option>;
                  })}
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num' value={size} onChange={(e) => {setPage(1); setSize(e.target.value);}}>
                  {[10,20,30,50,100].map((e,i) => {
                    return <option key={i} value={e}>{e}</option>;
                  })}
                </select>
              </div>
              <Button className={`gap-2 h-12 px-4 rounded text-sm font-bold btn_style01${filterShow ? ' on' : ''}`} name='필터' icon={filterShow ? icFilter02 : icFilter} onClick={() => setFilterShow(state => !state)} />
            </div>
          </div>

          {filterShow && <Filter filterItem={filterItem} setFilterShow={setFilterShow} filterKey={filterKey} />}

          {getListComponet(filterKey)}
        </div>
      </section>
    </ResultListLayout>
  );
}
