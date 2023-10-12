import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupListLayout from 'Domain/Home/ICTTrend/Layout/PopupListLayout';
import PopupViewLayout from 'Domain/Home/ICTTrend/Layout/PopupViewLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import { getIctKeyword } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import * as ictTrendAPI from 'Domain/Home/ICTTrend/API/Call';
import * as patentAPI from 'Domain/Home/Discovery/API/PatentCall';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import common from 'Utill';

export default function PopupPatentView(props) {
  const { applData } = props;

  // const tempData1 = [
  //   { id: 0, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 1, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 2, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 3, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 4, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 5, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 6, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 7, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 8, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  //   { id: 9, title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발' },
  // ];
  // const tempData2 = [
  //   [
  //     { content: '출원일', scope: 'row' },
  //     { content: '2020.06.24' },
  //     { content: '출원인', scope: 'row' },
  //     { content: '행정안전부국립재난안전연구원' },
  //   ],
  //   [
  //     { content: '소속기관 사업자등록번호', scope: 'row' },
  //     { content: '*** - ** - **01*' },
  //     { content: '해외출원여부', scope: 'row' },
  //     { content: '국내출원' },
  //   ],
  //   [
  //     { content: '우선권 주장번호', scope: 'row' },
  //     { content: '-' },
  //     { content: '발명자', scope: 'row' },
  //     { content: '홍길동, 김영수, 김영희' },
  //   ],
  //   [
  //     { content: '등록번호', scope: 'row' },
  //     { content: '10-2203135-0000' },
  //     { content: '등록일', scope: 'row' },
  //     { content: '2021.01.08' },
  //   ],
  //   [
  //     { content: 'IPC 코드', scope: 'row' },
  //     { content: '-' },
  //     { content: '법적 상태', scope: 'row' },
  //     { content: '등록' },
  //   ],
  //   [
  //     { content: '기술이전 희망', scope: 'row' },
  //     { content: '-' },
  //     { content: '심사청구 여부/일자', scope: 'row' },
  //     { content: '-' },
  //   ],
  //   [
  //     { content: '심사청구 항수', scope: 'row' },
  //     { content: '-', colspan: 3 },
  //   ],
  // ];
  // 데이터 5개씩 뿌려줌
  // const tempData3 = [
  //   {
  //     id: 0,
  //     progress: '진행중',
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //     department: '중소벤처기업부',
  //     division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
  //     keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
  //   },
  // ];

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '특허 요약', onClick: () => setTabActive(1) },
    { id: 2, name: '관련 과제', onClick: () => setTabActive(2) },
  ];

  const dispatch = useDispatch();
  const ictKeyword = useSelector(getIctKeyword);
  const [showView, setShowView] = useState(false);
  const [patentIdx, setPatentIdx] = useState(0);
  const [listData, setListData] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);

  const [tabActive, setTabActive] = useState(0);
  const [viewTableData, setViewTableData] = useState([
    [
      { content: '출원일', scope: 'row' },
      { content: '' },
      { content: '출원인', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '소속기관 사업자등록번호', scope: 'row' },
      { content: '' },
      { content: '해외출원여부', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '우선권 주장번호', scope: 'row' },
      { content: '' },
      { content: '발명자', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '등록번호', scope: 'row' },
      { content: '' },
      { content: '등록일', scope: 'row' },
      { content: '' },
    ],
    [
      { content: 'IPC 코드', scope: 'row' },
      { content: '' },
      { content: '법적 상태', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '기술이전 희망', scope: 'row' },
      { content: '' },
      { content: '심사청구 여부/일자', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '심사청구 항수', scope: 'row' },
      { content: '', colspan: 3 },
    ],
  ]);
  const [viewData, setViewData] = useState({});

  const listSize = 5;
  const [viewProjectList, setViewProjectList] = useState([]);
  const [viewProjectCnt, setViewProjectCnt] = useState(0);
  const [viewProjectPage, setViewProjectPage] = useState(1);

  // 출원특허 목록
  const getPopupList = useCallback(async (appl, keyword, page) => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await ictTrendAPI.ictPerformanceList('patent', appl, keyword, 10, page);

      const dataList = data?.data?.result?.dataList ?? [];
      const total = data?.data?.result?.totalCount ?? 0;
      setListData(dataList);
      setTotalCnt(total);
      console.log(data?.data?.result);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
  });

  // 출원특허 상세
  const getPopupView = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        const data = await patentAPI.patentView(patentIdx);
        console.log('viewData:', data?.data?.result);

        setViewData(data?.data?.result ?? {});
        setViewTableData([
          [
            { content: '출원일', scope: 'row' },
            { content: (data?.data?.result?.applDate ?? '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3') },
            { content: '출원인', scope: 'row' },
            { content: common.joinArrNStr(data?.data?.result?.applicantName,', ','') },
          ],
          [
            { content: '소속기관 사업자등록번호', scope: 'row' },
            { content: data?.data?.result?.bzno ?? '' },
            { content: '해외출원여부', scope: 'row' },
            { content: '' },
          ],
          [
            { content: '우선권 주장번호', scope: 'row' },
            { content: '' },
            { content: '발명자', scope: 'row' },
            { content: common.joinArrNStr(data?.data?.result?.inventorName,', ','') },
          ],
          [
            { content: '등록번호', scope: 'row' },
            { content: data?.data?.result?.registrationNumber ?? '' },
            { content: '등록일', scope: 'row' },
            { content: (data?.data?.result?.registrationDate ?? '').replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3') },
          ],
          [
            { content: 'IPC 코드', scope: 'row' },
            { content: data?.data?.result?.ipcCode ?? '' },
            { content: '법적 상태', scope: 'row' },
            { content: data?.data?.result?.registrationType ?? '' },
          ],
          [
            { content: '기술이전 희망', scope: 'row' },
            { content: data?.data?.result?.technologyTransferHope ?? '' },
            { content: '심사청구 여부/일자', scope: 'row' },
            { content: data?.data?.result?.examinationRequest ?? '' },
          ],
          [
            { content: '심사청구 항수', scope: 'row' },
            { content: data?.data?.result?.claimCount ?? '', colspan: 3 },
          ],
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [patentIdx]);

  // 출원특허 상세 - 관련 과제
  const getPopupViewProject = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        let data;
        data = await discoveryAPI.resultInfoView(patentIdx, 'patent', 'rnd_project', listSize, viewProjectPage);
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
        if (viewProjectPage === 1) {
          setViewProjectList(procData);
        } else {
          setViewProjectList([...viewProjectList, ...procData]);
        }
        setViewProjectCnt([data?.data?.result?.countInfo?.projectOut ?? 0]);
        console.log('tabList', data?.data?.result);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, []);

  useEffect(() => {
    getPopupList(applData, ictKeyword, page);
  }, [applData, page]);

  useEffect(() => {
    setPage(1); 
  }, [applData]);

  useEffect(() => {
    if (showView) {
      getPopupView();
      getPopupViewProject();
    }
  }, [showView, patentIdx]);

  useEffect(() => {
    setViewProjectPage(1);
  }, [tabActive]);

  return (
    <>
      {(!showView)
        ? <PopupListLayout
          title={`${applData} 출원특허 목록`}
          recommendCnt={44}
          totalCnt={totalCnt}
          listData={listData}
          listClick={() => {
            setShowView(true);
            setTabActive(0);
          }}
          page={page}
          setPage={setPage}
          setIdx={setPatentIdx}
        />
        : <PopupViewLayout
          tabStyle='4-3'
          tabs={tabButtons}
          active={tabActive}
          title={viewData.applName ?? ''}
          tags={<>
            <div className="flex items-center gap-4">
              {/* 진행중 : tag_style05 | 종료 : tag_style02 */}
              <p className="tag_style05">진행중</p>
              <p className="text-sm text-color-regular">출원번호: <span className="font-medium text-color-main">{viewData.applNumber ?? ''}</span></p>
            </div>
          </>}
          btnClick={() => setShowView(false)}
        >
          {(tabActive === 0)
            ? // 기본 정보
            <ViewTable
              summary={viewData.applName ?? ''}
              bodyData={viewTableData}
            />
            : (tabActive === 1)
              ? // 특허 요약
              <div className='p-6'>
                <p className='text-sm font-medium text-color-dark leading-loose break-keep whitespace-pre-line'>
                  {(viewData.abstract ?? '')}
                </p>
              </div>
              : // 관련 과제
              <>
                <div className='pt-6 px-4'>
                  <p className='text-base font-bold text-color-main'>과제({common.setPriceInput(viewProjectCnt ?? 0)})</p>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(viewProjectList?.length > 0) 
                      ? viewProjectList?.map((e) => {
                        {/* tag - 진행중 : 1 | 종료 : 2 */}
                        return (<ListItem 
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
                              <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                              <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                            </div>
                          </>}
                          btns={<>
                            <a href={`/view/projectout/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target="_blank" rel="noreferrer">자세히 보기↗</a>
                          </>}
                        />);
                      })
                      : <li>
                        <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                      </li>
                    
                    }
                  </ul>
                </div>
                {(viewProjectCnt <= (viewProjectPage * listSize)) ? null : <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => setViewProjectPage(viewProjectPage + 1)} />}
              </>
          }
        </PopupViewLayout>
      }
    </>
  );
}