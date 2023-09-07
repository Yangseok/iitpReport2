import React, { useState } from 'react';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import icFile from 'Assets/Images/ic_file02.png';
import icQuestion from 'Assets/Images/ic_question.png';
import arrDrop from 'Assets/Images/arr_drop.png';
import InputTextXBtn from 'Domain/Home/Discovery/Component/InputTextXBtn';
import Button from 'Domain/Home/Common/Componet/Button';
import ExcelPopup from './ExcelPopup';

export default function ProjectWrap(props) {
  const { folded } = props;

  const [resetDisabled, setResetDisabled] = useState(true);
  const [fold, setFold] = useState(folded ?? false);
  const [popup, setPopup] = useState(false);

  const onReset = () => {
    setResetDisabled(false);
  };

  return (
    <>
      <div className='flex items-center justify-between px-4'>
        <h3 className='text-xl font-bold text-color-dark'>과제 정보</h3>
        <div className='flex items-center gap-6'>
          <button type='button' className='text-sm font-medium text-color-placeholder' onClick={() => setPopup(state => !state)}>
            엑셀로 입력
            <img src={icFile} alt='엑셀 등록' className='w-6' />
          </button>
          <button type='button' className='discovery_reset_btn' disabled={resetDisabled} onClick={onReset}>
            초기화
            <img src={(resetDisabled) ? icReset : icReset02} alt='초기화' className='w-6' />
          </button>
          <button type='button' className={`discovery_fold_btn${(fold) ? ' fold' : ''}`} onClick={() => setFold(state => !state)}>
            {(fold) ? '펼치기' : '접기'} 
            <img src={arrDrop} alt='화살표' className='w-6' />
          </button>
        </div>
      </div>
      {(!fold)
        ? <>
          <div className='search_detail_wrap pt-4 mt-4 border-top-placeholder'>
            <dl>
              <dt>과제명</dt>
              <dd>
                <InputTextXBtn id={'project'} title={'과제명'} value={''} onChange={() => {}} />
              </dd>
              <dt className='flex items-center gap-1'>
              키워드(한글)
                <div className='tooltip_wrap' tabIndex={0}>
                  <img src={icQuestion} alt='한글 키워드 설명글' className='w-6' />
                  <span className='tooltip_style04 min-w-20'>콤마(,)로 구분</span>
                </div>
              </dt>
              <dd>
                <InputTextXBtn id={'keywordsKo'} title={'한글 키워드'} value={''} onChange={() => {}} />
              </dd>
              <dt className='flex items-center gap-1'>
              키워드(영문)
                <div className='tooltip_wrap' tabIndex={0}>
                  <img src={icQuestion} alt='영문 키워드 설명글' className='w-6' />
                  <span className='tooltip_style04 min-w-20'>콤마(,)로 구분</span>
                </div>
              </dt>
              <dd>
                <InputTextXBtn id={'keywordsEn'} title={'영문 키워드'} value={''} onChange={() => {}} />
              </dd>
              <dt>연구 목표</dt>
              <dd>
                <InputTextXBtn id={'subject'} title={'연구 목표'} value={''} onChange={() => {}} />
              </dd>
              <dt>연구 내용</dt>
              <dd>
                <InputTextXBtn id={'content'} title={'연구 내용'} value={''} onChange={() => {}} />
              </dd>
              <dt>기대 효과</dt>
              <dd>
                <InputTextXBtn id={'benefit'} title={'기대 효과'} value={''} onChange={() => {}} />
              </dd>
            </dl>
          </div>
          <Button name="과제 정보 분석" icon={icSearch} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
        </>
        : ''
      }
      {(popup) ? <ExcelPopup setPopup={setPopup} /> : ''}
    </>
  );
}