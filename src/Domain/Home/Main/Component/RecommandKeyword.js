import React, { useState, useEffect } from 'react';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import { useDispatch } from 'react-redux';
import { setSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';

export default function RecommandKeyword() {

  const dispatch = useDispatch();

  const [isFetching, setFetching] = useState(true);
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    const recommend = async () => {
      const apiFn = async () => {
        const data = await mainAPI.recommend();
        // console.log(data?.data?.result);
        setKeyword(data?.data?.result);
      };
      await apiFn();
      setFetching(false);
    };

    return () => recommend();
  }, []);

  const handleClick = keyword => {
    // console.log(keyword);
    dispatch(setSearchKeyword(keyword));  
  };

  if (isFetching) {
    return <span>키워드를 조회중입니다..</span>;
  }

  return (
    <>
      {keyword.map((keyword, i) => (
        <button key={i} onClick={() => handleClick(keyword)} type='button'>#{keyword}</button>
      ))}
    </>
  );
}
