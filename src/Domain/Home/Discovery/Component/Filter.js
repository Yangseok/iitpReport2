import React, { useEffect, useState, useCallback } from 'react';
import icSearch from 'Assets/Images/ic_search.png';
import Button from 'Domain/Home/Common/Componet/Button';
import common from 'Utill';
import { useSelector, useDispatch } from 'react-redux';
import { getFilterActive, setFilterActive } from 'Domain/Home/Common/Status/CommonSlice';
import { items } from 'Domain/Home/Discovery/Data/FilterItems';
import SelectedFilterArea from 'Domain/Home/Discovery/Component/SelectedFilterArea';

export default function Filter(props) {
  const {filterItem, filterKey} = props;

  const dispatch = useDispatch();
  const filterActive = useSelector(getFilterActive);
  const [tabActive, setTabActive] = useState(-1);
  const [selectItem, setSelectItem] = useState([]);
  const [selectItemActive, setSelectItemActive] = useState(filterActive);

  // console.log('selectItemActive[filterKey].selected:', selectItemActive[filterKey].selected);

  const handleSelectItem = useCallback((e) => {
    if (selectItemActive[filterKey]?.selected[tabActive] === undefined) return null;
    let selectArr = selectItemActive[filterKey]?.selected[tabActive] ?? [];
    let setArr = [];
    if (selectArr.indexOf(e.key) !== -1) {
      setArr = selectArr.filter(item => item !== e.key);
    } else {
      setArr = [...selectArr, e.key];
    }
    let selectObj = JSON.parse(JSON.stringify(selectItemActive));
    // console.log('selectObj[filterKey].selected[tabActive]:', selectObj[filterKey].selected[tabActive]);
    // console.log('setArr:', setArr);
    selectObj[filterKey].selected[tabActive] = setArr;
    setSelectItemActive(selectObj);
  }, [selectItemActive, filterKey, tabActive]);

  const applyFilter = useCallback(() => {
    // console.log(selectItemActive);
    dispatch(setFilterActive(selectItemActive));
  }, [selectItemActive]);

  useEffect(() => {
    let tabButtonsTmp = [];
    let idx = 0;
    for(let i in filterItem ?? {}) {
      if (idx > 0) break;
      const filterTabName = items[filterKey]?.filter?.[i] ?? '';
      tabButtonsTmp.push({
        id: i,
        name: filterTabName,
      });
      idx++;
    }
    if (tabActive === -1) setTabActive(tabButtonsTmp[0]?.id);
  }, [filterItem, filterKey, tabActive]);

  useEffect(() => {
    const subItem = filterItem[tabActive] ?? [];
    setSelectItem(subItem);
  }, [filterItem, tabActive]);
  
  return (
    <div className='section mb-10'>
      <div className='tab_btns tab_style04 grid_auto'>
        <ul>
          {Object.entries(items[filterKey].filter).map((e, i) => {
            const id = e[0] ?? i;
            const name = e[1] ?? '';

            return (
              <li key={id} className={(id === tabActive) ? 'on' : ''}>
                <button type='button' onClick={() => setTabActive(id)}>
                  <b>{name}</b>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className='filter_btns'>
        <ul>
          {(selectItem.length > 0) ?
            selectItem?.map((e) => {
              // console.log(e.key, selectItemActive.indexOf(e.key) !== -1);
              return (
                <li key={e.key} onClick={() => handleSelectItem(e)}>
                  <button type='button' className={((selectItemActive[filterKey]?.selected[tabActive]??[]).indexOf(e.key) !== -1) ? 'on' : ''}>
                    <b className='text-base'>{e.key}</b>{' (' + common.setPriceInput(Number(e.doc_count ?? 0)) + ')'}
                  </button>
                </li>
              );
            })
            :
            <li>조회된 필터항목이 없습니다.</li>
          }
        </ul>
      </div>
      {(JSON.stringify(selectItemActive[filterKey]) === JSON.stringify(items[filterKey]))?
        <></>: <SelectedFilterArea selectItemActive={selectItemActive} setSelectItemActive={setSelectItemActive} filterKey={filterKey} />}
      <Button className='gap-2 mt-6 mx-auto py-3 px-6.5 rounded-3xl text-base font-bold btn_style03' name='필터 적용' icon={icSearch} onClick={applyFilter} />
    </div>
  );
}