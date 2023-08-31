import React from 'react';
import 'Assets/Css/Discovery.css';
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
      title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
      year: '2021',
      division: '학술지',
      agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
      name: '홍길동',
      journal: '한국게임학회논문지',
      link: '#',
    },
  ];

  return (
    <DiscoveryResultLayout>
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
              {(tempData?.length > 0) 
                ? tempData?.map((e) => {
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
          <div className='mt-10'>
            <Pagination total={50} page={1} onClick={(i) => console.log(i)} />
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}
