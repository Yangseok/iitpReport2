import React, { useEffect, useState } from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Head';
import Tail from 'Domain/Home/Common/Componet/Tail';
import Skip from '../Componet/Skip';
import { useLocation } from 'react-router-dom';

export default function Sub({children}) {
  const [headerClass, setHeaderClass] = useState('');
  const [contentClass, setContentClass] = useState('sec_wrap');
  const pathName = useLocation().pathname;

  useEffect(() => {
    if(pathName === '/login') {
      window.addEventListener('scroll', () => {
        if(window.scrollY > 10) {
          setHeaderClass('hd_style02');
        } else {
          setHeaderClass('');
        }
      });

      setContentClass('login_wrap');
    } else {
      setHeaderClass('hd_style02');
      setContentClass('sec_wrap');
    }
  }, []);

  return (
    <DefaultLayout>
      <Skip />
      <Head className={headerClass} />
      <div id='mainContents' className={contentClass}>{children}</div>
      <Tail />
    </DefaultLayout>
  );
}
