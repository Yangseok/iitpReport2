import React, { useState } from 'react';
import ViewLayout from 'Domain/Home/Discovery/Layout/ViewLayout';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import Button from 'Domain/Home/Common/Componet/Button';
import ViewTable from 'Domain/Home/Discovery/Component/ViewTable';

export default function View() {
  const tempData1 = [
    [
      { content: '출원일', scope: 'row' },
      { content: '2020.06.24' },
      { content: '출원인', scope: 'row' },
      { content: '행정안전부국립재난안전연구원' },
    ],
    [
      { content: '소속기관 사업자등록번호', scope: 'row' },
      { content: '*** - ** - **01*' },
      { content: '해외출원여부', scope: 'row' },
      { content: '국내출원' },
    ],
    [
      { content: '우선권 주장번호', scope: 'row' },
      { content: '-' },
      { content: '발명자', scope: 'row' },
      { content: '홍길동, 김영수, 김영희' },
    ],
    [
      { content: '등록번호', scope: 'row' },
      { content: '10-2203135-0000' },
      { content: '등록일', scope: 'row' },
      { content: '2021.01.08' },
    ],
    [
      { content: 'IPC 코드', scope: 'row' },
      { content: '-' },
      { content: '법적 상태', scope: 'row' },
      { content: '등록' },
    ],
    [
      { content: '기술이전 희망', scope: 'row' },
      { content: '-' },
      { content: '심사청구 여부/일자', scope: 'row' },
      { content: '-' },
    ],
    [
      { content: '심사청구 항수', scope: 'row' },
      { content: '-', colspan: 3 },
    ],
  ];
  // 데이터 5개씩 뿌려줌
  const tempData2 = [
    {
      id: 0,
      progress: '진행중',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];

  const tabButtons = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive(0) },
    { id: 1, name: '특허 요약', onClick: () => setTabActive(1) },
    { id: 2, name: '관련 과제', onClick: () => setTabActive(2) },
  ];

  const [tabActive, setTabActive] = useState(0);
  
  return (
    <ViewLayout 
      tabStyle='4-3'
      tabs={tabButtons}
      active={tabActive}
      title={'패션 소상공인을 위한 디지털 자산 기반 XR 협업 플랫폼 개발'}
      tags={<>
        <div className="flex items-center gap-4">
          {/* 진행중 : tag_style05 | 종료 : tag_style02 */}
          <p className="tag_style05">진행중</p>
          <p className="text-sm text-color-regular">출원번호: <span className="font-medium text-color-main">10-2020-0077142</span></p>
        </div>
      </>}
    >
      {(tabActive === 0)
        ? // 기본 정보
        <ViewTable
          summary={'패션 소상공인을 위한 디지털 자산 기반 XR 협업 플랫폼 개발 기본 정보'}
          bodyData={tempData1}
        />
        : (tabActive === 1)
          ? // 특허 요약
          <div className='p-6'>
            <p className='text-sm font-medium text-color-dark leading-loose break-keep'>
              본 발명은 드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템에 관한 것으로 보다 상세하게는 드론의 카메라 동영상 정보와 드론의 비행로그 정보를 기반으로한 학습데이터 셋 구축을 통해 인공지능 모델을 구축함으로써, 더욱 정확하고 객관적으로 재난 피해정보를 탐지할 수 있는 기술에 관한 것이다.본 발명의 일측면에 따르면, 드론을 이용한 인공지능 기반 재난 피해정보 탐지 시스템의 재난 피해정보 탐지 방법에 있어서, 드론으로부터 재난 지역의 동영상 정보를 전송받는 단계, 전송된 동영상 정보를 기설정된 인공지능(AI) 모델을 통해 재난 유형 및 재난 피해 영역을 판단하는 단계, 판단된 재난 유형 및 재난 피해 영역 정보를 영상지도로 제작하여 가시화하는 단계를 포함하며, 상기 인공지능(AI) 모델은, 드론의 비행 로그 정보와 동영상 메타 정보의 동기화에 기초한 복수의 학습데이터 셋을 통해 학습됨으로써 형성되는 것을 특징으로 한다.본 발명의 다른 측면에 따르면, 드론을 이용한 인공지능 기반 재난 피해정보 탐지 시스템에 있어서, 본체에 탑재된 카메라를 통해 재난 지역을 촬영한 동영상 메타 정보를 획득하고, 본체의 비행 로그 정보를 획득하는 드론 장치 및 상기 드론 장치와 무선 통신하여, 드론으로부터 재난 지역의 동영상 메타 정보 및 드론의 비행 로그 정보를 전송받으며, 기설정된 인공지능(AI) 모델을 통해 전송된 재난 지역의 동영상 정보에 따른 재난 유형 및 재난 피해 영역 정보를 판단하여, 사용자에게 가시화하여 제공하는 워크스테이션 장치;를 포함하여 구성되며, 상기 인공지능(AI) 모델은, 드론의 비행 로그 정보와 동영상 메타 정보의 동기화에 기초한 복수의 학습데이터 셋을 통해 학습됨으로써 형성되는 것을 특징으로 한다.
            </p>
          </div>
          : // 관련 과제
          <>
            <div className='pt-6 px-4'>
              <p className='text-base font-bold text-color-main'>과제(8)</p>
            </div>
            <div className='list_style01 mt-4'>
              <ul>
                {(tempData2?.length > 0) 
                  ? tempData2?.map((e) => {
                    {/* tag - 진행중 : 1 | 종료 : 2 */}
                    return (<ListItem 
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
                          <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                          <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                        </div>
                      </>}
                      btns={<>
                        <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
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