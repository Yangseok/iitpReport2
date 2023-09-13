import React, { useState } from 'react';
import Layout from 'Domain/Home/Common/Layout/Sub';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import ViewTable from 'Domain/Home/Common/Componet/ViewTable';

export default function DemandView() {
  const tempData = [
    [
      { content: '접수 ID', scope: 'row' },
      { content: '202100001866' },
      { content: '신청일 / 접수일', scope: 'row' },
      { content: '2023.04.01 / 2023.04.01' },
    ],
    [
      { content: '제안기술명', scope: 'row' },
      { content: 'EUV 패턴 마스크 고감도 검사를 위한 ‘마스크 to 마스크’ 인공지능 검사기술 개발', colspan: 3 },
    ],
    [
      { content: '추천 ICT 분류', scope: 'row' },
      { content: '1순위: 증강/혼합현실(AR/MR)    2순위: 증강/혼합현실(AR/MR)', colspan: 3 },
    ],
  ];

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '연구 개발 개요', onClick: () => setTabActive(1) },
  ];

  const [tabActive, setTabActive] = useState(0);

  return (
    <Layout>
      <section>
        <div className='container'>
          <div className="flex items-center gap-4">
            {/* 정기 : tag_style06 | 수시 : tag_style07 */}
            <p className="tag_style06">정기</p>
            <p className="text-sm text-color-regular">정보통신방송 연구개발사업 기술수요조사서 (2023.01.05 ~ 2023.03.30)</p>
          </div>
          <h2 className='text-xl font-bold text-color-dark mt-2'>초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발</h2>
          <div className='text_style01 mt-2'>
            <p className="text-sm text-color-regular">기관명: <span className="font-medium text-color-main">한국표준과학연구원</span></p>
            <p className="text-sm text-color-regular">신청인: <span className="font-medium text-color-main">홍길동</span></p>
            <p className="text-sm text-color-regular">등록 ICT 분류: <span className="font-medium text-color-main">증강/혼합현실(AR/MR)</span></p>
            <p className="text-sm text-color-regular">추천 ICT 분류: <span className="font-medium text-color-main">증강/혼합현실(AR/MR)</span></p>
          </div>
        </div>
      </section>
      <div className='section mt-8'>
        <div className='container'>
          <TabButtons style='4-3' tabs={tabButtons} active={tabActive} />
          {(tabActive === 0)
            ? // 기본 정보
            <ViewTable
              summary={'초실감 콘텐츠 제작용 버츄얼 스튜디오 기술 개발 기본 정보'}
              bodyData={tempData}
            />
            : // 연구 개발 개요
            <div className='p-6'>
              <p className='text-sm font-medium text-color-dark leading-loose break-keep'>
                - 필요성: 영상 비교방법은 패턴 웨이퍼나, PCB 등에서 많이 사용하는 방법이나, 포토마스크 검사에서는 광학적인 고배율이 필요하며 이로인해 매우 큰 데이터를 관리하며 처리해야 함. 특히, 고감도 검사를 위한 고배율 영상데이터는 주변의 미세한 검사 환경 변화에 의해, 데이터 왜곡이 발생하며, 이를 극복하는데 큰 비용을 필요로 함. 이러한 왜곡 대책을 인공지능 기술을 활용하여 극복할 수 있다면, 국외 기업과의 경쟁에서 가격적, 기술적 경쟁력을 확보 하여 불모지로 볼 수 있는 차세대 전공정 검사장비 분야에서 시장경쟁력을 가져갈 수 있음. <br/><br/>
                
                - 기존 기술 문제점: 국내에는 마스크 패턴 데이터를 비교하는 방식의 ‘다이 to 다이’ 방법과 ‘마스크 to 마스크’ 검사방법의 상용화 수준이 상대적으로 낮으며, 이 시장은 고감도 검사기술을 보유한 해외 선진 기업들이 점유했음. 또한 DUV에서 EUV로 노광 기술이 전환됨에 따라, 기존에 국내 기업에서 보유한 검사기술을 사용할 수 없게 되었음. 점차 EUV 기술이 보편화 됨에 따라 칩 메이커에서 요구하는 수준의 검사장비를 국내에서 제작하고 공급하기 위해서는 연구개발 지원을 통해 시장에서 요구하는 장비 공급시기와 성능을 만족하는 기술개발 및 장비 상용화가 필요함. <br/>
                ※ 국내 기존 검사기술: DUV 포토마스크 검사기술로, DUV용 기판이 투명하기 때문에 가능한, 복합적인 조명을 사용하여 패턴을 ‘삭제’ 하는 광학적 방법. EUV 포토마스크는 반사형 기판으로 조명 효과 기반의 검사기술을 구현할 수 없음. <br/><br/>
                
                - 산업동향: 최첨단 반도체 (AP, CPU, GPU)는 EUV를 주로 사용하여 반도체를 생산하고 있으며, 점차 적용되는 범위가 다른 응용 영역으로 확대(DRAM, AR/VR, AI 반도체, 자율주행용 반도체)됨과 동시에, 하나의 칩을 만드는 데 필요한 EUV 노광 공정 빈도 또한 증가하고 있음. 이에 생산 효율성을 높이기 위한 노력이 각 칩 메이커에서 이루어지고 있으며, 새로운 부품/소재의 도입이 확대됨과 함께 새로운 검사장비가 요구되고 있음. <br/><br/>
                
                o (시장현황) <br/>
                - EUV 패턴 마스크상의 이물 검출을 위한 마스크 to 마스크 검사기술 개발 <br/>
                - 국내 동향 <br/>
                1. 하나의 포토마스크에 동일한 여러 다이(칩 디자인)이 존재하는 경우의 고감도 검사를 위한 ‘다이 to 다이’ 검사기술이 검사장비 상용화를 앞두고 연구개발 되고 있음. <br/>
                2. 고성능 반도체 칩은 계속 커지고 있으며, 특히 AI 연구에 주로 사용하는 GPU 기반의 반도체는 하나의 포토마스크에 소수의 디자인만 존재함. 이 경우 ‘다이 to 다이’ 검사방법만으로 고감도 검사를 할 수 없어, 이러한 대형 반도체용 마스크 패턴 검사를 위한 기술개발이 필요함. <br/>
                - 국외 동향 <br/>
                1. 일본에서 EUV 패턴 마스크를 고감도로 검사할 수 있는 기술을 개발하고, 상용화함.
              </p>
            </div>}
        </div>
      </div>
    </Layout>
  );
}