import React from 'react';
import Button from 'Domain/Home/Sample/Component/Button';

export default function DiscoveryAPIButton() {

  const discoveryKeywordTest = () => {};

  return (
    <>
      
      <hr />
      
      <hr />
      <li className='mb-1'><Button text="ICT 자료 검색" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="ICT 자료 검색 - 필터" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="ICT 자료 검색 - 상세검색" onClick={discoveryKeywordTest} /></li>
      <hr />
      <li className='mb-1'><Button text="정부 정책 검색" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="정부 정책 검색 - 필터" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="정부 정책 검색 - 상세검색" onClick={discoveryKeywordTest} /></li>
      <hr />
      <li className='mb-1'><Button text="연구자 검색" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="연구자 검색 - 필터" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="연구자 검색 - 상세검색" onClick={discoveryKeywordTest} /></li>
      <hr />
      <li className='mb-1'><Button text="기관 검색" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="기관 검색 - 필터" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="기관 검색 - 상세검색" onClick={discoveryKeywordTest} /></li>
      <hr />
      <li className='mb-1'><Button text="뉴스 검색" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="뉴스 검색 - 필터" onClick={discoveryKeywordTest} /></li>
      <li className='mb-1'><Button text="뉴스 검색 - 상세검색" onClick={discoveryKeywordTest} /></li>
    </>
  );
}