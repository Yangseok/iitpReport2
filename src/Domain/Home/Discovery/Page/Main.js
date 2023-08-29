import React, { useEffect, useState } from 'react';
import 'Assets/Css/Discovery.css';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import AutoComplete from 'Domain/Home/Discovery/Component/Keyword/AutoComplete';
import KeywordWrap from 'Domain/Home/Discovery/Component/Keyword/KeywordWrap';
import { useLocation, useParams } from 'react-router-dom';

export default function Main() {
  const paths = useLocation().pathname;
  const params = useParams();
  const paramSe2 = params?.se2;
  const [menu, setMenu] = useState(0);
  const [keywordResult, setKeywordResult] = useState(false);

  useEffect(() => {
    const pathName = paths.split('/');

    if(paramSe2) {
      if(paramSe2 === 'keyword') {
        setMenu(0);
        if(pathName[pathName.length - 1] === 'result') {
          setKeywordResult(true);
        }
      } else if(paramSe2 === 'file') {
        setMenu(1);
      } else if(paramSe2 === 'project') {
        setMenu(2);
      }
    }
  }, []);

  return (
    <DiscoveryLayout>
      <section>
        <div className='container'>
          {(menu === 0) 
            ? <>
              {/* 키워드 분석 */}
              <AutoComplete />
              {(keywordResult) && <KeywordWrap />}
            </>
            : (menu === 1)
              ? <>
                {/* 파일 분석 */}
              </>
              :  (menu === 2)
                ? <>
                  {/* 과제 정보 분석 */}
                </>
                : ''
          }
        </div>
      </section>
    </DiscoveryLayout>
  );
}
