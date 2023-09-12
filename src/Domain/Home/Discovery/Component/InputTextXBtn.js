import React, { useEffect, useRef, useState } from 'react';

export default function InputTextXBtn(props) {
  const { id, title, value, onChange } = props;
  const textareaRef = useRef();
  const [inputValue, setInputValue] = useState(value);
  const [xBtn, setXBtn] = useState(false);

  const onInputChange = (e) => {
    onChange(e);
    setInputValue(e.target.value);
  };
  const onInputDelete = (e) => {
    setInputValue('');
    textareaRef.current.focus();
    onChange(e);
  };
  const heightResize = () => {
    textareaRef.current.style.height = 'auto';
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 1}px`;
  };

  useEffect(() => {
    if(inputValue !== '') {
      setXBtn(true);
    } else {
      setXBtn(false);
    }
    heightResize();
  }, [inputValue]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  return (
    <div className="input_x_wrap">
      <label htmlFor={id} className='hidden_text'>{title}</label>
      <textarea 
        ref={textareaRef}
        rows={1}
        name={id}
        id={id}
        value={inputValue}
        onChange={onInputChange}
      />
      {(xBtn) && <button type='button' onClick={onInputDelete}>입력한 {title} 지우기</button>}
    </div>
  );
}