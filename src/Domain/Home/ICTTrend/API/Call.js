import API from 'Utill/API';

// ICT 트렌드

export const ictSearchWordCloud = async (category, label) => {
  console.log('dataparams',category, label);
  let params = { category: category, label: label};
  return await API.post('/ict/searchAggs', params);
};

