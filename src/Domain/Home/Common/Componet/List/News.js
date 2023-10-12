import React, { useEffect, useState } from 'react';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import NewsWordClouds from 'Domain/Home/Discovery/Component/NewsWordClouds';
import ToggleListItem from 'Domain/Home/Common/Componet/ToggleListItem';

export default function News(props) {
  const { projectData, totalCount, size, page, setPage } = props;

  const [newsActive, setNewsActive] = useState(null);

  useEffect(() => {
    const liEls = document.querySelectorAll('.list_style03 ul li .conts_box');
    liEls.forEach(function(_this) {
      _this.style.height = 0;
      _this.style.paddingBottom = 0;
    });
    setNewsActive(null);
  }, [projectData]);

  return (
    <>
      <div className='list_style03 mt-2' id='newsList'>
        <ul>
          {(projectData?.length > 0)
            ? projectData?.map((e) => {
              return (
                <ToggleListItem 
                  key={e.id} 
                  id={e.id}
                  title={<>
                    <p className='flex-1 text-base font-bold text-color-dark'>{e.title}</p>
                    <div className='text_style01'>
                      <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                      <p className='text-sm text-color-regular'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                    </div>
                  </>}
                  btn={(e.link) ? <>
                    <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                  </> : null}
                  contents={(e.wordCloud ?? 0 > 0) ? <NewsWordClouds wordCloudData={e.wordCloud ?? []} /> : null}
                  active={newsActive}
                  setActive={setNewsActive}
                />
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
    </>
  );
}