import React, { useState, useEffect, useCallback } from 'react';
import ViewLayout from 'Domain/Home/Discovery/Layout/ViewLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';
import ToggleListItem from 'Domain/Home/Common/Componet/ToggleListItem';
import WordClouds from 'Domain/Home/Common/Componet/Features/WordClouds';
import ViewChart1 from 'Domain/Home/Discovery/Component/View/ViewChart1';
import ViewChart2 from 'Domain/Home/Discovery/Component/View/ViewChart2';
import ViewChart3 from 'Domain/Home/Discovery/Component/View/ViewChart3';
import ViewChart4 from 'Domain/Home/Discovery/Component/View/ViewChart4';
import ViewChart5 from 'Domain/Home/Discovery/Component/View/ViewChart5';
import moment from 'moment';
import * as orgnAPI from 'Domain/Home/Discovery/API/OrgnCall';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import { useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import common from 'Utill';
import parse from 'html-react-parser';

export default function View() {
  const dispatch = useDispatch();
  const se = common.getSegment();
  const se2 = se[2] ?? '';
  const se3 = se[3] ?? '';

  const [viewData, setViewData] = useState({});

  const [tabContents, setTAbContents] = useState([
    [
      { content: '설립일', scope: 'row' },
      { content: '' },
      { content: '사업자등록번호', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '대표자명', scope: 'row' },
      { content: '' },
      { content: '업종명', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '사업장 전화번호', scope: 'row' },
      { content: '' },
      { content: '홈페이지', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '재직 인원', scope: 'row' },
      { content: '' },
      { content: '주생산품', scope: 'row' },
      { content: '' },
    ],
  ]);
  
  // 데이터 5개씩 뿌려줌
  const tempData2 = [
    {
      id: 0,
      progress: '진행중',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];

  const [labels1, setLabels1] = useState([]); 
  const [labels2, setLabels2] = useState([]);
  const labels3 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const labels4 = ['','Project A','Project B','Project C','Project D','Project E','Project F','Project G','Project H',''];

  //사후관리 정보
  const [tempChartData1, setTempChartData1] = useState([]);
  const [tempChartData2, setTempChartData2] = useState([]);
  const [tempChartData3, setTempChartData3] = useState([]);
  const [tempChartData4, setTempChartData4] = useState([]);
  const [tempTableData1, setTempTableData1] = useState([]);

  //재무현황
  const [tempChartData5, setTempChartData5] = useState([]);
  const [tempChartData6_1, setTempChartData6_1] = useState([]);
  const [tempChartData6_2, setTempChartData6_2] = useState([]);

  //부채비율
  const [tempChartData7_1, setTempChartData7_1] = useState([]);
  const [tempChartData7_2, setTempChartData7_2] = useState([]);
  const [tempChartData7_3, setTempChartData7_3] = useState([]);
  
  //유동비율
  const [tempChartData8_1, setTempChartData8_1] = useState([]);
  const [tempChartData8_2, setTempChartData8_2] = useState([]);
  const [tempChartData8_3, setTempChartData8_3] = useState([]);
  
  //이자보상비율
  const [tempChartData9_1, setTempChartData9_1] = useState([]);
  const [tempChartData9_2, setTempChartData9_2] = useState([]);
  const [tempChartData9_3, setTempChartData9_3] = useState([]);
  
  //자기자본비율
  const [tempChartData10_1, setTempChartData10_1] = useState([]);
  const [tempChartData10_2, setTempChartData10_2] = useState([]);
  const [tempChartData10_3, setTempChartData10_3] = useState([]);
  
  const tempChartData11 = [2.8, 2.9, 3, 3.1, 3.9, 3.5, 3.5, 3.5, 4, 2.9];
  const tempChartData12 = [38, 50, 42, 68, 70, 18, 32, 29, 58, 58, 58, 58];
  const tempChartData13 = [
    {
      min: '2021-02-10',
    },
    {
      min: '2021-02-10',
      max: '2022-03-10'
    },
    {
      min: '2021-06-10',
      max: '2022-07-10'
    },
    {
      min: '2021-09-10',
      max: '2022-02-10'
    },
    {
      min: '2021-12-20',
      max: '2023-03-10'
    },
    {
      min: '2021-12-10',
      max: '2023-05-10'
    },
    {
      min: '2022-11-10',
      max: '2023-07-10'
    },
    {
      min: '2022-11-08',
      max: '2023-09-20'
    },
    {
      min: '2022-11-08',
      max: '2023-05-20'
    },
    {
      min: '2021-02-10',
    },
  ];

  const tabButtons1 = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive1(0) },
    { id: 1, name: '재무 정보', onClick: () => setTabActive1(1) },
    { id: 2, name: '과제 정보', onClick: () => setTabActive1(2) },
    { id: 3, name: '성과 정보', onClick: () => setTabActive1(3) },
    { id: 4, name: '고용 정보', onClick: () => setTabActive1(4) },
    { id: 5, name: '뉴스', onClick: () => setTabActive1(5) },
  ];
  const tabButtons2 = [
    { id: 0, name: '사후관리 정보', onClick: () => setTabActive2(0) },
    { id: 1, name: '재무현황', onClick: () => setTabActive2(1) },
  ];

  const [tabActive1, setTabActive1] = useState(4);
  const [tabActive2, setTabActive2] = useState(0);

  const [tabSubCnt, setTabSubCnt] = useState([0]);
  const [tabSubPage, setTabSubPage] = useState(1);
  const listSize = 5;
  const [tabProjectList, setTabProjectList] = useState([]);
  const [tabPatentList, setTabPatentList] = useState([]);
  // const [employeeProjectList, setEmployeeProjectList] = useState([]);
  const [tabNewsList, setTabNewsList] = useState([]);

  const getView = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        const data = await orgnAPI.orgnView(se3);
        console.log('viewData:', data?.data?.result);

        setViewData(data?.data?.result ?? {});
        setTAbContents([
          [
            { content: '설립일', scope: 'row' },
            { content: (data?.data?.result?.establishmentDate ?? '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3') },
            { content: '사업자등록번호', scope: 'row' },
            { content: common.bizNoHyphen(data?.data?.result?.bizno ?? '') },
          ],
          [
            { content: '대표자명', scope: 'row' },
            { content: common.joinArrNStr(data?.data?.result?.representativeName, ', ', '') },
            { content: '업종명', scope: 'row' },
            { content: common.joinArrNStr(data?.data?.result?.industryName, ', ', '') },
          ],
          [
            { content: '사업장 전화번호', scope: 'row' },
            { content: data?.data?.result?.phoneNumber ?? '' },
            { content: '홈페이지', scope: 'row' },
            { content: data?.data?.result?.homepage ?? '' },
          ],
          [
            { content: '재직 인원', scope: 'row' },
            { content: common.setPriceInput(data?.data?.result?.employee ?? 0) + '명' },
            { content: '주생산품', scope: 'row' },
            { content: data?.data?.result?.product ?? '' },
          ],
        ]);

        //재무정보 > 사후관리 정보
        let tmpLable1 = [];
        let tmpChartData1 = []; //부채비율
        let tmpChartData2 = []; //유동비율
        let tmpChartData3 = []; //이자보상비율
        let tmpChartData4 = []; //영업이익
        let tmpTableData1 = []; //자본총계, 자본금, 자본잠식여부

        //재무정보 > 재무현황
        let tmpLable2 = [];
        let tmpChartData5 = []; //매출액
        let tmpChartData6_1 = []; //영업이익률
        let tmpChartData6_2 = []; //단기순이익률
        
        let tmpChartData7_1 = []; //부채비율
        let tmpChartData7_2 = []; //자본총계
        let tmpChartData7_3 = []; //부채총계

        let tmpChartData8_1 = []; //유동비율
        let tmpChartData8_2 = []; //유동자산
        let tmpChartData8_3 = []; //유동부채

        let tmpChartData9_1 = []; //이자보상비율
        let tmpChartData9_2 = []; //영업이익
        let tmpChartData9_3 = []; //지급이자

        let tmpChartData10_1 = []; //자기자본비율
        let tmpChartData10_2 = []; //자산총계
        let tmpChartData10_3 = []; //자기자본

        for (let i in data?.data?.result?.financialList ?? []) {
          if (data?.data?.result?.financialList?.[i].year !== undefined) {
            tmpLable1.push(data?.data?.result?.financialList?.[i].year);
            tmpChartData1.push((Math.floor((data?.data?.result?.financialList?.[i].liabilitiesRatio ?? 0) * 100)));
            tmpChartData2.push((Math.floor((data?.data?.result?.financialList?.[i].currentRatio ?? 0) * 100)));
            tmpChartData3.push((Math.floor((data?.data?.result?.financialList?.[i].interestCoverageRatio ?? 0) * 100)));
            tmpChartData4.push(data?.data?.result?.financialList?.[i].operatingIncome ?? 0);
            tmpTableData1.push([data?.data?.result?.financialList?.[i].equity ?? 0, data?.data?.result?.financialList?.[i].capitalStock ?? 0, data?.data?.result?.financialList?.[i].capitalImpairment ?? '']);

            tmpChartData5.push(((data?.data?.result?.financialList?.[i].sales ?? 0) / 100000000000).toFixed(2));
            tmpChartData6_1.push(((data?.data?.result?.financialList?.[i].operatingIncomeRatio ?? 0) * 100).toFixed(2));
            tmpChartData6_2.push(((data?.data?.result?.financialList?.[i].netIncomeRatio ?? 0) * 100).toFixed(2));
            
            tmpChartData7_1.push((Math.floor((data?.data?.result?.financialList?.[i].liabilitiesRatio ?? 0) * 100)));
            tmpChartData7_2.push(((data?.data?.result?.financialList?.[i].equity ?? 0) / 100000000000).toFixed(2));
            tmpChartData7_3.push(((data?.data?.result?.financialList?.[i].liabilities ?? 0) / 100000000000).toFixed(2));
            
            tmpChartData8_1.push((Math.floor((data?.data?.result?.financialList?.[i].currentRatio ?? 0) * 100)));
            tmpChartData8_2.push(((data?.data?.result?.financialList?.[i].currentAssets ?? 0) / 100000000000).toFixed(2));
            tmpChartData8_3.push(((data?.data?.result?.financialList?.[i].currentLiabilities ?? 0) / 100000000000).toFixed(2));
            
            tmpChartData9_1.push((Math.floor((data?.data?.result?.financialList?.[i].interestCoverageRatio ?? 0) * 100)));
            tmpChartData9_2.push(((data?.data?.result?.financialList?.[i].operatingIncome ?? 0) / 100000000).toFixed(2));
            tmpChartData9_3.push(((data?.data?.result?.financialList?.[i].interestExpenses ?? 0) / 100000000).toFixed(2));
            
            tmpChartData10_1.push((Math.floor((data?.data?.result?.financialList?.[i].capitalAdequacyRatio ?? 0) * 100)));
            tmpChartData10_2.push(((data?.data?.result?.financialList?.[i].assets ?? 0) / 100000000000).toFixed(2));
            tmpChartData10_3.push(((data?.data?.result?.financialList?.[i].equity ?? 0) / 100000000000).toFixed(2));
          }
        }
        tmpLable2 = tmpLable1;
        if (tmpLable1.length > 0) tmpLable1 = ['',...tmpLable1,''];
        if (tmpChartData1.length > 0) tmpChartData1 = [0,...tmpChartData1,0];
        if (tmpChartData2.length > 0) tmpChartData2 = [0,...tmpChartData2,0];
        if (tmpChartData3.length > 0) tmpChartData3 = [0,...tmpChartData3,0];
        if (tmpChartData4.length > 0) tmpChartData4 = [0,...tmpChartData4,0];
        if (tmpTableData1.length > 0) tmpTableData1 = [0,...tmpTableData1,0];

        setLabels1(tmpLable1);
        setTempChartData1(tmpChartData1);
        setTempChartData2(tmpChartData2);
        setTempChartData3(tmpChartData3);
        setTempChartData4(tmpChartData4);
        setTempTableData1(tmpTableData1);

        setLabels2(tmpLable2);
        setTempChartData5(tmpChartData5);
        setTempChartData6_1(tmpChartData6_1);
        setTempChartData6_2(tmpChartData6_2);

        setTempChartData7_1(tmpChartData7_1);
        setTempChartData7_2(tmpChartData7_2);
        setTempChartData7_3(tmpChartData7_3);

        setTempChartData8_1(tmpChartData8_1);
        setTempChartData8_2(tmpChartData8_2);
        setTempChartData8_3(tmpChartData8_3);

        setTempChartData9_1(tmpChartData9_1);
        setTempChartData9_2(tmpChartData9_2);
        setTempChartData9_3(tmpChartData9_3);

        setTempChartData10_1(tmpChartData10_1);
        setTempChartData10_2(tmpChartData10_2);
        setTempChartData10_3(tmpChartData10_3);

      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3]);

  const getTabProjectList = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        let data;
        data = await discoveryAPI.resultInfoView(se3, common.getViewResultInfoType(se2), 'rnd_project', listSize, tabSubPage);
        let procData = [];
        for (let i in data?.data?.result?.dataInfo?.projectOut ?? []) {
          procData.push({
            id: data?.data?.result?.dataInfo?.projectOut?.[i]?.projectNumber ?? i,
            title: data?.data?.result?.dataInfo?.projectOut?.[i]?.projectTitle ?? '',
            price: common.setPriceInput(data?.data?.result?.dataInfo?.projectOut?.[i]?.fund ?? 0) + '원',
            period: (data?.data?.result?.dataInfo?.projectOut?.[i]?.period ?? '').replaceAll('-','.'),
            agency: data?.data?.result?.dataInfo?.projectOut?.[i]?.researchAgencyName ?? '',
            name: data?.data?.result?.dataInfo?.projectOut?.[i]?.researchManagerName ?? '',
            department: data?.data?.result?.dataInfo?.projectOut?.[i]?.orderAgencyName,
            division: common.joinArrNStr(data?.data?.result?.dataInfo?.projectOut?.[i]?.technicalClassification, ' / ', ''),
            keyword: common.joinArrNStr(data?.data?.result?.dataInfo?.projectOut?.[i]?.keywordKor, ', ', ''),
            tag: ((data?.data?.result?.dataInfo?.projectOut?.[i]?.projectStatus ?? '') === '') ? 3 : ((data?.data?.result?.dataInfo?.projectOut?.[i]?.projectStatus ?? '') === '종료') ? 2 : 1
          });
        }
        if (tabSubPage === 1) {
          setTabProjectList(procData);
        } else {
          setTabProjectList([...tabProjectList, ...procData]);
        }
        setTabSubCnt([data?.data?.result?.countInfo?.projectOut ?? 0]);
        console.log('tabProjectList', data?.data?.result);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3, tabActive1, tabSubPage]);

  const getTabPatentList = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        let data;
        data = await discoveryAPI.resultInfoView(se3, common.getViewResultInfoType(se2), 'patent', listSize, tabSubPage);
        let procData = [];
        for (let i in data?.data?.result?.dataInfo?.projectOut ?? []) {
          procData.push({
            id: data?.data?.result?.dataInfo?.patent?.[i]?.applNumber ?? i,
            title: data?.data?.result?.dataInfo?.patent?.[i]?.title ?? '',
            division: data?.data?.result?.dataInfo?.patent?.[i]?.type ?? '',
            num: data?.data?.result?.dataInfo?.patent?.[i]?.applNumber ?? '',
            date: (data?.data?.result?.dataInfo?.patent?.[i]?.applDate ?? '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
            agency: common.joinArrNStr(data?.data?.result?.dataInfo?.patent?.[i]?.applicantName, ', ', ''),
            name: common.joinArrNStr(data?.data?.result?.dataInfo?.patent?.[i]?.inventorName, ', ', ''),
            link: '',
          });
        }
        if (tabSubPage === 1) {
          setTabPatentList(procData);
        } else {
          setTabPatentList([...tabProjectList, ...procData]);
        }
        setTabSubCnt([data?.data?.result?.countInfo?.patent ?? 0]);
        console.log('tabPatentList', data?.data?.result);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3, tabActive1, tabSubPage]);

  const getTabNewsList = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        let data;
        data = await orgnAPI.orgnNews(viewData.name ?? '', listSize, tabSubPage);
        let procData = [];
        for (let i in data?.data?.result?.dataList ?? []) {
          const date = data?.data?.result?.dataList?.[i]?.publishedDate ?? '';
          const dateArr = date.split(' ');
          procData.push({
            id: i,
            title: parse(data?.data?.result?.dataList?.[i]?.title ?? ''),
            content: data?.data?.result?.dataList?.[i]?.contents ?? '',
            source: parse(data?.data?.result?.dataList?.[i]?.source ?? ''),
            date: (dateArr[0] ?? '').replaceAll('-','.'),
            link: data?.data?.result?.dataList?.[i]?.link ?? '',
            wordCloud: data?.data?.result?.dataList?.[i]?.similarity ?? [],
          });
        }
        if (tabSubPage === 1) {
          setTabNewsList(procData);
        } else {
          setTabNewsList([...tabNewsList, ...procData]);
        }
        setTabSubCnt([data?.data?.result?.totalCount ?? 0]);
        console.log('getTabNewsList', data?.data?.result);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3, tabActive1, tabSubPage]);

  useEffect(() => {
    getView();
  }, [se2, se3]);

  useEffect(() => {
    if (tabActive1 === 2) {
      getTabProjectList();
    } else if (tabActive1 === 3) {
      getTabPatentList();
    } else if (tabActive1 === 4) {
      console.log('고용정보관련');
    } else if (tabActive1 === 5) {
      getTabNewsList();
    }
  }, [se2, se3, tabActive1, tabSubPage]);

  useEffect(() => {
    setTabSubPage(1);
  }, [tabActive1]);
  

  return (
    <ViewLayout 
      tabs={tabButtons1}
      active={tabActive1}
      title={viewData.name ?? ''}
      subTitle=
        {(viewData.researchInstitute !== undefined) ?
          <>
            <span className='text-xl text-color-line mx-3'>|</span>
            <p className='text-xl font-medium text-color-regular'>{viewData.researchInstitute ?? ''}</p>
          </> : null}
      desc={viewData.address ?? ''}
      tags={<>
        <div className="text_style01">
          <p className='text-sm text-color-regular'>{viewData.establishmentYear ?? ''}년 설립({Number(moment().format('YYYY')) - Number(viewData.establishmentYear ?? moment().format('YYYY')) + 1}년차)</p>
          <p className='text-sm text-color-regular'>{viewData.scale ?? ''}</p>
          <p className='text-sm text-color-regular'>{viewData.area ?? ''}</p>
        </div>
      </>}
    >
      {(tabActive1 === 0)
        ? // 기본 정보
        <ViewTable
          summary={viewData.name ?? ''}
          bodyData={tabContents}
        />
        : (tabActive1 === 1)
          ? // 재무 정보 (사후관리정보, 재무현황)
          <>
            <div className='flex items-center justify-between pt-6 px-4'>
              <div className='tab_btns tab_style05'>
                <ul>
                  {tabButtons2?.map((e) => {
                    return <li key={e.id} className={(e.id === tabActive2) ? 'on' : ''}>
                      <button type='button' onClick={e.onClick}>{e.name}</button>
                    </li>;
                  })}
                </ul>
              </div>
              <a href='#' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={'새창이동, 관련 규정 페이지'}>근거규정 보기↗</a>
            </div>
            {(tabActive2 === 0)
              ? <>
                <div className='list_wrap_style02 grid02 mt-4'>
                  <div>
                    <div className='tooltip_wrap inline-block px-2' tabIndex={0}>
                      <h4 className='text-base font-bold text-color-dark'>부채비율</h4>
                      <span className='tooltip_style04 min-w-30'>
                        [부채비율] <br/>
                        * 부채총계/자본총계
                      </span>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'end'} lineData={300} barData={tempChartData1} />
                    </div>
                  </div>
                  <div>
                    <div className='tooltip_wrap inline-block px-2' tabIndex={0}>
                      <h4 className='text-base font-bold text-color-dark'>유동비율</h4>
                      <span className='tooltip_style04 min-w-30'>
                        [유동비율] <br/>
                        * 유동자산/유동부채
                      </span>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'start'} lineData={100} barData={tempChartData2} />
                    </div>
                  </div>
                  <div>
                    <div className='tooltip_wrap inline-block px-2' tabIndex={0}>
                      <h4 className='text-base font-bold text-color-dark'>이자보상비율</h4>
                      <span className='tooltip_style04 min-w-30'>
                        [이자보상비율] <br/>
                        * 영업이익/지급이자
                      </span>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'start'} lineData={1} barData={tempChartData3} />
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center justify-between px-2'>
                      <h4 className='text-base font-bold text-color-dark'>영역이익</h4>
                      <p className='text-xs font-medium text-color-footer'>단위: 천원</p>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'start'} lineData={0} barData={tempChartData4} />
                    </div>
                  </div>
                </div>
                <div className='mt-14'>
                  <h3 className='text-base font-bold text-color-dark'>자본잠식여부</h3>
                  <div className='table_style01 w_type02 mt-5'>
                    <table>
                      <caption className='hidden_text'>(주) 마인즈랩(MINDS LAB., INC.) 사후관리 재무 정보 - 자본잠식여부</caption>
                      <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope='col' className='text-center'>연도</th>
                          <th scope='col' className='text-center'>자본총계</th>
                          <th scope='col' className='text-center'>자본금</th>
                          <th scope='col' className='text-center'>자본잠식여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        {labels1.map((e, i) => {
                          if (e == '') return null;
                          return (
                            <tr key={i}>
                              <td className='text-center'>{e}</td>
                              <td className='text-center'>{common.setPriceInput(tempTableData1?.[i]?.[0] ?? 0)}</td>
                              <td className='text-center'>{common.setPriceInput(tempTableData1?.[i]?.[1] ?? 0)}</td>
                              <td className={'text-center '+((tempTableData1?.[i]?.[2] ?? '') === '정상' ? 'bg03' : (tempTableData1?.[i]?.[2] ?? '') === '부분자본잠식' ? 'bg02' : (tempTableData1?.[i]?.[2] ?? '') === '완전자본잠식' ? 'bg01' : '')}>{tempTableData1?.[i]?.[2] ?? ''}</td>
                            </tr>);
                        })}
                      </tbody>
                    </table>
                    <p className='text-xs font-medium text-color-footer mt-4'>
                      * 완전자본잠식 : 자본총계 &lt; 0  /  부분자본잠식 : 자본총계 &lt; 자본금
                    </p>
                  </div>
                </div>
              </> 
              : <>
                <div className='list_wrap_style02 grid02 mt-4'>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>매출액</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart2
                        title={{
                          y: '매출액(천억원)',
                          label: '매출액',
                        }} 
                        unit=''
                        type={1}
                        labels={labels2} 
                        datas={tempChartData5} 
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>영업이익률, 당기순이익률</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart3 labels={labels2} data1={tempChartData6_1} data2={tempChartData6_2} unit='%' type={1} />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>부채비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '부채비율(%)',
                          label: { 1: '부채비율', 2: '자본총계', 3: '부채총계' }
                        }}
                        unit=''
                        type={1}
                        labels={labels2} 
                        data1={tempChartData7_1} 
                        data2={tempChartData7_2} 
                        data3={tempChartData7_3}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>유동비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '유동비율(%)',
                          label: { 1: '유동비율', 2: '유동자산', 3: '유동부채' }
                        }}
                        unit=''
                        type={1}
                        labels={labels2} 
                        data1={tempChartData8_1} 
                        data2={tempChartData8_2} 
                        data3={tempChartData8_3}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark'>이자보상비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '이자보상비율(%)',
                          label: { 1: '이자보상비율', 2: '영업이익', 3: '지급이자' }
                        }}
                        unit=''
                        type={1}
                        scaleYUnit='금액(억원) '
                        labels={labels2} 
                        data1={tempChartData9_1} 
                        data2={tempChartData9_2} 
                        data3={tempChartData9_3}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark'>자기자본비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '자기자본비율(%)',
                          label: { 1: '자기자본비율', 2: '자산총계', 3: '자기자본' }
                        }}
                        unit=''
                        type={1}
                        labels={labels2} 
                        data1={tempChartData10_1} 
                        data2={tempChartData10_2} 
                        data3={tempChartData10_3}
                      />
                    </div>
                  </div>
                </div>
              </>}
          </>
          : (tabActive1 === 2)
            ? // 과제 정보
            <>
              <div className='pt-6 px-4'>
                <p className='text-base font-bold text-color-main'>과제({common.setPriceInput(tabSubCnt[0] ?? 0)})</p>
              </div>
              <div className='list_style01 mt-4'>
                <ul>
                  {(tabProjectList?.length > 0) 
                    ? tabProjectList?.map((e) => {
                      {/* tag - 진행중 : 1 | 종료 : 2 */}
                      return (<ListItem 
                        key={e.id}
                        tag={1}
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
                            <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                          </div>
                        </>}
                        btns={<>
                          <a href={`/view/projectout/${e.id}`} target='_blank' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' rel="noreferrer">자세히 보기↗</a>
                        </>}
                      />);
                    })
                    : <li>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  
                  }
                </ul>
              </div>
              {(tabSubCnt[0] <= (tabSubPage * listSize)) ? null : <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => { setTabSubPage(tabSubPage + 1); }} />}
            </>
            : (tabActive1 === 3)
              ? // 성과 정보
              <>
                <div className='pt-6 px-4'>
                  <p className='text-base font-bold text-color-main'>특허({common.setPriceInput(tabSubCnt[0] ?? 0)})</p>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tabPatentList?.length > 0) 
                      ? tabPatentList?.map((e) => {
                        return (<ListItem 
                          key={e.id}
                          title={e.title}
                          contents={<>
                            <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                            <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                          </>}
                          btns={<>
                            <a href={`/view/patent/${e.id}`} target='_blank' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' rel="noreferrer">자세히 보기↗</a>
                            {(e.link && e.link !== '') ? <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a> : null}
                          </>}
                        />);
                      })
                      : <li>
                        <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                      </li>}
                  </ul>
                </div>
                {(tabSubCnt[0] <= (tabSubPage * listSize)) ? null : <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => { setTabSubPage(tabSubPage + 1); }} />}
              </>
              : (tabActive1 === 4)
                ? // 고용 정보
                <>
                  <div className='list_wrap_style02 grid02 mt-10'>
                    <div>
                      <h4 className='text-base font-bold text-color-dark'>종업원 수</h4>
                      <div className='chart_wrap mt-4'>
                        <ViewChart2 
                          title={{
                            y: '종업원 수(명)',
                            label: '종업원 수',
                          }}
                          color={'#0056B8'}
                          labels={labels2} 
                          datas={tempChartData11}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className='text-base font-bold text-color-dark'>월별 고용인원</h4>
                      <div className='chart_wrap mt-4'>
                        <ViewChart2 
                          height={300}
                          labels={labels3} 
                          datas={tempChartData12}
                        />
                      </div>
                      <div className='mt-6 text-center'>
                        <label htmlFor='year' className='hidden_text'>연도별 보기</label>
                        <select name='year' id='year'>
                          <option value='2022'>2022</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='list_wrap_style02 mt-10'>
                    <div>
                      <h4 className='text-base font-bold text-color-dark'>기간별 과제 수행정보</h4>
                      <div className='chart_wrap mt-4'>
                        <ViewChart5 
                          labels={labels4} 
                          lineStartData={'2022-01-01'}
                          lineEndData={'2022-12-31'}
                          barData={tempChartData13} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-10'>
                    <h4 className="text-base font-bold text-color-dark">과제수행현황: <span className="text-color-main">2020년</span></h4>
                  </div>
                  <div className='list_style01 mt-4'>
                    <ul>
                      {(tempData2?.length > 0) 
                        ? tempData2?.map((e) => {
                          {/* tag - 진행중 : 1 | 종료 : 2 */}
                          return (<ListItem 
                            key={e.id}
                            tag={1}
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
                                <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                                <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                              </div>
                            </>}
                            btns={<>
                              <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                            </>}
                          />);
                        })
                        : <li>
                          <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                        </li>
                  
                      }
                    </ul>
                  </div>
                  <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => {}} />
                </>
                : // 뉴스
                <>
                  <div className='list_style03 mt-5'>
                    <ul>
                      {(tabNewsList?.length > 0)
                        ? tabNewsList?.map((e) => {
                          return (
                            <ToggleListItem 
                              key={e.id}
                              id={e.id}
                              title={<>
                                <p className='flex-1 text-base font-bold text-color-dark'>{e.title}</p>
                                <div className='text_style01'>
                                  <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                                  <p className='text-sm text-color-regular'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                                </div>
                              </>}
                              btn={(e.link && e.link !== '') ? <>
                                <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                              </> : null}
                              contents={<>
                                <WordClouds />
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
                  {(tabSubCnt[0] <= (tabSubPage * listSize)) ? null : <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => { setTabSubPage(tabSubPage + 1); }} />}
                </>
      }
    </ViewLayout>
  );
}