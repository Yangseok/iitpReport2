import React, { useEffect, useState } from 'react';
import Button from './Button';
import { useNavigate, useLocation } from 'react-router-dom';

export default function TabButtons(props) {
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const { style, tabs, active = 0, statusProps } = props;
  const [tabClass, setTabClass] = useState('');

  useEffect(() => {
    if(style === '1') {
      setTabClass('tab_style01');
    } else if(style === '2') {
      const tab_length = tabs.length;
      setTabClass('tab_style02 grid0' + tab_length);
    } else if(style === '3') {
      setTabClass('tab_style03');
    } else if(style === '4-1') {
      setTabClass('tab_style04 grid_auto');
    } else if(style === '4-2') {
      const tab_length = tabs.length;
      setTabClass('tab_style04 grid0' + tab_length);
    } else if(style === '4-3') {
      setTabClass('tab_style04 grid_min');
    }
  }, [props]);

  return (
    <div className={['tab_btns', tabClass].join(' ')}>
      <ul>
        {tabs.map((e) => (
          <React.Fragment key={e.id}>
            <li className={(e.id == active) ? 'on' : ''}><Button name={e.name} onClick={(e?.to) ? () => navigate(e.to, (statusProps === true) ? {state: {prevPath: pathName}} : undefined) : e.onClick} /></li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
}
