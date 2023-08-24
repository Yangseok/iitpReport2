import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Head(props) {
  const { className } = props;
  const nav = [
    {to:'/discovery', name:'통합검색&디스커버리'},
    {to:'/demandbanking', name:'수요 뱅킹 서비스'},
    {to:'/icttrend', name:'ICT 트렌드'},
  ];

  return (
    <header id='header' className={className}>
      <div className='container'>
        <h1 className='logo'><NavLink to='/'>IITP</NavLink></h1>
        <div>
          <nav>
            <ul>
              {nav.map((e, i) => (
                <li key={i}>
                  <NavLink to={e.to}>
                    {e.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <ul className='right_menu'>
            <li>
              {/* 로그인시,
              <p>1234님</p>
               */}
              <NavLink to='/login'>Guest Login</NavLink>
            </li>
            <li><a href="#">Menu</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}
