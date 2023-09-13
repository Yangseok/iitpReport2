import React from 'react';
import Layout from 'Domain/Home/Common/Layout/Sub';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function DemandMerge() {
  const tempData = [
    {
      id: 0,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 1,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
    {
      id: 2,
      pblanc: '정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)',
      title: '초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발',
      agency: '한국표준과학연구원',
      name: '홍길동',
      registration: '증강/혼합현실(AR/MR)',
      recommend: '증강/혼합현실(AR/MR)',
    },
  ];
  
  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-base font-bold text-color-dark mb-4'>기술수요조사서 <span className='text-color-main'>병합수요 정보</span></h2>
          <div className='list_style01 first_active'>
            <ul>
              {(tempData?.length > 0)
                ? tempData?.map(e => {
                  return <ListItem 
                    key={e.id}
                    title={e.title}
                    contents={<>
                      <div className='text_style01'>
                        <p className='text-sm text-color-regular'>기관명: <span className='font-medium text-color-main'>{e.agency}</span></p>
                        <p className='text-sm text-color-regular'>신청인: <span className='font-medium text-color-main'>{e.name}</span></p>
                        <p className='text-sm text-color-regular'>등록 ICT 분류: <span className='font-medium text-color-main'>{e.registration}</span></p>
                        <p className='text-sm text-color-regular'>추천 ICT 분류: <span className='font-medium text-color-main'>{e.recommend}</span></p>
                      </div>
                    </>}
                    desc02={<>
                      <p className='text-sm font-medium text-color-regular mb-2'>{e.pblanc}</p>
                    </>}
                    btns={<>
                      <div className='flex items-start gap-4'>
                        {/* 파일이 존재하면 파일 분석 버튼 생성 */}
                        <a href={'/demandbanking/file/result/projectout'} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 파일분석 페이지`}>파일 분석</a>
                        <a href={`/demandbanking/view/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</a>
                      </div>
                    </>}
                  />;
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
    </Layout>
  );
}