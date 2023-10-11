import React from 'react';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import { NavLink } from 'react-router-dom';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function Patent(props) {
  const { projectData, totalCount, size, page, setPage } = props;

  return (
    <>
      <div className='list_style01 mt-2'>
        <ul>
          {(projectData?.length > 0) 
            ? projectData?.map((e) => {
              return (<ListItem 
                key={e.id}
                title={e.title}
                contents={<>
                  <div>
                    {(e.project !== '') ? <p className='text-sm text-color-regular'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p> : null}
                    <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                    <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                  </div>
                  <div>
                    <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                    {(e.agency !== '') ? <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p> : null}
                    {(e.name !== '') ? <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p> : null}
                  </div>
                </>}
                btns={<>
                  <NavLink to={`/view/patent/${e.id}`} target='_blank' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' title={`새창이동, ${e.title} 상세 페이지`}>자세히 보기↗</NavLink>
                  {(e.link && e.link !== '') ? <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a> : null}
                </>}
              />);
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