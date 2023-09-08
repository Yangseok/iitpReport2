import React, { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

export default function SiteMap(props) {
  const { nav, show, setShow } = props;
  const sitemapRef = useRef(null);

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

      // 모달 배경 클릭으로 모달 닫기
      $('#sitemap').on('click', function(e) {
        const modal = $(e.target).parents('#sitemap');
        if (modal.attr('id') !== 'sitemap') {
          setShow(false);
        }
      });

      // ESC 키로 모달 닫기
      $('#sitemap').on('keydown', function(e) {
        if (e.key === 'Escape') {
          setShow(false);
          $('#header .menu_btn').focus();
        }
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