import React from 'react';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function PopupListLayout(props) {
  const { title, recommendCnt, totalCnt, listData, listClick } = props;

  return (
    <>
      <div className='flex items-center justify-between mt-5'>
        <h4 className='text-xl font-bold text-color-dark'>{title}</h4>
        <p className='text-base font-medium text-color-dark'>
          추천 <b className='text-color-main'>{recommendCnt}건</b> / 총 <b className='text-color-main'>{totalCnt}건</b>
        </p>
      </div>
      <div className='list_style04 border-top-line mt-4'>
        <ul>
          {(listData?.length > 0)
            ? listData?.map((e) => {
              return  <li key={e.id}>
                <button type='button' className='justify-between gap-2 w-full text-sm font-medium text-color-dark' onClick={listClick}>
                  <span className='flex-1 text-left line1_text'>{e.title}</span>
                  <span>{e.people}</span>
                </button>
              </li>;
            })
            : <li>
              <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
            </li>
          }
        </ul>
      </div>
      <div className='mt-6'>
        <Pagination total={60} page={1} onClick={(i) => console.log(i)} />
      </div>
    </>
  );
}