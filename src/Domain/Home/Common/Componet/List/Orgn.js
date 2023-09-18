import React from 'react';
import imgBuilding01 from 'Assets/Images/building_img01.png';
import imgBuilding02 from 'Assets/Images/building_img02.png';
import imgBuilding03 from 'Assets/Images/building_img03.png';
import imgBuilding04 from 'Assets/Images/building_img04.png';
import imgBuilding05 from 'Assets/Images/building_img05.png';
import imgBuilding06 from 'Assets/Images/building_img06.png';
import imgBuilding07 from 'Assets/Images/building_img07.png';
import imgBuilding08 from 'Assets/Images/building_img08.png';
import imgBuilding09 from 'Assets/Images/building_img09.png';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import { NavLink } from 'react-router-dom';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import common from 'Utill';

export default function Orgn(props) {
  const { projectData, totalCount, size, page, setPage, orgnActive, onOrgnSelect, simialityOrgn, subListMode, setSubListMode, subProjectList, subPatentList } = props;

  return (
    <>
      <div className='flex items-start gap-6 mt-2'>
        <div className='w-120'>
          <div className='list_style02'>
            <ul>
              {(projectData?.length > 0)
                ? projectData?.map((e) => {
                  return (
                    <li 
                      key={e.id} 
                      className={(e.id === orgnActive.id) ? ' on' : ''}
                    >
                      <div 
                        className='conts_box type02'
                        onClick={(event) => onOrgnSelect(event, e.id, e.name)} 
                        onKeyUp={(event) => (event.key === 'Enter') && onOrgnSelect(event, e.id, e.name)} 
                        role={'button'}
                        tabIndex={0}
                      >
                        <p className='text-base font-bold text-color-main line1_text pr-40'>{e.name}</p>
                        <div className='text_style01'>
                          <p className='text-sm text-color-regular'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                          <p className='text-sm text-color-regular'>특허: <span className='font-medium text-color-main'>{e.patent}건</span></p>
                          {(e?.institue) && <p className='text-sm text-color-regular'>부설연구소: <span className='font-medium text-color-main'>{e.institue}</span></p>}
                        </div>
                      </div>
                      <div className='orgn_img tooltip_wrap' tabIndex={0}>
                        {(e.safety === 0) 
                          ? <>
                            <img src={imgBuilding01} alt='기관 재무안전성: 위험 이미지' className='w-11' />
                            <span className='tooltip_style01 min-w-23'>재무안전성: 위험</span>
                          </>
                          : (e.safety === 1) 
                            ? <>
                              <img src={imgBuilding02} alt='기관 재무안전성: 보통 이미지' className='w-11' />
                              <div className='tooltip_style02 min-w-23'>재무안전성: 보통</div>
                            </>
                            : <>
                              <img src={imgBuilding03} alt='기관 재무안전성: 안정 이미지' className='w-11' />
                              <div className='tooltip_style03 min-w-23'>재무안전성: 안정</div>
                            </>}
                      </div>
                      <div className='btns_box flex items-center gap-2'>
                        {(e.sales !== '') 
                          ? <div className='tooltip_wrap' tabIndex={0}>
                            <span className="tag_style03">{e.sales}</span>
                            <div className='tooltip_style04 min-w-30'>해당 산업 매출상위(%)</div>
                          </div> 
                          : null}
                        {(e.followup)
                          ? <div className='tooltip_wrap' tabIndex={0}>
                            <span className="tag_style04">사후</span>
                            <div className='tooltip_style04 min-w-25'>사후관리 대상 기업</div>
                          </div>
                          : null}
                        <NavLink to={`/view/orgn/${e.id}`} target='_blank' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1 min-w-17'>기관 보기↗</NavLink>
                      </div>
                    </li>
                  );
                })
                : <li className='nodata'>
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
            <h5 className='text-base font-bold text-color-dark'>{orgnActive.name} 유사 기관</h5>
            <ul className='flex mt-4'>
              {simialityOrgn?.map((e, i) => {
                let imgSrc = '';
                if(e.relation === 0) {
                  imgSrc = imgBuilding04;
                } else if(e.relation === 1) {
                  imgSrc = imgBuilding05;
                } else if(e.relation === 2) {
                  imgSrc = imgBuilding06;
                } else if(e.relation === 3) {
                  imgSrc = imgBuilding07;
                } else if(e.relation === 4) {
                  imgSrc = imgBuilding08;
                } else if(e.relation === 5) {
                  imgSrc = imgBuilding09;
                }

                return <li key={e.id} className='w-1/6 px-1'>
                  <div className={`img_wrap rounded-full w-15 h-15 mx-auto ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
                    <img src={imgSrc} alt='기관 이미지' className='w-11' />
                  </div>
                  <p className={`mt-1 text-sm text-center ${(i === 0) ? 'text-color-main' : 'text-color-dark'}`}>{e.name}</p>
                </li>;
              })}
            </ul>
          </div>
          <div className='mt-10'>
            <div className='flex items-center gap-5'>
              <h5 className='text-base font-bold text-color-dark'>{orgnActive.name}</h5>
              <div className='tab_btns tab_style05'>
                <ul>
                  <li className={(subListMode === 'project')? 'on' : ''}>
                    <button type='button' onClick={() => setSubListMode('project')}>과제({common.setPriceInput(subProjectList.length)})</button>
                  </li>
                  <li className={(subListMode === 'patent')? 'on' : ''}>
                    <button type='button' onClick={() => setSubListMode('patent')}>특허({common.setPriceInput(subPatentList.length)})</button>
                  </li>
                </ul>
              </div>
            </div>
            <div className='list_style01 mt-4'>
              <ul>
                {
                  (subListMode === 'project') ?
                    (subProjectList?.length > 0) 
                      ? subProjectList?.map((e) => {
                        return  <ListItem 
                          key={e.id}
                          tag={(e?.progress !== null) 
                            ? (e.progress) ? 1 : 2 
                            : ''}
                          title={e.title}
                          contents={<>
                            <div>
                              <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            </div>
                            <div>
                              <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
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
                    : null
                }
                {
                  (subListMode === 'patent') ?
                    (subPatentList?.length > 0) 
                      ? subPatentList?.map((e) => {
                        return  <ListItem 
                          key={e.id}
                          tag={(e?.progress !== null) 
                            ? (e.progress) ? 1 : 2 
                            : ''}
                          title={e.title}
                          contents={<>
                            <div>
                              <p className='text-sm text-color-regular'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
                              <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                              <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                            </div>
                            <div>
                              <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                              <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            </div>
                          </>}
                          desc={<>
                            <NavLink to={`/view/patent/${e.id}`} target='_blank' className='h-5 text-base font-bold text-color-footer'>더보기 ＋</NavLink>
                          </>}
                        />;
                      })
                      : <li>
                        <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                      </li>
                    : null
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}