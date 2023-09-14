import React, { useState } from 'react';
import PopupListLayout from 'Domain/Home/ICTTrend/Layout/PopupListLayout';
import PopupViewLayout from 'Domain/Home/ICTTrend/Layout/PopupViewLayout';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';

export default function PopupPaperView() {
  const tempData1 = [
    { id: 0, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 1, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 2, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 3, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 4, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 5, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 6, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 7, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 8, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
    { id: 9, title: '프로바이오틱 Pediococcus pentosaceus BCNU 9070 군주', people: '홍길동 외 1명' },
  ];
  const tempData2 = [
    [
      { content: '발행년도', scope: 'row' },
      { content: '2020.06.24' },
      { content: '논문 구분', scope: 'row' },
      { content: '국외전문학술지' },
    ],
    [
      { content: '학술지/학술대회명', scope: 'row' },
      { content: '***-**-**01*' },
      { content: '저자', scope: 'row' },
      { content: '이승섭, 엄기현, 조경은' },
    ],
    [
      { content: '소속기관', scope: 'row' },
      { content: '-' },
      { content: '언어', scope: 'row' },
      { content: '-' },
    ],
    [
      { content: '등록번호', scope: 'row' },
      { content: '10-2203135-0000' },
      { content: '등록일', scope: 'row' },
      { content: '2021.01.08' },
    ],
    [
      { content: '페이지', scope: 'row' },
      { content: '-' },
      { content: 'SCI 구분', scope: 'row' },
      { content: '비SCI' },
    ]
  ];

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '초록', onClick: () => setTabActive(1) },
  ];

  const [showView, setShowView] = useState(false);
  const [tabActive, setTabActive] = useState(0);

  return (
    <>
      {(!showView)
        ? <PopupListLayout
          title={'창원대학교 미생물학과 논문 목록'}
          recommendCnt={44}
          totalCnt={44}
          listData={tempData1}
          listClick={() => setShowView(true)}
        />
        : <PopupViewLayout
          tabStyle='4-3'
          tabs={tabButtons}
          active={tabActive}
          title={'인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계'}
          tags={<>
            <p className='text-sm font-medium text-color-regular'>논문(학술지)</p>
          </>}
          btnClick={() => setShowView(false)}
        >
          {(tabActive === 0)
            ? // 기본 정보
            <ViewTable
              summary={'인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계 기본 정보'}
              bodyData={tempData2}
            />
            : // 초록
            <div className='p-6'>
              <p className='text-sm font-medium text-color-dark leading-loose break-keep'>
                대부분의 디자이너는 3DS MAX와 같은 전문 3D 애니메이션 저작도구를 사용하여 수작업으로 애니메이션을 제작한다. 이 방법은 많은 시간과 노력을 필요로 하며, 애니메이션 캐릭터들이 서로 상호작용 할 수 없다. 이를 개선하기 위해, 본 논문에서는 3DS MAX플러그인 형태의 인공지능 미들웨어를 설계하고 미들웨어에 필요한 인공지능 표현 구조와 내부 처리 방안을 제안한다. 제안 방법은 캐릭터가 보유할 인공지능 요소를 도형과 선분으로 그려 표현하는 방법으로 캐릭터의 인공지능 구조를 제작한다. 실험을 위해 기존 방법과, 제안하는 방법을 사용하여 동일한 애니메이션을 제작하고 작업량을 측정하였다. 실험 결과 소규모 작업에서는 기존의 방법과 비슷하거나 작업량이 많으나, 대규모의 작업에서는 기존 방법에 비해 최대 43%의 작업량 감소를 확인하였다. 본 논문에서 제안하는 방법을 사용하면, 애니메이션에서 캐릭터간의 상호작용이 가능하며 작업량 감소 효과를 얻을 수 있다.
              </p>
            </div>
          }
        </PopupViewLayout>
      }
    </>
  );
}