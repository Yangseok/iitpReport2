import React from 'react';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import { NavLink } from 'react-router-dom';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function ProjectOut(props) {
  const { projectData, totalCount, size, page, setPage } = props;

  return (
    <>
      <div className='list_style01 mt-2'>
        <ul>
          {(projectData?.length > 0) 
            ? projectData?.map((e) => {
              return (
                <ListItem 
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
                      {(e.performance !== '') ? <p className='text-sm text-color-regular'>연구개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p> : null}
                      {(e.division !== '') ? <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p> : null}
                      {(e.keyword !== '') ? <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p> : null}
                    </div>
                  </>}
                  btns={<NavLink to={`/view/projectout/${e.id}`} target="_blank" className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</NavLink>}
                />
              );
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
    </>
  );
}