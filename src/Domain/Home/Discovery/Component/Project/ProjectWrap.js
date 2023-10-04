import React, { useState, useEffect } from 'react';
import icReset from 'Assets/Images/ic_reset.png';
import icReset02 from 'Assets/Images/ic_reset02.png';
import icSearch from 'Assets/Images/ic_search.png';
import icFile from 'Assets/Images/ic_file02.png';
import icQuestion from 'Assets/Images/ic_question.png';
import arrDrop from 'Assets/Images/arr_drop.png';
import InputTextXBtn from 'Domain/Home/Discovery/Component/InputTextXBtn';
import Button from 'Domain/Home/Common/Componet/Button';
import ExcelPopup from './ExcelPopup';
import { useNavigate } from 'react-router-dom';
import { 
  setFileKeywordList,
  getProjectTitle, getKeywordKor, getKeywordEng, getResearchGoal, getResearchDescription, getExpectationEffectiveness,
  setProjectTitle, setKeywordKor, setKeywordEng, setResearchGoal, setResearchDescription, setExpectationEffectiveness
} from 'Domain/Home/Discovery/Status/DiscoverySaveSlice';
import { useSelector, useDispatch } from 'react-redux';
import { setMsg,setShow } from 'Domain/Home/Common/Status/MsgSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';

