import React, { useState } from 'react';
import 'Assets/Css/Discovery.css';
import ic_guide from 'Assets/Images/ic_guide.png';
import ic_analysis from 'Assets/Images/ic_analysis.png';
import ic_reset from 'Assets/Images/ic_reset.png';
import ic_filter from 'Assets/Images/ic_filter.png';
import ic_arrow from 'Assets/Images/ic_arrow02.png';
import img_researcher01 from 'Assets/Images/researcher_img01.png';
import img_researcher02 from 'Assets/Images/researcher_img02.png';
import img_researcher03 from 'Assets/Images/researcher_img03.png';
import img_researcher04 from 'Assets/Images/researcher_img04.png';
import img_researcher05 from 'Assets/Images/researcher_img05.png';
import img_researcher06 from 'Assets/Images/researcher_img06.png';
import img_building01 from 'Assets/Images/building_img01.png';
import img_building02 from 'Assets/Images/building_img02.png';
import img_building03 from 'Assets/Images/building_img03.png';
import img_building04 from 'Assets/Images/building_img04.png';
import img_building05 from 'Assets/Images/building_img05.png';
import img_building06 from 'Assets/Images/building_img06.png';
import img_building07 from 'Assets/Images/building_img07.png';
import img_building08 from 'Assets/Images/building_img08.png';
import img_building09 from 'Assets/Images/building_img09.png';
import arr_drop from 'Assets/Images/arr_drop.png';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import CategoryWrap from '../Component/CategoryWrap';
import ListItem from 'Domain/Home/Common/Componet/ListItem';

