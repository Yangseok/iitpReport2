import React, { useState, useEffect } from 'react';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import { useDispatch } from 'react-redux';
import { setTmpSearchKeyword, setSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';

export default function RecommandKeyword(props) {

  const dispatch = useDispatch();

  const [isFetching, setIsFetching] = useState(true);
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await mainAPI.recommend();
      setKeyword(data?.data?.result);
      setIsFetching(false);
    })();
  }, []);

  const handleClick = keyword => {
    dispatch(setTmpSearchKeyword(keyword));
    dispatch(setSearchKeyword(keyword));
    const handleSearch = props?.handleSearch;
    if (handleSearch !== undefined) handleSearch();
  };

  if (isFetching) {
    return <span>키워드를 조회중입니다..</span>;
  }

  return (
    <>
      {keyword.map((keyword) => (
        <button key={keyword} onClick={() => handleClick(keyword)} type='button'>#{keyword}</button>
      ))}
    </>
  );
}
