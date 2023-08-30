import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TabButtons from 'Domain/Home/Common/Componet/TabButtons';
import CategoryButton from './CategoryButton';
import common from 'Utill';

export default function CategoryWrap() {
  const pathName = useLocation().pathname;
  const [tabButtons1, setTabButtons1] = useState([]);
  const [tabButtons2, setTabButtons2] = useState([]);
  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);
  const [searchPage, setSearchPage] = useState(false);

  useEffect(() => {
    const se = common.getSegment();
    const paramSe1 = se[1] ?? '';
    const paramSe2 = se[2] ?? '';

    if(paramSe1 === 'search') {
      setSearchPage(true);
    } else {
      setSearchPage(false);
    }

    setTabButtons1([
      { id: 1, name: '과제', to:`/discovery/${paramSe2}/result/projectout` },
      { id: 2, name: '특허', to:`/discovery/${paramSe2}/result/patent` },
      { id: 3, name: '논문', to:`/discovery/${paramSe2}/result/paper` },
      { id: 4, name: 'ICT 자료', to:`/discovery/${paramSe2}/result/ict` },
      { id: 5, name: '정부정책', to:`/discovery/${paramSe2}/result/policy` },
      { id: 6, name: '연구자', to:`/discovery/${paramSe2}/result/researcher` },
      { id: 7, name: '기관', to:`/discovery/${paramSe2}/result/orgn` },
      { id: 8, name: '뉴스', to:`/discovery/${paramSe2}/result/news` },
    ]);
    setTabButtons2([
      { id: 0, name: '국가 R&D 과제', to:`/discovery/${paramSe2}/result/projectout` },
      { id: 1, name: 'IITP 내부 과제', to:`/discovery/${paramSe2}/result/projectin` },
    ]);
  }, []);

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
  }, [tabButtons1, tabButtons2]);

  return (
    <>
      <div className='category_wrap mb-10'>
        <ul>
          {(searchPage)
            && <li className={(tabActive1 === 0) ? 'on' : ''}>
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
