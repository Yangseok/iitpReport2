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