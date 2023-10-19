import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PopupListLayout from 'Domain/Home/ICTTrend/Layout/PopupListLayout';
import PopupViewLayout from 'Domain/Home/ICTTrend/Layout/PopupViewLayout';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import { getIctKeyword } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import * as ictTrendAPI from 'Domain/Home/ICTTrend/API/Call';
import * as paperAPI from 'Domain/Home/Discovery/API/PaperCall';
import common from 'Utill';

export default function PopupPaperView(props) {
  const { applData } = props;

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '초록', onClick: () => setTabActive(1) },
  ];

  const dispatch = useDispatch();
  const ictKeyword = useSelector(getIctKeyword);
  const [showView, setShowView] = useState(false);
  const [paperIdx, setPaperIdx] = useState(0);
  const [listData, setListData] = useState([]);
  const [totalCnt, setTotalCnt] = useState(0);
  const [page, setPage] = useState(1);

  const [tabActive, setTabActive] = useState(0);
  const [viewData, setViewData] = useState({});
  const [viewTableData, setViewTableData] = useState([
    [
      { content: '발행년도', scope: 'row' },
      { content: '' },
      { content: '논문 구분', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '학술지/학술대회명', scope: 'row' },
      { content: '' },
      { content: '저자', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '소속기관', scope: 'row' },
      { content: '' },
      { content: '언어', scope: 'row' },
      { content: '' },
    ],
    [
      { content: '페이지', scope: 'row' },
      { content: '', colspan: 3 },
    ],
  ]);

  // 논문 목록
  const getPopupList = useCallback(async (appl, keyword, page) => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await ictTrendAPI.ictPerformanceList('paper', appl, keyword, 10, page);

      const dataList = data?.data?.result?.dataList ?? [];
      const total = data?.data?.result?.totalCount ?? 0;
      setListData(dataList);
      setTotalCnt(total);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
  });

  // 논문 상세
  const getPopupView = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        const data = await paperAPI.paperView(paperIdx);
        console.log('viewData:', data?.data?.result, paperIdx);

        setViewData(data?.data?.result ?? {});
        setViewTableData([
          [
            { content: '발행년도', scope: 'row' },
            { content: data?.data?.result?.year ?? '' },
            { content: '논문 구분', scope: 'row' },
            { content: data?.data?.result?.type ?? '' },
          ],
          [
            { content: '학술지/학술대회명', scope: 'row' },
            { content: data?.data?.result?.journalTitle ?? '' },
            { content: '저자', scope: 'row' },
            { content: common.joinArrNStr(data?.data?.result?.author, ', ', '') },
          ],
          [
            { content: '소속기관', scope: 'row' },
            { content: common.joinArrNStr(data?.data?.result?.affiliation, ', ', '') },
            { content: '언어', scope: 'row' },
            { content: data?.data?.result?.language ?? '' },
          ],
          [
            { content: '페이지', scope: 'row' },
            { content: data?.data?.result?.page ?? '', colspan: 3 },
          ],
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [paperIdx]);

  useEffect(() => {
    getPopupList(applData, ictKeyword, page);
  }, [applData, page]);
  
  useEffect(() => {
    setPage(1); 
  }, [applData]);

  useEffect(() => {
    if (showView) {
      getPopupView();
    }
  }, [showView, paperIdx]);
  
  return (
    <>
      {(!showView)
        ? <PopupListLayout
          title={`${applData} 논문 목록`}
          recommendCnt={44}
          totalCnt={totalCnt}
          listData={listData}
          listClick={() => {
            setShowView(true);
            setTabActive(0);
          }}
          page={page}
          setPage={setPage}
          setIdx={setPaperIdx}
        />
        : <PopupViewLayout
          tabStyle='4-3'
          tabs={tabButtons}
          active={tabActive}
          title={viewData.title ?? ''}
          tags={<p className='text-sm font-medium text-color-regular'>논문(학술지)</p>}
          btnClick={() => setShowView(false)}
        >
          {(tabActive === 0)
            ? // 기본 정보
            <ViewTable
              summary={viewData.title ?? '논문 기본 정보'}
              bodyData={viewTableData}
            />
            : // 초록
            <div className='p-6'>
              <p className='text-sm font-medium text-color-dark leading-loose break-keep whitespace-pre-line'>
                {(viewData.contents ?? '')}
              </p>
            </div>
          }
        </PopupViewLayout>
      }
    </>
  );
}