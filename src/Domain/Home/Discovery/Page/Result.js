import React, { useEffect, useState } from 'react';
import 'Assets/Css/Discovery.css';
import DiscoveryLayout from 'Domain/Home/Discovery/Layout/DiscoveryLayout';
import AutoComplete from 'Domain/Home/Discovery/Component/Keyword/AutoComplete';
import KeywordWrap from 'Domain/Home/Discovery/Component/Keyword/KeywordWrap';
import { useParams } from 'react-router-dom';

export default function Result() {
  const params = useParams();
  const paramSe2 = params?.se2;
  const [menu, setMenu] = useState(0);

  useEffect(() => {
    if(paramSe2) {
      if(paramSe2 === 'keyword') {
        setMenu(0);
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
              <KeywordWrap folded={true} />
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
