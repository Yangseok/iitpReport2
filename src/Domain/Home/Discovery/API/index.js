import API from 'Utill/API';

export const searchAll = async (keyword='', size=4) => {
  return await API.get('/search/all', {params: {keyword: keyword, size: size}});
};
export const projectOut = async (
  type='search',
  size=10,
  page=1,
  keyword='',
  similarity=[],
  sort='date',
) => {
  let params = {
    type: type,
    size: size,
    page: page,
    keyword: keyword,
    similarity: similarity,
    sort: sort,
  };
  console.log(params);
  return await API.post('/search/projectOut', {params: params});
};

