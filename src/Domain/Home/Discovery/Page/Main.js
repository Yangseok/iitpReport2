import React, { useEffect, useState } from 'react';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import DiscoveryArea from 'Domain/Home/Discovery/Component/DiscoveryArea';
import { useParams } from 'react-router-dom';
import common from 'Utill';
import { useDispatch } from 'react-redux';
import { setTmpSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';

export default function Main() {
  const dispatch = useDispatch();
  const se = common.getSegment();
  const params = useParams();
  const paramSe2 = params?.se2;
  const [keywordResult, setKeywordResult] = useState(false);

  useEffect(() => {
    setKeywordResult(false);
    const paramSe3 = se[3] ?? '';

    if (paramSe2) {
      if (paramSe2 === 'keyword' && paramSe3 === 'result') {
        setKeywordResult(true);
      }
      if (paramSe2 === 'keyword' && paramSe3 === '') {
        dispatch(setTmpSearchKeyword(''));
      }
    }
  }, [se, paramSe2]);

  return (
    <DiscoveryLayout>
      <section>
        <div className='container'>
          <DiscoveryArea />
        </div>
      </section>
      {(!keywordResult) 
        && <section className='mt-20'>
          <div className='container'>
            <div className='info_wrap text-center'>
              <div className='inline-block text-left'>
                <h3 className='text-lg font-bold text-color-dark'>디스커버리 검색</h3>
                <ul className='flex flex-col gap-4 mt-4'>
                  <li>
                    <p>Tech-Planning Platform에서 서비스하는 콘텐츠를 한 번에 검색할 수 있으며 <br/>과제, 특허, 논문, ICT자료, 정부정책, 연구자, 기관, 뉴스로 분류하여 보여줍니다.</p>
                  </li>
                  <li>
                    <p>검색어의 일부만 입력해도 입력한 문자가 포함된 자동완성어를 추천합니다.</p>
                  </li>
                  <li>
                    <p className='flex gap-2'>
                      <span className='tag_style01 mt-0.5'>기업</span> 태그가 표시된 자동완성어를 선택하여 해당 기업정보에 대한 빠른 검색이 가능합니다.
                    </p>
                  </li>
                  <li>
                    <p>상세검색으로 검색영역과 검색항목을 지정하여 검색할 수 있습니다.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>}
    </DiscoveryLayout>
  );
}
