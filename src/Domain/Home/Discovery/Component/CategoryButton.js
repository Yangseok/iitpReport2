import React, { useEffect, useState } from 'react';
import imgCategory0 from 'Assets/Images/cate_img00.png';
import imgCategory1 from 'Assets/Images/cate_img01.png';
import imgCategory2 from 'Assets/Images/cate_img02.png';
import imgCategory3 from 'Assets/Images/cate_img03.png';
import imgCategory4 from 'Assets/Images/cate_img04.png';
import imgCategory5 from 'Assets/Images/cate_img05.png';
import imgCategory6 from 'Assets/Images/cate_img06.png';
import imgCategory7 from 'Assets/Images/cate_img07.png';
import imgCategory8 from 'Assets/Images/cate_img08.png';

export default function CategoryButton(props) {
  const { type, name, num, onClick } = props;
  const [img, setImg] = useState('');

  useEffect(() => {
    if(type === 0) {
      setImg(imgCategory0);
    } else if(type === 1) {
      setImg(imgCategory1);
    } else if(type === 2) {
      setImg(imgCategory2);
    } else if(type === 3) {
      setImg(imgCategory3);
    } else if(type === 4) {
      setImg(imgCategory4);
    } else if(type === 5) {
      setImg(imgCategory5);
    } else if(type === 6) {
      setImg(imgCategory6);
    } else if(type === 7) {
      setImg(imgCategory7);
    } else if(type === 8) {
      setImg(imgCategory8);
    }
  }, [props]);
  
  return (
    <button type='button' onClick={onClick}>
      <img src={img} alt={name}/>
      <b>{name}</b>
      <span>{num}</span>
    </button>
  );
}
