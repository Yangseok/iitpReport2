import React from 'react';
import 'Assets/Css/Discovery.css';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import DiscoveryArea from 'Domain/Home/Discovery/Component/DiscoveryArea';

export default function Main() {
  return (
    <DiscoveryLayout>
      <section>
        <div className='container'>
          <DiscoveryArea />
        </div>
      </section>
    </DiscoveryLayout>
  );
}
