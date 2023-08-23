import React, { useState } from 'react';
import CategoryButton from './CategoryButton';

export default function CategoryWrap() {
  const [category, setCategory] = useState(1);

  return (
    <div className='category_wrap'>
      <ul>
        <li className={(category === 1) ? 'on' : ''}>
          <CategoryButton type='1' name='과제' num='100,300' onClick={() => setCategory(1)} />
        </li>
        <li className={(category === 2) ? 'on' : ''}>
          <CategoryButton type='2' name='특허' num='100,300' onClick={() => setCategory(2)} />
        </li>
        <li className={(category === 3) ? 'on' : ''}>
          <CategoryButton type='3' name='논문' num='100,300' onClick={() => setCategory(3)} />
        </li>
        <li className={(category === 4) ? 'on' : ''}>
          <CategoryButton type='4' name='ICT 자료' num='100,300' onClick={() => setCategory(4)} />
        </li>
        <li className={(category === 5) ? 'on' : ''}>
          <CategoryButton type='5' name='정부정책' num='100,300' onClick={() => setCategory(5)} />
        </li>
        <li className={(category === 6) ? 'on' : ''}>
          <CategoryButton type='6' name='연구자' num='100,300' onClick={() => setCategory(6)} />
        </li>
        <li className={(category === 7) ? 'on' : ''}>
          <CategoryButton type='7' name='기관' num='100,300' onClick={() => setCategory(7)} />
        </li>
        <li className={(category === 8) ? 'on' : ''}>
          <CategoryButton type='8' name='뉴스' num='100,300' onClick={() => setCategory(8)} />
        </li>
      </ul>
    </div>
  );
}
