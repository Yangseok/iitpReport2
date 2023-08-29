import API, { multipartHeader } from 'Utill/API';

//통합검색
export const searchAll = async (keyword='', size=4) => {
  return await API.get('/search/all', {params: {keyword: keyword, size: size}});
};
//디스커버리 키워드 분석
export const discoveryKeyword = async (keyword='') => {
  return await API.get('/search/discovery', {params: {keyword: keyword}});
};
/**
 * 과제 성과정보 상세페이지
 * @param {int} id 
 * @param {string} type projectOut, projectIn, orgn, patent
 * @param {string} category 
 * @param {int} size 
 * @param {int} page 
 * @returns 
 */
export const resultInfoView = async (id, type='projectOut', category='all', size=10, page=1) => {
  return await API.get('/view/resultInfo', {params: {type: type, id: id, category: category, size: size, page: page}});
};
//디스커버리 파일 분석
export const discoveryFile = async (formData) => {
  return await API.post('/search/file', formData, multipartHeader);
};


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

//정부 정책 검색
export const policy = async (
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
  return await API.post('/search/policy', params);
};

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
  return await API.post('/search/researcher', params);
};

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
  return await API.post('/search/orgn', params);
};

//뉴스 검색
export const news = async (
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
  return await API.post('/search/news', params);
};