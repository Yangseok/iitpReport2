import { useState, useEffect } from 'react';

import API, { promiseWrapper } from 'Utill/API';
export const recommend = async (keyword='main') => {
  return await API.get('/main/recommend', {params: {keyword: keyword}});
};
export const dataCount = async () => {
  return await API.get('/main/dataCount');
};
export const autocomplete = async (keyword='') => {
  return await API.get('/search/autocomplete', {params: {keyword: keyword}});
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