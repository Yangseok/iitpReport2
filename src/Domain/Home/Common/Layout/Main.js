import React from 'react';
import DefaultLayout from 'Domain/Home/Common/Layout/Default';
import Nav from 'Domain/Home/Common/Componet/Nav';

export default function Main({children}) {
  return (
    <DefaultLayout>
      <Nav />
      {children}
    </DefaultLayout>
  );
}
