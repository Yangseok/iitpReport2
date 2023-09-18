import React, { useEffect, useRef } from 'react';
import $ from 'jquery';

export default function GuidePopup(props) {
  const { popup, setPopup, title, contents, focusClass } = props;

  const popupRef = useRef(null);

  useEffect(() => {
    if(popup) {
      popupRef.current.focus();
    }
  }, [popup]);

  useEffect(() => {
    const eventSettings = () => {
      // 모달 배경 클릭으로 모달 닫기
      $('.popup_bg').on('click', function(e) {
        const modal = $(e.target).parents('.popup_bg');
        if (!modal.hasClass('popup_bg')) {
          setPopup(false);
        }
      });

      // ESC 키로 모달 닫기
      $('.popup_bg').on('keydown', function(e) {
        if (e.key === 'Escape') {
          setPopup(false);
          $(`.${focusClass}`).focus();
        }
      });

      // 포커스 트랩: 모달 내에서 포커스가 빠져나가지 못하도록 설정
      $('.popup_bg button').on('keydown', function(e) {
        if(e.key === 'Tab') {
          $(this).focus();
          return false;
        }
      });
    };

    return () => {
      eventSettings();
    };
  }, []);

  return (
    <div className='popup_bg' ref={popupRef} tabIndex={-1}>
      <div className='popup_wrap w-180 p-10 rounded-xl'>
        <div className='flex items-center justify-between'>
          <p className='text-xl'><strong>{title}</strong></p>
          <button type='button' className='popup_close_btn' onClick={() => {
            setPopup(false);
            $(`.${focusClass}`).focus();
          }}>팝업 닫기</button>
        </div>
        <div className='mt-4'>
          <div className='text_box'>
            {contents}
          </div>
        </div>
      </div>
    </div>
  );
}