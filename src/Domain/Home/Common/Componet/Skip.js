import React from 'react';

export default function Skip() {
  return (
    <div id="skip">
      <strong className="hidden">반복영역 건너뛰기</strong>
      <ul>
        <li><a href="#mainContents">본문 바로가기</a></li>
        <li><a href="#header">상단메뉴 바로가기</a></li>
      </ul>
    </div>
  );
}