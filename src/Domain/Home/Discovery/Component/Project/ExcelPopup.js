import React, { useEffect, useRef } from 'react';
import InputFile from 'Domain/Home/Discovery/Component/InputFile';
import excelFile from 'Assets/Images/Sample/sample_excel.xlsx';
import icSearch from 'Assets/Images/ic_search.png';
import Button from 'Domain/Home/Common/Componet/Button';
import $ from 'jquery';

export default function ExcelPopup(props) {
  const { popup, setPopup, setSelectedFile, setSelectedFileName, fileName, accept, handleFileUpload } = props;
  const popupRef = useRef(null);

  const handlePopupClose = () => {
    setPopup(false);
    $('.project_excel_btn').focus();
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
      $('.popup_bg button').last().on('keydown', function(e) {
        if(e.key === 'Tab' && !_shift) {
          popupRef.current.focus();
          return false;
        }
      });
      $('.popup_bg a').first().on('keydown', function(e) {
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
      id='excelPopup'
      className="popup_bg"
      ref={popupRef}
      tabIndex={-1}
      onClick={(e) => (e.target.id === 'excelPopup') && handlePopupClose()}
      onKeyDown={(e) => (e.key === 'Escape') && handlePopupClose()}
    >
      <div className="popup_wrap w-180 rounded-3xl pt-10 pb-20 px-15 text-center">
        <div className='flex justify-end mb-4'>
          <button 
            type='button' 
            className='popup_close_btn' 
            onClick={handlePopupClose}>
          엑셀 파일로 과제 정보 입력 닫기
          </button>
        </div>
        <p className='text-xl font-bold text-color-dark mb-6'>
          <strong>엑셀 파일로 과제 정보 입력</strong>
        </p>
        <p className='text-sm text-color-regular mb-12'>
          엑셀을 업로드하여 과제 정보를 입력할 수 있습니다. <br/>
          정해진 엑셀 양식에 입력하여 업로드 하세요. <br/>
          (1개의 과제 정보에 대해서만 엑셀 파일로 과제 정보 입력이 됩니다.)
          <a href={excelFile} download='' className='inline-block text-sm font-bold text-color-main underline ml-1'>엑셀양식 다운로드↓</a>
        </p>
        <InputFile setSelectedFile={setSelectedFile} setSelectedFileName={setSelectedFileName} fileName={fileName} accept={accept} />
        {/* <button type='button' className='py-2 px-10 mt-6 mx-auto rounded-3xl btn_style03' onClick={() => {setPopup(false); $('.project_excel_btn').focus();}}>저장</button> */}
        <Button name="과제 정보 분석" icon={icSearch} onClick={(e) => {setPopup(false); handleFileUpload(e);}} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
      </div>
    </div>
  );
}