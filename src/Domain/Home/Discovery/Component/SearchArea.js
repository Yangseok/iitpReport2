import React, { useEffect, useState } from 'react';
import ic_search from 'Assets/Images/ic_search.png';
import arr_drop from 'Assets/Images/arr_drop.png';
import AutoCompleteSearch from 'Domain/Home/Common/Componet/AutoCompleteSearch';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchKeyword, setSearchKeywordReset } from 'Domain/Home/Common/Status/CommonSlice';
import Button from 'Domain/Home/Common/Componet/Button';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import InputTextXBtn from 'Domain/Home/Discovery/Component/InputTextXBtn';
import { useNavigate } from 'react-router-dom';
import { setMsg,setShow } from 'Domain/Home/Common/Status/MsgSlice';

export default function Search() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = () => {
    if (keyword.trim() === '') {
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
    navigate('/search/result/all?keyword=' + keyword);
  };

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

  const keyword = useSelector(getSearchKeyword);
  const [dataSearch, setDataSearch] = useState([]);

  const [fold, setFold] = useState(false);
  const [tabActive, setTabActive] = useState(0);

  useEffect(() => {
    (async () => {
      if(keyword.trim() !== '') {
        const data = await mainAPI.autocomplete(keyword);
        setDataSearch(data?.data?.result);
      }
    })();
  }, [keyword]);

  return (
    <>
      <section>
        <div className='container'>
          <AutoCompleteSearch 
            handleSearch={handleSearch}
            data={dataSearch}
            style={{ type: 3, name: '통합 검색', icon: ic_search }}
          />
        </div>
      </section>
      <section>
        <div className='container-800'>
          <div className='flex justify-end mt-6'>
            {/* Input에 입력된 값이 하나라도 있을 경우, className 'on' 추가 */}
            <button type='button' className={`btn_fold${(fold) ? ' fold' : ''}`} onClick={() => setFold(state => !state)}>
            상세 검색 {(fold) ? '보기' : '숨기기'} 
              <img src={arr_drop} alt='화살표' className='w-6' />
            </button>
          </div>
        </div>
        {(fold) 
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
                        <select name='startYear' id='startYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>기준연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                      </dd>
                      <dt>과제명</dt>
                      <dd>
                        <InputTextXBtn id={'project'} title={'과제명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>과제수행기관</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'과제수행기관'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>과제 책임자</dt>
                      <dd>
                        <InputTextXBtn id={'name'} title={'과제 책임자'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>세부과제번호</dt>
                      <dd>
                        <InputTextXBtn id={'detailNum'} title={'세부과제번호'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>과제고유번호</dt>
                      <dd>
                        <InputTextXBtn id={'projectNum'} title={'과제고유번호'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>부처명</dt>
                      <dd>
                        <InputTextXBtn id={'department'} title={'부처명'} value={''} onChange={() => {}} />
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
                      <dt>한글 키워드</dt>
                      <dd>
                        <InputTextXBtn id={'keywordsKo'} title={'한글 키워드'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>영문 키워드</dt>
                      <dd>
                        <InputTextXBtn id={'keywordsEn'} title={'영문 키워드'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                  {(tabActive === 1)
                    && <dl>
                      <dt>성과연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>성과연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>성과연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                      </dd>
                      <dt>특허명</dt>
                      <dd>
                        <InputTextXBtn id={'project'} title={'특허명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>출원번호</dt>
                      <dd>
                        <InputTextXBtn id={'number'} title={'출원번호'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>출원인</dt>
                      <dd>
                        <InputTextXBtn id={'applicant'} title={'출원인'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>발명자</dt>
                      <dd>
                        <InputTextXBtn id={'inventor'} title={'발명자'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                  {(tabActive === 2)
                    && <dl>
                      <dt>성과연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>성과연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>성과연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                      </dd>
                      <dt>논문명</dt>
                      <dd>
                        <InputTextXBtn id={'paper'} title={'논문명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>학술지/학술대회명</dt>
                      <dd>
                        <InputTextXBtn id={'journal'} title={'학술지/학술대회명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>ISSN</dt>
                      <dd>
                        <InputTextXBtn id={'issn'} title={'ISSN'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>저자명</dt>
                      <dd>
                        <InputTextXBtn id={'author'} title={'저자명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>초록</dt>
                      <dd>
                        <InputTextXBtn id={'abstract'} title={'초록'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                  {(tabActive === 3)
                    && <dl>
                      <dt>발행연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>발행연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>발행연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                      </dd>
                      <dt>발행기관명</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'발행기관명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>ICT 자료명</dt>
                      <dd>
                        <InputTextXBtn id={'ict'} title={'ICT 자료명'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                  {(tabActive === 4)
                    && <dl>
                      <dt>발행연도</dt>
                      <dd>
                        <label htmlFor='startYear' className='hidden_text'>기준연도 범위 - 시작 연도</label>
                        <select name='startYear' id='startYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endYear' className='hidden_text'>기준연도 범위 - 끝 연도</label>
                        <select name='endYear' id='endYear'>
                          <option value=''>선택</option>
                          <option value=''>2023</option>
                          <option value=''>2022</option>
                        </select>
                      </dd>
                      <dt>부처명</dt>
                      <dd>
                        <InputTextXBtn id={'department'} title={'부처명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>ICT 자료명</dt>
                      <dd>
                        <InputTextXBtn id={'ict'} title={'ICT 자료명'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                  {(tabActive === 5)
                    && <dl>
                      <dt>성명</dt>
                      <dd>
                        <InputTextXBtn id={'name'} title={'성명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>재직기관명</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'재직기관명'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                  {(tabActive === 6)
                    && <dl>
                      <dt>기관명</dt>
                      <dd>
                        <InputTextXBtn id={'agency'} title={'기관명'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                  {(tabActive === 7)
                    && <dl>
                      <dt>기간</dt>
                      <dd>
                        <label htmlFor='startDate' className='hidden_text'>기간 범위 - 시작 연도</label>
                        <input type='date' name='startDate' id='startDate' />
                        <span className='text-base font-medium text-color-dark mx-3'> - </span>
                        <label htmlFor='endDate' className='hidden_text'>기간 범위 - 끝 연도</label>
                        <input type='date' name='endDate' id='endDate' />
                      </dd>
                      <dt>출처명</dt>
                      <dd>
                        <InputTextXBtn id={'source'} title={'출처명'} value={''} onChange={() => {}} />
                      </dd>
                      <dt>키워드</dt>
                      <dd>
                        <InputTextXBtn id={'keywords'} title={'키워드'} value={''} onChange={() => {}} />
                      </dd>
                    </dl>}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center gap-6 mt-6'>
              {/* Input에 입력된 값이 하나라도 있을 경우, disabled false 값 */}
              <Button className='py-2.75 px-6.5 rounded-3xl text-base font-bold btn_style02' name='초기화' onClick={() => {}} disabled={true} />
              <Button className='gap-2 py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='상세 검색' icon={ic_search} onClick={() => {}} />
            </div>
          </>
        }
      </section>
    </>
  );
}
