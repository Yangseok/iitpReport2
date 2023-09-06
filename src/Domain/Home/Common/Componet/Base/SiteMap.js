import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import $ from 'jquery';

export default function SiteMap(props) {
  const { nav, setShow } = props;

  useEffect(() => {
    $('#sitemap').on('click', function(e) {
      const modal = $(e.target).parents('#sitemap');
      if (modal.attr('id') !== 'sitemap') {
        setShow(false);
      }
    });
  }, []);

  return (
    <>
      <div id='sitemap'>
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