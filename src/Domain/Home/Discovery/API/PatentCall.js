import API from 'Utill/API';

//특허검색
export const patent = async (
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
  return await API.post('/search/patent', params);
};
//특허 상세페이지
export const patentView = async (id) => {
  return await API.get('/view/patent/' + id);
};