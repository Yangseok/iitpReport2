import React, { useEffect, useState } from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Base/Head';
import Skip from '../Componet/Base/Skip';

export default function Main({children}) {
  const [headerClass, setHeaderClass] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if(window.scrollY > 50) {
        setHeaderClass('hd_style02');
      } else {
        setHeaderClass('');
      }
    });
  }, []);

  return (
    <DefaultLayout>
      <Skip />
      <Head className={headerClass} />
      <div id='contentArea'>{children}</div>
    </DefaultLayout>
  );
}
