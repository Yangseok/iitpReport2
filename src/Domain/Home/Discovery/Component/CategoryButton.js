import React, { useEffect, useState } from 'react';
import img_category01 from 'Assets/Images/cate_img01.png';
import img_category02 from 'Assets/Images/cate_img02.png';
import img_category03 from 'Assets/Images/cate_img03.png';
import img_category04 from 'Assets/Images/cate_img04.png';
import img_category05 from 'Assets/Images/cate_img05.png';
import img_category06 from 'Assets/Images/cate_img06.png';
import img_category07 from 'Assets/Images/cate_img07.png';
import img_category08 from 'Assets/Images/cate_img08.png';

export default function CategoryButton(props) {
  const { type, name, num, onClick } = props;
  const [img, setImg] = useState('');

  useEffect(() => {
    const getImageSrc = () => {
      if(type === '1') {
        setImg(img_category01);
      } else if(type === '2') {
        setImg(img_category02);
      } else if(type === '3') {
        setImg(img_category03);
      } else if(type === '4') {
        setImg(img_category04);
      } else if(type === '5') {
        setImg(img_category05);
      } else if(type === '6') {
        setImg(img_category06);
      } else if(type === '7') {
        setImg(img_category07);
      } else if(type === '8') {
        setImg(img_category08);
      }
    };
    return () => getImageSrc();
  }, [props]);
  
  return (
    <button onClick={onClick}>
      <img src={img} alt={name}/>
      <p>{name}</p>
      <span>{num}</span>
    </button>
  );
}
