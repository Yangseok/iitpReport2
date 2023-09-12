import React from 'react';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import { NavLink } from 'react-router-dom';
import Pagination from 'Domain/Home/Common/Componet/Pagination';

export default function ProjectOut(props) {
  const { projectData, totalCount, page, setPage } = props;

  // const tempData = [
  //   {
  //     id: 0,
  //     progress: '진행중',
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //     department: '중소벤처기업부',
  //     performance: '논문(1), 특허(3)',
  //     division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
  //     keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
  //   },
  //   {
  //     id: 1,
  //     progress: '진행중',
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //     department: '중소벤처기업부',
  //     performance: '논문(1), 특허(3)',
  //     division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
  //     keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
  //   },
  // ];

  return (
    <>
      <div className='list_style01 mt-2'>
        <ul>
          {(projectData?.length > 0) 
            ? projectData?.map((e) => {
              return (
                <ListItem 
                  key={e.id}
                  tag={e.tag}
                  title={e.title}
                  contents={<>
                    <div>
                      <p className='text-sm text-color-regular'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                      <p className='text-sm text-color-regular'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                      <p className='text-sm text-color-regular'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                      <p className='text-sm text-color-regular'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                      <p className='text-sm text-color-regular'>부처명: <span className='font-medium text-color-main'>{e.department}</span></p>
                    </div>
                    <div>
                      <p className='text-sm text-color-regular'>연구 개발성과: <span className='font-medium text-color-main'>{e.performance}</span></p>
                      <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                      <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                    </div>
                  </>}
                  btns={<>
                    <NavLink to={`/view/projectout/${e.id}`} target="_blank" className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</NavLink>
                  </>}
                />
              );
            })
            : <li>
              <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
            </li>
          }
        </ul>
      </div>
      <div className='mt-10'>
        <Pagination total={totalCount} page={page} onClick={(page) => setPage(page)} />
      </div>
    </>
  );
}