import API from 'Utill/API';

//수요뱅킹 전체 현황
export const surveyCount = async () => {
  return await API.get('/demand/surveyCount');
};
//수요뱅킹 공고 목록
export const noticeList = async (startYear,endYear,noticeType,progress,bigIct='',middleIct='',smallIct='',detailIct='',size=10,page=1) => {
  let params = {
    size: size,
    page: page,
    startYear: startYear,
    endYear: endYear,
    noticeType: noticeType,
    progress: progress,
    bigIct: bigIct,
    middleIct: middleIct,
    smallIct: smallIct,
    detailIct: detailIct,
  };
  return await API.post('/demand/noticeList', params);
};
//수요뱅킹 ICT 기술 분류
export const ictClass = async (type, code='') => {
  let params = {
    type: type,
    code: code,
  };
  return await API.get('/demand/ictClass', {params: params});
};
//수요뱅킹 접수서 목록 조회
export const surveyList = async (noticeId,startDate='',endDate='',bigIct='',middleIct='',smallIct='',detailIct='',orgnName='',applicant='',surveyTitle='',size=10,page=1) => {
  let params = {
    size: size,
    page: page,
    noticeId: noticeId,
    startDate: startDate,
    endDate: endDate,
    bigIct: bigIct,
    middleIct: middleIct,
    smallIct: smallIct,
    detailIct: detailIct,
    orgnName: orgnName,
    applicant: applicant,
    surveyTitle: surveyTitle,
  };
  return await API.post('/demand/surveyList', params);
};
//수요뱅킹 조회 목록 다운로드
export const surveyListDownload = async (noticeId) => {
  return await API.get('/demand/surveyListDownload', { 
    params: {
      noticeId: noticeId,
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/xlsx'
    },
    responseType: 'blob'
  });
};
//수요뱅킹 유사기술수요조사서 조회
export const similarSurvey = async (tap,noticeId,surveyId,size=10,page=1) => {
  let params = {
    size: size,
    page: page,
    tap: tap,
    noticeId: noticeId,
    surveyId: surveyId,
  };
  return await API.post('/demand/similarSurvey', params);
};
//수요뱅킹 병합 수요 목록 조회
export const mergedSurvey = async (mergedId,size=10,page=1) => {
  let params = {
    size: size,
    page: page,
    mergedId: mergedId,
  };
  return await API.get('/demand/mergedSurvey', {params: params});
};
//수요뱅킹 접수서 파일 분석
export const surveyFile = async (noticeId,surveyId,size=10,page=1) => {
  let params = {
    size: size,
    page: page,
    noticeId: noticeId,
    surveyId: surveyId,
  };
  return await API.get('/demand/surveyFile', {params: params});
};


