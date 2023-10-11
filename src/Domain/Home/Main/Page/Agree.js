import React from 'react';
import Layout from 'Domain/Home/Common/Layout/Sub';

export default function Agree () {
  return (
    <Layout>
      <section>
        <div className='container'>
          <h2 className='text-3xl text-color-dark font-bold text-center'>이용약관</h2>
          <div className='mt-10 p-6 bg-color-m_bg rounded-md'>
            <p className='text-sm'>
              이용약관 내용이 노출됩니다. <br/>
              이용약관 내용이 노출됩니다. <br/>
              이용약관 내용이 노출됩니다. <br/>
              이용약관 내용이 노출됩니다. <br/>
              이용약관 내용이 노출됩니다.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}