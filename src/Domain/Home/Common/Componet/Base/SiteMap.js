import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

export default function SiteMap(props) {
  const { nav, show, setShow } = props;
  const sitemapRef = useRef(null);

  const handlePopupClick = (e) => {
    if(e.target.id === 'sitemap') {
      setShow(false);
    }
  };
  const handlePopupKeyDown = (e) => {
    if (e.key === 'Escape') {
      setShow(false);
      $('#header .menu_btn').focus();
    }
  };

  useEffect(() => {
    if(show) {
      sitemapRef.current.focus();
    }
  }, [show]);

  useEffect(() => {
    const eventSettings = () => {
      // Shift 눌렀는지 확인
      let _shift = false;
      $(document).on('keydown',function(e){
        if(e.key === 'Shift') _shift = true;
      });
      $(document).on('keyup',function(e){
        if(e.key === 'Shift') _shift = false;
      });

      // 포커스 트랩: 모달 내에서 포커스가 빠져나가지 못하도록 설정
      $('#sitemap a').last().on('keydown', function(e) {
        if(e.key === 'Tab' && !_shift) {
          sitemapRef.current.focus();
          return false;
        }
      });
      $('#sitemap a').first().on('keydown', function(e) {
        if(e.key === 'Tab' && _shift) {
          $('#sitemap a').last().focus();
          return false;
        }
      });
    };

    return () => {
      eventSettings();
    };
  }, []);

  return (
    <>
      <div 
        id='sitemap'
        ref={sitemapRef}
        tabIndex={-1}
        onClick={handlePopupClick}
        onKeyDown={handlePopupKeyDown}
      >
        <nav>
          <ul>
            {nav.map((e, i) => (
              <li key={i}>
                <p><strong>{e.name}</strong></p>
                {e.depth2.map((e2, i2) => (
                  <NavLink key={i2} to={e2.to}>
                    {e2.name}
                  </NavLink>
                ))}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  );
}