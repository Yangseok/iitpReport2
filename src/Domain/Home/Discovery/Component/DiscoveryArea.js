import React, { useEffect, useState } from 'react';
import 'Assets/Css/Discovery.css';
import ic_analysis from 'Assets/Images/ic_analysis.png';
import AutoCompleteSearch from 'Domain/Home/Common/Componet/AutoCompleteSearch';
import KeywordWrap from 'Domain/Home/Discovery/Component/Keyword/KeywordWrap';
import { useParams } from 'react-router-dom';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import { useSelector } from 'react-redux';
import { getSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import common from 'Utill';

export default function PageSearchArea(props) {
  const { page } = props;
  const params = useParams();
  const paramSe2 = params?.se2;
  const [menu, setMenu] = useState(0);
  const [keywordResult, setKeywordResult] = useState(false);
  
  const keyword = useSelector(getSearchKeyword);
  const [dataSearch, setDataSearch] = useState([]);

  useEffect(() => {
    const se = common.getSegment();
    const paramSe3 = se[3] ?? '';

    if(paramSe2) {
      if(paramSe2 === 'keyword') {
        setMenu(0);
        if(paramSe3 === 'result') {
          setKeywordResult(true);
        }
      } else if(paramSe2 === 'file') {
        setMenu(1);
      } else if(paramSe2 === 'project') {
        setMenu(2);
      }
    }
  }, []);

  useEffect(() => {
    (async () => {
      if(keyword !== '') {
        const data = await mainAPI.autocomplete(keyword);
        setDataSearch(data?.data?.result);
      }
    })();
  }, [keyword]);

  return (
    <>
      {(menu === 0) 
        ? <>
          {/* 키워드 분석 */}
          <AutoCompleteSearch 
            data={dataSearch}
            style={{ type: 2, name: '키워드 찾기', icon: ic_analysis }}
          />
          {(keywordResult) 
            && <KeywordWrap folded={(page === 'resultPage') ? true : ''} />}
        </>
        : (menu === 1)
          ? <>
            파일 분석
          </>
          :  (menu === 2)
            ? <>
              과제 정보 분석
            </>
            : ''
      }
    </>
  );
}
