import React, { useEffect, useState } from 'react';

export default function Pagination(props) {
  const { total, page, size, onClick } = props;
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);
  const [prev02Disabled, setPrev02Disabled] = useState(false);
  const [next02Disabled, setNext02Disabled] = useState(false);

  let limit = 10; // 한 번에 노출되는 리스트 갯수
  if (size !== undefined) limit = size;
  const pageLimit = 5; // 한 번에 노출되는 페이지 번호
  const totalPage = Math.ceil(total / limit);
  const startPage = Math.floor((page - 1) / pageLimit) * pageLimit + 1;
  let endPage = startPage + pageLimit - 1;
  if (endPage > totalPage) endPage = totalPage;

  const pageNumers = [];
  for (let i = startPage; i <= endPage; i++) {
    pageNumers.push(i);
  }

  const onPrevClick = () => {
    if(page > pageLimit) {
      onClick(startPage - 1);
    }
  };
  const onNextClick = () => {
    if(endPage != totalPage) {
      onClick(endPage + 1);
    }
  };

  useEffect(() => {
    if(startPage === 1) {
      setPrevDisabled(true);
    } else {
      setPrevDisabled(false);
    }
    if(totalPage === endPage) {
      setNextDisabled(true);
    } else {
      setNextDisabled(false);
    }
    if(page === 1) {
      setPrev02Disabled(true);
    } else {
      setPrev02Disabled(false);
    }
    if(page === totalPage) {
      setNext02Disabled(true);
    } else {
      setNext02Disabled(false);
    }
  }, [props]);

  return (
    <div className='page_wrap'>

      {(!prev02Disabled && total !== 0) ? <button
        type='button'
        className='arr_btn start'
        disabled={prev02Disabled}
        onClick={() => onClick(1)}
      >
        처음 페이지
      </button> : null}
      {(!prevDisabled && total !== 0) ? <button
        type='button'
        className='arr_btn prev'
        disabled={prevDisabled}
        onClick={onPrevClick}
      >
        이전 페이지
      </button> : null}
      {pageNumers?.map((e) => (
        <button
          type='button'
          key={e}
          className={page === e ? 'on' : ''}
          onClick={() => onClick(e)}
        >
          {e}
        </button>
      ))}
      {(!nextDisabled && total !== 0) ? <button
        type='button'
        className='arr_btn next'
        disabled={nextDisabled}
        onClick={onNextClick}
      >
        다음 페이지
      </button> : null}
      {(!next02Disabled && total !== 0) ? <button
        type='button'
        className='arr_btn end'
        disabled={next02Disabled}
        onClick={() => onClick(totalPage)}
      >
        끝 페이지
      </button> : null}
    </div>
  );
}
