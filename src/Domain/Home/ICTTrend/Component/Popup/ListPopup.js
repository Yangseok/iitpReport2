import React, { useEffect, useRef } from 'react';
import PopupPatent from './PopupPatent';
import PopupPaper from './PopupPaper';
import $ from 'jquery';

export default function ListPopup(props) {
  const { popup, setPopup, category } = props;

  const popupRef = useRef(null);

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
          $('.list_style06 button').last().focus();
        }
      });

      // 포커스 트랩: 모달 내에서 포커스가 빠져나가지 못하도록 설정
      // $('.popup_bg button').last().on('keydown', function(e) {
      //   if(e.key === 'Tab' && !_shift) {
      //     popupRef.current.focus();
      //     return false;
      //   }
      // });
      $(document).on('keydown', '.popup_bg .page_wrap button:last-child, #list_btn', function(e) {
        if(e.key === 'Tab' && !_shift) {
          popupRef.current.focus();
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
    <>
      <div className='popup_bg' ref={popupRef} tabIndex={-1}>
        <div className='popup_wrap w-340 p-10 min-h-177'>
          <div className='flex justify-end'>
            <button type='button' className='popup_close_btn' onClick={() => {
              setPopup(false); 
              $('.list_style06 button').last().focus();
            }}>팝업 닫기</button>
          </div>
          {(category === 'patent')
            ? <PopupPatent />
            : (category === 'paper') 
              ? <PopupPaper /> : null}
        </div>
      </div>
    </>
  );
}