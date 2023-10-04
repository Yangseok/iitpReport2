import React from 'react';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Button from 'Domain/Home/Common/Componet/Button';

export default function DemandListItemDetail(props) {
  const { data, subPage, setSubPage, subTotalCount, subSize, subTab, setSubTab } = props;

  return (
    <>
      <div className='tab_btns tab_style05'>
        <ul>
          <li className={(subTab === 'ALL') ? 'on' : ''}>
            <button type='button' onClick={() => setSubTab('ALL')}>전체</button>
          </li>
          <li className={(subTab === 'NOTICE') ? 'on' : ''}>
            <button type='button' onClick={() => setSubTab('NOTICE')}>공고</button>
          </li>
        </ul>
      </div>
      <div className='list_style01 mt-4'>
        <ul>
          {(data?.length > 0)
            ? data?.map(e => {
              return <ListItem 
                key={e.key}
                title={'초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발'}
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
                    <a href={`/demandbanking/file/${e.noticeId}/${e.id}/result/projectout`} className='h-5 px-1.5 rounded-sm text-xs font-medium btn_style05' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 파일분석 페이지`}>파일 분석</a>
                    <a href={`/demandbanking/view/${e.noticeId}/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target="_blank" rel='noreferrer' title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</a>
                  </div>
                </>}
                percent={e.percent}
              />;
            })
            : <li>
              <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
            </li>
          }
        </ul>
      </div>
      {(subTotalCount <= subPage * subSize) ? null : <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => { setSubPage(subPage + 1); }} />}
    </>
  );
}