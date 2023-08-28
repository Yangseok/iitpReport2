import React, { useEffect, useState } from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Head';
import Tail from 'Domain/Home/Common/Componet/Tail';
import Skip from '../Componet/Skip';
import { useLocation } from 'react-router-dom';

export default function Sub({children}) {
  const [className, setClassName] = useState('sec_wrap');
  const pathName = useLocation().pathname;

  useEffect(() => {
    if(pathName === '/login') {
      setClassName('login_wrap');
    } else {
      setClassName('sec_wrap');
    }
  }, []);

  return (
    <DefaultLayout>
      <Skip />
      <Head className='hd_style02' />
      <div className={className}>{children}</div>
      <Tail />
    </DefaultLayout>
  );
}
