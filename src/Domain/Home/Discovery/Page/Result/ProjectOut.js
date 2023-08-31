import React from 'react';
import ic_arrow from 'Assets/Images/ic_arrow02.png';
import ic_filter from 'Assets/Images/ic_filter.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import ListItem from 'Domain/Home/Common/Componet/ListItem';

export default function Result() {
  const tempData = [
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

  return (
    <DiscoveryResultLayout>
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              국가 R&D 과제 <span className='text-color-main'>50,150건</span>
            </h4>
            <div className='flex gap-4'>
              <Button className='gap-2 h-12 px-4 rounded text-sm font-bold btn_style04 mr-2' name='목록 다운로드' icon={ic_arrow} onClick={() => {}} />
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
              {(tempData?.length > 0) 
                ? tempData?.map((e) => {
                  return (
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
                  );
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
    </DiscoveryResultLayout>
  );
}
