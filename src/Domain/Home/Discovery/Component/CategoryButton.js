import React, { useEffect, useState } from 'react';
import img_category0 from 'Assets/Images/cate_img00.png';
import img_category1 from 'Assets/Images/cate_img01.png';
import img_category2 from 'Assets/Images/cate_img02.png';
import img_category3 from 'Assets/Images/cate_img03.png';
import img_category4 from 'Assets/Images/cate_img04.png';
import img_category5 from 'Assets/Images/cate_img05.png';
import img_category6 from 'Assets/Images/cate_img06.png';
import img_category7 from 'Assets/Images/cate_img07.png';
import img_category8 from 'Assets/Images/cate_img08.png';

export default function CategoryButton(props) {
  const { type, name, num, onClick } = props;
  const [img, setImg] = useState('');

  useEffect(() => {
    if(type === 0) {
      setImg(img_category0);
    } else if(type === 1) {
      setImg(img_category1);
    } else if(type === 2) {
      setImg(img_category2);
    } else if(type === 3) {
      setImg(img_category3);
    } else if(type === 4) {
      setImg(img_category4);
    } else if(type === 5) {
      setImg(img_category5);
    } else if(type === 6) {
      setImg(img_category6);
    } else if(type === 7) {
      setImg(img_category7);
    } else if(type === 8) {
      setImg(img_category8);
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
