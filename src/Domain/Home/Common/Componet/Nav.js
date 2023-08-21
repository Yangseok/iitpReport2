import React from 'react';
import { NavLink, useLocation
  // , useNavigate
} from 'react-router-dom';

export default function Nav() {
  const location = useLocation();
  // const navigate = useNavigate();
  const path = location.pathname;
  const se = path.split("/");
  const nav = [
    {to:"/", name:"Home"},
    {to:"/discovery", name:"디스커버리"},
    {to:"/demandbanking", name:"수요뱅킹"},
    {to:"/icttrend", name:"ICT트랜드"},
    {to:"/sample/redux", name:"샘플네비"},
  ];
  return (
    <nav className="w-full rounded-md mb-5 flex justify-center">
      <ol className="list-reset flex">
        {nav.map((e,i) => {
          return <React.Fragment key={i}>
            {(i > 0) ? <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400">/</span>
            </li>:""}
            <>
              <NavLink
                to={e.to}
                className={({ isActive, isPending }) =>
                  (isPending ? "pending text-lime-600 " : isActive ? "active text-yellow-600 " : (se[1] === 'sample' && e.to.split("/")[1] === "sample") ? "active text-yellow-600 " : "text-primary ") + "transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 active:text-primary-700 dark:text-primary-400 dark:hover:text-primary-500 dark:focus:text-primary-500 dark:active:text-primary-600"
                }
              >{e.name}</NavLink>
            </>
          </React.Fragment>
        })}
      </ol>
    </nav>
  );
}
