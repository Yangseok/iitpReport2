import React from 'react';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import common from 'Utill';

export default function PopupListLayout(props) {
  const { title, totalCnt, listData, listClick, page, setPage } = props;

  return (
    <>
      <div className='flex items-center justify-between mt-5'>
        <h4 className='text-xl font-bold text-color-dark'>{title}</h4>
        <p className='text-base font-medium text-color-dark'>
          {/* 추천 <b className='text-color-main'>{common.setPriceInput(recommendCnt ?? 0)}건</b> / */}총 <b className='text-color-main'>{common.setPriceInput(totalCnt ?? 0)}건</b>
        </p>
      </div>
      <div className='list_style04 border-top-line mt-4'>
        <ul>
          {(listData?.length > 0)
            ? listData?.map((e, i) => {
              let author = '';

              if (e.author?.length === 1) {
                author = `${e.author[0]}`;
              } else if (e.author?.length > 1) {
                author = `${e.author[0]} 외 ${e.author.length}명`;
              }

              return  <li key={i}>
                <button type='button' className='justify-between gap-2 w-full text-sm font-medium text-color-dark' onClick={listClick}>
                  <span className='flex-1 text-left line1_text'>{e.title}</span>
                  <span>{author}</span>
                </button>
              </li>;
            })
            : <li className='nodata'>
              <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
            </li>
          }
        </ul>
      </div>
      <div className='mt-6'>
        <Pagination total={totalCnt} page={page} onClick={(page) => setPage(page)} />
      </div>
    </>
  );
}