export default function DiscoveryStyles() {
  const tabButtons1 = [
    { id: 0, name: '디스커버리 검색', onClick: () => setTabActive1(0) },
    { id: 1, name: '통합 검색', onClick: () => setTabActive1(1) },
  ];
  const tabButtons2 = [
    { id: 0, name: '키워드 분석', onClick: () => setTabActive2(0) },
    { id: 1, name: '파일 분석', onClick: () => setTabActive2(1) },
    { id: 2, name: '과제 정보 분석', onClick: () => setTabActive2(2) },
  ];
  // 데이터는 10개씩 뿌려줌
  const tempData1 = [
    {
      id: 0,
      progress: '진행중',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
    {
      id: 1,
      progress: '진행중',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];
  const tempData2 = [
    {
      id: 0,
      title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
      project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
      division: '출원',
      num: '1020200077142',
      date: '2021.01.08',
      agency: '행정안전부국립재난안전연구원',
      name: '홍길동',
      link: '#',
    },
  ];
  const tempData3 = [
    {
      id: 0,
      title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
      year: '2021',
      division: '학술지',
      agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
      name: '홍길동',
      journal: '한국게임학회논문지',
      link: '#',
    },
  ];
  const tempData4 = [
    {
      id: 0,
      title: '싱가포르 인공지능 진출가이드 2023',
      agency: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: null,
    },
    {
      id: 1,
      title: '싱가포르 인공지능 진출가이드 2023',
      agency: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
    },
  ];
  const tempData5 = [
    {
      id: 0,
      title: '싱가포르 인공지능 진출가이드 2023',
      source: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
    },
  ];
  const tempData6_1 = [
    {
      id: 0,
      name: '장*탁',
      agency: '서울대학교',
      assign: '43',
      link: '#',
    },
    {
      id: 1,
      name: '장*탁',
      agency: '서울대학교',
      assign: '43',
      link: '#',
    },
  ];
  const tempData6_2 = [
    {
      id: 0,
      name: '장*탁',
      relation: 0,
    },
    {
      id: 1,
      name: '차*훈',
      relation: 1,
    },
    {
      id: 2,
      name: '임*원',
      relation: 2,
    },
    {
      id: 3,
      name: '정*은',
      relation: 3,
    },
    {
      id: 4,
      name: '이*호',
      relation: 4,
    },
    {
      id: 5,
      name: '장*탁',
      relation: 5,
    },
  ];
  const tempData6_3 = [
    {
      id: 0,
      progress: true,
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
    {
      id: 1,
      progress: false,
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];
  const tempData7_1 = [
    {
      id: 0,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '10',
      patent: '10',
      institue: null,
      safety: 2,
      sales: 10,
      followup: true,
    },
    {
      id: 1,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '43',
      patent: '10',
      institue: 'OOO연구소',
      safety: 0,
      sales: 5,
      followup: false,
    },
    {
      id: 2,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '10',
      patent: '10',
      institue: 'OOO연구소',
      safety: 1,
      sales: 25,
      followup: true,
    },
  ];
  const tempData7_2 = [
    {
      id: 0,
      name: '주식회사 마인즈랩',
      relation: 0,
    },
    {
      id: 1,
      name: '솔트룩스',
      relation: 1,
    },
    {
      id: 2,
      name: '아이브릭스',
      relation: 2,
    },
    {
      id: 3,
      name: '주식회사 빅스터',
      relation: 3,
    },
    {
      id: 4,
      name: '주식회사 빅스터',
      relation: 4,
    },
    {
      id: 5,
      name: '주식회사 빅스터',
      relation: 5,
    },
  ];
  const tempData7_3 = [
    {
      id: 0,
      progress: true,
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
    {
      id: 1,
      progress: false,
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      performance: '논문(1), 특허(3)',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];

  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [researcherActive, setResearcherActive] = useState({});
  const [orgnActive, setOrgnActive] = useState({});

  const onResearcherSelect = (e, id, name) => {
    if(e.target.nodeName !== 'BUTTON') {
      setResearcherActive({ id, name });
      console.log(id, '연구원 선택!');
    }
  };
  const onOrgnSelect = (e, id, name) => {
    if(e.target.nodeName !== 'BUTTON') {
      setOrgnActive({ id, name });
      console.log(id, '기관 선택!');
    }
  };

  return (
    <Layout>
      {/* 탭 버튼 & 키워드 찾기 */}
      <section>
        <div className='container'>
          <div className='flex items-center justify-between mb-10'>
            <div className='flex items-center gap-20'>
              <TabButtons style='1' tabs={tabButtons1} active={tabActive1} />
              <TabButtons style='3' tabs={tabButtons2} active={tabActive2} />
            </div>
            <button type='button' className='gap-1'>
              <img src={ic_guide} alt='검색 가이드' className='w-6' />
              검색 가이드
            </button>
          </div>
          <div className='search_wrap type02'>
            <label htmlFor='search' className=''>키워드 검색</label>
            <input type='text' name='search' id='search' defaultValue='' placeholder='찾고 싶은 검색어를 입력해보세요.' />
            <div className='search_btn'>
              <Button name='키워드 찾기' icon={ic_analysis} />
            </div>
          </div>
        </div>
      </section>
      {/* 키워드 결과 */}
      <section>
        <div className='container'>
          <div className='flex items-center justify-between mt-10 px-4'>
            <h3 className='text-xl font-bold text-color-dark'>키워드 결과</h3>
            <div className='flex items-center gap-6'>
              <button type='button' className='text-sm font-medium text-color-placeholder'>선택 초기화 <img src={ic_reset} alt='선택 초기화' className='w-6' /></button>
              <button type='button' className='text-sm font-medium text-color-regular'>접기 <img src={arr_drop} alt='화살표' className='w-6' /></button>
            </div>
          </div>
          <div className='keywords_wrap mt-4'>
            <div className='title'>
              <h4>1depth 키워드</h4>
              <button type='button'>1depth 키워드 접기</button>
            </div>
            <ul>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword01" /></li>
              <li><Button name="증강현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword01" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword01" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword02" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword02" /></li>
              <li><Button name="실감미디어" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword02" /></li>
              <li><Button name="현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="인터렉션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="실감디바이스" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword03" /></li>
              <li><Button name="텔레포트" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="실감미디어" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="위치기반" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword04" /></li>
              <li><Button name="큐레이션" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword05" /></li>
              <li><Button name="혼합현실" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword05" /></li>
              <li><Button name="실감미디어" className="py-1.75 px-2.5 rounded text-base font-bold btn_keyword05" /></li>
            </ul>
          </div>
          <div className='keywords_btn'>
            <button type='button' disabled>키워드 확장 <img src={ic_analysis} alt='키워드 확장' /></button>
          </div>
          <Button className='gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='디스커버리' icon={ic_analysis} />
        </div>
      </section>
      {/* 분석 결과 수 & 탭 버튼 */}
      <section className='mt-10'>
        <div className='container'>
          <h3 className='text-xl font-bold text-color-regular text-center mb-10'>
            “<span className='text-color-main'>인공지능</span>”에 대한 분석 결과는 총 <span className='text-color-main'>10,300건</span> 입니다.
          </h3>
          <CategoryWrap />
        </div>
      </section>
      {/* 분석 결과 (과제) */}
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              국가 R&D 과제 {/* IITP 내부 과제 */} <span className='text-color-main'>50,150건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='list_style01 mt-2'>
            <ul>
              {(tempData1?.length > 0) 
                ? tempData1?.map((e) => {
                  return (<>
                    <ListItem 
                      key={e.id}
                      tag={1}
                      title={e.title}
                      contents={<>
                        <div>
                          <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                          <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                          <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                          <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                        </div>
                        <div>
                          <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                          <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                          <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                        </div>
                      </>}
                      btns={<>
                        <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                      </>}
                    />
                    <li key={e.id}>
                      <div className='flex justify-between gap-4'>
                        <div className='flex-1'>
                          <div className='flex gap-2'>
                            {/* 진행중: tag_style01 | 종료: tag_style02 */}
                            <span className='tag_style01 mt-0.5'>{e.progress}</span>
                            <p className='text-base font-bold text-color-dark flex-1'>{e.title}</p>
                          </div>
                          <div className='text_style01 mt-2'>
                            <div>
                              <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                              <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                              <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                            </div>
                            <div>
                              <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                              <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                              <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                            </div>
                          </div>
                        </div>
                        <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                      </div>
                    </li>
                  </>);
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
      {/* 분석 결과 (특허) */}
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              특허 <span className='text-color-main'>100,300건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='list_style01 mt-2'>
            <ul>
              {(tempData2?.length > 0) 
                ? tempData2?.map((e) => {
                  return (<>
                    <ListItem 
                      key={e.id}
                      title={e.title}
                      contents={<>
                        <div>
                          <p className='text-sm text-color-regular'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
                          <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                          <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                        </div>
                        <div>
                          <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                          <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                        </div>
                      </>}
                      btns={<>
                        <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                        <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                      </>}
                    />
                    <li key={e.id}>
                      <div className='flex justify-between gap-4'>
                        <div className='flex-1'>
                          <p className='text-base font-bold text-color-dark'>{e.title}</p>
                          <div className='text_style01 mt-2'>
                            <div>
                              <p className='text-sm text-color-regular'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
                              <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                              <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                            </div>
                            <div>
                              <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                              <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            </div>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2.5'>
                          <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                          <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                        </div>
                      </div>
                    </li>
                  </>);
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
      {/* 분석 결과 (논문) */}
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              논문 <span className='text-color-main'>100,300건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='list_style01 mt-2'>
            <ul>
              {(tempData3?.length > 0) 
                ? tempData3?.map((e) => {
                  return (<>
                    <ListItem 
                      key={e.id}
                      title={e.title}
                      contents={<>
                        <p className='text-sm text-color-regular'>발행년도: <span className='font-medium text-color-main'>{e.year}</span></p>
                        <p className='text-sm text-color-regular'>논문 구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                        <p className='text-sm text-color-regular'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                        <p className='text-sm text-color-regular'>주 저자: <span className='font-medium text-color-main'>{e.name}</span></p>
                        <p className='text-sm text-color-regular'>학술지/학술대회명: <span className='font-medium text-color-main'>{e.journal}</span></p>
                      </>}
                      btns={<>
                        <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                        <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                      </>}
                    />
                    <li key={e.id}>
                      <div className='flex justify-between gap-4'>
                        <div className='flex-1'>
                          <p className='text-base font-bold text-color-dark'>{e.title}</p>
                          <div className='text_style01 mt-2'>
                            <p className='text-sm text-color-regular'>발행년도: <span className='font-medium text-color-main'>{e.year}</span></p>
                            <p className='text-sm text-color-regular'>논문 구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular'>주 저자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            <p className='text-sm text-color-regular'>학술지/학술대회명: <span className='font-medium text-color-main'>{e.journal}</span></p>
                          </div>
                        </div>
                        <div className='flex flex-col gap-2.5'>
                          <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                          <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                        </div>
                      </div>
                    </li>
                  </>);
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
      {/* 분석 결과 (ICT 자료) */}
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              ICT 자료 <span className='text-color-main'>100,300건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='list_style01 mt-2'>
            <ul>
              {(tempData4?.length > 0) 
                ? tempData4?.map((e) => {
                  return (<>
                    <ListItem 
                      key={e.id}
                      title={e.title}
                      contents={<>
                        <p className='text-sm text-color-regular line2_text'>{e.content}</p>
                      </>}
                      desc={<>
                        <div className='text_style01 flex items-center gap-4'>
                          {(e.link) ? <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 뷰어 페이지`}>view 보기↗</a> : ''}
                          <div>
                            <p className='text-sm text-color-regular'>발행기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular'>발행일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          </div>
                        </div>
                      </>}
                    />
                    <li key={e.id}>
                      <div className='flex items-start justify-between gap-4'>
                        <p className='text-base font-bold text-color-dark flex-1'>{e.title}</p>
                        <div className='text_style01 flex items-center gap-4'>
                          {(e.link) ? <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 뷰어 페이지`}>view 보기↗</a> : ''}
                          <div>
                            <p className='text-sm text-color-regular'>발행기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular'>발행일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className='mt-2'>
                        <p className='text-sm text-color-regular line2_text'>{e.content}</p>
                      </div>
                    </li>
                  </>);
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
      {/* 분석 결과 (정부정책) */}
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              정부정책 <span className='text-color-main'>100,300건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='list_style01 mt-2'>
            <ul>
              {(tempData5?.length > 0) 
                ? tempData5?.map((e) => {
                  return (<>
                    <ListItem 
                      key={e.id}
                      title={e.title}
                      contents={<>
                        <p className='text-sm text-color-regular line2_text'>{e.content}</p>
                      </>}
                      desc={<>
                        <div className='text_style01'>
                          <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                          <p className='text-sm text-color-regular'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
                        </div>
                      </>}
                    />
                    <li key={e.id}>
                      <div className='flex items-start justify-between gap-4'>
                        <p className='text-base font-bold text-color-dark flex-1'>{e.title}</p>
                        <div className='text_style01'>
                          <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                          <p className='text-sm text-color-regular'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
                        </div>
                      </div>
                      <div className='mt-2'>
                        <p className='text-sm text-color-regular line2_text'>{e.content}</p>
                      </div>
                    </li>
                  </>);
                })
                : <li>
                  <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                </li>
              }
            </ul>
          </div>
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
      {/* 분석 결과 (연구자) */}
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              연구자 <span className='text-color-main'>100,300건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='flex items-start gap-6 mt-2'>
            <div className='w-120'>
              <div className='list_style02'>
                <ul>
                  {(tempData6_1?.length > 0)
                    ? tempData6_1?.map((e) => (
                      <li 
                        key={e.id} 
                        className={`flex items-center gap-4${(e.id === researcherActive.id) ? ' on' : ''}`}
                        onClick={(event) => onResearcherSelect(event, e.id, e.name)} 
                        onKeyUp={(event) => (event.key === 'Enter') && onResearcherSelect(event, e.id)} 
                        tabIndex={0}
                      >
                        <img src={img_researcher01} alt='연구자 프로필 이미지' className='w-11' />
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <p className='text-base font-bold text-color-main'>{e.name}</p>
                            <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.name} 연구자 페이지`}>연구자 보기↗</a>
                          </div>
                          <div className='text_style01'>
                            <p className='text-sm text-color-regular'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                          </div>
                        </div>
                      </li>
                    ))
                    : <li>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
              <div className='mt-10'>
                <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
              </div>
            </div>
            <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
              <div>
                <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 관련 연구자</h5>
                <ul className='flex mt-4'>
                  {tempData6_2?.map((e, i) => {
                    let imgSrc = '';
                    if(e.relation === 0) {
                      imgSrc = img_researcher01;
                    } else if(e.relation === 1) {
                      imgSrc = img_researcher02;
                    } else if(e.relation === 2) {
                      imgSrc = img_researcher03;
                    } else if(e.relation === 3) {
                      imgSrc = img_researcher04;
                    } else if(e.relation === 4) {
                      imgSrc = img_researcher05;
                    } else if(e.relation === 5) {
                      imgSrc = img_researcher06;
                    }

                    return <li key={e.id} className='w-1/6 px-1'>
                      <div className={`img_wrap rounded-full w-15 h-15 mx-auto ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
                        <img src={imgSrc} alt='연구자 프로필 이미지' className='w-11' />
                      </div>
                      <p className={`mt-1 text-sm text-center ${(i === 0) ? 'text-color-main' : 'text-color-dark'}`}>{e.name}</p>
                    </li>;
                  })}
                </ul>
              </div>
              <div className='mt-10'>
                <h5 className='text-base font-bold text-color-dark'>{researcherActive.name} 님 과제</h5>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tempData6_3?.length > 0) 
                      ? tempData6_3?.map((e) => {
                        return (<>
                          <ListItem 
                            key={e.id}
                            tag={(e?.progress !== null) 
                              ? (e.progress) ? 1 : 2 
                              : ''}
                            title={e.title}
                            contents={<>
                              <div>
                                <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                                <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                              </div>
                              <div>
                                <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                                <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                              </div>
                              <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                            </>}
                            desc={<>
                              <a href={`${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</a>
                            </>}
                          />
                          <li key={e.id}>
                            <div className='flex justify-between gap-2'>
                              <div className='flex gap-2 flex-1'>
                                {/* 진행중: tag_style01 | 종료: tag_style02 */}
                                {(e?.progress !== null) 
                                  ? (e.progress) 
                                    ? <span className='tag_style01 mt-0.5'>진행중</span>
                                    : <span className='tag_style02 mt-0.5'>종료</span>
                                  : ''}
                                <p className='text-base font-bold text-color-dark flex-1'>{e.title}</p>
                              </div>
                              <a href={`${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</a>
                            </div>
                            <div className='text_style01 mt-2'>
                              <div>
                                <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                                <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                              </div>
                              <div>
                                <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                                <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                              </div>
                              <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                            </div>
                          </li>
                        </>);
                      })
                      : <li>
                        <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                      </li>
                    }
                  </ul>
                </div>
                <div className='mt-10'>
                  <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* 분석 결과 (기관) */}
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              기관 <span className='text-color-main'>100,300건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} />
              <div>
                <label htmlFor='sort_order' className='hidden_text'>정렬 순서</label>
                <select name='sort_order' id='sort_order'>
                  <option value=''>최신순</option>
                  <option value=''>정확도순</option>
                  <option value=''>유사도순</option>
                </select>
              </div>
              <div>
                <label htmlFor='list_num' className='hidden_text'>노출되는 목록수</label>
                <select name='list_num' id='list_num'>
                  <option value=''>10</option>
                  <option value=''>20</option>
                  <option value=''>30</option>
                  <option value=''>50</option>
                  <option value=''>100</option>
                </select>
              </div>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style01' name='필터' icon={ic_filter} />
            </div>
          </div>

          <div className='flex items-start gap-6 mt-2'>
            <div className='w-120'>
              <div className='list_style02'>
                <ul>
                  {(tempData7_1?.length > 0)
                    ? tempData7_1?.map((e) => (
                      <li 
                        key={e.id} 
                        className={`flex items-center gap-4${(e.id === orgnActive.id) ? ' on' : ''}`}
                        onClick={(event) => onOrgnSelect(event, e.id, e.name)} 
                        onKeyUp={(event) => (event.key === 'Enter') && onOrgnSelect(event, e.id)} 
                        role={'button'}
                        tabIndex={0}
                      >
                        <div className='tooltip_wrap' tabIndex={0}>
                          {(e.safety === 0) 
                            ? <>
                              <img src={img_building01} alt='기관 재무안전성: 위험 이미지' className='w-11' />
                              <span className='tooltip_style01 min-w-23'>재무안전성: 위험</span>
                            </>
                            : (e.safety === 1) 
                              ? <>
                                <img src={img_building02} alt='기관 재무안전성: 보통 이미지' className='w-11' />
                                <div className='tooltip_style02 min-w-23'>재무안전성: 보통</div>
                              </>
                              : <>
                                <img src={img_building03} alt='기관 재무안전성: 안정 이미지' className='w-11' />
                                <div className='tooltip_style03 min-w-23'>재무안전성: 안정</div>
                              </>}
                        </div>
                        <div className='flex-1'>
                          <div className='flex items-center gap-2'>
                            <p className='text-base font-bold text-color-main'>{e.name}</p>
                            <div className='tooltip_wrap' tabIndex={0}>
                              <span className="tag_style03">{e.sales}</span>
                              <div className='tooltip_style04 min-w-30'>해당 산업 매출상위(%)</div>
                            </div>
                            {(e.followup)
                              && (
                                <div className='tooltip_wrap' tabIndex={0}>
                                  <span className="tag_style04">사후</span>
                                  <div className='tooltip_style04 min-w-25'>사후관리 대상 기업</div>
                                </div>
                              )
                            }
                          </div>
                          <div className='text_style01'>
                            <p className='text-sm text-color-regular'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                            <p className='text-sm text-color-regular'>특허: <span className='font-medium text-color-main'>{e.patent}건</span></p>
                            {(e?.institue) && <p className='text-sm text-color-regular'>부설연구소: <span className='font-medium text-color-main'>{e.institue}</span></p>}
                          </div>
                        </div>
                      </li>
                    ))
                    : <li>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
              <div className='mt-10'>
                <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
              </div>
            </div>
            <div className='flex-1 p-4 pb-10 bg-color-f_bg'>
              <div>
                <h5 className='text-base font-bold text-color-dark'>{orgnActive.name} 유사 기관</h5>
                <ul className='flex mt-4'>
                  {tempData7_2?.map((e, i) => {
                    let imgSrc = '';
                    if(e.relation === 0) {
                      imgSrc = img_building04;
                    } else if(e.relation === 1) {
                      imgSrc = img_building05;
                    } else if(e.relation === 2) {
                      imgSrc = img_building06;
                    } else if(e.relation === 3) {
                      imgSrc = img_building07;
                    } else if(e.relation === 4) {
                      imgSrc = img_building08;
                    } else if(e.relation === 5) {
                      imgSrc = img_building09;
                    }

                    return <li key={e.id} className='w-1/6 px-1'>
                      <div className={`img_wrap rounded-full w-15 h-15 mx-auto ${(i === 0) ? 'bg-color-light2' : 'bg-color-white'}`}>
                        <img src={imgSrc} alt='기관 이미지' className='w-11' />
                      </div>
                      <p className={`mt-1 text-sm text-center ${(i === 0) ? 'text-color-main' : 'text-color-dark'}`}>{e.name}</p>
                    </li>;
                  })}
                </ul>
              </div>
              <div className='mt-10'>
                <div className='flex items-center gap-5'>
                  <h5 className='text-base font-bold text-color-dark'>{orgnActive.name}</h5>
                  <div className='tab_btns tab_style05'>
                    <ul>
                      <li className='on'>
                        <button type='button' onClick={() => {}}>과제(83)</button>
                      </li>
                      <li>
                        <button type='button' onClick={() => {}}>특허(10)</button>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tempData7_3?.length > 0) 
                      ? tempData7_3?.map((e) => {
                        return (<>
                          <ListItem 
                            key={e.id}
                            tag={(e?.progress !== null) 
                              ? (e.progress) ? 1 : 2 
                              : ''}
                            title={e.title}
                            contents={<>
                              <div>
                                <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                                <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                              </div>
                              <div>
                                <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                                <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                              </div>
                              <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                            </>}
                            desc={<>
                              <a href={`${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</a>
                            </>}
                          />
                          <li key={e.id}>
                            <div className='flex justify-between gap-2'>
                              <div className='flex gap-2 flex-1'>
                                {/* 진행중: tag_style01 | 종료: tag_style02 */}
                                {(e?.progress !== null) 
                                  ? (e.progress) 
                                    ? <span className='tag_style01 mt-0.5'>진행중</span>
                                    : <span className='tag_style02 mt-0.5'>종료</span>
                                  : ''}
                                <p className='text-base font-bold text-color-dark flex-1'>{e.title}</p>
                              </div>
                              <a href={`${e.id}`} className='h-5 text-base font-bold text-color-footer'>더보기 ＋</a>
                            </div>
                            <div className='text_style01 mt-2'>
                              <div>
                                <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                                <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                              </div>
                              <div>
                                <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                                <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                                <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                              </div>
                              <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                            </div>
                          </li>
                        </>);
                      })
                      : <li>
                        <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                      </li>
                    }
                  </ul>
                </div>
                <div className='mt-10'>
                  <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
