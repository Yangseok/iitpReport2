import React, { useCallback, useState } from 'react';
import { NavLink } from 'react-router-dom';
import SiteMap from './SiteMap';
import common from 'Utill';
import { useDispatch, useSelector } from 'react-redux';
import { getAccount, setAccount } from 'Domain/Home/Common/Status/CommonSlice';

export default function Head(props) {
  const dispatch = useDispatch();
  const account = useSelector(getAccount);

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
      to: '/icttrend/keyword', name: 'ICT 트렌드',
      depth2: [
        {to: '/icttrend/keyword', name: 'ICT 뉴스 트렌드'},
        {to: '/icttrend/technology', name: 'ICT 기술분류 트렌드'},
        {to: '/icttrend/issue', name: 'ICT 10대 이슈'},
      ],
    },
    {
      to: '/service', name: '서비스 소개',
      depth2: [
        {to: '/service', name: '서비스 가이드'},
      ],
    },
  ];

  const se = common.getSegment();
  const se1 = se[1] ?? '';

  const [sitemapShow, setSitemapShow] = useState(false);
  const [logoutShow, setLogoutShow] = useState(false);

  const handleLogout = useCallback((e) => {
    dispatch(setAccount({
      isLogin: false,
      id: '',
      accessToken: '',
      userName: '',
    }));
    e.preventDefault();
  }, []);

  return (
    <header id='header' className={className}>
      <div className='container'>
        <h1 className='logo'><NavLink to='/'>IITP</NavLink></h1>
        <div>
          <nav>
            <ul>
              {nav.map((e, i) => {
                let classOn = false;
                e.depth2.map((e2) => 
                  (e2.to.split('/')[1] === se1) ? classOn = true : false);
                
                if(i !== (nav.length - 1)) {
                  return <li 
                    key={i} 
                    className={classOn ? 'on' : ''}
                  >
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
              {((account?.isLogin ?? false) === true) 
                ? <>
                  <button type='button' onClick={() => setLogoutShow(state => !state)}>{account?.userName ?? ''}님</button>
                  {(logoutShow) 
                    ? <div className='logout_btn'>
                      <button type='button' onClick={handleLogout}>로그아웃</button>
                    </div>
                    : null}
                </>
                : <NavLink to='/login' className={'icon_btn ic_login'}>Guest Login</NavLink>
              }
            </li>
            <li>
              <button type='button' className='icon_btn ic_menu' onClick={() => setSitemapShow(true)}>Menu</button>
            </li>
          </ul>
        </div>
      </div>
      {(sitemapShow) ? <SiteMap nav={nav} show={sitemapShow} setShow={setSitemapShow} /> : ''}
    </header>
  );
}
