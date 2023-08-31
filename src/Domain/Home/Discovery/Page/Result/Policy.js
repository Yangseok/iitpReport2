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
      title: '싱가포르 인공지능 진출가이드 2023',
      source: '정보통신기획평가원',
      date: '2023.06.08',
      content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
    },
  ];

  return (
    <DiscoveryResultLayout>
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              정부정책 <span className='text-color-main'>100,300건</span>
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
                  return (<ListItem 
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
                  />);
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
