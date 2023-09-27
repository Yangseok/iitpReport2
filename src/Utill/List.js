import * as projectAPI from 'Domain/Home/Discovery/API/ProjectCall';
import * as patentAPI from 'Domain/Home/Discovery/API/PatentCall';
import * as paperAPI from 'Domain/Home/Discovery/API/PaperCall';
import * as ictAPI from 'Domain/Home/Discovery/API/IctCall';
import * as policyAPI from 'Domain/Home/Discovery/API/PolicyCall';
import * as researcherAPI from 'Domain/Home/Discovery/API/ResearcherCall';
import * as orgnAPI from 'Domain/Home/Discovery/API/OrgnCall';
import * as newsAPI from 'Domain/Home/Discovery/API/NewsCall';
import parse from 'html-react-parser';
import common from 'Utill';

export const getTitle = (filterKey) => {
  let str = '';
  switch (filterKey) {
  case 'search/projectOut':
    str = '국가 R&D 과제';
    break;
  case 'search/projectIn':
    str = 'IITP 내부 과제';
    break;
  case 'search/patent':
    str = '특허';
    break;
  case 'search/paper':
    str = '논문';
    break;
  case 'search/ict':
    str = 'ICT 자료';
    break;
  case 'search/policy':
    str = '정부정책';
    break;
  case 'search/indv':
    str = '연구자';
    break;
  case 'search/orgn':
    str = '기관';
    break;
  case 'search/news':
    str = '뉴스';
    break;
  }
  return str;
};

export const getSortList = (filterKey, se1='') => {
  let obj = {};
  let type1 = {
    default: 'score',
    list: [{
      value: 'score',
      text: (se1 === 'search') ? '정확도순' : '관련도순',
    },{
      value: 'date',
      text: '최신순'
    }],
  };
  let type2 = {
    default: 'score',
    list: [{
      value: 'score',
      text: (se1 === 'search') ? '정확도순' : '관련도순',
    },{
      value: 'name',
      text: '이름순'
    }],
  };
  switch (filterKey) {
  case 'search/projectOut':
    obj = type1;
    break;
  case 'search/projectIn':
    obj = type1;
    break;
  case 'search/patent':
    obj = type1;
    break;
  case 'search/paper':
    obj = type1;
    break;
  case 'search/ict':
    obj = type1;
    break;
  case 'search/policy':
    obj = type1;
    break;
  case 'search/indv':
    obj = type2;
    break;
  case 'search/orgn':
    obj = type2;
    break;
  case 'search/news':
    obj = type1;
    break;
  }
  return obj;
};

export const getFilterObj = (filterKey, filterActive) => {
  let filterObj = {};
  switch (filterKey) {
  case 'search/projectOut':
    filterObj = {
      year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
      fund: (filterActive[filterKey]?.selected?.fund ?? []).join('|'),
      researchAgency: (filterActive[filterKey]?.selected?.researchAgency ?? []).join('|'),
      ministry: (filterActive[filterKey]?.selected?.ministry ?? []).join('|'),
      technicalClassification: (filterActive[filterKey]?.selected?.technicalClassification ?? []).join('|'),
    };
    break;
  case 'search/projectIn':
    filterObj = {
      year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
      fund: (filterActive[filterKey]?.selected?.fund ?? []).join('|'),
      researchAgency: (filterActive[filterKey]?.selected?.researchAgency ?? []).join('|'),
      ministry: (filterActive[filterKey]?.selected?.ministry ?? []).join('|'),
      technicalClassification: (filterActive[filterKey]?.selected?.technicalClassification ?? []).join('|'),
    };
    break;
  case 'search/patent':
    filterObj = {
      year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
      regType: (filterActive[filterKey]?.selected?.registerType ?? []).join('|'),
      applType: (filterActive[filterKey]?.selected?.applType ?? []).join('|'),
      applicant: (filterActive[filterKey]?.selected?.applicantName ?? []).join('|'),
    };
    break;
  case 'search/paper':
    filterObj = {
      year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
      paperType: (filterActive[filterKey]?.selected?.paperType ?? []).join('|'),
    };
    break;
  case 'search/ict':
    filterObj = {
      year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
      source: (filterActive[filterKey]?.selected?.source ?? []).join('|'),
    };
    break;
  case 'search/policy':
    filterObj = {
      year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
      source: (filterActive[filterKey]?.selected?.source ?? []).join('|'),
      ministry: (filterActive[filterKey]?.selected?.ministry ?? []).join('|'),
    };
    break;
  case 'search/indv':
    filterObj = {
      orgn: (filterActive[filterKey]?.selected?.orgn ?? []).join('|'),
    };
    break;
  case 'search/orgn':
    filterObj = {
      orgnType: (filterActive[filterKey]?.selected?.orgnType ?? []).join('|'),
      industry: (filterActive[filterKey]?.selected?.industry ?? []).join('|'),
      address: (filterActive[filterKey]?.selected?.address ?? []).join('|'),
    };
    break;
  case 'search/news':
    filterObj = {
      year: (filterActive[filterKey]?.selected?.resultYear ?? []).join('|'),
      newsCategory: (filterActive[filterKey]?.selected?.category ?? []).join('|'),
      source: (filterActive[filterKey]?.selected?.source ?? []).join('|'),
    };
    break;
  }
  return filterObj;
};

