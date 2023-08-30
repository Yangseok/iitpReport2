import API from 'Utill/API';

//ICT 자료 검색
export const ict = async (
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
  return await API.post('/search/ict', params);
};
//수요뱅킹 ICT 기술 분류
export const company3View = async (id, ictMajorCode='', ictMiddleCode='', ictSubCode='') => {
  return await API.get('/view/company3/' + id, {params: {ictMajorCode: ictMajorCode, ictMiddleCode: ictMiddleCode, ictSubCode: ictSubCode}});
};