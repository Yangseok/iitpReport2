import React from 'react';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import { NavLink } from 'react-router-dom';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function Paper(props) {
  const { projectData, totalCount, page, setPage } = props;

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
                  <p className='text-sm text-color-regular'>발행년도: <span className='font-medium text-color-main'>{e.year}</span></p>
                  <p className='text-sm text-color-regular'>논문 구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                  <p className='text-sm text-color-regular'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                  <p className='text-sm text-color-regular'>주 저자: <span className='font-medium text-color-main'>{e.name}</span></p>
                  <p className='text-sm text-color-regular'>학술지/학술대회명: <span className='font-medium text-color-main'>{e.journal}</span></p>
                </>}
                btns={<>
                  <NavLink to={`/view/paper/${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</NavLink>
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
        <Pagination total={totalCount} page={page} onClick={(page) => setPage(page)} />
      </div>
    </>
  );
}