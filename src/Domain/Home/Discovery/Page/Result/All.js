import React from 'react';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';

export default function DiscoveryResult() {
  const tempData1 = [
    {
      id: 0,
      tab: '국가R&D',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발 개발 개발',
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
      tab: '국가R&D',
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
      id: 2,
      tab: 'IITP내부',
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
      id: 3,
      tab: 'IITP내부',
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
    {
      id: 1,
      title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
      project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
      division: '출원',
      num: '1020200077142',
      date: '2021.01.08',
      agency: '행정안전부국립재난안전연구원',
      name: '홍길동',
      link: '#',
    },
    {
      id: 2,
      title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
      project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
      division: '출원',
      num: '1020200077142',
      date: '2021.01.08',
      agency: '행정안전부국립재난안전연구원',
      name: '홍길동',
      link: '#',
    },
    {
      id: 3,
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
    {
      id: 1,
      title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
      year: '2021',
      division: '학술지',
      agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
      name: '홍길동',
      journal: '한국게임학회논문지',
      link: '#',
    },
    {
      id: 2,
      title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
      year: '2021',
      division: '학술지',
      agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
      name: '홍길동',
      journal: '한국게임학회논문지',
      link: '#',
    },
    {
      id: 3,
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
      link: '#',
      view: null,
    },
    {
      id: 1,
      title: '싱가포르 인공지능 진출가이드 2023',
      agency: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
      view: '#',
    },
    {
      id: 2,
      title: '싱가포르 인공지능 진출가이드 2023',
      agency: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
      view: null,
    },
    {
      id: 3,
      title: '싱가포르 인공지능 진출가이드 2023',
      agency: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
      view: '#',
    },
  ];
  const tempData5 = [
    {
      id: 0,
      title: '싱가포르 인공지능 진출가이드 2023',
      source: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
    },
    {
      id: 1,
      title: '싱가포르 인공지능 진출가이드 2023',
      source: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
    },
    {
      id: 2,
      title: '싱가포르 인공지능 진출가이드 2023',
      source: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
    },
    {
      id: 3,
      title: '싱가포르 인공지능 진출가이드 2023',
      source: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
      link: '#',
    },
  ];
  const tempData6 = [
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
    {
      id: 2,
      name: '장*탁',
      agency: '서울대학교',
      assign: '43',
      link: '#',
    },
    {
      id: 3,
      name: '장*탁',
      agency: '서울대학교',
      assign: '43',
      link: '#',
    },
  ];
  const tempData7 = [
    {
      id: 0,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '10',
      patent: '10',
      link: '#',
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
      link: '#',
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
      link: '#',
      institue: 'OOO연구소',
      safety: 1,
      sales: 25,
      followup: true,
    },
    {
      id: 3,
      name: '주식회사 마인즈랩(MINDS LAB., INC.)',
      assign: '10',
      patent: '10',
      link: '#',
      institue: null,
      safety: 2,
      sales: 10,
      followup: true,
    },
  ];
  const tempData8 = [
    {
      id: 0,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
    },
    {
      id: 1,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
    },
    {
      id: 2,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
    },
    {
      id: 3,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
    },
  ];

  return (
    <DiscoveryResultLayout>
      <section className='mt-6'>
        <div className='container'>
          <div className='list_wrap_style01'>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>과제</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData1?.length > 0)
                    ? tempData1?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.id} className='block'>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>[{e.tab}] {e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구 개발기간: <span className='font-medium text-color-main'>{e.date}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            <p className='text-sm text-color-regular line1_text'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                            <p className='text-sm text-color-regular line1_text'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular line1_text'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>특허</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData2?.length > 0)
                    ? tempData2?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.id} className='block'>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>논문</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData3?.length > 0)
                    ? tempData3?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.id} className='block'>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>발행년도: <span className='font-medium text-color-main'>{e.year}</span></p>
                            <p className='text-sm text-color-regular line1_text'>논문 구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular line1_text'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>주 저자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            <p className='text-sm text-color-regular line1_text'>학술지/학술대회명: <span className='font-medium text-color-main'>{e.journal}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>ICT 자료</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData4?.length > 0)
                    ? tempData4?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>발행기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>발행일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>정부정책</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData5?.length > 0)
                    ? tempData5?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                            <p className='text-sm text-color-regular line1_text'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>연구자</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData6?.length > 0)
                    ? tempData6?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.name} 연구자 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.name}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>기관</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData7?.length > 0)
                    ? tempData7?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.name} 기관 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.name}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                            <p className='text-sm text-color-regular line1_text'>특허: <span className='font-medium text-color-main'>{e.patent}건</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>뉴스</h4>
                <a href='#' className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(tempData8?.length > 0)
                    ? tempData8?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}
