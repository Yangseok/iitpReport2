import React from 'react';
import Observer from 'Config/Observer';
import ModalGlobalMsg from 'Domain/Home/Common/Componet/ModalGlobalMsg';
import LoadingGlobal from 'Domain/Home/Common/Componet/LoadingGlobal';

export default function Default({children}) {
  return (
    <>
      <Observer />
      <LoadingGlobal />
      <ModalGlobalMsg />
      {children}
    </>
  );
}
