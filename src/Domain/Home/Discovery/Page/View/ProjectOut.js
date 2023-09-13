import React, { useState, useEffect, useCallback } from 'react';
import ViewLayout from 'Domain/Home/Discovery/Layout/ViewLayout';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Button from 'Domain/Home/Common/Componet/Button';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';
import * as projectAPI from 'Domain/Home/Discovery/API/ProjectCall';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import { useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import common from 'Utill';

export default function View() {
  const dispatch = useDispatch();
  const se = common.getSegment();
  const se2 = se[2] ?? '';
  const se3 = se[3] ?? '';

  const [viewData, setViewData] = useState({});
  const [keywords, setKeywords] = useState({
    ko: [],
    en: [],
  });

  const [tabContents, setTAbContents] = useState([
    [
      { content: '내역사업명', scope: 'row' },
      { content: '', colspan: 3 },
    ],
    [
      { content: '연구 개발비', scope: 'row' },
      { content: '' },
      { content: '부처명', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '총 연구 기간', scope: 'row' },
      { content: '' },
      { content: '당해연도 연구 기간', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '연구 개발기관', scope: 'row' },
      { content: '' },
      { content: '연구 책임자', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '지역', scope: 'row' },
      { content: '' },
      { content: '연구 개발단계', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '국가과학기술표준분류', scope: 'row' },
      { content: '' },
      { content: '6T 관련 기술', scope: 'row' },
      { content: '' },
    ],
  ]);

  const [tabList1, setTabList1] = useState([]);
  const [tabList2, setTabList2] = useState([]);

  const tabButtons1 = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive1(0) },
    { id: 1, name: '연구 목표', onClick: () => setTabActive1(1) },
    { id: 2, name: '연구 내용', onClick: () => setTabActive1(2) },
    { id: 3, name: '기대 효과', onClick: () => setTabActive1(3) },
    { id: 4, name: '성과 정보', onClick: () => setTabActive1(4) },
  ];
  const tabButtons2 = [
    { id: 0, name: '논문', cnt: 8, onClick: () => setTabActive2(0) },
    { id: 1, name: '특허', cnt: 5, onClick: () => setTabActive2(1) },
  ];

  const [tabSubCnt, setTabSubCnt] = useState([0,0]);
  const [tabSubPage, setTabSubPage] = useState(1);
  const listSize = 5;

  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);

  const getView = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        const data = await projectAPI.projectOutView(se3);
        console.log('viewData:', data?.data?.result);

        setViewData(data?.data?.result ?? {});
        setKeywords({
          ko: data?.data?.result?.keywordKor ?? [],
          en: data?.data?.result?.keywordEng ?? [],
        });
        setTAbContents([
          [
            { content: '내역사업명', scope: 'row' },
            { content: data?.data?.result?.bigProjectName ?? '', colspan: 3 },
          ],
          [
            { content: '연구 개발비', scope: 'row' },
            { content: common.setPriceInput(data?.data?.result?.fund ?? 0) + '원' },
            { content: '부처명', scope: 'row' },
            { content: data?.data?.result?.orderAgencyName ?? '' },
          ],
          [
            { content: '총 연구 기간', scope: 'row' },
            { content: (data?.data?.result?.totalPeriod ?? '').replaceAll('-','.') },
            { content: '당해연도 연구 기간', scope: 'row' },
            { content: (data?.data?.result?.period ?? '').replaceAll('-','.') },
          ],
          [
            { content: '연구 개발기관', scope: 'row' },
            { content: data?.data?.result?.researchAgencyName ?? '' },
            { content: '연구 책임자', scope: 'row' },
            { content: data?.data?.result?.researchManagerName ?? '' },
          ],
          [
            { content: '지역', scope: 'row' },
            { content: data?.data?.result?.region ?? '' },
            { content: '연구 개발단계', scope: 'row' },
            { content: data?.data?.result?.developmentPhases ?? '' },
          ],
          [
            { content: '국가과학기술표준분류', scope: 'row' },
            { content: common.joinArrNStr(data?.data?.result?.technicalClassification, ' / ', '') },
            { content: '6T 관련 기술', scope: 'row' },
            { content: data?.data?.result?.sixTechnology ?? '' },
          ],
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3]);

  const getTabSize = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        const data = await discoveryAPI.resultInfoView(se3, common.getViewResultInfoType(se2), 'all', 1, 1);
        console.log('tabsize', data?.data?.result);
        setTabSubCnt([data?.data?.result?.countInfo?.paper ?? 0,data?.data?.result?.countInfo?.patent ?? 0]);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3, tabActive1]);

  const getTabList = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        let data;
        if (tabActive2 === 0) {
          data = await discoveryAPI.resultInfoView(se3, common.getViewResultInfoType(se2), 'paper', listSize, tabSubPage);
          let procData = [];
          for (let i in data?.data?.result?.dataInfo?.paper ?? []) {
            procData.push({
              id: data?.data?.result?.dataInfo?.paper?.[i]?.id ?? i,
              title: data?.data?.result?.dataInfo?.paper?.[i]?.title ?? '',
              year: data?.data?.result?.dataInfo?.paper?.[i]?.year ?? '',
              division: data?.data?.result?.dataInfo?.paper?.[i]?.type ?? '',
              agency: data?.data?.result?.dataInfo?.paper?.[i]?.affiliation ?? '',
              name: common.joinArrNStr(data?.data?.result?.dataInfo?.paper?.[i]?.author, ', ', ''),
              journal: data?.data?.result?.dataInfo?.paper?.[i]?.journalTitle ?? '',
            });
          }
          if (tabSubPage === 1) {
            setTabList1(procData);
          } else {
            setTabList1([...tabList1, ...procData]);
          }
        } else {
          data = await discoveryAPI.resultInfoView(se3, common.getViewResultInfoType(se2), 'patent', listSize, tabSubPage);
          let procData = [];
          for (let i in data?.data?.result?.dataInfo?.patent ?? []) {
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
            setTabList2(procData);
          } else {
            setTabList2([...tabList2, ...procData]);
          }
        }
        console.log('tabList', data?.data?.result);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3, tabActive1, tabActive2, tabSubPage]);

  useEffect(() => {
    getView();
  }, [se2, se3]);

  useEffect(() => {
    if (tabActive1 === 4) {
      getTabSize();
    }
  }, [se2, se3, tabActive1]);

  useEffect(() => {
    if (tabActive1 === 4) {
      getTabList();
    }
  }, [se2, se3, tabActive1, tabActive2, tabSubPage]);

  useEffect(() => {
    setTabSubPage(1);
  }, [tabActive2]);
  
  return (
    <ViewLayout 
      tabs={tabButtons1}
      active={tabActive1}
      keywords={keywords}
      title={viewData.projectTitle ?? ''}
      desc={viewData.projectNameEng ?? ''}
      tags={<>
        <div className="flex items-center gap-4">
          <p className={((viewData.projectStatus ?? '') === '') ? '' : ((viewData.projectStatus ?? '') === '종료') ? 'tag_style02' : 'tag_style05'}>{viewData.projectStatus ?? ''}</p>
          <p className="text-sm text-color-regular">과제고유번호: <span className="font-medium text-color-main">{viewData.projectNumber ?? ''}</span></p>
          <p className="text-sm text-color-regular">기관별 과제번호: <span className="font-medium text-color-main">{viewData.orgnDetailProejctNumber ?? ''}</span></p>
        </div>
      </>}
    >
      {(tabActive1 === 0)
        ? // 기본 정보
        <ViewTable
          summary={viewData.projectTitle ?? ''}
          bodyData={tabContents}
        />
        : (tabActive1 === 1)
          ? // 연구 목표
          <div className='p-6'>
            <p className='text-sm font-medium text-color-dark leading-loose break-keep whitespace-pre-line'>
              {(viewData.researchGoal ?? '')}
            </p>
          </div>
          : (tabActive1 === 2)
            ?  // 연구 내용 
            <div className='p-6'>
              <p className='text-sm font-medium text-color-dark leading-loose break-keep whitespace-pre-line'>
                {(viewData.researchDescription ?? '')}
              </p>
            </div>
            : (tabActive1 === 3)
              ? // 기대 효과
              <div className='p-6'>
                <p className='text-sm font-medium text-color-dark leading-loose break-keep whitespace-pre-line'>
                  {(viewData.expectationEffectiveness ?? '')}
                </p>
              </div>
              : // 성과 정보 (논문, 특허)
              <>
                <div className='tab_btns tab_style05 pt-6 px-4'>
                  <ul>
                    {tabButtons2?.map((e, i) => {
                      return <li key={e.id} className={(e.id === tabActive2) ? 'on' : ''}>
                        <button type='button' onClick={e.onClick}>{e.name}({common.setPriceInput(tabSubCnt[i] ?? 0)})</button>
                      </li>;
                    })}
                  </ul>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tabActive2 === 0)
                      ? (tabList1?.length > 0) 
                        ? tabList1?.map((e) => {
                          return (<ListItem 
                            key={e.id}
                            title={e.title}
                            contents={<>
                              <p className='text-sm text-color-regular'>발행년도: <span className='font-medium text-color-main'>{e.year}</span></p>
                              <p className='text-sm text-color-regular'>논문 구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                              <p className='text-sm text-color-regular'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular'>주 저자: <span className='font-medium text-color-main'>{e.name}</span></p>
                              <p className='text-sm text-color-regular'>학술지/학술대회명: <span className='font-medium text-color-main'>{e.journal}</span></p>
                            </>}
                            btns={<>
                              <a href={`/view/paper/${e.id}`} target='_blank' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' rel="noreferrer">자세히 보기↗</a>
                            </>}
                          />);
                        })
                        : <li>
                          <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                        </li>
                      : (tabList2?.length > 0) 
                        ? tabList2?.map((e) => {
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
                {(tabSubCnt[tabActive2] <= (tabSubPage * listSize)) ? null : <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => { setTabSubPage(tabSubPage + 1); }} />}
              </>
      }
    </ViewLayout>
  );
}