import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

export default function SiteMap(props) {
  const { nav, show, setShow } = props;
  const sitemapRef = useRef(null);

  const handlePopupClose = () => {
    setShow(false);
    $('#header .menu_btn').focus();
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
    <div 
      id='sitemap'
      ref={sitemapRef}
      tabIndex={-1}
      onClick={(e) => (e.target.id === 'sitemap') && handlePopupClose()}
      onKeyDown={(e) => (e.key === 'Escape') && handlePopupClose()}
    >
      <div className='sitemap_wrap'>
        <div className='flex justify-end mb-4'>
          <button 
            type='button' 
            className='popup_close_btn' 
            onClick={handlePopupClose}>
          사이트맵 닫기
          </button>
        </div>
        <nav>
          <ul>
            {nav.map((e) => (
              <li key={e.id}>
                <p><strong>{e.name}</strong></p>
                {e.depth2.map((e2) => (
                  <NavLink key={e2.id} to={e2.to}>
                    {e2.name}
                  </NavLink>
                ))}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}