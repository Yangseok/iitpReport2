import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import common from 'Utill';

export default function Observer() {

  const navigate = useNavigate();

  useEffect(() => {
    const se = common.getSegment();
    const se1 = se[1] ?? '';
    if (se1 === 'discovery' || se1 === 'search') {
      const se2 = se[2] ?? '';
      const se3 = se[3] ?? '';
      const se4 = se[4] ?? '';
      if (
        ['keyword','file','project'].indexOf(se2) === -1
        || ['','result'].indexOf(se3) === -1
        || ['','projectin','projectout','patent','paper','ict','policy','researcher','orgn','news'].indexOf(se4) === -1
        || se2 !== 'keyword' && se4 === ''
      ) {
        navigate('/error/404');
      }
    }
  }, []);
  
  return (
    <></>
  );
}
