import { useState, useEffect } from 'react';
import API, { promiseWrapper } from 'Utill/API';

//추천 키워드
export const recommend = async (keyword='main') => {
  return await API.get('/main/recommend', {params: {keyword: keyword}});
};
//전체 데이터 현황
export const dataCount = async () => {
  return await API.get('/main/dataCount');
};
//자동완성
export const autocomplete = async (keyword='', size=7) => {
  return await API.get('/search/autocomplete', {params: {keyword: keyword, size: size}});
};

export const useGetData = (keyword='main') => {
  const [resource, setResource] = useState(null);

  useEffect(() => {
    const getData = async (keyword) => {
      const promise = API.get('/main/recommend', {params: {keyword: keyword}}).then((response) => response.data);
      setResource(promiseWrapper(promise));
    };

    getData();
  }, [keyword]);

  return resource;
};