import API from 'Utill/API';

//기관 검색
export const orgn = async (
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
    for (const key in filterParam) {
      params[key] = filterParam[key];
    }
  }
  if (searchParam != {}) {
    for (const key in searchParam) {
      params[key] = searchParam[key];
    }
  }
  if (etcParam != {}) {
    for (const key in etcParam) {
      params[key] = etcParam[key];
    }
  }
  return await API.post('/search/orgn', params);
};
//기관 검색
export const orgnDetail = async (id, size, page) => {
  return await API.get('/search/orgnDetail', {params: {id: id, size: size, page: page}});
};
//기관 상세페이지
export const orgnView = async (id) => {
  return await API.get('/view/orgn/' + id);
};
//기관 뉴스리스트
export const orgnNews = async (orgnName, size=5, page=1) => {
  return await API.get('/view/orgnNews', {params: {orgnName: orgnName, size: size, page: page}});
};