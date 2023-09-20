import React, { useState, useEffect, useCallback } from 'react';
import ViewLayout from 'Domain/Home/Discovery/Layout/ViewLayout';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Button from 'Domain/Home/Common/Componet/Button';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';
import * as patentAPI from 'Domain/Home/Discovery/API/PatentCall';
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

  const [tabContents, setTAbContents] = useState([
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

  const [tabList1, setTabList1] = useState([]);

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '특허 요약', onClick: () => setTabActive(1) },
    { id: 2, name: '관련 과제', onClick: () => setTabActive(2) },
  ];

  const [tabSubCnt, setTabSubCnt] = useState([0]);
  const [tabSubPage, setTabSubPage] = useState(1);
  const listSize = 5;

  const [tabActive, setTabActive] = useState(0);

  const getView = useCallback(async () => {
    await (async () => {
      try {
        dispatch(setLoading(true));
        const data = await patentAPI.patentView(se3);
        console.log('viewData:', data?.data?.result);

        setViewData(data?.data?.result ?? {});
        setTAbContents([
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
  }, [se2, se3]);

  const getTabList = useCallback(async () => {
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
          setTabList1(procData);
        } else {
          setTabList1([...tabList1, ...procData]);
        }
        setTabSubCnt([data?.data?.result?.countInfo?.projectOut ?? 0]);
        console.log('tabList', data?.data?.result);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
    })();
  }, [se2, se3, tabActive, tabSubPage]);

  useEffect(() => {
    getView();
  }, [se2, se3]);

  useEffect(() => {
    if (tabActive === 2) {
      getTabList();
    }
  }, [se2, se3, tabActive, tabSubPage]);

  useEffect(() => {
    setTabSubPage(1);
  }, [tabActive]);
  
  return (
    <ViewLayout 
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
    >
      {(tabActive === 0)
        ? // 기본 정보
        <ViewTable
          summary={viewData.applName ?? ''}
          bodyData={tabContents}
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
              <p className='text-base font-bold text-color-main'>과제({common.setPriceInput(tabSubCnt[0] ?? 0)})</p>
            </div>
            <div className='list_style01 mt-4'>
              <ul>
                {(tabList1?.length > 0) 
                  ? tabList1?.map((e) => {
                    {/* tag - 진행중 : 1 | 종료 : 2 */}
                    return (<ListItem 
                      key={e.id}
                      tag={e.tag}
                      title={e.title}
                      contents={<>
                        <div>
                          <p className='text-sm text-color-regular'>총연구개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                          <p className='text-sm text-color-regular'>총연구개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                          <p className='text-sm text-color-regular'>주관연구개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>연구책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
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
      }
    </ViewLayout>
  );
}