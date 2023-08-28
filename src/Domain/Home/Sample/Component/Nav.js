import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Nav() {

  const nav = [
    {to:'/sample/redux', name:'리덕스샘플'},
    {to:'/sample/modal1', name:'알림'},
    {to:'/sample/modal2', name:'알림2'},
    {to:'/sample/modal3', name:'글로벌모달'},
    {to:'/sample/graph1', name:'chartjs 세로형그래프'},
    {to:'/sample/graph38', name:'chartjs 세로형그래프2(38)'},
    {to:'/sample/graph2', name:'chartjs 가로형그래프'},
    {to:'/sample/graph3', name:'chartjs 꺾은선그래프'},
    {to:'/sample/graph32', name:'chartjs 엑셀요청한그래프(32)'},
    {to:'/sample/graph33', name:'chartjs 엑셀요청한그래프2(33)'},
    {to:'/sample/graph36', name:'chartjs 엑셀요청한그래프3(36)'},
    {to:'/sample/graph37', name:'chartjs 엑셀요청한그래프4(37)'},
    {to:'/sample/graph39', name:'chartjs 엑셀요청한그래프5(39)'},
    {to:'/sample/graph34', name:'plotly 그래프'},
    {to:'/sample/graph35', name:'D3 그래프'},
    {to:'/sample/graph4', name:'chartjs 분포형그래프'},
    {to:'/sample/treemap', name:'chartjs 트리맵'},
    {to:'/sample/treemap2', name:'plotly 트리맵'},
    {to:'/sample/wordcloud1', name:'react-d3-cloud 워드클라우드'},
    {to:'/sample/wordcloud2', name:'react-d3-cloud 워드클라우드2'},
    {to:'/sample/apitest', name:'api 테스트'},
    {to:'/sample/styles', name:'styles'},
  ];
  return (
    <nav className="w-full rounded-md mb-3 flex justify-center">
      <ol className="list-reset flex justify-center flex-wrap">
        {nav.map((e,i) => {
          return <React.Fragment key={i}>
            {(i > 0) ? <li key={i}>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
            </li>:''}
            <li>
              <NavLink
                to={e.to}
                className={({ isActive, isPending }) =>
                  (isPending ? 'pending text-lime-600 ' : isActive ? 'active text-yellow-600 ' : 'text-primary ') + 'transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600'
                }
              >{e.name}</NavLink>
            </li>
          </React.Fragment>;
        })}
      </ol>
    </nav>
  );
}
