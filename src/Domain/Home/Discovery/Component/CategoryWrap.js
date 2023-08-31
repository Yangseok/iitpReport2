import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import CategoryButton from './CategoryButton';
import common from 'Utill';

export default function CategoryWrap() {
  const locations = useLocation();
  const pathName = locations.pathname;
  const lctSearch = decodeURI(locations.search);
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [searchPage, setSearchPage] = useState(false);

  useEffect(() => {
    let tab1 = [], tab2 = [];
    const se = common.getSegment();
    const paramSe1 = se[1] ?? '';
    const paramSe2 = se[2] ?? '';

    if(paramSe1 === 'search') {
      tab1 = [
        { id: 1, name: '과제', to:`/search/result/projectout${lctSearch}` },
        { id: 2, name: '특허', to:`/search/result/patent${lctSearch}` },
        { id: 3, name: '논문', to:`/search/result/paper${lctSearch}` },
        { id: 4, name: 'ICT 자료', to:`/search/result/ict${lctSearch}` },
        { id: 5, name: '정부정책', to:`/search/result/policy${lctSearch}` },
        { id: 6, name: '연구자', to:`/search/result/researcher${lctSearch}` },
        { id: 7, name: '기관', to:`/search/result/orgn${lctSearch}` },
        { id: 8, name: '뉴스', to:`/search/result/news${lctSearch}` },
      ];
      tab2 = [
        { id: 0, name: '국가 R&D 과제', to:`/search/result/projectout${lctSearch}` },
        { id: 1, name: 'IITP 내부 과제', to:`/search/result/projectin${lctSearch}` },
      ];
      setSearchPage(true);
    } else {
      tab1 = [
        { id: 1, name: '과제', to:`/discovery/${paramSe2}/result/projectout${lctSearch}` },
        { id: 2, name: '특허', to:`/discovery/${paramSe2}/result/patent${lctSearch}` },
        { id: 3, name: '논문', to:`/discovery/${paramSe2}/result/paper${lctSearch}` },
        { id: 4, name: 'ICT 자료', to:`/discovery/${paramSe2}/result/ict${lctSearch}` },
        { id: 5, name: '정부정책', to:`/discovery/${paramSe2}/result/policy${lctSearch}` },
        { id: 6, name: '연구자', to:`/discovery/${paramSe2}/result/researcher${lctSearch}` },
        { id: 7, name: '기관', to:`/discovery/${paramSe2}/result/orgn${lctSearch}` },
        { id: 8, name: '뉴스', to:`/discovery/${paramSe2}/result/news${lctSearch}` },
      ];
      tab2 = [
        { id: 0, name: '국가 R&D 과제', to:`/discovery/${paramSe2}/result/projectout${lctSearch}` },
        { id: 1, name: 'IITP 내부 과제', to:`/discovery/${paramSe2}/result/projectin${lctSearch}` },
      ];
      setSearchPage(false);
    }

    setTabButtons1(tab1);
    setTabButtons2(tab2);
  }, [locations]);

  useEffect(() => {
    tabButtons1?.forEach((e) => {
      if(e.to === `${pathName}${lctSearch}`) {
        setTabActive1(e.id);
      }
    });
    tabButtons2?.forEach((e) => {
      if(e.to === `${pathName}${lctSearch}`) {
        setTabActive1(1);
        setTabActive2(e.id);
      }
    });
  }, [tabButtons1, tabButtons2]);

  return (
    <>
      <div className='category_wrap mb-10'>
        <ul>
          {(searchPage)
            && <li className={`all${(tabActive1 === 0) ? ' on' : ''}`}>
              <CategoryButton type={0} name={'전체'} num='100,300' onClick={() => location.href = '/search/result/all'} />
            </li>}
          {tabButtons1?.map((e) => (
            <li key={e.id} className={(e.id === tabActive1) ? 'on' : ''}>
              <CategoryButton type={e.id} name={e.name} num='100,300' onClick={() => location.href = e.to} />
            </li>
          ))}
        </ul>
      </div>
      {(tabActive1 === 1)
        && <TabButtons style='2' tabs={tabButtons2} active={tabActive2} />}
    </>
  );
}
