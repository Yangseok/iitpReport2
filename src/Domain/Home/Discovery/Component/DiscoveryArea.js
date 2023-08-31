import React, { useEffect, useState } from 'react';
import ic_analysis from 'Assets/Images/ic_analysis.png';
import AutoCompleteSearch from 'Domain/Home/Common/Componet/AutoCompleteSearch';
import KeywordWrap from 'Domain/Home/Discovery/Component/Keyword/KeywordWrap';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchKeyword, setSearchKeywordReset } from 'Domain/Home/Common/Status/CommonSlice';
import common from 'Utill';
import { useParams, useNavigate } from 'react-router-dom';

export default function PageSearchArea(props) {
  const dispatch = useDispatch();

  const { page } = props;
  const params = useParams();
  const paramSe2 = params?.se2;
  const [menu, setMenu] = useState(0);
  const [keywordResult, setKeywordResult] = useState(false);
  
  const keyword = useSelector(getSearchKeyword);
  const [dataSearch, setDataSearch] = useState([]);

  const navigate = useNavigate();
  const se = common.getSegment();

  const handleSearch = () => {
    dispatch(setSearchKeywordReset(true));
    navigate('/discovery/' + paramSe2 + '/result?keyword=' + keyword);
  };

  const discoverySearchBttonClick = () => {
    navigate('/discovery/' + paramSe2 + '/result/projectout?keyword=' + keyword);
  };

  useEffect(() => {
    setKeywordResult(false);
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
  }, [se, paramSe2]);

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
            handleSearch={handleSearch}
            data={dataSearch}
            style={{ type: 2, name: '키워드 찾기', icon: ic_analysis }}
          />
          {(keywordResult) 
            && <KeywordWrap discoverySearchBttonClick={discoverySearchBttonClick} keyword={keyword} folded={(page === 'resultPage') ? true : ''} />}
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
