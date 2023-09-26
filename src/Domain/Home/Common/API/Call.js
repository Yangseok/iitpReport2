import API from 'Utill/API';

//디스커버리 파일 분석
export const login = async (id, password) => {
  let params = {
    id: id,
    password: password,
  };
  return await API.post('/account/login', params);
};
