import API from 'Utill/API';

// ICT 트렌드

export const ictSearchWordCloud = async (category, label, keyword, size, startYear, endYear, year) => {
  
  !category ? 'all': category;

  let params = {
    category: category,
    label: label,
    keyword: !keyword ? '인공지능' : keyword,
    size:!size ? 20: size
  };
  

  if (label==='wordCloud') {
    params={...params, startYear, endYear};
  }

  if (label==='trend') {
    params={...params, year};
  }

  console.log('params',params);

  return await API.post('/ict/searchAggs', params);
};




