import React, { useState, useEffect, useCallback } from 'react';
import ViewLayout from 'Domain/Home/Discovery/Layout/ViewLayout';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';
import * as paperAPI from 'Domain/Home/Discovery/API/PaperCall';
import { useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import common from 'Utill';

export default function View() {
  const dispatch = useDispatch();
  const se = common.getSegment();
  const se2 = se[2] ?? '';
  const se3 = se[3] ?? '';

  const [viewData, setViewData] = useState({});

  const [tabContents, setTabContents] = useState([
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

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '초록', onClick: () => setTabActive(1) },
  ];

  const [tabActive, setTabActive] = useState(0);

  const getView = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        const data = await paperAPI.paperView(se3);
        console.log('viewData:', data?.data?.result);

        setViewData(data?.data?.result ?? {});
        setTabContents([
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
  }, [se2, se3]);

  useEffect(() => {
    getView();
  }, [se2, se3]);
  
  return (
    <ViewLayout 
      tabStyle='4-3'
      tabs={tabButtons}
      active={tabActive}
      title={viewData.title ?? ''}
      tags={<p className='text-sm font-medium text-color-regular'>논문(학술지)</p>}
    >
      {(tabActive === 0)
        ? // 기본 정보
        <ViewTable
          summary={viewData.title ?? '논문내용'}
          bodyData={tabContents}
        />
        : // 초록
        <div className='p-6'>
          <p className='text-sm font-medium text-color-dark leading-loose break-keep whitespace-pre-line'>
            {(viewData.contents ?? '')}
          </p>
        </div>
      }
    </ViewLayout>
  );
}