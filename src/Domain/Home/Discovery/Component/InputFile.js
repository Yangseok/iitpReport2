import React, { useState, useEffect } from 'react';
import icFile from 'Assets/Images/ic_file.png';
import { useDispatch } from 'react-redux';
import { setMsg,setShow } from 'Domain/Home/Common/Status/MsgSlice';

export default function InputFile(props) {
  const dispatch = useDispatch();
  const [fileName, setFileName]  = useState(props.fileName ?? null);
  const [fileValue, setFileValue]  = useState(null);

  const onFileChange = (e) => {
    const size = e.target?.files?.[0]?.size ?? 0;
    const limitFileSize = 100 * 1024 * 1024;
    const fileName = e.target?.files?.[0]?.name ?? '';
    const fileNameArr = fileName.split('.');
    const fileExt = fileNameArr[fileNameArr.length-1].toLowerCase();
    if ((props.accept ?? '').toLowerCase().replaceAll('.', '').split(',').indexOf(fileExt) === -1 ) {
      dispatch(setMsg({
        title: '알림',
        msg: '지원하지 않는 확장자입니다.\n지원하는 확장자: ['+(props.accept ?? '').replaceAll('.', '').replaceAll(',', ', ')+']',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
      return false;
    }
    if (size === 0 || limitFileSize <= size) {
      dispatch(setMsg({
        title: '알림',
        msg: '파일사이즈는 100MB를 넘을 수 없습니다.',
        btnCss: ['inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200'],
        btnTxt: ['확인'],
        btnEvent: ['close']
      }));
      dispatch(setShow(true));
      return false;
    }
    const value = e.target.value;
    const name = value.split('\\')[value.split('\\').length - 1];

    setFileName(name);
    setFileValue(e.target.files);

    if (props.setSelectedFileName !== undefined) props.setSelectedFileName(name);
    if (props.setSelectedFile !== undefined) props.setSelectedFile(e.target.files[0]);
  };
  const onFileDelete = () => {
    setFileName(null);
    setFileValue(null);
    
    if (props.setSelectedFileName !== undefined) props.setSelectedFileName(null);
    if (props.setSelectedFile !== undefined) props.setSelectedFile(null);
  };

  useEffect(() => {
    setFileName(props.fileName);
  }, [props.fileName]);

  return (
    <div className='file_custom'>
      <div className='file_name'>
        {(!fileName)
          ? <img src={icFile} alt='파일 등록 아이콘' className='w-8' />
          : ''
        }
        <span className={`block text-xl ${(fileName) ? 'text-dark' : 'text-color-placeholder'}`}>
          {(fileName) ?? '분석하고싶은 파일을 업로드 해보세요.'}
        </span>
        {(fileName)
          ? <button type='button' onClick={onFileDelete}>파일 등록 삭제</button>
          : ''
        }
      </div>
      <div className='file_btn'>
        <label htmlFor='uploadFile' className='hidden_text'>파일 등록</label>
        <input 
          type='file' 
          name='uploadFile'
          id='uploadFile' 
          value={(!fileName) ? fileValue ?? '' : ''}
          onChange={onFileChange}
          // accept={props.accept ?? ''}
        />
      </div>
    </div>
  );
}