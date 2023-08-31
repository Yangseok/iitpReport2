import React from 'react';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import DiscoveryArea from 'Domain/Home/Discovery/Component/DiscoveryArea';
import CategoryWrap from 'Domain/Home/Discovery/Component/CategoryWrap';
import common from 'Utill';

export default function DiscoveryResultLayout({children, totalCount, tabCount, keyword}) {
  return (
    <DiscoveryLayout>
      <section>
        <div className='container'>
          <DiscoveryArea page={'resultPage'} />
        </div>
      </section>
      <section className='mt-10'>
        <div className='container'>
          <h3 className='text-xl font-bold text-color-regular text-center mb-10'>
            “<span className='text-color-main'>{keyword}</span>”에 대한 분석 결과는 총 <span className='text-color-main'>{common.setPriceInput(totalCount ?? 0)}건</span> 입니다.
          </h3>
          <CategoryWrap tabCount={tabCount} />
        </div>
      </section>
      {children}
    </DiscoveryLayout>
  );
}
