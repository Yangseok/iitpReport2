import React, { useEffect, useState } from 'react';

export default function LoadingGlobal() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(false);
  }, []);
  
  return (
    <div className={['loading_wrap', (show) ? 'show' : ''].join(' ')}>
      <i></i>
    </div>
  );
}
