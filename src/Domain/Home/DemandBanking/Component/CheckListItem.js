import React from 'react';
import common from 'Utill';

export default function CheckListItem(props) {
  const { className, onClick, status, type, period, title, count } = props;

  return (
    <>
      {/* 
        STATUS 진행중: tag_style01 | 종료: tag_style02
        TYPE 정기: tag_style06 | 수시: tag_style07
      */}
      <li className={className}>
        <div
          role='button' 
          tabIndex={0}
          onClick={onClick}
          onKeyUp={(event) => (event.key === 'Enter') && onClick()}
        >
          <div className='flex items-center gap-2 mb-4'>
            {(status === 1)
              ? <span className='tag_style01'>진행중</span>
              : (status === 2)
                ? <span className='tag_style02'>마감</span>
                : ''
            }
            {(type === 1)
              ? <span className='tag_style06'>정기</span>
              : (type === 2)
                ? <span className='tag_style07'>수시</span>
                : (type === 3)
                  ? <span className='tag_style08'>해당없음</span>
                  : ''
            }
          </div>
          <p className='text-sm text-color-regular mb-2'>{period}</p>
          <p className='text-base font-bold text-color-dark h-12'>
            <strong className='line2_text'>{title}</strong>
          </p>
          <div className='flex itmes-center justify-between pt-5 mt-7 border-top-line'>
            <p className='text-sm font-medium text-color-regular'>기술수요조사서</p>
            <p className='text-base font-bold text-color-main'><b>{common.setPriceInput(count)}건</b></p>
          </div>
        </div>
      </li>
    </>
  );
}