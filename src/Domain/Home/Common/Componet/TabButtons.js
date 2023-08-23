import React, { useEffect, useState } from 'react';
import Button from './Button';

export default function TabButtons(props) {
  const { style, tabs, active = 0 } = props;
  const [tabClass, setTabClass] = useState('');

  useEffect(() => {
    const getTabClass = () => {
      if(style === '1') {
        setTabClass('tab_style01');
      } else if(style === '2') {
        const tab_length = tabs.length;
        setTabClass('tab_style02 grid0' + tab_length);
      } else if(style === '3') {
        setTabClass('tab_style03');
      }
    };
    return () => getTabClass();
  }, [props]);

  return (
    <div className={['tab_btns', tabClass].join(' ')}>
      <ul>
        {tabs.map((e) => (
          <React.Fragment key={e.id}>
            <li className={(e.id == active) ? 'on' : ''}><Button name={e.name} onClick={e.onClick} /></li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
