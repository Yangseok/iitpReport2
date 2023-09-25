import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import CategoryButton from './CategoryButton';
import common from 'Utill';

export default function CategoryWrap(props) {
  const { tabCount, path, isSearchDetail, activeCount } = props;
  const navigate = useNavigate();
  const pathName = useLocation().pathname;
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [page, setPage] = useState('');

  useEffect(() => {
    const se = common.getSegment();
    const paramSe1 = se[1] ?? '';

    setPage(paramSe1);
    setTabButtons1([
      { id: 1, name: '과제', to:`${path}/projectout` },
      { id: 2, name: '특허', to:`${path}/patent` },
      { id: 3, name: '논문', to:`${path}/paper` },
      { id: 4, name: 'ICT 자료', to:`${path}/ict` },
      { id: 5, name: '정부정책', to:`${path}/policy` },
      { id: 6, name: '연구자', to:`${path}/researcher` },
      { id: 7, name: '기관', to:`${path}/orgn` },
      { id: 8, name: '뉴스', to:`${path}/news` },
    ]);
    setTabButtons2([
      { id: 0, name: '국가 R&D 과제', to:`${path}/projectout` },
      { id: 1, name: 'IITP 내부 과제', to:`${path}/projectin` },
    ]);
  }, [path]);

  useEffect(() => {
    tabButtons1?.forEach((e) => {
      if(e.to === pathName) {
        setTabActive1(e.id);
      }
    });
    tabButtons2?.forEach((e) => {
      if(e.to === pathName) {
        setTabActive1(1);
        setTabActive2(e.id);
      }
    });
  }, [navigate, tabButtons1, tabButtons2]);

  const getNum = useCallback((count, isActive) => {
    if (isSearchDetail === true) {
      if (!isActive) return 0;
      else return Number(activeCount);
    }
    return Number(count);
  }, [isSearchDetail, activeCount]);

  return (
    <>
      <div className={`category_wrap mb-10 ${(page === 'search') ? `grid0${tabButtons1.length + 1}` : `grid0${tabButtons1.length}`}`}>
        <ul>
          {(page === 'search')
            && <li className={`all${(tabActive1 === 0) ? ' on' : ''}`}>
              <CategoryButton type={0} name={'전체'} num={common.setPriceInput(getNum(tabCount?.all ?? 0, (tabActive1 === 0)))} onClick={() => (isSearchDetail === true) ? void(0) : navigate('/search/result/all', {state: {prevPath: pathName}})} />
            </li>}
          {tabButtons1?.map((e) => (
            <li key={e.id} className={(e.id === tabActive1) ? 'on' : ''}>
              <CategoryButton type={e.id} name={e.name} num={common.setPriceInput(getNum(tabCount?.[e.id] ?? 0, (e.id === tabActive1)))} onClick={() => (isSearchDetail === true) ? void(0) : navigate(e.to, {state: {prevPath: pathName}})} />
            </li>
          ))}
        </ul>
      </div>
      {(tabActive1 === 1)
        && <TabButtons style='2' tabs={tabButtons2} active={tabActive2} statusProps={true} />}
    </>
  );
}
