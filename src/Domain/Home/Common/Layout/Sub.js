import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Base/Head';
import Tail from 'Domain/Home/Common/Componet/Base/Tail';
import Skip from '../Componet/Base/Skip';

export default function Sub({children}) {
  const pathName = useLocation().pathname;

  useEffect(() => {
    if(pathName === '/demandbanking') {
      document.querySelector('body').classList.add('min_w_1760');
    } else {
      document.querySelector('body').classList.remove('min_w_1760');
    }
  }, []);

  return (
    <DefaultLayout>
      <Skip />
      <Head className='hd_style02' />
      <div id='contentArea' className='sec_wrap'>{children}</div>
      <Tail />
    </DefaultLayout>
  );
}
