import { utils, write } from 'xlsx';
import { saveAs } from 'file-saver';
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
  let w = 5;
  if (0 <= percent && percent <= 29) {
    w = 5;
  } else if (30 <= percent && percent <= 49) {
    w = 4;
  } else if (50 <= percent && percent <= 69) {
    w = 3;
  } else if (70 <= percent && percent <= 89) {
    w = 2;
  } else if (90 <= percent && percent <= 100) {
    w = 1;
  }
  return w;
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
  await new Promise((resolve) => setTimeout(resolve, 1000));
  saveAs(excelFile, excelFileName + excelFileExtension);
};