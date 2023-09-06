import React, { useEffect, useState } from 'react';
import icAnalysis from 'Assets/Images/ic_analysis.png';
import Button from 'Domain/Home/Common/Componet/Button';

export default function KeywordDepth(props) {
  const { idx, data, selectedData, isFold, onKeywordClick, onExpendClick } = props;
  const [showData, setShowData] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [fold, setFold] = useState(false);

  useEffect(() => {
    for (const e of data) {
      if (e.active) {
        setDisabled(false);
        break;
      }
      setDisabled(true);
    }
  }, [data, selectedData]);

  useEffect(() => {
    if(fold) {
      setShowData(selectedData);
    } else {
      setShowData(data);
    }
  }, [data, selectedData, fold]);

  useEffect(() => {
    setFold(isFold);
  }, [isFold]);

  return (
    <>
      <div className={`keywords_wrap mt-4${(fold) ? ' fold' : ''}`}>
        <div className='title'>
          <h4>{idx}depth 키워드</h4>
          <button type='button' onClick={() => setFold(state => !state)}>{`${idx}depth 키워드 ${(fold) ? '펼치기' : '접기'}`}</button>
        </div>
        <ul>
          {(showData?.length > 0) 
            ? showData?.map((e) => {
              return <li key={e.id}>
                <Button idx={e.id} name={e.term} className={`py-1.75 px-2.5 rounded text-base font-bold btn_keyword0${e.weight}${(e.active) ? ' on' : ''}`} onClick={(event) => onKeywordClick(event, idx)} />
              </li>;
            })
            : <li>
              <p className='text-base text-color-placeholder'>키워드가 없습니다.</p>
            </li>
          }
        </ul>
      </div>
      {(idx < 3)
        ? <div className='keywords_btn'>
          <button type='button' disabled={disabled} onClick={() => onExpendClick(idx + 1)}>키워드 확장 <img src={icAnalysis} alt={`${idx + 1}depth 키워드 확장`} /></button>
        </div>
        : ''
      }
    </>
  );
}