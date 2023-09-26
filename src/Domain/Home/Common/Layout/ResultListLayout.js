import React, { useEffect, useState } from 'react';
import common from 'Utill';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import FileResultLayout from 'Domain/Home/DemandBanking/Layout/FileResultLayout';
import IctResultLayout from 'Domain/Home/ICTTrend/Layout/IctResultLayout';

export default function ResultListLayout(props) {

  const { children, totalCount, tabCount, keyword, setSearchButtonClick, isSearchDetail, activeCount } = props;

  const [paramSe1, setParamSe1] = useState('');
  
  const se = common.getSegment();
  const se1 = se[1] ?? '';

  useEffect(() => {
    setParamSe1(se1);
  }, [se]);

  return (
    <>
      {(paramSe1 === 'discovery' || paramSe1 === 'search') 
        ? <DiscoveryResultLayout totalCount={totalCount} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} isSearchDetail={isSearchDetail} activeCount={activeCount}>
          {children}
        </DiscoveryResultLayout>
        : (paramSe1 === 'demandbanking')
          ? <FileResultLayout totalCount={totalCount} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick}>
            {children}
          </FileResultLayout>
          : (paramSe1 === 'icttrend')
            ? <IctResultLayout totalCount={totalCount} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick}>
              {children}
            </IctResultLayout>
            : ''
      }
    </>
  );
}