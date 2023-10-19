import React, { useEffect, useRef } from 'react';
import PopupPatent from './PopupPatent';
import PopupPaper from './PopupPaper';
import $ from 'jquery';

export default function ListPopup(props) {
  const { popup, setPopup, category, applData } = props;

  const popupRef = useRef(null);

  const handlePopupClose = () => {
    setPopup(false);
    $('.list_style06 button').last().focus();
  };

  useEffect(() => {
    if(popup) {
      popupRef.current.focus();
    }
  }, [popup]);

  useEffect(() => {
    const eventSettings = () => {
      // Shift 눌렀는지 확인
      let _shift = false;
      $(document).on('keydown',function(e){
        if(e.key === 'Shift') _shift = true;
      });
      $(document).on('keyup',function(e){
        if(e.key === 'Shift') _shift = false;
      });

      // 포커스 트랩: 모달 내에서 포커스가 빠져나가지 못하도록 설정
      $(document).on('keydown', '.popup_bg .page_wrap button:last-child, #list_btn', function(e) {
        if(e.key === 'Tab' && !_shift) {
          popupRef.current?.focus();
          return false;
        }
      });
      $('.popup_bg button').first().on('keydown', function(e) {
        if(e.key === 'Tab' && _shift) {
          $('.popup_bg button').last().focus();
          return false;
        }
      });
    };

    return () => {
      eventSettings();
    };
  }, []);

  return (
    <div 
      id='listPopup'
      className='popup_bg' 
      ref={popupRef} 
      tabIndex={-1}
      onClick={(e) => (e.target.id === 'listPopup') && handlePopupClose()}
      onKeyDown={(e) => (e.key === 'Escape') && handlePopupClose()}
    >
      <div className='popup_wrap w-340 p-10 min-h-177'>
        <div className='flex justify-end'>
          <button type='button' className='popup_close_btn' onClick={handlePopupClose}>팝업 닫기</button>
        </div>
        {(category === 'patent')
          ? <PopupPatent applData={applData} />
          : (category === 'paper') 
            ? <PopupPaper applData={applData} /> : null}
      </div>
    </div>
  );
}