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
  return await API.post('/search/indv', params);
};