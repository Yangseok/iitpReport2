import React, { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import arrRight from 'Assets/Images/arr_right.png';
import icSearch from 'Assets/Images/ic_search.png';
import icArrow from 'Assets/Images/ic_arrow02.png';
import IctLayout from 'Domain/Home/ICTTrend/Layout/IctLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import IctWordClouds from 'Domain/Home/ICTTrend/Component/IctWordClouds';
import IctTreeMap from 'Domain/Home/ICTTrend/Component/IctTreeMap';
import IctChart1 from 'Domain/Home/ICTTrend/Component/IctChart1';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import { setCategory, setEndYear, setStartYear, setSingleYear, setIctKeyword, getCategory } from 'Domain/Home/ICTTrend/Status/IctTrendSlice';
import * as ictTrendAPI from 'Domain/Home/ICTTrend/API/Call';
import RcSlider from 'rc-slider';
import common from 'Utill';
import moment from 'moment';
import $ from 'jquery';

export default function Main() {
  const wordSize = 160;
  let rangeMarks = {};
  const rangeMin = 1990;
  const rangeMax = Number(moment().format('YYYY'));
  const rangeDefault = [Number(moment().subtract(1, 'year').format('YYYY')), rangeMax];
  for(let i = rangeMin; i <= rangeMax; i++) {
    rangeMarks[i] = i;
  }
  
  const navigate = useNavigate();
  const locations = useLocation();
  const dispatch = useDispatch();

  const category = useSelector(getCategory);
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [page, setPage] = useState('');
  const [keywordRangeValue, setKeywordRangeValue] = useState(rangeDefault);
  const [issueRangeValue, setIssueRangeValue] = useState(rangeMax);
  const [wordCloudData, setWordCloudData] = useState([]);
  const [techData, setTechData] = useState([]);
  const [techSearch, setTechSearch] = useState([]);
  const [issueKeywordData, setIssueKeywordData] = useState([]);
  const [isIssueDownload, setIsIssueDownload] = useState(false);
  const [issueTrendData, setIssueTrendData] = useState([]);
  const [issueTrendLabel, setIssueTrendLabel] = useState([]);

  const se = common.getSegment();
  const paramSe2 = se[2] ?? '';

  // 키워드 트렌드 - 워드 클라우드 API
  const getKeywordCloud = useCallback(async (category, startYear, endYear) => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await ictTrendAPI.ictSearchWordCloud(category, 'wordCloud', undefined, wordSize, startYear, endYear);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    console.log('getKeywordCloud', category, startYear, endYear, data?.data?.result);
    setWordCloudData(data?.data?.result ?? []);
  }, [category]);

  // 키워드 트렌드 - 키워드 클릭 이벤트
  const handleWordClick = useCallback((_, d) => {
    let ictCategory = category;
    
    if(category === 'all') {
      ictCategory = 'projectout';
      dispatch(setCategory('rnd_project'));
    } else if (category === 'rnd_project') {
      ictCategory = 'projectout';
    } else if (category === 'iitp_project') {
      ictCategory = 'projectin';
    } else if (category === 'ict_report') {
      ictCategory = 'ict';
    }

    dispatch(setIctKeyword(d.text));
    dispatch(setStartYear(keywordRangeValue[0]));
    dispatch(setEndYear(keywordRangeValue[1]));
    navigate(`/icttrend/${paramSe2}/result/${ictCategory}`);
  }, [category, keywordRangeValue]);

  // ICT 기술분류 트렌드 - ICT 기술분류 API
  const getTechnology = useCallback(async (category) => {
    let data = [], datas = [], labels = [], parents = [];
    try {
      dispatch(setLoading(true));
      data = await ictTrendAPI.ictSearchWordCloud(category, 'class', undefined, 40);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    
    const dataList = data?.data?.result;
    console.log('getTechnology', category, dataList);

    if (dataList?.length > 0) {
      labels.push('');
      parents.push('');
      for (let i in dataList ?? []) {
        const labelData = dataList[i].key ?? '';
        labels.push(labelData);
        parents.push('');

        if (dataList[i]?.middle?.length > 0) {
          for (let j in dataList[i].middle) {
            const middleData = dataList[i].middle[j].key ?? '';
            const middleCnt = common.setPriceInput(dataList[i].middle[j].doc_count ?? '');
            const middleRate = dataList[i].middle[j].rate ?? '';
            labels.push(`${middleData}<br>${middleCnt}개<br>${middleRate}%`);
            parents.push(labelData);
          }
        }
      }

      datas.push({
        'type': 'treemap',
        'labels': labels,
        'parents': parents,
      });
      setTechData(datas);
    }
  } , [category]);
  
  // ICT 기술분류 트렌드 - 기술분류 클릭 이벤트
  const onTreeMapClick = (e) => {
    const data = e.points[0];
    const fullPath = data?.currentPath + data?.label;
    const paths = fullPath?.split('/');
    const [bigTech, middleTech, smallTech] = paths.slice(1);
    const newBigTech = (bigTech) ? bigTech.split('<br>')[0] : '';
    const newMiddleTech = (middleTech) ? middleTech.split('<br>')[0] : '';
    const newSmallTech = (smallTech) ? smallTech.split('<br>')[0] : '';
    let newData = [];
    
    // label : 최상위 부모 요소 클릭 시에는 노출되지 않음.
    // currentPath : 현재 요소 클릭 시에는 노출되지 않음.
    if (data?.label) {
      if (data?.currentPath) {
        newData = [newBigTech, newMiddleTech, newSmallTech];
      } else {
        newData = techSearch;

        for (let i = newData.length - 1; i >= 0; i--) {
          if (typeof newData[i] !== 'undefined') {
            newData[i] = undefined;
            break;
          }
        }
        
      }
    } else {
      newData = [];
    }

    setTechSearch([...newData]);
  };

  // ICT 기술분류 트렌드 - 결과보기 클릭 이벤트
  const onTechnologySearch = () => {
    let ictCategory = category;
    
    if(category === 'all') {
      ictCategory = 'projectout';
    } else if (category === 'rnd_project') {
      ictCategory = 'projectout';
    } else if (category === 'iitp_project') {
      ictCategory = 'projectin';
    } else if (category === 'ict_report') {
      ictCategory = 'ict';
    }
    
    for (let i = techSearch.length - 1; i >= 0; i--) {
      if (typeof techSearch[i] !== 'undefined' && techSearch[i] !== '') {
        dispatch(setIctKeyword(techSearch[i]));
        break;
      }
    }
    navigate(`/icttrend/${paramSe2}/result/${ictCategory}`);
  };

  // 10대 이슈 - 보고서 다운로드 API
  const issueDownload = async (e) => {
    try {
      dispatch(setLoading(true));
      const data = await ictTrendAPI.ictIssueReportDownload(issueRangeValue);
      common.blobDownload(data.data, issueRangeValue + ' ICT 10대 이슈.pdf');
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }
    e?.preventDefault();
  };

  // 10대 이슈 - ICT 10대 이슈 키워드 API
  const getIssueKeyword = useCallback(async (year) => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await ictTrendAPI.ictIssueKeyword(year);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }

    setIsIssueDownload(((data?.data?.result?.fileYN ?? 'N') === 'Y'));
    setIssueKeywordData(data?.data?.result?.keyword ?? []);
  }, []);

  // 10대 이슈 - 이슈 키워드 추이 API
  const getIssueTrend = useCallback(async (year) => {
    let data = [];
    try {
      dispatch(setLoading(true));
      data = await ictTrendAPI.ictSearchWordCloud('all', 'trend', undefined, 20, undefined, undefined, year);
    } catch (e) {
      console.warn(e);
    } finally {
      dispatch(setLoading(false));
    }

    const dataList = data?.data?.result;
    let datas = [], labels = [];
    
    if (dataList?.length > 0) {
      for (let i in dataList ?? []) {
        const pushData = {
          x: dataList[i].doc_count ?? 0,
          y: dataList[i].rate ?? 0,
        };
        const pushLabel = dataList[i].key ?? '';
        datas.push(pushData);
        labels.push(pushLabel);
      }
      setIssueTrendData(datas);
      setIssueTrendLabel(labels);
    }
  } , []);

  // 탭 버튼
  useEffect(() => {
    let tab1 = [], tab2 = [];

    if(paramSe2 === 'keyword') {
      tab1 = [
        { 
          id: 0, 
          name: '전체', 
          onClick: () => {
            setTabActive1(0);
            dispatch(setCategory('all'));
            setKeywordRangeValue(rangeDefault);
          }
        },
        { 
          id: 1, 
          name: '과제', onClick: () => {
            setTabActive1(1);
            setTabActive2(0);
            dispatch(setCategory('rnd_project'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 2, 
          name: '특허', 
          onClick: () => {
            setTabActive1(2);
            dispatch(setCategory('patent'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 3, 
          name: '논문', 
          onClick: () => {
            setTabActive1(3);
            dispatch(setCategory('paper'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 4, 
          name: 'ICT 자료', 
          onClick: () => {
            setTabActive1(4);
            dispatch(setCategory('ict_report'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 5, 
          name: '정부정책', 
          onClick: () => {
            setTabActive1(5);
            dispatch(setCategory('policy'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 6, 
          name: '뉴스', 
          onClick: () => {
            setTabActive1(6);
            dispatch(setCategory('news'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
      ];
      setTabActive1(0);
    } else if(paramSe2 === 'technology') {
      tab1 = [
        { 
          id: 1, 
          name: '과제', 
          onClick: () => {
            setTabActive1(1);
            setTabActive2(0);
            dispatch(setCategory('rnd_project'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 2, 
          name: '특허', 
          onClick: () => {
            setTabActive1(2);
            dispatch(setCategory('patent'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 3, 
          name: '논문', 
          onClick: () => {
            setTabActive1(3);
            dispatch(setCategory('paper'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
        { 
          id: 5, 
          name: '정부정책', 
          onClick: () => {
            setTabActive1(5);
            dispatch(setCategory('policy'));
            setKeywordRangeValue(rangeDefault);
          } 
        },
      ];
      setTabActive1(1);
      setTabActive2(0);
    }
    
    tab2 = [
      { 
        id: 0, 
        name: '국가 R&D 과제', 
        onClick: () => {
          setTabActive2(0);
          dispatch(setCategory('rnd_project'));
          setKeywordRangeValue(rangeDefault);
        } 
      },
      { 
        id: 1, 
        name: 'IITP 내부 과제', 
        onClick: () => {
          setTabActive2(1);
          dispatch(setCategory('iitp_project'));
          setKeywordRangeValue(rangeDefault);
        } 
      },
    ];

    setPage(paramSe2);
    setTabButtons1(tab1);
    setTabButtons2(tab2);
  }, [locations]);

  useEffect(() => {
    tabButtons1?.forEach((e) => {
      if(e.id === tabActive1) {
        setTabActive1(e.id);
      }
    });
    tabButtons2?.forEach((e) => {
      if(tabActive1 === 1 && e.id === tabActive2) {
        setTabActive2(e.id);
      }
    });
  }, [tabButtons1, tabButtons2]);

  useEffect(() => {
    if(paramSe2 === 'issue') {
      const marks = document.querySelectorAll('.rc_custom.type02 .rc-slider-mark-text');
  
      marks.forEach((item) => {
        item.classList.remove('rc-slider-mark-text-active');
        if(+item.textContent === issueRangeValue) {
          item.classList.add('rc-slider-mark-text-active');
        }
      });
    }
  }, [issueRangeValue, se]);

  useEffect(() => {
    dispatch(setSingleYear(issueRangeValue));
  }, [issueRangeValue]);

  
  useEffect(() => {
    if (page === 'keyword' && keywordRangeValue[0] !== undefined && keywordRangeValue[1] !== undefined) {
      getKeywordCloud(category, keywordRangeValue[0], keywordRangeValue[1]);
    }
  }, [page, category, keywordRangeValue]);
  
  useEffect(() => {
    if (page === 'technology') {
      getTechnology(category);
    }
  }, [page, category]);
  
  useEffect(() => {
    if (page === 'issue') {
      getIssueTrend(issueRangeValue);
      getIssueKeyword(issueRangeValue);
    }
  }, [page, issueRangeValue]);
  
  useEffect(() => {
    setTechSearch([]);
  }, [page, tabActive1, tabActive2]);

  useEffect(() => {
    if(paramSe2 === 'keyword') {
      dispatch(setCategory('all'));
    } else if(paramSe2 === 'technology') {
      dispatch(setCategory('rnd_project'));
    }
    
    setKeywordRangeValue(rangeDefault);
    setIssueRangeValue(rangeMax);
  }, [page]);

  useEffect(() => {
    if(paramSe2 === 'keyword' || paramSe2 === 'issue') {
      const scrollWidth = $('.rc_custom_wrap').get(0).scrollWidth;
      $('.rc_custom_wrap').get(0).scrollLeft = scrollWidth;
    }
  }, [rangeMin, rangeMax, page]);

  return (
    <IctLayout>
      {(page === 'keyword' || page === 'technology')
        ? <div className='section'>
          <div className='container'>
            <TabButtons style='4-2' tabs={tabButtons1} active={tabActive1} />
            {(tabActive1 === 1) 
              && <div className='mt-4'>
                <TabButtons style='2' tabs={tabButtons2} active={tabActive2} />
              </div>
            }
          </div>
        </div>
        : ''
      }
      {(page === 'keyword')
        ? // ICT 키워드 트렌드
        <div className='section mt-4'>
          <div className='container'>
            <div className='wordcloud_cursor_wrap'>
              <IctWordClouds data={wordCloudData} height={600} onWordClick={handleWordClick} size={wordSize} />
            </div>
            <div className='rc_custom_wrap max-w-4.5xl mt-4 mx-auto'>
              <div className='rc_custom min-w-360'>
                <RcSlider
                  range
                  min={rangeMin}
                  max={rangeMax}
                  marks={rangeMarks}
                  value={keywordRangeValue}
                  onChange={(e) => setKeywordRangeValue(e)}
                />
              </div>
            </div>
          </div>
        </div>
        : (page === 'technology')
          ? // ICT 기술분류 트렌드
          <div className='section mt-10'>
            <div className='container'>
              <IctTreeMap data={techData} onClick={onTreeMapClick} />

              <div className='flex items-center justify-between'>
                {/* 
                  TreeMap 에서 텍스트 선택하면 아래의 분류명에 하나씩 입력되며, 
                  이를 토대로 결과 보기
                */}
                <div className='flex items-center gap-2'>
                  <p className='text-xl font-bold text-color-regular'>{techSearch[0]}</p>
                  {(techSearch[1]) && (
                    <>
                      <img src={arrRight} alt='분류 화살표' className='w-6' />
                      <p className='text-xl font-bold text-color-regular'>{techSearch[1]}</p>

                      {(techSearch[2]) && (
                        <>
                          <img src={arrRight} alt='분류 화살표' className='w-6' />
                          <p className='text-xl font-bold text-color-regular'>{techSearch[2]}</p>
                        </>
                      )}
                    </>
                  )}
                </div>
                {(techSearch[0]) && <Button name="결과 보기" icon={icSearch} className="gap-2 py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" onClick={onTechnologySearch} />}
              </div>
            </div>
          </div>
          : // ICT 10대 이슈
          <>
            <div className='section mt-6'>
              <div className='container'>
                <div className='flex items-center justify-between'>
                  <div className='flex-1 px-11 max-w-5.25xl'>
                    <div className='rc_custom_wrap mt-4 mx-auto'>
                      <div className='rc_custom type02 min-w-370'>
                        <RcSlider
                          included={false}
                          min={rangeMin}
                          max={rangeMax}
                          marks={rangeMarks}
                          value={issueRangeValue}
                          onChange={(e) => setIssueRangeValue(e)}
                        />
                      </div>
                    </div>
                  </div>
                  {(isIssueDownload) 
                    ? <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04' name='보고서 다운로드' icon={icArrow} onClick={issueDownload} /> 
                    : <div className='min-h-12'></div>}
                </div>
              </div>
            </div>
            <section className='mt-10'>
              <div className='container'>
                <h2 className='text-base font-bold text-color-dark text-center'>
                  <span className='text-color-main'>{issueRangeValue}년</span> ICT 10대 이슈 키워드
                </h2>
                <div className='flex items-center justify-center flex-wrap gap-x-6 gap-y-2 mt-6'>
                  {(issueKeywordData?.length > 0)
                    ? issueKeywordData?.map((e, i) => {
                      return <button 
                        key={'issue'+i}
                        onClick={() => {
                          dispatch(setIctKeyword(e));
                          navigate('/icttrend/issue/result/projectout');
                        }} 
                        className='h-10 px-4 rounded text-base font-bold btn_style08'
                      >
                        {e}
                      </button>;
                    })
                    : <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                  }
                </div>
              </div>
            </section>
            <section className='mt-15'>
              <div className='container'>
                <h2 className='text-base font-bold text-color-dark'>이슈 키워드 추이</h2>
                <div className='mt-4'>
                  <IctChart1 labels={issueTrendLabel} datas={issueTrendData} height={360} />
                </div>
                <p className='text-sm text-color-regular text-center mt-2'>누적 출현 수(건)</p>
              </div>
            </section>
          </>
      }
    </IctLayout>
  );
}
