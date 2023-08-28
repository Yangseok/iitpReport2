import React from 'react';
import 'Assets/Css/Discovery.css';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import AutoComplete from 'Domain/Home/Discovery/Component/AutoComplete';

export default function Discovery() {
  return (
    <DiscoveryLayout>
      {/* 키워드 찾기 */}
      <section>
        <div className='container'>
          <AutoComplete />
        </div>
      </section>
    </DiscoveryLayout>
  );
}