export const procSimilarity = (selectedData) => {
  let selectKeyword = [];
  try {
    for (const k in selectedData) {
      const list = selectedData[k].list;
      for (const kk in list) {
        selectKeyword.push(list[kk].similarity);
      }
    }
  } catch (e) {
    console.warn(e);
  }
  return selectKeyword;
};

export const callListAPI = async (filterKey, se1, se2, globalSearchDetailData, searchDetailKey, selectKeyword, size, page, keyword, fileKeywordList, sort, filterObj, etcParam={}) => {
  let searchParam = {};
  let data = [];
  let similarity = [];
  let apiMethod;
  switch (filterKey) {
  case 'search/projectOut':
    apiMethod = projectAPI.projectOut;
    break;
  case 'search/projectIn':
    apiMethod = projectAPI.projectIn;
    break;
  case 'search/patent':
    apiMethod = patentAPI.patent;
    break;
  case 'search/paper':
    apiMethod = paperAPI.paper;
    break;
  case 'search/ict':
    apiMethod = ictAPI.ict;
    break;
  case 'search/policy':
    apiMethod = policyAPI.policy;
    break;
  case 'search/indv':
    apiMethod = researcherAPI.researcher;
    break;
  case 'search/orgn':
    apiMethod = orgnAPI.orgn;
    break;
  case 'search/news':
    apiMethod = newsAPI.news;
    break;
  }

  if (se1 == 'search') {
    searchParam = globalSearchDetailData[searchDetailKey];
    data = await apiMethod('search',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
  } else if (se1 == 'discovery') {
    if (se2 == 'keyword') {
      similarity = procSimilarity(selectKeyword);
      similarity = [{keyword: keyword, weight: 1}, ...similarity];
      data = await apiMethod('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
    } else if (se2 == 'file') {
      similarity = fileKeywordList;
      data = await apiMethod('discovery',size,page,'',similarity,sort,filterObj,searchParam,etcParam);
    } else if (se2 == 'project') {
      data = await apiMethod('discovery',size,page,keyword,similarity,sort,filterObj,searchParam,etcParam);
    }
  } else if (se1 === 'demandbanking') {
    // console.log('demandbanking selectKeyword:', selectKeyword);
    similarity = selectKeyword;
    data = await apiMethod('discovery',size,page,'',similarity,sort,filterObj,searchParam,etcParam);
  }

  return data;
};

export const getProcData = (filterKey, dataList) => {
  let procData = [];

  switch (filterKey) {
  case 'search/projectOut':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const period = dataList?.[i]?.period ?? '';
      const periodArr = period.split('~');
      const division = dataList?.[i]?.technicalClassification ?? [];
      const keywordt = dataList?.[i]?.keywords ?? [];
      const pushData = {
        id: dataList?.[i]?.projectNumber ?? i,
        tag : ((periodArr?.[1]??'').replaceAll(' ','') === '9999-12-31') ? 1 : 2,
        title: parse(dataList?.[i]?.title ?? ''),
        price: common.setPriceInput(dataList?.[i]?.fund ?? '') + '원',
        period: period.replaceAll('-','.'), 
        agency: parse(dataList?.[i]?.researchAgencyName ?? ''),
        name: parse(dataList?.[i]?.researchManagerName ?? ''),
        department: parse(dataList?.[i]?.orderAgencyName ?? ''),
        performance: dataList?.[i]?.performance ?? '',
        division: division.join(' / '),
        keyword: keywordt.join(', '),
      };
      procData.push(pushData);
    }
    break;
  case 'search/projectIn':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const period = dataList?.[i]?.period ?? '';
      const periodArr = period.split('~');
      const keywordt = dataList?.[i]?.keywords ?? [];
      const pushData = {
        id: dataList?.[i]?.projectNumber ?? i,
        tag : ((periodArr?.[1]??'').replaceAll(' ','') === '9999-12-31') ? 1 : 2,
        title: parse(dataList?.[i]?.title ?? ''),
        price: common.setPriceInput(dataList?.[i]?.fund ?? '') + '원',
        period: period.replaceAll('-','.'), 
        agency: parse(dataList?.[i]?.researchAgencyName ?? ''),
        name: parse(dataList?.[i]?.researchManagerName ?? ''),
        ict: common.joinArrNStr(dataList?.[i]?.technicalClassification ?? [],', ',''),
        keyword: keywordt.join(', '),
      };
      procData.push(pushData);
    }
    break;
  case 'search/patent':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const agency = dataList?.[i]?.applicantName ?? [];
      const name = dataList?.[i]?.inventorName ?? [];
      const date = dataList?.[i]?.applDate ?? '';
      const pushData = {
        id: common.deHighlight(dataList?.[i]?.applNumber ?? i),
        title: parse(dataList?.[i]?.title ?? ''),
        project: parse(dataList?.[i]?.projectName ?? ''),
        division: dataList?.[i]?.type ?? '',
        num: parse(dataList?.[i]?.applNumber ?? ''),
        date: date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
        agency: agency.join(', '),
        name: name.join(', '),
      };
      procData.push(pushData);
    }
    break;
  case 'search/paper':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const agency = dataList?.[i]?.affiliation ?? [];
      const name = dataList?.[i]?.author ?? [];
      const pushData = {
        id: dataList?.[i]?.id ?? i,
        title: parse(dataList?.[i]?.title ?? ''),
        year: dataList?.[i]?.year ?? '',
        division: dataList?.[i]?.type ?? '',
        agency: agency.join(', '),
        name: name.join(', '),
        journal: parse(dataList?.[i]?.journalTitle ?? ''),
        link: dataList?.[i]?.link ?? '',
      };
      procData.push(pushData);
    }
    break;
  case 'search/ict':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const pushData = {
        id: dataList?.[i]?.applNumber ?? i,
        title: parse(dataList?.[i]?.title ?? ''),
        content: parse(dataList?.[i]?.contents ?? ''),
        date: (dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
        agency: parse(dataList?.[i]?.source ?? ''),
        link: dataList?.[i]?.link ?? '',
        view: dataList?.[i]?.view ?? '',
      };
      procData.push(pushData);
    }
    break;
  case 'search/policy':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const date = dataList?.[i]?.publishedDate ?? '';
      const dateArr = date.split(' ');
      const pushData = {
        id: dataList?.[i]?.applNumber ?? i,
        title: parse(dataList?.[i]?.title ?? ''),
        content: dataList?.[i]?.contents ?? '',
        source: parse(dataList?.[i]?.source ?? ''),
        date: (dateArr[0] ?? '').replaceAll('-','.'),
        link: dataList?.[i]?.link ?? '',
      };
      procData.push(pushData);
    }
    break;
  case 'search/indv':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      let link = dataList?.[i]?.link ?? '#';
      if (link !== '#') link = 'https://' + link;
      const pushData = {
        id: dataList?.[i]?.id ?? i,
        name: common.maskingName(dataList?.[i]?.indvName ?? ''),
        agency: dataList?.[i]?.orgn ?? '',
        assign: dataList?.[i]?.projectCount ?? 0,
        link: link,
      };
      procData.push(pushData);
    }
    break;
  case 'search/orgn':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const pushData = {
        id: dataList?.[i]?.id ?? i,
        name: parse(dataList?.[i]?.orgnName ?? ''),
        assign: dataList?.[i]?.projectCount ?? 0,
        patent: dataList?.[i]?.patentCount ?? 0,
        institue: dataList?.[i]?.researchInstitute ?? '',
        safety: [2,0,1][i%3],
        sales: dataList?.[i]?.topRankSales ?? '',
        followup: dataList?.[i]?.orgnVigilance ?? false,
      };
      procData.push(pushData);
    }
    break;
  case 'search/news':
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const date = dataList?.[i]?.publishedDate ?? '';
      const dateArr = date.split(' ');
      const pushData = {
        id: i,
        title: parse(dataList?.[i]?.title ?? ''),
        content: dataList?.[i]?.contents ?? '',
        source: parse(dataList?.[i]?.source ?? ''),
        date: (dateArr[0] ?? '').replaceAll('-','.'),
        link: dataList?.[i]?.link ?? '',
        wordCloud: dataList?.[i]?.similarity ?? [],
      };
      procData.push(pushData);
    }
    break;
  }
  return procData;
};

