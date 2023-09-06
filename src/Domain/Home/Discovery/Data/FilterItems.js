export const items = {
  'search/projectOut': {
    title: '국가R&D과제',
    filter: {
      resultYear: '기준연도',
      fund: '연구개발비',
      researchAgency: '연구개발기관',
      ministry: '부처명',
      technicalClassification: '국가과학기술표준분류',
    },
    selected: {
      resultYear: [],
      fund: [],
      researchAgency: [],
      ministry: [],
      technicalClassification: [],
    }
  },
  'search/projectIn': {
    title: 'IITP 과제',
    filter: {
      resultYear: '성과연도',
      fund: '연구개발비',
      researchAgency: '연구개발기관',
      ministry: '연구수행주체',
      technicalClassification: 'ICT 기술분류',
    },
    selected: {
      resultYear: [],
      fund: [],
      researchAgency: [],
      ministry: [],
      technicalClassification: [],
    }
  },
  'search/patent': {
    title: '특허',
    filter: {
      resultYear: '성과연도',
      registerType: '출원등록 구분',
      applicantName: '출원인',
      applType: '해외출원여부',
    },
    selected: {
      resultYear: [],
      registerType: [],
      applicantName: [],
      applType: [],
    }
  },
  'search/paper': {
    title: '논문',
    filter: {
      resultYear: '성과연도',
      paperType: '논문구분',
    },
    selected: {
      resultYear: [],
      paperType: [],
    }
  },
  'search/ict': {
    title: 'ICT자료',
    filter: {
      resultYear: '성과연도',
      source: '발행기관명',
    },
    selected: {
      resultYear: [],
      source: [],
    }
  },
  'search/policy': {
    title: '정부정책',
    filter: {
      resultYear: '발행연도',
      source: '출처명',
      ministry: '부처명',
    },
    selected: {
      resultYear: [],
      source: [],
      ministry: [],
    }
  },
  'search/indv': {
    title: '연구자',
    filter: {
      orgn: '재직기관',
    },
    selected: {
      orgn: [],
    }
  },
  'search/orgn': {
    title: '기관',
    filter: {
      orgnType: '기관유형',
      industry: '업종명',
      address: '지역',
    },
    selected: {
      orgnType: [],
      industry: [],
      address: [],
    }
  },
  'search/news': {
    title: '뉴스',
    filter: {
      resultYear: '기준연도',
      category: '주제별',
      source: '출처명',
    },
    selected: {
      resultYear: [],
      category: [],
      source: [],
    }
  },
};