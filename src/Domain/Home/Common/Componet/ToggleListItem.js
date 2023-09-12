import React, { useState } from 'react';
import $ from 'jquery';

export default function ToggleListItem(props) {
  const { id, title, contents, btn } = props;
  const [newsActive, setNewsActive] = useState(null);

  // 클릭 이벤트
  const onItemSlide = (e, id) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      const pd = 20;
      const liEl = $(e.currentTarget).parents('li');
      const contsEl = liEl.find('.conts_box');

      setNewsActive(id);
      liEl.siblings().removeClass('on');
      liEl.siblings().find('.conts_box').css({ 'height': 0, 'paddingBottom': 0 });

      if(!liEl.hasClass('on')) {
        liEl.addClass('on');
        contsEl.css({ 
          'height': `${contsEl.prop('scrollHeight') + pd}px`, 
          'paddingBottom': `${pd}px`
        });
      } else {
        liEl.removeClass('on');
        contsEl.css({ 'height': 0, 'paddingBottom': 0 });
        setNewsActive(null);
      }
    }
  };

  return (
    <li className={(id === newsActive) ? 'on' : ''}>
      <div className='relative'>
        <div
          className='tit_box flex items-center justify-between gap-4'
          onClick={(event) => onItemSlide(event, id)} 
          onKeyUp={(event) => (event.key === 'Enter') && onItemSlide(event, id)} 
          role={'button'}
          tabIndex={0}
        >
          {title}
        </div>
        <div className='btns_box'>
          {btn}
        </div>
      </div>
      <div className='conts_box'>
        {contents}
      </div>
    </li>
  );
}