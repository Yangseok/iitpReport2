import React from 'react';

export default function ListItem(props) {
  const { tag, title, contents, desc, desc02, btns, percent } = props;
  {/* TAG 진행중: tag_style01 | 종료: tag_style02 */}

  return (
    <li>
      <div className='flex justify-between gap-4'>
        <div className='flex-1'>
          {desc02}
          <div className='flex items-start justify-between gap-4'>
            <div className='flex flex-1 gap-2'>
              {(tag) 
                && <span 
                  className={`mt-0.5${(tag === 1) ? ' tag_style01' : (tag === 2) ? ' tag_style02' : ''}`}
                >
                  {(tag === 1) ? '진행중' : (tag === 2) ? '종료' : ''}
                </span>}
              <p className='text-base font-bold text-color-dark flex-1'>{title}</p>
            </div>
            {desc}
          </div>
          <div className='text_style01 mt-2'>
            {contents}
          </div>
        </div>
        {(btns) 
          ? (percent)
            ? <div className='flex flex-col items-end justify-between'>
              <div className='flex flex-col gap-2.5'>{btns}</div>
              <p className='text-base font-bold text-color-main'>{percent}%</p>
            </div>
            : <div className='flex flex-col gap-2.5'>{btns}</div>
          : null
        }
      </div>
    </li>
  );
}