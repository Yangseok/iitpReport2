import React, {useCallback} from 'react';
import icReset from 'Assets/Images/ic_reset.png';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';

export default function SelectedFilterArea(props) {

  const {filterKey, selectItemActive, setSelectItemActive} = props;
  
  const handleInit = useCallback(() => {
    let selectObj = JSON.parse(JSON.stringify(selectItemActive));
    selectObj[filterKey] = items[filterKey];
    setSelectItemActive(selectObj);
  }, [selectItemActive, filterKey]);

  const handleRemove = useCallback((selectedData, selectItem) => {
    let selectObj = JSON.parse(JSON.stringify(selectItemActive));
    const removeSelectedData = selectObj[filterKey].selected[selectedData[0]].filter(item => item !== selectItem);
    selectObj[filterKey].selected[selectedData[0]] = removeSelectedData;
    setSelectItemActive(selectObj);
  }, [selectItemActive, filterKey]);

  return (
    <div className='filter_select_wrap mt-6'>
      <div>
        {Object.entries(selectItemActive[filterKey].filter).map((selectedData, i) => {
          if (items?.[filterKey]?.filter?.[selectedData[0]] === undefined) return null;
          const selectedArr = selectItemActive[filterKey].selected?.[selectedData[0]] ?? [];
          if (selectedArr.length === 0) return null;
          return (
            <div key={'ftCate'+i} className='conts_box'>
              <p>{selectedData[1] ?? ''}</p>
              <ul>
                {(selectItemActive[filterKey].selected[selectedData[0]]??[]).map((selectItem, ii) => {
                  return (
                    <li key={'ftItem'+ii}>
                      <span>{selectItem}</span>
                      <button type='button' className='x_btn' onClick={() => handleRemove(selectedData, selectItem)}>선택 필터 삭제</button>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <button type='button' className='filter_reset_btn' onClick={handleInit}>
        선택 초기화 <img src={icReset} alt='선택 초기화' className='w-6' />
      </button>
    </div>
  );
}