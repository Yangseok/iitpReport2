import API from 'Utill/API';

export const recommend = async (keyword='main') => {
  return await API.get('/main/recommend', {params: {keyword: keyword}});
};
export const dataCount = async () => {
  return await API.get('/main/dataCount');
};
export const autocomplete = async (keyword='') => {
  return await API.get('/search/autocomplete', {params: {keyword: keyword}});
};

