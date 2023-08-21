import React from 'react';
import Layout from 'Domain/Home/Common/Layout/Sub';
import Nav from 'Domain/Home/Sample/Component/Nav';

export default function Main({children}) {
  return (
    <Layout>
      <Nav />
      {children}
    </Layout>
  );
}
