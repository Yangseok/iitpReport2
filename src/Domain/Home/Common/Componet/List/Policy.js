import React from 'react';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function Policy(props) {
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
                  <p className='text-sm text-color-regular line2_text' dangerouslySetInnerHTML={{__html : e.content}} />
                </>}
                desc={<>
                  <div className='text_style01 flex items-center gap-4'>
                    <div>
                      <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                      <p className='text-sm text-color-regular'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
                    </div>
                    {(e.link && e.link !== '') ? <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a> : null}
                  </div>
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