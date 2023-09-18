import API from 'Utill/API';

//상세 페이지(수요뱅킹 상세)
export const surveyCount = async () => {
  return await API.get('/demand/surveyCount');
};
//수요뱅킹 전체 현황
//수요뱅킹 공고 목록
//수요뱅킹 ICT 기술 분류
//수요뱅킹 접수서 목록 조회
//수요뱅킹 조회 목록 다운로드
//수요뱅킹 유사기술수요조사서 조회
//수요뱅킹 병합 수요 목록 조회
//수요뱅킹 접수서 파일 분석

