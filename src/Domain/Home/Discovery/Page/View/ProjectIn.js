import React, { useState } from 'react';
import ViewLayout from 'Domain/Home/Discovery/Layout/ViewLayout';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Button from 'Domain/Home/Common/Componet/Button';
import ViewTable from 'Domain/Home/Discovery/Component/ViewTable';

export default function View() {
  const tempData1 = {
    ko: ['3D 데이터', '디지털 트윈', '지능형 데이터 가공 플랫폼', '깊이 추정', '멀티모달 센서'],
    en: ['3D Data', 'Digital Twin', 'AI Annotation Platform', 'Depth Estimation', 'Multi modal Sensor'],
  };
  const tempData2 = [
    [
      { content: '내역사업명', scope: 'row' },
      { content: '2022년도 중소기업기술혁신개발사업 `시장확대형(디지털융합과제)` 시행계획 공고', colspan: 3 },
    ],
    [
      { content: '연구 개발비', scope: 'row' },
      { content: '1,000,000,000원', colspan: 3 },
    ],
    [
      { content: '총 연구 기간', scope: 'row' },
      { content: '2023.04.01 ~ 2024.04.30' },
      { content: '당해연도 연구 기간', scope: 'row' },
      { content: '2023.04.01 ~ 2023.12.31' },
    ],
    [
      { content: '연구 개발기관', scope: 'row' },
      { content: '주식회사 오름' },
      { content: '연구 책임자', scope: 'row' },
      { content: '홍길동' },
    ],
    [
      { content: '지역', scope: 'row' },
      { content: '서울특별시 송파구' },
      { content: '연구 개발단계', scope: 'row' },
      { content: '-' },
    ],
    [
      { content: 'ICT 기술 분류', scope: 'row' },
      { content: 'ICT융합/ 기타ICT융합/ 기타ICT융합' },
      { content: '6T 관련 기술', scope: 'row' },
      { content: '-' },
    ],
  ];
  // 데이터 5개씩 뿌려줌
  const tempData3 = [
    {
      id: 0,
      title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
      year: '2021',
      division: '학술지',
      agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
      name: '홍길동',
      journal: '한국게임학회논문지',
    },
  ];
  const tempData4 = [
    {
      id: 0,
      title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
      division: '출원',
      num: '1020200077142',
      date: '2021.01.08',
      agency: '행정안전부국립재난안전연구원',
      name: '홍길동',
      link: '#',
    },
  ];

  const tabButtons1 = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive1(0) },
    { id: 1, name: '연구 목표', onClick: () => setTabActive1(1) },
    { id: 2, name: '연구 내용', onClick: () => setTabActive1(2) },
    { id: 3, name: '기대 효과', onClick: () => setTabActive1(3) },
    { id: 4, name: '성과 정보', onClick: () => setTabActive1(4) },
  ];
  const tabButtons2 = [
    { id: 0, name: '논문', cnt: 8, onClick: () => setTabActive2(0) },
    { id: 1, name: '특허', cnt: 5, onClick: () => setTabActive2(1) },
  ];

  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  
  return (
    <ViewLayout 
      tabs={tabButtons1}
      active={tabActive1}
      keywords={tempData1}
      title={'패션 소상공인을 위한 디지털 자산 기반 XR 협업 플랫폼 개발'}
      subTitle={'3D Data Collection, Pre-Processing and Annotation Platform Development  for AI-Training and Digital Twin'}
      tags={<>
        <div className="flex items-center gap-4">
          {/* 진행중 : tag_style05 | 종료 : tag_style02 */}
          <p className="tag_style05">진행중</p>
          <p className="text-sm text-color-regular line1_text">과제고유번호: <span className="font-medium text-color-main">1425165402</span></p>
        </div>
      </>}
    >
      {(tabActive1 === 0)
        ? <ViewTable
          summary={'패션 소상공인을 위한 디지털 자산 기반 XR 협업 플랫폼 개발 기본 정보'}
          bodyData={tempData2}
        />
        : (tabActive1 === 1)
          ? <div className='p-6'>
            <p className='text-sm font-medium text-color-dark leading-loose break-keep'>
              1. 연속 촬영 데이터 기반 3D 공간 생성 알고리즘 개발 - 시간 축 및 멀티모달 센서로 누적된 공간데이터 3D 맵핑 알고리즘 개발 - Depth Completion 알고리즘 최적화 - 깊이 추정 알고리즘 최적화 <br/>
              2. 3D 데이터 가공 플랫폼 개발 - 하이브리드 인프라 플랫폼 서버 구축 - 3D 데이터 가공 프로젝트 관리를 위한 플랫폼 작업 대쉬보드(Dashboard) 구현 - 플랫폼 내 사용자 역할 및 역할에 따른 권한 설정 기능 구현 - 가공 도구 페이지 UI 구현 <br/>
              3. 인공지능 학습을 위한 3D 데이터 가공 도구 개발(2단계) - 3D 공간에서 2D 영상 데이터를 가공하는 기능 추가 - 시간 축으로 누적된 3D 공간 데이터를 가공하는 기능 추가
            </p>
          </div>
          : (tabActive1 === 2)
            ? <div className='p-6'>
              <p className='text-sm font-medium text-color-dark leading-loose break-keep'>
                1. 연속 촬영 데이터 기반 3D 공간 생성 알고리즘 개발 - 3차원 지도 생성 및 다중 데이터 가공 수행을 위한 SLAM(Simultaneous localization and mapping) 알고리즘 연구 및 개발 - 2022년에 개발한 Depth Completion 알고리즘 및 깊이 추정 알고리즘 최적화 <br/>
                2. 3D 데이터 가공 플랫폼 개발 - On-premise GPU 자원과 클라우드 컴퓨팅 서비스를 활용한 하이브리드 인프라 플랫폼 서버 구축 - 3D 데이터 가공 프로젝트 관리를 위한 플랫폼 작업 대쉬보드 구현 (작업 생성, 분배, 조회, 수행, 진행률 확인, 삭제 등 전반적인 프로젝트 운영 가능) - 사용자 역할 설정(관리자, 검수자, 가공 작업자) 및 역할에 따른 권한 설정 기능 구현 - 웹 페이지 상에서 원활한 3D 데이터 가공 작업을 수행할 수 있는 가공 도구 페이지 UI 구현 <br/>
                3. 인공지능 학습을 위한 3D 데이터 가공 도구 개발(2단계) - 센서 간 왜곡 보정 및 위치 정합 알고리즘(캘리브레이션) 기술을 활용하여 3D 공간에서 2D 영상 데이터를 가공하는 기능 추가 - SLAM 알고리즘을 통해서 생성된 시간 축으로 누적된 3D 공간 데이터를 가공하는 기능 추가
              </p>
            </div>
            : (tabActive1 === 3)
              ? <div className='p-6'>
                <p className='text-sm font-medium text-color-dark leading-loose break-keep'>
                  3D 데이터는 다양한 센서(카메라, LiDAR, GPS 등)를 통해 획득되기 때문에, 센서 제조사 별 수집하는 방식 및 정책의 차이가 존재하여 이를 통합하여 데이터를 수집하는 것이 어려우며, 고품질 3D 데이터를 구축하기 위해서는 원천데이터의 전처리 작업이 필요하지만 기존의 도구들은 지원하는 기능이 극히 제한적이다. 본 과제를 수행함으로써 센서 제조사별로 상이한 수집 시스템 및 분산된 전처리 작업에 대해서 하나의 공통 포맷으로 통합하는 3D 데이터 수집 및 전처리를 수행할 수 있는, 정제된 데이터에 대해서 유의미한 3D 데이터를 가공 및 구축할 수 있는 파이프라인 플랫폼이 개발된다. 해당 플랫폼을 통해서, 멀티모달 센서를 필요로 하는 3차원 데이터 활용 및 멀티모달 3D 데이터 기반으로 새로운 연구 분야를 창출함으로써 3D 데이터 활용 생태계 구축이 가능하게 되며, 메타버스 환경 조성 및 이를 기반으로 융합 연구를 통해서 기존 업계가 활성화 됨으로써 3D 데이터 분야에 대한 경쟁력도 강화될 것이다.
                </p>
              </div>
              : <>
                <div className='tab_btns tab_style05 pt-6 px-4'>
                  <ul>
                    {tabButtons2?.map((e) => {
                      return <li key={e.id} className={(e.id === tabActive2) ? 'on' : ''}>
                        <button type='button' onClick={e.onClick}>{e.name}({e.cnt})</button>
                      </li>;
                    })}
                  </ul>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tabActive2 === 0)
                      ? (tempData3?.length > 0) 
                        ? tempData3?.map((e) => {
                          return (<ListItem 
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
                            </>}
                          />);
                        })
                        : <li>
                          <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                        </li>
                      : (tempData4?.length > 0) 
                        ? tempData4?.map((e) => {
                          return (<ListItem 
                            key={e.id}
                            title={e.title}
                            contents={<>
                              <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                              <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                              <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                              <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            </>}
                            btns={<>
                              <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                              <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                            </>}
                          />);
                        })
                        : <li>
                          <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                        </li>
                    }
                  </ul>
                </div>
                <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => {}} />
              </>
      }
    </ViewLayout>
  );
}