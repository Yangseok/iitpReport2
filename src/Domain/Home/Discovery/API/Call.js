import API, { multipartHeader } from 'Utill/API';

//통합검색
export const searchAll = async (keyword='', size=4) => {
  return await API.get('/search/all', {params: {keyword: keyword, size: size}});
};
//서브 검색 갯수
export const searchCount = async (type='search', keyword='', category='all') => {
  return await API.get('/search/count', {params: {type: type, keyword: keyword, category: category}});
};
//디스커버리 키워드 분석
export const discoveryKeyword = async (keyword='', selectKeyword='') => {
  let params = {keyword: keyword};
  if (selectKeyword !== '') {
    params['selectKeyword'] = selectKeyword;
  }
  return await API.get('/search/discovery', {params: params});
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
export const resultInfoView = async (id, type='projectOut', category='all', size=10, page=1, year='') => {
  let params = {type: type, id: id, category: category, size: size, page: page};
  if (year !== '') {
    params['year'] = year;
  }
  return await API.get('/view/resultInfo', {params: params});
};
//디스커버리 파일 분석
export const discoveryFile = async (formData) => {
  return await API.post('/search/file', formData, multipartHeader);
};


