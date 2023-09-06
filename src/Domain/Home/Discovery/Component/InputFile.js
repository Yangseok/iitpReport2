import React, { useState } from 'react';
import icFile from 'Assets/Images/ic_file.png';

export default function InputFile() {
  const [fileName, setFileName]  = useState(null);
  const [fileValue, setFileValue]  = useState(null);

  const onFileChange = (e) => {
    const value = e.target.value;
    const name = value.split('\\')[value.split('\\').length - 1];

    setFileName(name);
    setFileValue(e.target.files);
  };
  const onFileDelete = () => {
    setFileName(null);
    setFileValue(null);
  };

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
      {(!fileName)
        ? <div className='file_btn'>
          <label htmlFor='uploadFile' className='hidden_text'>파일 등록</label>
          <input 
            type='file' 
            name='uploadFile' 
            id='uploadFile' 
            value={fileValue}
            onChange={onFileChange}
          />
        </div>
        : ''
      }
    </div>
  );
}