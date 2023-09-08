import React from 'react';

export default function DemandListItem(props) {
  const { className, title, contents, desc, btns, children } = props;

  return (
    <li className={className}>
      <div className='tit_box'>
        <div className='flex justify-between gap-4'>
          <div className='flex-1'>
            {desc}
            <p className='text-base font-bold text-color-dark flex-1'>{title}</p>
            <div className='text_style01 mt-2'>
              {contents}
            </div>
          </div>
          {(btns) && <div className='flex flex-col gap-2.5'>{btns}</div>}
        </div>
      </div>
      <div className='conts_box'>
        {children}
      </div>
    </li>
  );
}