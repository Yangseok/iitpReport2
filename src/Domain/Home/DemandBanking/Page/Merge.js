import React, { useEffect, useState, useCallback } from 'react';
import Layout from 'Domain/Home/Common/Layout/Sub';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import * as demandCallAPI from 'Domain/Home/DemandBanking/API/Call';

export default function DemandMerge() {
  const dispatch = useDispatch();
  const params = useParams();
  const surveyId = params?.surveyId ?? '';

  const [data, setData] = useState([]);

  const size = 10;
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const getMergedSurveyList = useCallback(async () => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await demandCallAPI.mergedSurvey(surveyId, size, page);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }

    let tmpData = [];
    for (let i in data?.data?.result?.childSurvey ?? []) {
      if (data?.data?.result?.childSurvey?.[i]?.surveyId === undefined) continue;
      let pushData = {
        key: i,
        noticeId: data?.data?.result?.parentSurvey?.noticeId ?? '',
        id: data?.data?.result?.childSurvey?.[i]?.surveyId,
        pblanc: (data?.data?.result?.parentSurvey?.noticeTitle ?? '') + ' (' + (data?.data?.result?.parentSurvey?.period ?? '') + ')',
        title: data?.data?.result?.childSurvey?.[i]?.surveyTitle ?? '',
        agency: data?.data?.result?.childSurvey?.[i]?.orgnName ?? '',
        name: data?.data?.result?.childSurvey?.[i]?.applicant ?? '',
        registration: data?.data?.result?.childSurvey?.[i]?.registrationIctCode ?? '',
        recommend: data?.data?.result?.childSurvey?.[i]?.recommendIctCode ?? '',
      };
      tmpData.push(pushData);
    }

    setData(tmpData);
    setTotalCount(data?.data?.result?.childCount ?? 0);
  }, [surveyId, size, page]);

  useEffect(() => {
    getMergedSurveyList();
  }, [surveyId, size, page]);

  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-base font-bold text-color-dark mb-4'>기술수요조사서 <span className='text-color-main'>병합수요 정보</span></h2>
          <div className='list_style01 first_active'>
            <ul>
              {(data?.length > 0)
                ? data?.map(e => {
                  return <ListItem 
                    key={e.id}
                    title={e.title}
                    contents={<div className='text_style01'>
                      <p className='text-sm text-color-regular'>기관명: <span className='font-medium text-color-main'>{e.agency}</span></p>
                      <p className='text-sm text-color-regular'>신청인: <span className='font-medium text-color-main'>{e.name}</span></p>
                      <p className='text-sm text-color-regular'>등록 ICT 분류: <span className='font-medium text-color-main'>{e.registration}</span></p>
                      <p className='text-sm text-color-regular'>추천 ICT 분류: <span className='font-medium text-color-main'>{e.recommend}</span></p>
                    </div>}
                    desc02={<p className='text-sm font-medium text-color-regular mb-2'>{e.pblanc}</p>}
                    btns={<div className='flex items-start gap-4'>
                      {/* 파일이 존재하면 파일 분석 버튼 생성 */}
                      <a href={`/demandbanking/file/${e.noticeId}/${e.id}/result/projectout`} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 파일분석 페이지`}>파일 분석</a>
                      <a href={`/demandbanking/view/${e.noticeId}/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</a>
                    </div>}
                  />;
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={totalCount} size={size} page={page} onClick={(page) => setPage(page)} />
          </div>
        </div>
      </section>
    </Layout>
  );
}