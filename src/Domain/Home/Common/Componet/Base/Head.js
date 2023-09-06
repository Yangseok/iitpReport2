import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SiteMap from './SiteMap';

export default function Head(props) {
  const { className } = props;
  const nav = [
    {
      to: '/discovery/keyword', name: '통합검색&디스커버리',
      depth2: [
        {to: '/discovery/keyword', name: '디스커버리'},
        {to: '/search', name: '통합검색'},
      ],
    },
    {
      to: '/demandbanking', name: '수요 뱅킹 서비스',
      depth2: [
        {to: '/demandbanking', name: '공고별 보기'},
      ],
    },
    {
      to: '/icttrend', name: 'ICT 트렌드',
      depth2: [
        {to: '/icttrend', name: 'ICT 뉴스 트렌드'},
        {to: '/icttrend', name: 'ICT 기술분류 트렌드'},
        {to: '/icttrend', name: 'ICT 10대 이슈'},
      ],
    },
    {
      to: '/service', name: '서비스 소개',
      depth2: [
        {to: '/service', name: '서비스 가이드'},
      ],
    },
  ];

  const [sitemapShow, setSitemapShow] = useState(false);

  return (
    <header id='header' className={className}>
      <div className='container'>
        <h1 className='logo'><NavLink to='/'>IITP</NavLink></h1>
        <div>
          <nav>
            <ul>
              {nav.map((e, i) => {
                if(i !== (nav.length - 1)) {
                  return <li key={i}>
                    <NavLink to={e.to}>
                      {e.name}
                    </NavLink>
                  </li>;
                }
              })}
            </ul>
          </nav>
          <ul className='right_menu'>
            <li>
              {/* 로그인시,
              <p>1234님</p>
               */}
              <NavLink to='/login'>Guest Login</NavLink>
            </li>
            <li>
              <button type='button' onClick={() => setSitemapShow(true)}>Menu</button>
            </li>
          </ul>
        </div>
      </div>
      {(sitemapShow) ? <SiteMap nav={nav} setShow={setSitemapShow} /> : ''}
    </header>
  );
}
