import React, { useEffect, useState } from 'react';
import Button from './Button';

export default function TabButtons(props) {
  const { type } = props;
  const [tabClass, setTabClass] = useState('');

  useEffect(() => {
    const getTabClass = () => {
      if(type === '1') {
        setTabClass('tab_style01');
      } else if(type === '2') {
        setTabClass('tab_style02');
      } else if(type === '3') {
        setTabClass('tab_style03');
      }
    };
    return () => getTabClass();
  }, [props]);

  return (
    <div className={['tab_btns', tabClass].join(' ')}>
      <ul>
        <li className='on'><Button name='디스커버리 검색' /></li>
        <li><Button name='통합 검색' /></li>
      </ul>
    </div>
  );
}
