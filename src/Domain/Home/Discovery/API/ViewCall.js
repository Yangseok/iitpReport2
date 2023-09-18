import API from 'Utill/API';

//기술수요조사서 전체 현황
export const company1View = async (id) => {
  return await API.get('/view/company1/' + id);
};
//수요뱅킹 공고 목록
export const company2View = async (id, type='all', size=10, page=1, ictMajorCode='', ictMiddleCode='', ictSubCode='') => {
  return await API.get('/view/company2/' + id, {params: {type: type, size: size, page: page, ictMajorCode: ictMajorCode, ictMiddleCode: ictMiddleCode, ictSubCode: ictSubCode}});
};
//수요뱅킹 조회
export const company4View = async (id, id2='', size=10, page=1) => {
  return await API.get('/view/company4/' + id, {params: {id: id2, size: size, page: page}});
};
//수요뱅킹 조회 목록 다운로드
export const company5View = async (id, id2='', size=10, page=1) => {
  return await API.get('/view/company5/' + id, {params: {id: id2, size: size, page: page}});
};
//유사기술수요조사서
export const company6View = async (id, id2='', type='') => {
  return await API.get('/view/company6/' + id, {params: {id: id2, type: type}});
};
//수요뱅킹 상세
export const surveyView = async (noticeId, surveyId) => {
  let params = {
    noticeId: noticeId,
    surveyId: surveyId,
  };
  return await API.get('/view/survey', {params: params});
};
