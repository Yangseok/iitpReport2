import React, { useState } from 'react';
import $ from 'jquery';

export default function ToggleListItem(props) {
  const { id, title, contents } = props;
  const [newsActive, setNewsActive] = useState(null);

  // 클릭 이벤트
  const onItemSlide = (e, id) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      const pd = 20;
      const liEl = e.currentTarget.parentNode;
      const contsEl = e.currentTarget.parentNode.children[1];

      setNewsActive(id);
      $(liEl).siblings().removeClass('on');
      $(liEl).siblings().find('.conts_box').css('height', 0);
      $(liEl).siblings().find('.conts_box').css('paddingBottom', 0);

      if(!liEl.classList.contains('on')) {
        liEl.classList.add('on');
        contsEl.style.height = `${contsEl.scrollHeight + pd}px`;
        contsEl.style.paddingBottom = `${pd}px`;
      } else {
        liEl.classList.remove('on');
        contsEl.style.height = 0;
        contsEl.style.paddingBottom = 0;
      }
    }
  };

  return (
    <li className={(id === newsActive) ? 'on' : ''}>
      <div 
        className='tit_box flex items-center justify-between gap-4'
        onClick={(event) => onItemSlide(event, id)} 
        onKeyUp={(event) => (event.key === 'Enter') && onItemSlide(event, id)} 
        role={'button'}
        tabIndex={0}
      >
        {title}
      </div>
      <div className='conts_box'>
        {contents}
      </div>
    </li>
  );
}