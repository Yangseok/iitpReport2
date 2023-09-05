import API from 'Utill/API';

//논문검색
export const paper = async (
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
  return await API.post('/search/paper', params);
};
//논문 상세페이지
export const paperView = async (id) => {
  return await API.get('/view/paper/' + id);
};