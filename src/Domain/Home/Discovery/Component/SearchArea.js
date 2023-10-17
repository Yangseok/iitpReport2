import React, { useEffect, useState } from 'react';
import icSearch from 'Assets/Images/ic_search.png';
import icQuestion from 'Assets/Images/ic_question.png';
import arrDrop from 'Assets/Images/arr_drop.png';
import AutoCompleteSearch from 'Domain/Home/Common/Componet/AutoCompleteSearch';
// import * as mainAPI from 'Domain/Home/Main/API/Call';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchKeywordReset, getTmpSearchKeyword, getSearchKeyword, setSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import { getSearchDetailData, setSearchDetailData as setGlobalSearchDetailData, getInitalSearch, setInitalSearch } from 'Domain/Home/Discovery/Status/DiscoverySlice';
import Button from 'Domain/Home/Common/Componet/Button';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import InputTextXBtn from 'Domain/Home/Discovery/Component/InputTextXBtn';
import { useNavigate } from 'react-router-dom';
import { setMsg,setShow } from 'Domain/Home/Common/Status/MsgSlice';
import common from 'Utill';
import moment from 'moment';
import $ from 'jquery';

export default function Search(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const mappingTabActiveToPage = ['projectout','patent','paper','ict','policy','researcher','orgn','news'];

  const se = common.getSegment();
  const se1 = se[1] ?? '';
  const se2 = se[2] ?? '';
  const se3 = se[3] ?? '';

  const tabButtons = [
    { id: 0, name: '과제', onClick: () => setTabActive(0) },
    { id: 1, name: '특허', onClick: () => setTabActive(1) },
    { id: 2, name: '논문', onClick: () => setTabActive(2) },
    { id: 3, name: 'ICT 자료', onClick: () => setTabActive(3) },
    { id: 4, name: '정부정책', onClick: () => setTabActive(4) },
    { id: 5, name: '연구자', onClick: () => setTabActive(5) },
    { id: 6, name: '기관', onClick: () => setTabActive(6) },
    { id: 7, name: '뉴스', onClick: () => setTabActive(7) },
  ];

  const tmpSearchKeyword = useSelector(getTmpSearchKeyword);
  const searchKeyword = useSelector(getSearchKeyword);
  // const [dataSearch, setDataSearch] = useState([]);

  const initalSearch = useSelector(getInitalSearch);

  const [fold, setFold] = useState(true);
  const [tabActive, setTabActive] = useState(0);

  const globalSearchDetailData = useSelector(getSearchDetailData);
  const [selectYear, setSelectYear] = useState([]);
  const [searchDetailData, setSearchDetailData] = useState(globalSearchDetailData ?? {});

  const handChangeData = (key, value) => {
    value = value.trim();
    // console.log('key:',key,'value:',value);
    let newState = JSON.parse(JSON.stringify(searchDetailData));
    if (newState[tabActive] === undefined) newState[tabActive] = {};
    newState[tabActive][key] = value;
    if (value === '') delete newState[tabActive][key];
    let check = true;
    let msg = '';
    let start = searchDetailData?.[tabActive]?.yearStart ?? '';
    let end = searchDetailData?.[tabActive]?.yearEnd ?? '';
    let dateStart = searchDetailData?.[tabActive]?.dateStart ?? '';
    let dateEnd = searchDetailData?.[tabActive]?.dateEnd ?? '';
    if (key === 'yearEnd') {
      end = value;
      if (start !== '' && end !== '' && (Number(end) < Number(start))) {
        msg = '종료연도가 시작연도보다 적을 수는 없습니다';
        check = false;
      }
    } else if (key === 'yearStart') {
      start = value;
      if (start !== '' && end !== '' && (Number(end) < Number(start))) {
        msg = '시작연도가 종료연도보다 클 수는 없습니다.';
        check = false;
      }
    } else if (key === 'dateStart') {
      if (dateStart != '') {
        dateStart = moment(value);
        newState[tabActive][key] = dateStart.format('YYYYMMDD');
      }
      if (dateEnd != '') {
        dateEnd = moment(common.ymdFormat(dateEnd));
      }
      
      if (dateStart !== '' && dateEnd !== '' && (Number(dateEnd) < Number(dateStart))) {
        msg = '시작일이 종료일보다 클 수는 없습니다.';
        check = false;
      }
    } else if (key === 'dateEnd') {
      if (dateStart != '') {
        dateStart = moment(common.ymdFormat(dateStart));
      }
      if (dateEnd != '') {
        dateEnd = moment(value);
        newState[tabActive][key] = dateEnd.format('YYYYMMDD');
      }

      if (dateStart !== '' && dateEnd !== '' && (Number(dateEnd) < Number(dateStart))) {
        msg = '종료일 시작일보다 적을 수는 없습니다';
        check = false;
      }
    }
    
    if (!check) {
      dispatch(setMsg({
        title: '알림',
        msg: msg,
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
      return null;
    }
    setSearchDetailData(newState);
  };

  const initSearch = () => {
    // let newState = JSON.parse(JSON.stringify(searchDetailData));
    // delete newState[tabActive];
    setSearchDetailData({});
    dispatch(setGlobalSearchDetailData({}));
    setTimeout(() => {
      $('.detailSearch').trigger('click');  
    }, 300);
  };

  const handleDetailSearch = () => {
    console.log('handleDetailSearch:', searchDetailData[tabActive]);
    if (tmpSearchKeyword == '' && searchKeyword != '') {
      dispatch(setSearchKeyword(''));
    }
    setFold(true);
    dispatch(setGlobalSearchDetailData(searchDetailData));
    const setSearchButtonClick = props?.setSearchButtonClick;
    if (setSearchButtonClick !== undefined) {
      setSearchButtonClick(true);
    }
    handleSearch();
  };

  const handleSearch = (agency=false, checkKeyword=false, inputText=undefined) => {
    // let searchDetailActiveTabData = searchDetailData?.[tabActive] ?? {};
    // console.log(searchDetailActiveTabData);
    let keyword = tmpSearchKeyword;
    if (inputText !== undefined) keyword = inputText;
    // if (tmpSearchKeyword.trim() === '' && JSON.stringify(searchDetailActiveTabData) === JSON.stringify({})) {
    if (checkKeyword && keyword.trim() === '') {
      dispatch(setMsg({
        title: '알림',
        msg: '키워드를 입력해주세요.',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
      return null;
    }
    dispatch(setSearchKeywordReset(true));
    // navigate('/search/result/all?keyword=' + tmpSearchKeyword);
    // console.log('agency:', agency);
    const se = common.getSegment();
    if (agency) {
      navigate('/search/result/orgn');
      return ;
    }
    if (fold) {
      navigate('/search/result/'+(se[3]??'all'));
    } else {
      navigate('/search/result/'+(mappingTabActiveToPage[tabActive]??'all'));
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     if(tmpSearchKeyword.trim() !== '') {
  //       const data = await mainAPI.autocomplete(tmpSearchKeyword);
  //       setDataSearch(data?.data?.result);
  //     }
  //   })();
  // }, [tmpSearchKeyword]);
  
  useEffect(() => {
    let yearArr = [];
    for(let year=2023; year>=1986; year--) {
      yearArr.push(year);
    }
    setSelectYear(yearArr);
  }, []);

  useEffect(() => {
    if (se1 === 'search' && se2 === 'result') {
      let se3ToActive = mappingTabActiveToPage.indexOf(se3);
      if (se3ToActive === -1) se3ToActive = 0;
      setTabActive(se3ToActive);
    }
  }, [se1, se2, se3]);

  useEffect(() => {
    if (se3 !== '') {
      setFold(true);
    }
  }, [se3]);

  useEffect(() => {
    if (initalSearch) {
      setSearchDetailData({});
      dispatch(setInitalSearch(false));
    }
  }, [initalSearch]);

  return (
    <>
      <section>
        <div className='container'>
          <h2 className='hidden_text'>통합 검색</h2>
          <AutoCompleteSearch 
            handleSearch={handleSearch}
            setSearchButtonClick={props?.setSearchButtonClick}
            style={{ type: 3, name: '통합 검색', icon: icSearch }}
          />
        </div>
      </section>
      <div className='section'>
        <div className='container-800'>
          <div className='flex justify-end mt-6'>
            {/* Input에 입력된 값이 하나라도 있을 경우, className 'on' 추가 */}
            <button type='button' className={`btn_fold${(fold) ? ' fold' : ''}`} onClick={() => setFold(state => !state)}>
            상세 검색 {(fold) ? '보기' : '숨기기'} 
              <img src={arrDrop} alt='화살표' className='w-6' />
            </button>
          </div>
        </div>
        {(!fold) 
          && <>
            <div className='pt-4'>
              <div className='container'>
                <TabButtons style='4-2' tabs={tabButtons} active={tabActive} />
                <div className='search_detail_wrap mt-4'>
                  {(tabActive === 0)
                    && <dl>
                      <dt>기준연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>기준연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear' value={searchDetailData?.[tabActive]?.yearStart ?? ''} onChange={(e) => handChangeData('yearStart', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>기준연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear' value={searchDetailData?.[tabActive]?.yearEnd ?? ''} onChange={(e) => handChangeData('yearEnd', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                      </dd>
                      <dt>과제명</dt>
                      <dd>
                        <InputTextXBtn id={'project'} title={'과제명'} value={searchDetailData?.[tabActive]?.title ?? ''} onChange={(e) => handChangeData('title', e.target.value)} />
                      </dd>
                      <dt>과제수행기관</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'과제수행기관'} value={searchDetailData?.[tabActive]?.researchAgencyName ?? ''} onChange={(e) => handChangeData('researchAgencyName', e.target.value)} />
                      </dd>
                      <dt>과제 책임자</dt>
                      <dd>
                        <InputTextXBtn id={'name'} title={'과제 책임자'} value={searchDetailData?.[tabActive]?.researchManagerName ?? ''} onChange={(e) => handChangeData('researchManagerName', e.target.value)} />
                      </dd>
                      <dt>세부과제번호</dt>
                      <dd>
                        <InputTextXBtn id={'detailNum'} title={'세부과제번호'} value={searchDetailData?.[tabActive]?.detailProjectNumber ?? ''} onChange={(e) => handChangeData('detailProjectNumber', e.target.value)} />
                      </dd>
                      <dt>과제고유번호</dt>
                      <dd>
                        <InputTextXBtn id={'projectNum'} title={'과제고유번호'} value={searchDetailData?.[tabActive]?.projectNumber ?? ''} onChange={(e) => handChangeData('projectNumber', e.target.value)} />
                      </dd>
                      <dt>부처명</dt>
                      <dd>
                        <InputTextXBtn id={'department'} title={'부처명'} value={searchDetailData?.[tabActive]?.ministryName ?? ''} onChange={(e) => handChangeData('ministryName', e.target.value)} />
                      </dd>
                      <dt>연구 목표</dt>
                      <dd>
                        <InputTextXBtn id={'subject'} title={'연구 목표'} value={searchDetailData?.[tabActive]?.researchGoal ?? ''} onChange={(e) => handChangeData('researchGoal', e.target.value)} />
                      </dd>
                      <dt>연구 내용</dt>
                      <dd>
                        <InputTextXBtn id={'content'} title={'연구 내용'} value={searchDetailData?.[tabActive]?.researchDescription ?? ''} onChange={(e) => handChangeData('researchDescription', e.target.value)} />
                      </dd>
                      <dt>기대 효과</dt>
                      <dd>
                        <InputTextXBtn id={'benefit'} title={'기대 효과'} value={searchDetailData?.[tabActive]?.expectationEffectiveness ?? ''} onChange={(e) => handChangeData('expectationEffectiveness', e.target.value)} />
                      </dd>
                      <dt className='flex items-center gap-1'>
                        키워드(한글)
                        <div className='tooltip_wrap' tabIndex={0}>
                          <img src={icQuestion} alt='한글 키워드 설명글' className='w-6' />
                          <span className='tooltip_style04 min-w-20'>콤마(,)로 구분</span>
                        </div>
                      </dt>
                      <dd>
                        <InputTextXBtn id={'keywordsKo'} title={'한글 키워드'} value={searchDetailData?.[tabActive]?.keywordKorean ?? ''} onChange={(e) => handChangeData('keywordKorean', e.target.value)} />
                      </dd>
                      <dt className='flex items-center gap-1'>
                        키워드(영문)
                        <div className='tooltip_wrap' tabIndex={0}>
                          <img src={icQuestion} alt='영문 키워드 설명글' className='w-6' />
                          <span className='tooltip_style04 min-w-20'>콤마(,)로 구분</span>
                        </div>
                      </dt>
                      <dd>
                        <InputTextXBtn id={'keywordsEn'} title={'영문 키워드'} value={searchDetailData?.[tabActive]?.keywordEnglish ?? ''} onChange={(e) => handChangeData('keywordEnglish', e.target.value)} />
                      </dd>
                    </dl>}
                  {(tabActive === 1)
                    && <dl>
                      <dt>성과연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>성과연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear' value={searchDetailData?.[tabActive]?.yearStart ?? ''} onChange={(e) => handChangeData('yearStart', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>성과연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear' value={searchDetailData?.[tabActive]?.yearEnd ?? ''} onChange={(e) => handChangeData('yearEnd', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                      </dd>
                      <dt>특허명</dt>
                      <dd>
                        <InputTextXBtn id={'project'} title={'특허명'} value={searchDetailData?.[tabActive]?.title ?? ''} onChange={(e) => handChangeData('title', e.target.value)} />
                      </dd>
                      <dt>출원번호</dt>
                      <dd>
                        <InputTextXBtn id={'number'} title={'출원번호'} value={searchDetailData?.[tabActive]?.applNumber ?? ''} onChange={(e) => handChangeData('applNumber', e.target.value)} />
                      </dd>
                      <dt>출원인</dt>
                      <dd>
                        <InputTextXBtn id={'applicant'} title={'출원인'} value={searchDetailData?.[tabActive]?.applicantName ?? ''} onChange={(e) => handChangeData('applicantName', e.target.value)} />
                      </dd>
                      <dt>발명자</dt>
                      <dd>
                        <InputTextXBtn id={'inventor'} title={'발명자'} value={searchDetailData?.[tabActive]?.inventorName ?? ''} onChange={(e) => handChangeData('inventorName', e.target.value)} />
                      </dd>
                    </dl>}
                  {(tabActive === 2)
                    && <dl>
                      <dt>성과연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>성과연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear' value={searchDetailData?.[tabActive]?.yearStart ?? ''} onChange={(e) => handChangeData('yearStart', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>성과연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear' value={searchDetailData?.[tabActive]?.yearEnd ?? ''} onChange={(e) => handChangeData('yearEnd', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                      </dd>
                      <dt>논문명</dt>
                      <dd>
                        <InputTextXBtn id={'paper'} title={'논문명'} value={searchDetailData?.[tabActive]?.title ?? ''} onChange={(e) => handChangeData('title', e.target.value)} />
                      </dd>
                      <dt>학술지/학술대회명</dt>
                      <dd>
                        <InputTextXBtn id={'journal'} title={'학술지/학술대회명'} value={searchDetailData?.[tabActive]?.journalTitle ?? ''} onChange={(e) => handChangeData('journalTitle', e.target.value)} />
                      </dd>
                      <dt>ISSN</dt>
                      <dd>
                        <InputTextXBtn id={'issn'} title={'ISSN'} value={searchDetailData?.[tabActive]?.issn ?? ''} onChange={(e) => handChangeData('issn', e.target.value)} />
                      </dd>
                      <dt>저자명</dt>
                      <dd>
                        <InputTextXBtn id={'author'} title={'저자명'} value={searchDetailData?.[tabActive]?.author ?? ''} onChange={(e) => handChangeData('author', e.target.value)} />
                      </dd>
                      <dt>초록</dt>
                      <dd>
                        <InputTextXBtn id={'abstract'} title={'초록'} value={searchDetailData?.[tabActive]?.abstract ?? ''} onChange={(e) => handChangeData('abstract', e.target.value)} />
                      </dd>
                    </dl>}
                  {(tabActive === 3)
                    && <dl>
                      <dt>발행연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>발행연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear' value={searchDetailData?.[tabActive]?.yearStart ?? ''} onChange={(e) => handChangeData('yearStart', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>발행연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear' value={searchDetailData?.[tabActive]?.yearEnd ?? ''} onChange={(e) => handChangeData('yearEnd', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                      </dd>
                      <dt>발행기관명</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'발행기관명'} value={searchDetailData?.[tabActive]?.title ?? ''} onChange={(e) => handChangeData('title', e.target.value)} />
                      </dd>
                      <dt>ICT 자료명</dt>
                      <dd>
                        <InputTextXBtn id={'ict'} title={'ICT 자료명'} value={searchDetailData?.[tabActive]?.sourceName ?? ''} onChange={(e) => handChangeData('sourceName', e.target.value)} />
                      </dd>
                    </dl>}
                  {(tabActive === 4)
                    && <dl>
                      <dt>발행연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>발행연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear' value={searchDetailData?.[tabActive]?.yearStart ?? ''} onChange={(e) => handChangeData('yearStart', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>발행연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear' value={searchDetailData?.[tabActive]?.yearEnd ?? ''} onChange={(e) => handChangeData('yearEnd', e.target.value)}>
                          <option value=''>선택</option>
                          {selectYear.map((e,i) => {
                            return <option key={i} value={e}>{e}</option>;
                          })}
                        </select>
                      </dd>
                      <dt>부처명</dt>
                      <dd>
                        <InputTextXBtn id={'department'} title={'부처명'} value={searchDetailData?.[tabActive]?.title ?? ''} onChange={(e) => handChangeData('title', e.target.value)} />
                      </dd>
                      <dt>ICT 자료명</dt>
                      <dd>
                        <InputTextXBtn id={'ict'} title={'ICT 자료명'} value={searchDetailData?.[tabActive]?.ministryName ?? ''} onChange={(e) => handChangeData('ministryName', e.target.value)} />
                      </dd>
                    </dl>}
                  {(tabActive === 5)
                    && <dl>
                      <dt>성명</dt>
                      <dd>
                        <InputTextXBtn id={'name'} title={'성명'} value={searchDetailData?.[tabActive]?.name ?? ''} onChange={(e) => handChangeData('name', e.target.value)} />
                      </dd>
                      <dt>재직기관명</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'재직기관명'} value={searchDetailData?.[tabActive]?.orgnName ?? ''} onChange={(e) => handChangeData('orgnName', e.target.value)} />
                      </dd>
                    </dl>}
                  {(tabActive === 6)
                    && <dl>
                      <dt>기관명</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'기관명'} value={searchDetailData?.[tabActive]?.title ?? ''} onChange={(e) => handChangeData('title', e.target.value)} />
                      </dd>
                    </dl>}
                  {(tabActive === 7)
                    && <dl>
                      <dt>기간</dt>
                      <dd>
                        <label htmlFor='startDate' className='hidden_text'>기간 범위 - 시작 연도</label>
                        <input type='date' name='startDate' id='startDate' value={common.ymdFormat(searchDetailData?.[tabActive]?.dateStart ?? '')} onChange={(e) => handChangeData('dateStart', e.target.value)} />
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endDate' className='hidden_text'>기간 범위 - 끝 연도</label>
                        <input type='date' name='endDate' id='endDate' value={common.ymdFormat(searchDetailData?.[tabActive]?.dateEnd ?? '')} onChange={(e) => handChangeData('dateEnd', e.target.value)} />
                      </dd>
                      <dt>출처명</dt>
                      <dd>
                        <InputTextXBtn id={'source'} title={'출처명'} value={searchDetailData?.[tabActive]?.sourceName ?? ''} onChange={(e) => handChangeData('sourceName', e.target.value)} />
                      </dd>
                      <dt>키워드</dt>
                      <dd>
                        <InputTextXBtn id={'keywords'} title={'키워드'} value={searchDetailData?.[tabActive]?.keywords ?? ''} onChange={(e) => handChangeData('keywords', e.target.value)} />
                      </dd>
                    </dl>}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center gap-6 mt-6'>
              {/* Input에 입력된 값이 하나라도 있을 경우, disabled false 값 */}
              <Button className='py-2.75 px-6.5 rounded-3xl text-base font-bold btn_style02' name='초기화' onClick={() => initSearch()} />
              <Button className='gap-2 py-3 px-6.5 rounded-3xl text-base font-bold btn_style03 detailSearch' name='상세 검색' icon={icSearch} onClick={() => handleDetailSearch()} />
            </div>
          </>
        }
      </div>
    </>
  );
}
