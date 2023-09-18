import React, { useEffect, useState } from 'react';

export default function Pagination(props) {
  const { total, page, size, onClick } = props;
  const [prevDisabled, setPrevDisabled] = useState(false);
  const [nextDisabled, setNextDisabled] = useState(false);

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
  }, [props]);

  return (
    <div className='page_wrap'>
      <button
        type='button'
        className='prev_btn'
        disabled={prevDisabled}
        onClick={onPrevClick}
      >
        이전 페이지
      </button>
      {pageNumers?.map((e, i) => (
        <button
          type='button'
          key={i}
          className={page === e ? 'on' : ''}
          onClick={() => onClick(e)}
        >
          {e}
        </button>
      ))}
      <button
        type='button'
        className='next_btn'
        disabled={nextDisabled}
        onClick={onNextClick}
      >
        다음 페이지
      </button>
    </div>
  );
}
