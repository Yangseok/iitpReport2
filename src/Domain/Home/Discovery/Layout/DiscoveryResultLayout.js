import React, { useEffect, useState } from 'react';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import DiscoveryArea from 'Domain/Home/Discovery/Component/DiscoveryArea';
import SearchArea from 'Domain/Home/Discovery/Component/SearchArea';
import CategoryWrap from 'Domain/Home/Discovery/Component/CategoryWrap';
import common from 'Utill';
import WordClouds from 'Domain/Home/Common/Componet/Features/WordClouds';

export default function DiscoveryResultLayout({children, totalCount, tabCount, keyword, setSearchButtonClick}) {
  const [page1, setPage1] = useState('');
  const [page2, setPage2] = useState('');

  useEffect(() => {
    const se = common.getSegment();
    const paramSe1 = se[1] ?? '';
    const paramSe2 = se[2] ?? '';

    setPage1(paramSe1);
    setPage2(paramSe2);
  }, []);

  return (
    <DiscoveryLayout>
      {(page1 === 'discovery')
        ? <section>
          <div className='container'>
            <DiscoveryArea page={'resultPage'} setSearchButtonClick={setSearchButtonClick} />
          </div>
        </section>
        : <SearchArea page={'resultPage'} setSearchButtonClick={setSearchButtonClick} />
      }
      <section className='mt-10'>
        <div className='container'>
          <h3 className='text-xl font-bold text-color-regular text-center'>
            {(page2 === 'keyword')
              ? <>
                “<span className='text-color-main'>{keyword}</span>”에 대한 분석 결과는 총 <span className='text-color-main'>{common.setPriceInput(totalCount ?? 0)}건</span> 입니다.
              </>
              : (page2 === 'file')
                ? <>
                  업로드한 “<span className='text-color-main'>{'인공지능.docs'}</span>” 파일 분석 결과입니다.
                </>
                : <>
                  과제 정보 분석 결과는 총 <span className='text-color-main'>{common.setPriceInput(totalCount ?? 0)}건</span> 입니다.
                </>
            }
          </h3>
          {(page2 === 'file') 
            ? <div className='mt-5'>
              <WordClouds />
            </div> 
            : ''}
          <div className='mt-10'>
            <CategoryWrap tabCount={tabCount} />
          </div>
        </div>
      </section>
      {children}
    </DiscoveryLayout>
  );
}