export default function ProjectWrap(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { folded, setSelectedFile, setSelectedFileName, fileName, accept, handleFileUpload } = props;

  const [resetDisabled, setResetDisabled] = useState(true);
  const [fold, setFold] = useState(folded ?? false);
  const [popup, setPopup] = useState(false);

  const projectTitle = useSelector(getProjectTitle);
  const keywordKor = useSelector(getKeywordKor);
  const keywordEng = useSelector(getKeywordEng);
  const researchGoal = useSelector(getResearchGoal);
  const researchDescription = useSelector(getResearchDescription);
  const expectationEffectiveness = useSelector(getExpectationEffectiveness);

  const [projectTitleTmp, setProjectTitleTmp] = useState(projectTitle);
  const [keywordKorTmp, setKeywordKorTmp] = useState(keywordKor);
  const [keywordEngTmp, setKeywordEngTmp] = useState(keywordEng);
  const [researchGoalTmp, setResearchGoalTmp] = useState(researchGoal);
  const [researchDescriptionTmp, setResearchDescriptionTmp] = useState(researchDescription);
  const [expectationEffectivenessTmp, setExpectationEffectivenessTmp] = useState(expectationEffectiveness);

  const handleSearch = async () => {
    if (
      projectTitleTmp.trim() === '' && keywordKorTmp.trim() === '' && keywordEngTmp.trim() === ''
      && researchGoalTmp.trim() === '' && researchDescriptionTmp.trim() === '' && expectationEffectivenessTmp.trim() === ''
    ) {
      dispatch(setMsg({
        title: '알림',
        msg: '과제 정보를 입력해주세요.',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
      return null;
    }
    dispatch(setProjectTitle(projectTitleTmp));
    dispatch(setKeywordKor(keywordKorTmp));
    dispatch(setKeywordEng(keywordEngTmp));
    dispatch(setResearchGoal(researchGoalTmp));
    dispatch(setResearchDescription(researchDescriptionTmp));
    dispatch(setExpectationEffectiveness(expectationEffectivenessTmp));

    const data = await discoveryAPI.projectInfo('parameter',projectTitleTmp,keywordKorTmp,keywordEngTmp,researchGoalTmp,researchDescriptionTmp,expectationEffectivenessTmp, null);
    console.log(data?.data?.result);
    dispatch(setFileKeywordList(data?.data?.result?.textAnalyticsKeywordList ?? []));

    // console.log(navigate);
    navigate('/discovery/project/result/projectout');
  };

  const onReset = () => {
    setResetDisabled(true);

    dispatch(setProjectTitle(''));
    dispatch(setKeywordKor(''));
    dispatch(setKeywordEng(''));
    dispatch(setResearchGoal(''));
    dispatch(setResearchDescription(''));
    dispatch(setExpectationEffectiveness(''));

    setProjectTitleTmp('');
    setKeywordKorTmp('');
    setKeywordEngTmp('');
    setResearchGoalTmp('');
    setResearchDescriptionTmp('');
    setExpectationEffectivenessTmp('');
  };
  
  useEffect(() => {
    if (! (projectTitleTmp.trim() === '' && keywordKorTmp.trim() === '' && keywordEngTmp.trim() === ''
    && researchGoalTmp.trim() === '' && researchDescriptionTmp.trim() === '' && expectationEffectivenessTmp.trim() === '') && fold === false) {
      setResetDisabled(false);
    } else {
      setResetDisabled(true);
    }
  }, [projectTitleTmp,keywordKorTmp,keywordEngTmp,researchGoalTmp,researchDescriptionTmp,expectationEffectivenessTmp, fold]);

  return (
    <>
      <div className='flex items-center justify-between px-4'>
        <h2 className='text-xl font-bold text-color-dark'>과제 정보</h2>
        <div className='flex items-center gap-6'>
          <button type='button' className='text-sm font-medium text-color-placeholder project_excel_btn' onClick={() => setPopup(state => !state)}>
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
                <InputTextXBtn id={'project'} title={'과제명'} value={projectTitleTmp} onChange={(e) => {setResetDisabled(false); setProjectTitleTmp(e.target.value);}} />
              </dd>
              <dt className='flex items-center gap-1'>
              키워드(한글)
                <div className='tooltip_wrap' tabIndex={0}>
                  <img src={icQuestion} alt='한글 키워드 설명글' className='w-6' />
                  <span className='tooltip_style04 min-w-20'>콤마(,)로 구분</span>
                </div>
              </dt>
              <dd>
                <InputTextXBtn id={'keywordsKo'} title={'한글 키워드'} value={keywordKorTmp} onChange={(e) => {setResetDisabled(false); setKeywordKorTmp(e.target.value);}} />
              </dd>
              <dt className='flex items-center gap-1'>
              키워드(영문)
                <div className='tooltip_wrap' tabIndex={0}>
                  <img src={icQuestion} alt='영문 키워드 설명글' className='w-6' />
                  <span className='tooltip_style04 min-w-20'>콤마(,)로 구분</span>
                </div>
              </dt>
              <dd>
                <InputTextXBtn id={'keywordsEn'} title={'영문 키워드'} value={keywordEngTmp} onChange={(e) => {setResetDisabled(false); setKeywordEngTmp(e.target.value);}} />
              </dd>
              <dt>연구 목표</dt>
              <dd>
                <InputTextXBtn id={'subject'} title={'연구 목표'} value={researchGoalTmp} onChange={(e) => {setResetDisabled(false); setResearchGoalTmp(e.target.value);}} />
              </dd>
              <dt>연구 내용</dt>
              <dd>
                <InputTextXBtn id={'content'} title={'연구 내용'} value={researchDescriptionTmp} onChange={(e) => {setResetDisabled(false); setResearchDescriptionTmp(e.target.value);}} />
              </dd>
              <dt>기대 효과</dt>
              <dd>
                <InputTextXBtn id={'benefit'} title={'기대 효과'} value={expectationEffectivenessTmp} onChange={(e) => {setResetDisabled(false); setExpectationEffectivenessTmp(e.target.value);}} />
              </dd>
            </dl>
          </div>
          <Button name="과제 정보 분석" icon={icSearch} onClick={handleSearch} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
        </>
        : ''
      }
      {(popup) ? <ExcelPopup popup={popup} setPopup={setPopup} setSelectedFile={setSelectedFile} setSelectedFileName={setSelectedFileName} fileName={fileName} accept={accept} handleFileUpload={handleFileUpload} /> : ''}
    </>
  );
}