import React from 'react';
import imgResearcher01 from 'Assets/Images/researcher_img01.png';
import imgResearcher02 from 'Assets/Images/researcher_img02.png';
import imgResearcher03 from 'Assets/Images/researcher_img03.png';
import imgResearcher04 from 'Assets/Images/researcher_img04.png';
import imgResearcher05 from 'Assets/Images/researcher_img05.png';
import imgResearcher06 from 'Assets/Images/researcher_img06.png';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import { NavLink } from 'react-router-dom';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function Researcher(props) {
  const { projectData, totalCount, size, page, setPage, researcherActive, onResearcherSelect, simialityResearcher, subList } = props;

  return (
    <>
      <div className='flex items-start gap-6 mt-2'>
        <div className='w-120'>
          <div className='list_style02'>
            <ul>
              {(projectData?.length > 0)
                ? projectData?.map((e) => (
                  <li 
                    key={e.id} 
                    className={(e.id === researcherActive.id) ? ' on' : ''}
                  >
                    <div
                      className='conts_box flex items-center gap-4'
                      onClick={(event) => onResearcherSelect(event, e.id, e.name)} 
                      onKeyUp={(event) => (event.key === 'Enter') && onResearcherSelect(event, e.id, e.name)} 
                      role={'button'}
                      tabIndex={0}
                    >
                      <img src={imgResearcher01} alt='연구자 프로필 이미지' className='w-11' />
                      <div className='flex-1'>
                        <p className='text-base font-bold text-color-main'>{e.name}</p>
                        <div className='text_style01'>
                          <p className='text-sm text-color-regular'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                        </div>
                      </div>
                    </div>
                    {(e.link && e.link !== '') ? <div className='btns_box'>
                      <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.name} 연구자 페이지`}>연구자 보기↗</a>
                    </div> : null}
                  </li>
                ))
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
        <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
          <div>
            <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 관련 연구자</h5>
            <ul className='flex mt-4'>
              {simialityResearcher?.map((e, i) => {
                let imgSrc = '';
                if(e.relation === 0) {
                  imgSrc = imgResearcher01;
                } else if(e.relation === 1) {
                  imgSrc = imgResearcher02;
                } else if(e.relation === 2) {
                  imgSrc = imgResearcher03;
                } else if(e.relation === 3) {
                  imgSrc = imgResearcher04;
                } else if(e.relation === 4) {
                  imgSrc = imgResearcher05;
                } else if(e.relation === 5) {
                  imgSrc = imgResearcher06;
                }

                return <li key={e.id} className='w-1/6 px-1'>
                  <a href={e.link} className='flex-col' target='_blank' rel="noreferrer" title={`새창이동, ${e.name} 연구자 페이지`}>
                    <div className={`img_wrap rounded-full w-15 h-15 mx-auto ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
                      <img src={imgSrc} alt='연구자 프로필 이미지' className='w-11' />
                    </div>
                    <p className={`mt-1 text-sm text-center ${(i === 0) ? 'text-color-main' : 'text-color-dark'}`}>{e.name}</p>
                  </a>
                </li>;
              })}
            </ul>
          </div>
          <div className='mt-10'>
            <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 과제</h5>
            <div className='list_style01 mt-4'>
              <ul>
                {(subList?.length > 0) 
                  ? subList?.map((e) => {
                    return  <ListItem 
                      key={e.id}
                      tag={(e?.progress !== null) 
                        ? (e.progress) ? 1 : 2 
                        : ''}
                      title={e.title}
                      contents={<>
                        <div>
                          <p className='text-sm text-color-regular'>총연구개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                          <p className='text-sm text-color-regular'>총연구개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                          <p className='text-sm text-color-regular'>주관연구개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>연구책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                        </div>
                        <div>
                          <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                          <p className='text-sm text-color-regular'>연구개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                          <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                        </div>
                        <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                      </>}
                      desc={<>
                        <NavLink to={`/view/projectout/${e.id}`} target='_blank' className='h-5 text-base font-bold text-color-footer'>더보기 ＋</NavLink>
                      </>}
                    />;
                  })
                  : <li>
                    <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}