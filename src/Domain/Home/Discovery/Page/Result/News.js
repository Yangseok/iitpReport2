import React, { useState } from 'react';
import ic_arrow from 'Assets/Images/ic_arrow02.png';
import ic_filter from 'Assets/Images/ic_filter.png';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import Pagination from 'Domain/Home/Common/Componet/Pagination';
import WordClouds from 'Domain/Home/Common/Componet/Features/WordClouds';
import $ from 'jquery';

export default function DiscoveryResult() {
  const tempData = [
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
  ];

  const [newsActive, setNewsActive] = useState(null);

  // 뉴스 선택 시
  const onItemSlide = (e, id) => {
    if(e.currentTarget.nodeName !== 'BUTTON') {
      const pd = 20;
      const liEl = e.currentTarget;
      const contsEl = e.currentTarget.children[1];

      setNewsActive(id);
      $(e.currentTarget).siblings().find('.conts_box').css('height', 0);
      $(e.currentTarget).siblings().find('.conts_box').css('paddingBottom', 0);

      if(!liEl.classList.contains('on')) {
        liEl.classList.add('on');
        contsEl.style.height = `${contsEl.scrollHeight + pd}px`;
        contsEl.style.paddingBottom = `${pd}px`;
      } else {
        liEl.classList.remove('on');
        contsEl.style.height = 0;
        contsEl.style.paddingBottom = 0;
      }
    }
  };

  return (
    <DiscoveryResultLayout>
      <section className='mt-6'>
        <div className='container'>
          <div className='flex items-center justify-between'>
            <h4 className='text-base font-bold text-color-dark'>
              뉴스 <span className='text-color-main'>50,150건</span>
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

          <div className='list_style03 mt-2' id='newsList'>
            <ul>
              {(tempData?.length > 0)
                ? tempData?.map((e) => {
                  return (
                    <li 
                      key={e.id} 
                      className={(e.id === newsActive) ? 'on' : ''}
                      onClick={(event) => onItemSlide(event, e.id)} 
                      onKeyUp={(event) => (event.key === 'Enter') && onItemSlide(event, e.id)} 
                      role={'button'}
                      tabIndex={0}
                    >
                      <div className='tit_box flex items-center justify-between gap-4'>
                        <p className='flex-1 text-base font-bold text-color-dark'>{e.title}</p>
                        <div className='text_style01 flex items-center gap-4'>
                          <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보러가기↗</a>
                          <div>
                            <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                            <p className='text-sm text-color-regular'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                          </div>
                        </div>
                      </div>
                      <div className='conts_box'>
                        <WordClouds />
                      </div>
                    </li>
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
