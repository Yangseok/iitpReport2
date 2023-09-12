import React, { useCallback, useEffect, useState } from 'react';
import icAnalysis from 'Assets/Images/ic_analysis.png';
import icSearch from 'Assets/Images/ic_search.png';
import AutoCompleteSearch from 'Domain/Home/Common/Componet/AutoCompleteSearch';
import KeywordWrap from 'Domain/Home/Discovery/Component/Keyword/KeywordWrap';
import * as mainAPI from 'Domain/Home/Main/API/Call';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchKeyword, setSearchKeywordReset, getTmpSearchKeyword, setFileKeywordList, getFileName, setFileName } from 'Domain/Home/Common/Status/CommonSlice';
import common from 'Utill';
import { useParams, useNavigate } from 'react-router-dom';
import { setMsg,setShow } from 'Domain/Home/Common/Status/MsgSlice';
import InputFile from 'Domain/Home/Discovery/Component/InputFile';
import Button from 'Domain/Home/Common/Componet/Button';
import ProjectWrap from 'Domain/Home/Discovery/Component/Project/ProjectWrap';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';

export default function PageSearchArea(props) {
  const dispatch = useDispatch();

  const { page } = props;
  const params = useParams();
  const paramSe2 = params?.se2;
  const [menu, setMenu] = useState(0);
  const [keywordResult, setKeywordResult] = useState(false);
  const [chfold, setChFold] = useState(false);
  
  const keyword = useSelector(getSearchKeyword);
  const tmpSearchKeyword = useSelector(getTmpSearchKeyword);
  const [dataSearch, setDataSearch] = useState([]);

  const navigate = useNavigate();
  const se = common.getSegment();

  const [selectedFile, setSelectedFile] = useState(null);
  const fileName = useSelector(getFileName);

  const handleSearch = () => {
    if (tmpSearchKeyword.trim() === '') {
      dispatch(setMsg({
        title: '알림',
        msg: '키워드를 입력해주세요.',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
      return null;
    }
    dispatch(setSearchKeywordReset(true));
    navigate('/discovery/' + paramSe2 + '/result');
  };

  const discoverySearchBttonClick = () => {
    setChFold(true);
    const setSearchButtonClick = props?.setSearchButtonClick;
    if (setSearchButtonClick !== undefined) {
      setSearchButtonClick(true);
    }
    let defaultSe4 = 'projectout';
    if (se[4] !== undefined) {
      defaultSe4 = se[4];
    }
    navigate('/discovery/' + paramSe2 + '/result/' + defaultSe4);
  };

  const setSelectedFileName = (name) => {
    dispatch(setFileName(name));
  };

  const handleFileUpload = useCallback(async (e) => {
    e.preventDefault();

    if (selectedFile === null && fileName === null) {
      dispatch(setMsg({
        title: '알림',
        msg: '파일을 업로드해주세요.',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
      return null;
    }

    if (selectedFile !== null) {
      const formData = new FormData();
      formData.append('uploadFiles', selectedFile);
      const data = await discoveryAPI.discoveryFile(formData);
      console.log(data?.data?.result);
      dispatch(setFileKeywordList(data?.data?.result?.textAnalyticsKeywordList ?? []));
    }

    navigate('/discovery/file/result/projectout');
  }, [selectedFile]);

  useEffect(() => {
    setKeywordResult(false);
    const paramSe3 = se[3] ?? '';

    if(paramSe2) {
      if(paramSe2 === 'keyword') {
        setMenu(0);
        if(paramSe3 === 'result') {
          setKeywordResult(true);
        }
      } else if(paramSe2 === 'file') {
        setMenu(1);
      } else if(paramSe2 === 'project') {
        setMenu(2);
      }
    }
  }, [se, paramSe2]);

  useEffect(() => {
    (async () => {
      if(tmpSearchKeyword.trim() !== '') {
        const data = await mainAPI.autocomplete(tmpSearchKeyword);
        setDataSearch(data?.data?.result);
      }
    })();
  }, [tmpSearchKeyword]);

  return (
    <>
      {(menu === 0) 
        ? <>
          {/* 키워드 분석 */}
          <h2 className='hidden_text'>디스커버리 검색 - 키워드 분석</h2>
          <AutoCompleteSearch 
            handleSearch={handleSearch}
            data={dataSearch}
            style={{ type: 2, name: '키워드 찾기', icon: icAnalysis }}
            labelText={'키워드 검색'}
          />
          {(keywordResult) 
            && <KeywordWrap discoverySearchBttonClick={discoverySearchBttonClick} keyword={keyword} chfold={chfold} setChFold={setChFold} folded={(page === 'resultPage') ? true : ''} />}
        </>
        : (menu === 1)
          ? <>
            <h2 className='hidden_text'>디스커버리 검색 - 파일 분석</h2>
            <div className='container-800 p-0'>
              <InputFile setSelectedFile={setSelectedFile} setSelectedFileName={setSelectedFileName} fileName={fileName} />
              <Button name="파일 분석" icon={icSearch} onClick={handleFileUpload} className="gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03" />
            </div>
          </>
          :  (menu === 2)
            ? <>
              <ProjectWrap folded={(page === 'resultPage') ? true : ''} />
            </>
            : ''
      }
    </>
  );
}
