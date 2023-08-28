import React, { useEffect } from 'react';
import common from 'Utill';

export default function Observer() {

  useEffect(() => {
    const se = common.getSegment();
    const se1 = se[1] ?? '';
    if (se1 === 'discovery' || se1 === 'search') {
      const se2 = se[2] ?? '';
      const se3 = se[3] ?? '';
      const se4 = se[4] ?? '';
      let moveLocation = false;
      if (
        ['keyword','file','project'].indexOf(se2) === -1
        || ['','result'].indexOf(se3) === -1
        || ['','projectin','projectout','patent','paper','ict','policy','researcher','orgn','news'].indexOf(se4) === -1
      ) {
        moveLocation = true;
      }
      if (!moveLocation && se2 !== 'keyword' && se4 === '') {
        moveLocation = true;
      }
      if (moveLocation) {
        location.href = '/error/404';
      }
    }
  }, []);
  
  return (
    <></>
  );
}
