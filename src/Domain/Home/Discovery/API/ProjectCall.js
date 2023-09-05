import API from 'Utill/API';

//과제 검색(외부)
export const projectOut = async (
  type='search', 
  size=10,
  page=1,
  keyword='',
  similarity=[],
  sort='date',
  filterParam={},
  searchParam={},
  etcParam={},
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
  if (etcParam != {}) {
    // console.log('etcParam', etcParam);
    for (const key in etcParam) {
      // console.log(key, etcParam[key]);
      params[key] = etcParam[key];
    }
  }
  // console.log('params', JSON.stringify(params));
  return await API.post('/search/projectOut', params);
};
//과제 검색(내부)
export const projectIn = async (
  type='search', 
  size=10,
  page=1,
  keyword='',
  similarity=[],
  sort='date',
  filterParam={},
  searchParam={},
  etcParam={},
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
  if (etcParam != {}) {
    // console.log('etcParam', etcParam);
    for (const key in etcParam) {
      // console.log(key, etcParam[key]);
      params[key] = etcParam[key];
    }
  }
  // console.log('params', JSON.stringify(params));
  return await API.post('/search/projectIn', params);
};
//과제 외부 상세페이지
export const projectOutView = async (id) => {
  return await API.get('/view/projectOut/' + id);
};
//과제 내부 상세페이지
export const projectInView = async (id) => {
  return await API.get('/view/projectIn/' + id);
};