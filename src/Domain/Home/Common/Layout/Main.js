import React from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Head from 'Domain/Home/Common/Componet/Head';
import Skip from '../Componet/Skip';

export default function Main({children}) {
  return (
    <DefaultLayout>
      <Skip />
      <Head />
      <div id='mainContents'>{children}</div>
    </DefaultLayout>
  );
}
