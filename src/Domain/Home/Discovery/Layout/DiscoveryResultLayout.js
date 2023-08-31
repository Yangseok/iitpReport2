import React from 'react';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import DiscoveryArea from 'Domain/Home/Discovery/Component/DiscoveryArea';
import CategoryWrap from 'Domain/Home/Discovery/Component/CategoryWrap';

export default function DiscoveryResultLayout({children}) {
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
            “<span className='text-color-main'>인공지능</span>”에 대한 분석 결과는 총 <span className='text-color-main'>10,300건</span> 입니다.
          </h3>
          <CategoryWrap />
        </div>
      </section>
      {children}
    </DiscoveryLayout>
  );
}
