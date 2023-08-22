import React from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Head';
import Tail from 'Domain/Home/Common/Componet/Tail';
// import Nav from 'Domain/Home/Common/Componet/Nav';

export default function Main({children}) {
  return (
    <DefaultLayout>
      <Head />
      {children}
      <Tail />
    </DefaultLayout>
  );
}
