import React from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Head';
import Tail from 'Domain/Home/Common/Componet/Tail';
import Skip from '../Componet/Skip';

export default function Sub({children}) {
  return (
    <DefaultLayout>
      <Skip />
      <Head className='hd_style02' />
      <div id='contentArea' className='sec_wrap'>{children}</div>
      <Tail />
    </DefaultLayout>
  );
}
