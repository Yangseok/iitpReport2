import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
import moment from 'moment';

export const setTenRound = (n) => {
  n = Math.round(Number(n)/10) * 10;
  return n;
};
export const setPriceInput = (str) => {
  if (typeof str !== 'string') str = str.toString();
  str = str.replace(/,/g,'');
  let negativeNumber = false;
  if (str.indexOf('-') !== -1) negativeNumber = true;
  str = str.replace(/-/g,'');
  if (str.replace(/^0*/, '') !== '') str = str.replace(/^0*/, '');
  else str = '0';
  let retValue = '';
  for(let i=1; i<=str.length; i++)
  {
    if (i > 1 && (i%3)===1)
      retValue = str.charAt(str.length - i) + ',' + retValue;
    else
      retValue = str.charAt(str.length - i) + retValue;
  }
  if (negativeNumber) retValue = '-' + retValue;
  return retValue;
};
export const datalabelPoision = (graphRangeData) => {
  return graphRangeData.map((d) => {
    return (d > 0) ? 'end' : 'start';
  });
};
export const stockBgColor = (graphRangeData) => {
  return graphRangeData.map((d) => {
    return (d > 0) ? '#5081BD' : '#ff0000';
  });
};
export const getSegment = (idx) => {
  const pathname = document.location.pathname;
  const se = pathname.split('/');
  if (idx === undefined) return se;
  else return se[idx];
};

export const colorSet = (weight) => {
  const percent = Math.floor(weight * 100);
  let newWeight = 5;
  if (0 <= percent && percent <= 29) {
    newWeight = 5;
  } else if (30 <= percent && percent <= 49) {
    newWeight = 4;
  } else if (50 <= percent && percent <= 69) {
    newWeight = 3;
  } else if (70 <= percent && percent <= 89) {
    newWeight = 2;
  } else if (90 <= percent && percent <= 100) {
    newWeight = 1;
  }
  return newWeight;
};
export const procKeywordData = (data) => {
  let keywordData = [];
  try {
    for (const k in data) {
      keywordData.push({
        id: Number(k), 
        term: data[k].keyword, 
        weight: colorSet(data[k].weight),
        similarity: {
          keyword:  data[k].keyword,
          weight: data[k].weight,
        }
      });
    }
  } catch (e) {
    console.warn(e);
  }
  return keywordData;
};
export const procSelectedData = (selectedData, dep, searchKeyword) => {
  let keyword = [];
  let selectKeyword = [];
  try {
    for (const k in selectedData) {
      const list = selectedData[k].list;
      for (const kk in list) {
        if (k == dep -1) {
          keyword.push(list[kk].term);
        } else {
          selectKeyword.push(list[kk].term);
        }
      }
    }
  } catch (e) {
    console.warn(e);
  }
  selectKeyword.push(searchKeyword);
  return {
    keyword: procSeparator(keyword),
    selectKeyword: procSeparator(selectKeyword),
  };
};
export const procSeparator = (arr) => {
  return arr.join('|');
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
export const procCountKeyword = (keyword, selectedData) => {
  let selectKeyword = [];
  selectKeyword.push(keyword);
  try {
    for (const k in selectedData) {
      const list = selectedData[k].list;
      for (const kk in list) {
        selectKeyword.push(list[kk].term);
      }
    }
  } catch (e) {
    console.warn(e);
  }
  return selectKeyword;
};
export const excelExport = async (excelFileName, titleArr, data) => {
  const excelFileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const excelFileExtension = '.xlsx';
  const ws = utils.aoa_to_sheet([
    titleArr,
  ]);
  data.map((e) => {
    utils.sheet_add_aoa(ws, [e.map(v => v)], {
      origin: -1,
    });
    ws['!cols'] = [{ wpx: 100 }, { wpx: 100 }, { wpx: 100 }, { wpx: 100 }];
    return false;
  });
  const wb = {
    Sheets: { data: ws },
    SheetNames: ['data'],
  };
  const excelButter = write(wb, { bookType: 'xlsx', type: 'array' });
  const excelFile = new Blob([excelButter], { type: excelFileType });
  saveAs(excelFile, excelFileName + excelFileExtension);
};
export const maskingName = (name) => {
  if (name == '') return '';
  if (name.length <= 2) {
    return name.replace(name.substring(0, 1), '*');
  }

  return (
    name[0] +
    '*'.repeat(name.substring(1, name.length - 1).length) +
    name[name.length - 1]
  );
};
export const maskingPhoneNumber = (phoneNumber) => {
  const values = phoneNumber.split('-');

  values[1] = '*'.repeat(values[1].length);

  return values.join('-');
};
export const maskingEmail = (email) => {
  const mask = '*'.repeat(email.split('@')[0].length - 1);

  return email[0] + mask + email.slice(mask.length + 1, email.length);
};
export const deHighlight = (text) => {
  return text.replaceAll('<span class="highlight">', '').replaceAll('<span class=\'highlight\'>', '').replaceAll('</span>', '');
};
export const ymdFormat = (ymd) => {
  if (ymd == '') return '';
  return ymd.substr(0,4) + '-' + ymd.substr(4,2) + '-' + ymd.substr(6,2);
};
export const getViewResultInfoType = (key) => {
  let str = '';
  switch (key) {
  case 'projectout':
    str = 'rnd_project';
    break;
  case 'projectin':
    str = 'iitp_project';
    break;
  case 'patent':
    str = 'patent';
    break;
  case 'orgn':
    str = 'orgn';
    break;
  }
  return str;
};
export const joinArrNStr = (data, joinStr, defaultValue='') => {
  let returnData = defaultValue;
  if (typeof data === 'string') {
    returnData = data;
  } else if (typeof data === 'object' && data?.length !== undefined) {
    returnData = data.join(joinStr);
  }
  return returnData;
};
export const bizNoHyphen = (str) => {
  str = str.replace(/[^0-9]/g, '');
  let tmp = '';
  if( str.length < 4){
    return str;
  }else if(str.length < 6){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3);
    return tmp;
  }else if(str.length < 11){
    tmp += str.substr(0, 3);
    tmp += '-';
    tmp += str.substr(3, 2);
    tmp += '-';
    tmp += str.substr(5);
    return tmp;
  }

  return str;
};
// label 생성
export const getLabels = (length, gap) => {
  let arr = [];
  const date = new Date();
  const year1 = Number(moment(date).format('YYYY'));
  const year2 = Number(moment(date).subtract(length, 'years').format('YYYY'));

  (gap) && arr.push('');
  for (let i=year2; i<year1; i++) {
    arr.push(i);
  }
  (gap) && arr.push('');

  return arr;
};
export const getParams = (text) => {
  let params = {};
  const regex = /[?&]+([^=&]+)=([^&]*)/gi;
  if (regex.test(text)) {
    text.replace(regex, function(str, key, value) { params[key] = value; });
  }
  return params;
};
export const getUrlParams = () => {
  return getParams(window.location.search);
};
export const blobDownload = (blob, filename) => {
  const href = window.URL.createObjectURL(blob);
  const anchorElement = document.createElement('a');

  anchorElement.href = href;
  anchorElement.download = filename;

  document.body.appendChild(anchorElement);
  anchorElement.click();

  document.body.removeChild(anchorElement);
  window.URL.revokeObjectURL(href);
};