import React, { useEffect } from 'react';
import InputFile from 'Domain/Home/Discovery/Component/InputFile';
import excelFile from 'Assets/Images/Sample/sample_excel.xlsx';

export default function ExcelPopup(props) {
  const { setPopup } = props;

  useEffect(() => {
    const findParentWithClass = (e, className) => {
      while (e && e !== document) {
        if (e.classList && e.classList.contains(className)) {
          return e;
        }
        e = e.parentNode;
      }
      return null;
    };
    document.querySelector('.popup_bg').addEventListener('click', (e) => {
      const isParentClass = findParentWithClass(e.target, 'popup_wrap');
      
      if (!isParentClass) {
        setPopup(false);
      }
    });
  }, []);

  return (
    <>
      <div className="popup_bg">
        <div className="popup_wrap text-center">
          <p className='text-xl font-bold text-color-dark mb-6'>
            <strong>엑셀 파일로 과제 정보 입력</strong>
          </p>
          <p className='text-sm text-color-regular mb-12'>
            엑셀을 업로드하여 과제 정보를 입력할 수 있습니다. <br/>
            정해진 엑셀 양식에 입력하여 업로드 하세요. <br/>
            (1개의 과제 정보에 대해서만 엑셀 파일로 과제 정보 입력이 됩니다.)
            <a href={excelFile} download='' className='inline-block text-sm font-bold text-color-main underline ml-1'>엑셀양식 다운로드↓</a>
          </p>
          <InputFile />
          <button type='button' className='py-2 px-10 mt-6 mx-auto rounded-3xl btn_style03' onClick={() => setPopup(false)}>저장</button>
        </div>
      </div>
    </>
  );
}