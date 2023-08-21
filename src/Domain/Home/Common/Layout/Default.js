import React from 'react';
import ModalGlobalMsg from 'Domain/Home/Common/Componet/ModalGlobalMsg';

export default function Default({children}) {
  return (
    <>
      <ModalGlobalMsg />
      {children}
    </>
  );
}
