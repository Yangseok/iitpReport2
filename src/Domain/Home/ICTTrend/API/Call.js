import API from 'Utill/API';

// ICT 트렌드



/**
 * ICT 트렌드 서치집계
 * @param {string} category rnd_project, iitp_project, patent, paper, ict_report, policy, news
 * @param {string} label rnd_project, iitp_project, patent, paper, ict_report, policy, news
 * @param {string} keyword default 인공지능
 * @param {int} size 사이즈 
 * @param {string} startYear 그래프 종류가 wordCloud일 때 사용
 * @param {string} endYear 그래프 종류가 wordCloud일 때 사용
 * @param {string} year 그래프 종류가 trend일 때 사용(필수)
 * @param {string} firstYear 그래프 종류가 trend일 때 사용(필수) default:"N" 
 * @returns 
 */

export const ictSearchWordCloud = async (category, label, keyword, size, startYear, endYear, year, firstYear) => {

  let params = {
    category: !category ? 'all': category,
    label: label,
    keyword: !keyword ? '인공지능' : keyword,
    size:!size ? 10: size
  };
  

  if (label==='wordCloud') {
    params={...params, startYear, endYear};
  }

  if (label === 'trend') {
    params={...params, year, firstYear};
  }

  console.log('params',params);

  return await API.post('/ict/searchAggs', params);
};



/**
 * ICT 트렌드 검색결과 하단 리스트
 * @param {string} category rnd_project, iitp_project, patent, paper, ict_report, policy, news
 * @param {string} keyword default 인공지능
 * @param {int} size default 10
 * @param {int} page default 1
 * @returns 
 */

export const ictList = async (category, keyword, size, page) => {

  let params = {
    category: !category ? 'all': category,
    keyword: !keyword ? '인공지능' : keyword,
    size: !size ? 10 : size,
    page: !page ? 1 : page
  };

  return await API.post('/ict/list', params);
};


/**
 * ICT 트렌드 특허, 논문 성과 리스트
 * @param {string} category patent, paper
 * @param {string} appl 선택한 출원인 명
 * @param {string} keyword 키워드 명
 * @param {int} size default 10
 * @param {int} page default 1
 * @returns 
 */

export const ictPerformanceList = async (category, appl, keyword, size, page) => {
  
  let params = {
    category: category,
    appl: appl,
    size: !size ? 10 : size,
    page: !page ? 1 : page
  };

  if (keyword) {
    params={...params, keyword};
  }

  return await API.post('/ict/applList', params);
};


/**
 * ICT 트렌드 10대 이슈 키워드 
 * @param {string} year default 2023
 */

export const ictIssueKeyword = async (year) => {

  return await API.get('/ict/issueKeyword', { params: { year: year } });
};

/**
 * ICT 트렌드 10대 이슈 보고서 다운로드 
 * @param {string} year default 2023
 */

export const ictIssueReportDownload = async (year) => {
  return await API.get('/ict/issueDownload', { 
    params: {
      year: year
    },
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    },
    responseType: 'blob'
  });
};