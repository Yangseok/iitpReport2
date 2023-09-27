import React, { useEffect, useState, useCallback } from 'react';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';
import { useParams } from 'react-router-dom';
import * as viewCallAPI from 'Domain/Home/Discovery/API/ViewCall';
import { useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';

export default function DemandView() {
  const dispatch = useDispatch();

  const params = useParams();
  const noticeId = params?.noticeId ?? '';
  const surveyId = params?.surveyId ?? '';

  const [data, setData] = useState({});
  const [tempData, setTempData] = useState([
    [
      { content: '접수 ID', scope: 'row' },
      { content: '202100001866' },
      { content: '신청일 / 접수일', scope: 'row' },
      { content: '2023.04.01 / 2023.04.01' },
    ],
    [
      { content: '제안기술명', scope: 'row' },
      { content: 'EUV 패턴 마스크 고감도 검사를 위한 ‘마스크 to 마스크’ 인공지능 검사기술 개발', colspan: 3 },
    ],
    [
      { content: '추천 ICT 분류', scope: 'row' },
      { content: '1순위: 증강/혼합현실(AR/MR)    2순위: 증강/혼합현실(AR/MR)', colspan: 3 },
    ],
  ]);

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '연구 개발 개요', onClick: () => setTabActive(1) },
  ];

  const [tabActive, setTabActive] = useState(0);

  const getSurveyView = useCallback(async () => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await viewCallAPI.surveyView(noticeId,surveyId);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    console.log('getSurveyView:', data?.data?.result);
    setData(data?.data?.result ?? {});    
    setTempData([
      [
        { content: '접수 ID', scope: 'row' },
        { content: data?.data?.result?.surveyID ?? '' },
        { content: '신청일 / 접수일', scope: 'row' },
        { content: (data?.data?.result?.applicationDate ?? '').replaceAll('-','.') + ' / ' + (data?.data?.result?.receiptDate ?? '').replaceAll('-','.')},
      ],
      [
        { content: '제안기술명', scope: 'row' },
        { content: data?.data?.result?.surveyName ?? '', colspan: 3 },
      ],
      [
        { content: '추천 ICT 분류', scope: 'row' },
        { content: data?.data?.result?.recommendIctCode ?? '', colspan: 3 },
      ],
    ]);
  }, [noticeId, surveyId]);

  useEffect(() => {
    getSurveyView();
  }, []);

  return (
    <Layout>
      <section>
        <div className='container'>
          <div className="flex items-center gap-4">
            {/* 정기 : tag_style06 | 수시 : tag_style07 */}
            <p className="tag_style06">{data?.noticeType ?? ''}</p>
            <p className="text-sm text-color-regular">{data?.noticeTitle ?? ''} ({data?.period ?? ''})</p>
          </div>
          <h2 className='text-xl font-bold text-color-dark mt-2'>{data?.surveyTitle ?? ''}</h2>
          <div className='text_style01 mt-2'>
            <p className="text-sm text-color-regular">기관명: <span className="font-medium text-color-main">{data?.orgnName ?? ''}</span></p>
            <p className="text-sm text-color-regular">신청인: <span className="font-medium text-color-main">{data?.applicant ?? ''}</span></p>
            <p className="text-sm text-color-regular">등록 ICT 분류: <span className="font-medium text-color-main">{data?.registrationIctCode ?? ''}</span></p>
            <p className="text-sm text-color-regular">추천 ICT 분류: <span className="font-medium text-color-main">{data?.recommendIctCode ?? ''}</span></p>
          </div>
        </div>
      </section>
      <div className='section mt-8'>
        <div className='container'>
          <TabButtons style='4-3' tabs={tabButtons} active={tabActive} />
          {(tabActive === 0)
            ? // 기본 정보
            <ViewTable
              summary={'초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발 기본 정보'}
              bodyData={tempData}
            />
            : // 연구 개발 개요
            <div className='p-6'>
              <p className='text-sm font-medium text-color-dark leading-loose break-keep whitespace-pre-line'>{data?.contents ?? ''}</p>
            </div>}
        </div>
      </div>
    </Layout>
  );
}