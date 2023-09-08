import React from 'react';

export default function CheckListItem(props) {
  const { className, onClick, status, type, period, title, count } = props;

  return (
    <>
      {/* 
        STATUS 진행중: tag_style01 | 종료: tag_style02
        TYPE 정기: tag_style06 | 수시: tag_style07
      */}
      <li 
        role='button' 
        tabIndex={0}
        className={className}
        onClick={onClick}
        onKeyUp={(event) => (event.key === 'Enter') && onClick()}
      >
        <div className='flex items-center gap-2 mb-4'>
          {(status === 1)
            ? <span className='tag_style01'>진행중</span>
            : (status === 2)
              ? <span className='tag_style02'>종료</span>
              : ''
          }
          {(type === 1)
            ? <span className='tag_style06'>정기</span>
            : (type === 2)
              ? <span className='tag_style07'>수시</span>
              : ''
          }
        </div>
        <p className='text-sm text-color-regular mb-2'>{period}</p>
        <p className='text-base font-bold text-color-dark h-12'>
          <strong className='line2_text'>{title}</strong>
        </p>
        <div className='flex itmes-center justify-between pt-5 mt-7 border-top-line'>
          <p className='text-sm font-medium text-color-regular'>기술수요조사서</p>
          <p className='text-base font-bold text-color-main'><b>{count}건</b></p>
        </div>
      </li>
    </>
  );
}