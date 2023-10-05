import React from 'react';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';

export default function PopupViewLayout(props) {
  const { children, tabStyle, tabs, active, tags, title, btnClick } = props;

  return (
    <>
      <div>
        {tags}
        <h4 className='text-xl font-bold text-color-dark mt-2'>{title}</h4>
      </div>
      <div className='mt-8'>
        <TabButtons style={tabStyle ?? '4-2'} tabs={tabs} active={active} />
        {children}
      </div>
      <button type='button' id='list_btn' className='h-10 px-4 mt-6 mx-auto rounded text-base font-bold btn_style04' onClick={btnClick}>목록</button>
    </>
  );
}