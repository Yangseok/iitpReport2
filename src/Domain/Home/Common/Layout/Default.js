import React from 'react';
import ModalGlobalMsg from 'Domain/Home/Common/Componet/ModalGlobalMsg';
import LoadingGlobal from 'Domain/Home/Common/Componet/LoadingGlobal';

export default function Default({children}) {
  return (
    <>
      <LoadingGlobal />
      <ModalGlobalMsg />
      {children}
    </>
  );
}
