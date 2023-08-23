import React from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Head';
import Tail from 'Domain/Home/Common/Componet/Tail';
// import Nav from 'Domain/Home/Common/Componet/Nav';

export default function Sub({children}) {
  return (
    <DefaultLayout>
      <Head className='hd_style02' />
      <div className='sec_wrap'>{children}</div>
      <Tail />
    </DefaultLayout>
  );
}
