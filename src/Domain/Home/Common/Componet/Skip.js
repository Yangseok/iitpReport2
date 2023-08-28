import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function Skip() {
  const pathName = useLocation().pathname;
  const [contentHref, setContentHref] = useState('');

  useEffect(() => {
    if(pathName === '/') {
      setContentHref('#section1');
    } else {
      setContentHref('#contentArea');
    }
  }, []);

  return (
    <div id="skip">
      <strong className="hidden">반복영역 건너뛰기</strong>
      <ul>
        <li><a href={contentHref}>본문 바로가기</a></li>
        <li><a href="#header">상단메뉴 바로가기</a></li>
      </ul>
    </div>
  );
}