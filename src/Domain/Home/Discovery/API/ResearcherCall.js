import API from 'Utill/API';

//연구자 검색
export const researcher = async (
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
  return await API.post('/search/indv', params);
};


export const researcherDetail = async (id, size, page) => {
  return await API.get('/search/indvDetail', {params: {id: id, size: size, page: page}});
};