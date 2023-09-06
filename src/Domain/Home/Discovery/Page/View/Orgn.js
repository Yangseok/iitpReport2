import React, { useState } from 'react';
import ViewLayout from 'Domain/Home/Discovery/Layout/ViewLayout';
import Button from 'Domain/Home/Common/Componet/Button';
import ListItem from 'Domain/Home/Common/Componet/ListItem';
import ViewTable from 'Domain/Home/Discovery/Component/View/ViewTable';
import ToggleListItem from 'Domain/Home/Common/Componet/ToggleListItem';
import WordClouds from 'Domain/Home/Common/Componet/Features/WordClouds';
import ViewChart1 from 'Domain/Home/Discovery/Component/View/ViewChart1';
import ViewChart2 from 'Domain/Home/Discovery/Component/View/ViewChart2';
import ViewChart3 from 'Domain/Home/Discovery/Component/View/ViewChart3';
import ViewChart4 from 'Domain/Home/Discovery/Component/View/ViewChart4';
import ViewChart5 from 'Domain/Home/Discovery/Component/View/ViewChart5';
import moment from 'moment';

export default function View() {
  const tempData1 = [
    [
      { content: '설립일', scope: 'row' },
      { content: '2014.01.08' },
      { content: '사업자등록번호', scope: 'row' },
      { content: '314-86-554466' },
    ],
    [
      { content: '대표자명', scope: 'row' },
      { content: '홍길동' },
      { content: '업종명', scope: 'row' },
      { content: '(J58) 출판업' },
    ],
    [
      { content: '사업장 전화번호', scope: 'row' },
      { content: '031-625-4340' },
      { content: '홈페이지', scope: 'row' },
      { content: '-' },
    ],
    [
      { content: '재직 인원', scope: 'row' },
      { content: '115명 (2020.06.22 기준)' },
      { content: '주생산품', scope: 'row' },
      { content: '인공지능플랫폼 외' },
    ],
  ];
  // 데이터 5개씩 뿌려줌
  const tempData2 = [
    {
      id: 0,
      progress: '진행중',
      title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
      price: '10억',
      period: '2023.04.01 ~ 2024.04.30',
      agency: '주식회사 오름',
      name: '홍길동',
      department: '중소벤처기업부',
      division: '정보 / 통신 / 소프트웨어 / S/W솔루션 ',
      keyword: '3D 데이터, 디지털 트윈, 지능형 데이터 가공 플랫폼, 깊이 추정',
    },
  ];
  const tempData3 = [
    {
      id: 0,
      title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
      division: '출원',
      num: '1020200077142',
      date: '2021.01.08',
      agency: '행정안전부국립재난안전연구원',
      name: '홍길동',
      link: '#',
    },
  ];
  const tempData4 = [
    {
      id: 0,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
    },
    {
      id: 1,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
    },
    {
      id: 2,
      title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
      link: '#',
      source: '서울신문',
      date: '2023.06.08',
    },
  ];
  const tempChartData1 = [0, 6, 28, 13, 0];
  const tempChartData2 = [0, 1241, 350, 428, 0];
  const tempChartData3 = [0, 3, -5, 17, 0];
  const tempChartData4 = [0, -255, -628, -153, 0];
  const tempChartData5 = [2.8, 2.9, 3, 3.1, 3.9, 3.5, 3.5, 3.45, 4, 2.9];
  const tempChartData6_1 = [3, 3, 3, 3, 6, -5, -2, 1, 3, 20];
  const tempChartData6_2 = [0, 0, -2, 3, 0, 0, 0, 0, 0, 20];
  const tempChartData7_1 = [29, 30, 29, 33, 28, 21, 23, 28, 35, 32];
  const tempChartData7_2 = [3.15, 3.3, 3.5, 3.6, 4.2, 3.9, 4.1, 3.9, 3.8];
  const tempChartData7_3 = [0.9, 1, 1, 1.2, 1.1, 0.9, 1, 1.1, 1.3, 0.1];
  const tempChartData8_1 = [90, 90, 82, 80, 85, 84, 84, 84, 84, 92];
  const tempChartData8_2 = [0.8, 0.9, 0.8, 0.9, 1.1, 0.7, 0.8, 0.9, 1.2];
  const tempChartData8_3 = [0.6, 0.7, 0.7, 0.8, 0.7, 0.6, 0.7, 0.8, 0.8, 0.1];
  const tempChartData9_1 = [90, 90, 82, 80, 85, 84, 84, 84, 84, 92];
  const tempChartData9_2 = [0.8, 0.9, 0.8, 0.9, 1.1, 0.7, 0.8, 0.9, 1.2];
  const tempChartData9_3 = [0.6, 0.7, 0.7, 0.8, 0.7, 0.6, 0.7, 0.8, 0.8, 0.1];
  const tempChartData10_1 = [90, 90, 82, 80, 85, 84, 84, 84, 84, 92];
  const tempChartData10_2 = [0.8, 0.9, 0.8, 0.9, 1.1, 0.7, 0.8, 0.9, 1.2];
  const tempChartData10_3 = [0.6, 0.7, 0.7, 0.8, 0.7, 0.6, 0.7, 0.8, 0.8, 0.1];
  const tempChartData11 = [2.8, 2.9, 3, 3.1, 3.9, 3.5, 3.5, 3.5, 4, 2.9];
  const tempChartData12 = [38, 50, 42, 68, 70, 18, 32, 29, 58, 58, 58, 58];
  const tempChartData13 = [
    {
      min: '2021-02-10',
    },
    {
      min: '2021-02-10',
      max: '2022-03-10'
    },
    {
      min: '2021-06-10',
      max: '2022-07-10'
    },
    {
      min: '2021-09-10',
      max: '2022-02-10'
    },
    {
      min: '2021-12-20',
      max: '2023-03-10'
    },
    {
      min: '2021-12-10',
      max: '2023-05-10'
    },
    {
      min: '2022-11-10',
      max: '2023-07-10'
    },
    {
      min: '2022-11-08',
      max: '2023-09-20'
    },
    {
      min: '2022-11-08',
      max: '2023-05-20'
    },
    {
      min: '2021-02-10',
    },
  ];

  const tabButtons1 = [
    { id: 0, name: '기본 정보', onClick: () => setTabActive1(0) },
    { id: 1, name: '재무 정보', onClick: () => setTabActive1(1) },
    { id: 2, name: '과제 정보', onClick: () => setTabActive1(2) },
    { id: 3, name: '성과 정보', onClick: () => setTabActive1(3) },
    { id: 4, name: '고용 정보', onClick: () => setTabActive1(4) },
    { id: 5, name: '뉴스', onClick: () => setTabActive1(5) },
  ];
  const tabButtons2 = [
    { id: 0, name: '사후관리 정보', cnt: 8, onClick: () => setTabActive2(0) },
    { id: 1, name: '재무현황', cnt: 5, onClick: () => setTabActive2(1) },
  ];

  const [tabActive1, setTabActive1] = useState(0);
  const [tabActive2, setTabActive2] = useState(0);

  // label 생성
  const getLabels = (length, gap) => {
    let arr = [];
    const date = new Date();
    const year1 = Number(moment(date).format('YYYY'));
    const year2 = Number(moment(date).subtract(length, 'years').format('YYYY'));

    (gap) && arr.push('');
    for (let i=year2; i<year1; i++) {
      arr.push(i);
    }
    (gap) && arr.push('');

    return arr;
  };

  const labels1 = getLabels(3, true);
  const labels2 = getLabels(10);
  const labels3 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const labels4 = ['','Project A','Project B','Project C','Project D','Project E','Project F','Project G','Project H',''];
  
  return (
    <ViewLayout 
      tabs={tabButtons1}
      active={tabActive1}
      title={'(주) 마인즈랩(MINDS LAB., INC.)'}
      subTitle={<>
        <span className='text-xl text-color-line mx-3'>|</span>
        <p className='text-xl font-medium text-color-regular'>OOO부설연구소</p>
      </>}
      desc={'(34112) 대전 유성구 대덕대로 593, 9층 901-2호 (도룡동,대덕테크비즈센터)'}
      tags={<>
        <div className="text_style01">
          <p className='text-sm text-color-regular'>2014년 설립(10년차)</p>
          <p className='text-sm text-color-regular'>중소기업</p>
          <p className='text-sm text-color-regular'>대전</p>
        </div>
      </>}
    >
      {(tabActive1 === 0)
        ? // 기본 정보
        <ViewTable
          summary={'(주) 마인즈랩(MINDS LAB., INC.) 기본 정보'}
          bodyData={tempData1}
        />
        : (tabActive1 === 1)
          ? // 재무 정보 (사후관리정보, 재무현황)
          <>
            <div className='flex items-center justify-between pt-6 px-4'>
              <div className='tab_btns tab_style05'>
                <ul>
                  {tabButtons2?.map((e) => {
                    return <li key={e.id} className={(e.id === tabActive2) ? 'on' : ''}>
                      <button type='button' onClick={e.onClick}>{e.name}({e.cnt})</button>
                    </li>;
                  })}
                </ul>
              </div>
              <a href='#' className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${''} 원문 페이지`}>근거규정 보기↗</a>
            </div>
            {(tabActive2 === 0)
              ? <>
                <div className='list_wrap_style02 grid02 mt-4'>
                  <div>
                    <div className='tooltip_wrap inline-block px-2' tabIndex={0}>
                      <h4 className='text-base font-bold text-color-dark'>부채비율</h4>
                      <span className='tooltip_style04 min-w-30'>
                        [부채비율] <br/>
                        * 부채총계/자본총계
                      </span>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'end'} lineData={300} barData={tempChartData1} />
                    </div>
                  </div>
                  <div>
                    <div className='tooltip_wrap inline-block px-2' tabIndex={0}>
                      <h4 className='text-base font-bold text-color-dark'>유동비율</h4>
                      <span className='tooltip_style04 min-w-30'>
                        [유동비율] <br/>
                        * 유동자산/유동부채
                      </span>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'start'} lineData={100} barData={tempChartData2} />
                    </div>
                  </div>
                  <div>
                    <div className='tooltip_wrap inline-block px-2' tabIndex={0}>
                      <h4 className='text-base font-bold text-color-dark'>이자보상비율</h4>
                      <span className='tooltip_style04 min-w-30'>
                        [이자보상비율] <br/>
                        * 영업이익/지급이자
                      </span>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'start'} lineData={1} barData={tempChartData3} />
                    </div>
                  </div>
                  <div>
                    <div className='flex items-center justify-between px-2'>
                      <h4 className='text-base font-bold text-color-dark'>영역이익</h4>
                      <p className='text-xs font-medium text-color-footer'>단위: 천원</p>
                    </div>
                    <div className='chart_wrap mt-4'>
                      <ViewChart1 labels={labels1} lineFill={'start'} lineData={0} barData={tempChartData4} />
                    </div>
                  </div>
                </div>
                <div className='mt-14'>
                  <h3 className='text-base font-bold text-color-dark'>자본잠식여부</h3>
                  <div className='table_style01 mt-5'>
                    <table summary='(주) 마인즈랩(MINDS LAB., INC.) 사후관리 재무 정보 - 자본잠식여부'>
                      <colgroup>
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                        <col width="25%" />
                      </colgroup>
                      <thead>
                        <tr>
                          <th scope='col' className='text-center'>연도</th>
                          <th scope='col' className='text-center'>자본총계</th>
                          <th scope='col' className='text-center'>자본금</th>
                          <th scope='col' className='text-center'>자본잠식여부</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className='text-center'>2020</td>
                          <td className='text-center'>532,000</td>
                          <td className='text-center'>131,000</td>
                          <td className='text-center bg03'>정상</td>
                        </tr>
                        <tr>
                          <td className='text-center'>2021</td>
                          <td className='text-center'>25,000</td>
                          <td className='text-center'>131,000</td>
                          <td className='text-center bg02'>부분자본잠식</td>
                        </tr>
                        <tr>
                          <td className='text-center'>2022</td>
                          <td className='text-center'>-50,000</td>
                          <td className='text-center'>1,000</td>
                          <td className='text-center bg01'>완전자본잠식</td>
                        </tr>
                      </tbody>
                    </table>
                    <p className='text-xs font-medium text-color-footer mt-4'>
                      * 완전자본잠식 : 자본총계 &lt; 0  /  부분자본잠식 : 자본총계 &lt; 자본금
                    </p>
                  </div>
                </div>
              </> 
              : <>
                <div className='list_wrap_style02 grid02 mt-4'>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>매출액</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart2
                        title={{
                          y: '매출액(천억원)',
                          label: '매출액',
                        }} 
                        labels={labels2} 
                        datas={tempChartData5} 
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>영업이익률, 당기순이익률</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart3 labels={labels2} data1={tempChartData6_1} data2={tempChartData6_2} />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>부채비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '부자비율(%)',
                          label: { 1: '부채비율', 2: '자본총계', 3: '부채총계' }
                        }}
                        labels={labels2} 
                        data1={tempChartData7_1} 
                        data2={tempChartData7_2} 
                        data3={tempChartData7_3}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark px-2'>유동비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '유동비율(%)',
                          label: { 1: '유동비율', 2: '유동자산', 3: '유동부채' }
                        }}
                        labels={labels2} 
                        data1={tempChartData8_1} 
                        data2={tempChartData8_2} 
                        data3={tempChartData8_3}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark'>이자보상비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '이자보상비율(%)',
                          label: { 1: '이자보상비율', 2: '영업이익', 3: '지급이자' }
                        }}
                        labels={labels2} 
                        data1={tempChartData9_1} 
                        data2={tempChartData9_2} 
                        data3={tempChartData9_3}
                      />
                    </div>
                  </div>
                  <div>
                    <h4 className='text-base font-bold text-color-dark'>자기자본비율</h4>
                    <div className='chart_wrap mt-4'>
                      <ViewChart4 
                        title={{
                          y: '자기자본비율(%)',
                          label: { 1: '자기자본비율', 2: '자산총계', 3: '자기자본' }
                        }}
                        labels={labels2} 
                        data1={tempChartData10_1} 
                        data2={tempChartData10_2} 
                        data3={tempChartData10_3}
                      />
                    </div>
                  </div>
                </div>
              </>}
          </>
          : (tabActive1 === 2)
            ? // 과제 정보
            <>
              <div className='pt-6 px-4'>
                <p className='text-base font-bold text-color-main'>과제(10)</p>
              </div>
              <div className='list_style01 mt-4'>
                <ul>
                  {(tempData2?.length > 0) 
                    ? tempData2?.map((e) => {
                      {/* tag - 진행중 : 1 | 종료 : 2 */}
                      return (<ListItem 
                        key={e.id}
                        tag={1}
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
                            <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                          </div>
                        </>}
                        btns={<>
                          <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                        </>}
                      />);
                    })
                    : <li>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  
                  }
                </ul>
              </div>
              <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => {}} />
            </>
            : (tabActive1 === 3)
              ? // 성과 정보
              <>
                <div className='pt-6 px-4'>
                  <p className='text-base font-bold text-color-main'>특허(10)</p>
                </div>
                <div className='list_style01 mt-4'>
                  <ul>
                    {(tempData3?.length > 0) 
                      ? tempData3?.map((e) => {
                        return (<ListItem 
                          key={e.id}
                          title={e.title}
                          contents={<>
                            <p className='text-sm text-color-regular'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                            <p className='text-sm text-color-regular'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            <p className='text-sm text-color-regular'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                          </>}
                          btns={<>
                            <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                            <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                          </>}
                        />);
                      })
                      : <li>
                        <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                      </li>}
                  </ul>
                </div>
                <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => {}} />
              </>
              : (tabActive1 === 4)
                ? // 고용 정보
                <>
                  <div className='list_wrap_style02 grid02 mt-10'>
                    <div>
                      <h4 className='text-base font-bold text-color-dark'>종업원 수</h4>
                      <div className='chart_wrap mt-4'>
                        <ViewChart2 
                          title={{
                            y: '종업원 수(명)',
                            label: '종업원 수',
                          }}
                          color={'#0056B8'}
                          labels={labels2} 
                          datas={tempChartData11}
                        />
                      </div>
                    </div>
                    <div>
                      <h4 className='text-base font-bold text-color-dark'>월별 고용인원</h4>
                      <div className='chart_wrap mt-4'>
                        <ViewChart2 
                          height={300}
                          labels={labels3} 
                          datas={tempChartData12}
                        />
                      </div>
                      <div className='mt-6 text-center'>
                        <select name='' id=''>
                          <option value='2022'>2022</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className='list_wrap_style02 mt-10'>
                    <div>
                      <h4 className='text-base font-bold text-color-dark'>기간별 과제 수행정보</h4>
                      <div className='chart_wrap mt-4'>
                        <ViewChart5 
                          labels={labels4} 
                          lineStartData={'2022-01-01'}
                          lineEndData={'2022-12-31'}
                          barData={tempChartData13} 
                        />
                      </div>
                    </div>
                  </div>
                  <div className='mt-10'>
                    <h4 className="text-base font-bold text-color-dark">과제수행현황: <span className="text-color-main">2020년</span></h4>
                  </div>
                  <div className='list_style01 mt-4'>
                    <ul>
                      {(tempData2?.length > 0) 
                        ? tempData2?.map((e) => {
                          {/* tag - 진행중 : 1 | 종료 : 2 */}
                          return (<ListItem 
                            key={e.id}
                            tag={1}
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
                                <p className='text-sm text-color-regular'>국가과학기술표준분류: <span className='font-medium text-color-main'>{e.division}</span></p>
                                <p className='text-sm text-color-regular'>한글 키워드: <span className='font-medium text-color-main'>{e.keyword}</span></p>
                              </div>
                            </>}
                            btns={<>
                              <a href={`${e.id}`} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-light1'>자세히 보기↗</a>
                            </>}
                          />);
                        })
                        : <li>
                          <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                        </li>
                  
                      }
                    </ul>
                  </div>
                  <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => {}} />
                </>
                : // 뉴스
                <>
                  <div className='list_style03 mt-5'>
                    <ul>
                      {(tempData4?.length > 0)
                        ? tempData4?.map((e) => {
                          return (
                            <ToggleListItem 
                              key={e.id}
                              id={e.id}
                              title={<>
                                <p className='flex-1 text-base font-bold text-color-dark'>{e.title}</p>
                                <div className='text_style01 flex items-center gap-4'>
                                  <div>
                                    <p className='text-sm text-color-regular'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                                    <p className='text-sm text-color-regular'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                                  </div>
                                  <a href={e.link} className='h-5 px-1.5 rounded-sm text-xs font-medium text-color-white bg-color-footer' target='_blank' rel='noreferrer' title={`새창이동, ${e.title} 원문 페이지`}>원문 보기↗</a>
                                </div>
                              </>}
                              contents={<>
                                <WordClouds />
                              </>}
                            />
                          );
                        })
                        : <li className='nodata'>
                          <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                        </li>
                      }
                    </ul>
                  </div>
                  <Button name='더보기 +' className='h-10 px-4 mt-4 mx-auto rounded text-base font-bold btn_style05' onClick={() => {}} />
                </>
      }
    </ViewLayout>
  );
}