export const getExcelProcData = (filterKey, dataList) => {
  let data = [];
  let title = [];

  switch (filterKey) {
  case 'search/projectOut':
    title = ['과제명', '총연구개발비', '총연구개발기간', '주관연구개발기관', '연구책임자', '부처명', '연구개발성과', '국가과학기술표준분류', '한글 키워드'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const period = dataList?.[i]?.period ?? '';
      const division = dataList?.[i]?.technicalClassification ?? [];
      const keywordt = dataList?.[i]?.keywords ?? [];
      data.push([
        common.deHighlight(dataList?.[i]?.title ?? ''),
        common.setPriceInput(dataList?.[i]?.fund ?? '') + '원',
        period.replaceAll('-','.'),
        common.deHighlight(dataList?.[i]?.researchAgencyName ?? ''),
        common.deHighlight(dataList?.[i]?.researchManagerName ?? ''),
        common.deHighlight(dataList?.[i]?.orderAgencyName ?? ''),
        dataList?.[i]?.performance ?? '',
        division.join(', '),
        keywordt.join(', '),
      ]);
    }
    break;
  case 'search/projectIn':
    title = ['과제명', '총연구개발비', '총연구개발기간', '주관연구개발기관', '연구책임자', 'ICT 기술분류', '한글 키워드'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const period = dataList?.[i]?.period ?? '';
      const keywordt = dataList?.[i]?.keywords ?? [];
      data.push([
        common.deHighlight(dataList?.[i]?.title ?? ''),
        common.setPriceInput(dataList?.[i]?.fund ?? '') + '원',
        period.replaceAll('-','.'),
        common.deHighlight(dataList?.[i]?.researchAgencyName ?? ''),
        common.deHighlight(dataList?.[i]?.researchManagerName ?? ''),
        common.joinArrNStr(dataList?.[i]?.technicalClassification ?? [],', ',''),
        keywordt.join(', '),
      ]);
    }
    break;
  case 'search/patent':
    title = ['과제명', '유발 과제', '출원등록구분', '출원(등록)번호', '출원(등록)일', '출원(등록)인', '발명자'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const agency = dataList?.[i]?.applicantName ?? [];
      const name = dataList?.[i]?.inventorName ?? [];
      const date = dataList?.[i]?.applDate ?? '';
      data.push([
        common.deHighlight(dataList?.[i]?.title ?? ''),
        common.deHighlight(dataList?.[i]?.projectName ?? ''),
        dataList?.[i]?.type ?? '',
        common.deHighlight(dataList?.[i]?.applNumber ?? ''),
        date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
        agency.join(', '),
        name.join(', '),
      ]);
    }
    break;
  case 'search/paper':
    title = ['논문명', '발행년도', '논문 구분', '소속기관', '주 저자', '학술지/학술대회명'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const agency = dataList?.[i]?.affiliation ?? [];
      const name = dataList?.[i]?.author ?? [];
      data.push([
        common.deHighlight(dataList?.[i]?.title ?? ''),
        dataList?.[i]?.year ?? '',
        dataList?.[i]?.type ?? '',
        agency.join(', '),
        name.join(', '),
        common.deHighlight(dataList?.[i]?.journalTitle ?? ''),
      ]);
    }
    break;
  case 'search/ict':
    title = ['ICT 자료명', '출처', '본문', '발행일'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      data.push([
        common.deHighlight(dataList?.[i]?.title ?? ''),
        common.deHighlight(dataList?.[i]?.source ?? ''),
        common.deHighlight(dataList?.[i]?.contents ?? ''),
        (dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
      ]);
    }
    break;
  case 'search/policy':
    title = ['정부 정책 자료명', '출처', '작성일', '본문'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const date = dataList?.[i]?.publishedDate ?? '';
      const dateArr = date.split(' ');
      data.push([
        common.deHighlight(dataList?.[i]?.title ?? ''),
        common.deHighlight(dataList?.[i]?.source ?? ''),
        (dateArr[0] ?? '').replaceAll('-','.'),
        common.deHighlight(dataList?.[i]?.contents ?? ''),
      ]);
    }
    break;
  case 'search/indv':
    title = ['ICT 자료명', '출처', '본문', '발행일'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      data.push([
        dataList?.[i]?.title ?? '',
        dataList?.[i]?.source ?? '',
        dataList?.[i]?.contents ?? '',
        (dataList?.[i]?.publishedDate ?? '').replaceAll('-','.'),
      ]);
    }
    break;
  case 'search/orgn':
    title = ['기관명', '과제갯수', '특허갯수', '사후관리대상기업', '매출상위(%)'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      data.push([
        common.deHighlight(dataList?.[i]?.orgnName ?? ''),
        dataList?.[i]?.projectCount ?? 0,
        dataList?.[i]?.patentCount ?? 0,
        (dataList?.[i]?.orgnVigilance ?? false) ? 'O': 'X',
        dataList?.[i]?.topRankSales ?? '',
      ]);
    }
    break;
  case 'search/news':
    title = ['뉴스 제목', '내용', '출처', '출처일'];
    for (let i in dataList ?? []) {
      // console.log(i, dataList?.[i]);
      const date = dataList?.[i]?.publishedDate ?? '';
      const dateArr = date.split(' ');
      data.push([
        common.deHighlight(dataList?.[i]?.title ?? ''),
        dataList?.[i]?.contents ?? '',
        common.deHighlight(dataList?.[i]?.source ?? ''),
        (dateArr[0] ?? '').replaceAll('-','.'),
      ]);
    }
    break;
  }
  return {
    data: data,
    title: title
  };
};