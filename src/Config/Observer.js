import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import common from 'Utill';
// import usePrevious from 'Utill/UsePrevious';
import { useSelector, useDispatch } from 'react-redux';
import { setFilterActive } from 'Domain/Home/Discovery/Status/DiscoverySlice';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';
import { getAccount } from 'Domain/Home/Common/Status/CommonSlice';
// import { setMsg, setShow } from 'Domain/Home/Common/Status/MsgSlice';

export default function Observer() {
  const dispatch = useDispatch();

  const account = useSelector(getAccount);

  const se = common.getSegment();
  const pageMove = (se[1] ?? '') + '/' + (se[2] ?? '');

  const navigate = useNavigate();
  // const location = useLocation();
  // const prevPath = usePrevious(location.pathname);

  useEffect(() => {
    const se = common.getSegment();
    const se1 = se[1] ?? '';
    const se2 = se[2] ?? '';
    const se3 = se[3] ?? '';
    const se4 = se[4] ?? '';
    if (se1 === 'discovery') {
      // console.log('se2 check=',['keyword','file','project'].indexOf(se2) === -1);
      // console.log('se3 check=',['','result'].indexOf(se3) === -1);
      // console.log('se4 check=',['','projectin','projectout','patent','paper','ict','policy','researcher','orgn','news'].indexOf(se4) === -1);
      if (
        ['keyword','file','project'].indexOf(se2) === -1
        || ['','result'].indexOf(se3) === -1
        || ['','projectin','projectout','patent','paper','ict','policy','researcher','orgn','news'].indexOf(se4) === -1
      ) {
        navigate('/error/404');
      }
    } else if (se1 === 'search') {
      if (
        ['','result'].indexOf(se2) === -1
        || ['','all','projectin','projectout','patent','paper','ict','policy','researcher','orgn','news'].indexOf(se3) === -1
      ) {
        navigate('/error/404');
      }
    } else if (se1 === 'login') {
      // const isLogin = account?.isLogin;
      // if (isLogin === true) {
      //   dispatch(setMsg({
      //     title: '알림',
      //     msg: '이미 로그인되어 있습니다.',
      //     btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
      //     btnTxt: ['확인'],
      //     btnEvent: ['close']
      //   }));
      //   dispatch(setShow(true));
      //   navigate('/');
      //   return null;
      // }
    }


  }, [account]);

  useEffect(() => {
    //필터 데이터 초기화
    dispatch(setFilterActive(items));
  }, [pageMove]);
  
  return (
    <></>
  );
}
