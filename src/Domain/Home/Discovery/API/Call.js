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
  filterParam={},
  searchParam={},
) => {
  let params = {
    type: type,
    size: size,
    page: page,
    keyword: keyword,
    similarity: similarity,
    sort: sort,
  };
  if (filterParam != {}) {
    // console.log('filterParam', filterParam);
    for (const key in filterParam) {
      // console.log(key, filterParam[key]);
      params[key] = filterParam[key];
    }
  }
  if (searchParam != {}) {
    // console.log('searchParam', searchParam);
    for (const key in searchParam) {
      // console.log(key, searchParam[key]);
      params[key] = searchParam[key];
    }
  }
  // console.log('params', JSON.stringify(params));
  return await API.post('/search/projectOut', params);
};
export const projectIn = async (
  type='search', 
  size=10,
  page=1,
  keyword='',
  similarity=[],
  sort='date',
  filterParam={},
  searchParam={},
) => {
  let params = {
    type: type,
    size: size,
    page: page,
    keyword: keyword,
    similarity: similarity,
    sort: sort,
  };
  if (filterParam != {}) {
    // console.log('filterParam', filterParam);
    for (const key in filterParam) {
      // console.log(key, filterParam[key]);
      params[key] = filterParam[key];
    }
  }
  if (searchParam != {}) {
    // console.log('searchParam', searchParam);
    for (const key in searchParam) {
      // console.log(key, searchParam[key]);
      params[key] = searchParam[key];
    }
  }
  // console.log('params', JSON.stringify(params));
  return await API.post('/search/projectIn', params);
};
export const patent = async (keyword='') => {
  return await API.get('/search/patent', {params: {keyword: keyword}});
};
export const discovery = async (keyword='') => {
  return await API.get('/search/discovery', {params: {keyword: keyword}});
};

