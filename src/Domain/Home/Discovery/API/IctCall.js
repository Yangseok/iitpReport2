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
  return await API.post('/search/ict', params);
};
//수요뱅킹 ICT 기술 분류
export const company3View = async (id, ictMajorCode='', ictMiddleCode='', ictSubCode='') => {
  return await API.get('/view/company3/' + id, {params: {ictMajorCode: ictMajorCode, ictMiddleCode: ictMiddleCode, ictSubCode: ictSubCode}});
};