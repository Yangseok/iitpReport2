import React, { useEffect, useState } from 'react';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading, getSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import common from 'Utill';
import parse from 'html-react-parser';

export default function DiscoveryResult() {

  const dispatch = useDispatch();
  const keyword = useSelector(getSearchKeyword);
  const [tabCount, setTabCount] = useState({});
  const [project, setProject] = useState([]);
  const [patent, setPatent] = useState([]);
  const [paper, setPaper] = useState([]);
  const [ict, setIct] = useState([]);
  const [policy, setPolicy] = useState([]);
  const [researcher, setResearcher] = useState([]);
  const [orgn, setOrgn] = useState([]);
  const [news, setNews] = useState([]);

  const [searchButtonClick, setSearchButtonClick] = useState(false);

  useEffect(() => {
    (async () => {
      let data = [];
      try {
        dispatch(setLoading(true));
        data = await discoveryAPI.searchAll(keyword,4);
      } catch (e) {
        console.warn(e);
      } finally {
        dispatch(setLoading(false));  
      }
      
      console.log(data?.data?.result);
      let projectData = [];
      for (let i in data?.data?.result?.dataInfo?.projectOut ?? []) {
        if (i > 1) continue;
        const period = data?.data?.result?.dataInfo?.projectOut?.[i]?.period ?? '';
        projectData.push({
          id: data?.data?.result?.dataInfo?.projectOut?.[i]?.projectNumber ?? i,
          tab: '국가R&D',
          title: parse(data?.data?.result?.dataInfo?.projectOut?.[i]?.title ?? ''),
          price: common.setPriceInput(data?.data?.result?.dataInfo?.projectOut?.[i]?.fund ?? '') + '원',
          period: period.replaceAll('-','.'), 
          agency: parse(data?.data?.result?.dataInfo?.projectOut?.[i]?.researchAgencyName ?? ''),
          name: parse(data?.data?.result?.dataInfo?.projectOut?.[i]?.researchManagerName ?? ''),
        });
      }
      for (let i in data?.data?.result?.dataInfo?.projectIn ?? []) {
        if (i > 1) continue;
        const period = data?.data?.result?.dataInfo?.projectIn?.[i]?.period ?? '';
        projectData.push({
          id: data?.data?.result?.dataInfo?.projectIn?.[i]?.projectNumber ?? i,
          tab: 'IITP내부',
          title: parse(data?.data?.result?.dataInfo?.projectIn?.[i]?.title ?? ''),
          price: common.setPriceInput(data?.data?.result?.dataInfo?.projectIn?.[i]?.fund ?? '') + '원',
          period: period.replaceAll('-','.'), 
          agency: parse(data?.data?.result?.dataInfo?.projectIn?.[i]?.researchAgencyName ?? ''),
          name: parse(data?.data?.result?.dataInfo?.projectIn?.[i]?.researchManagerName ?? ''),
        });
      }

      
      let patentData = [];
      for (let i in data?.data?.result?.dataInfo?.patent ?? []) {
        const agency = data?.data?.result?.dataInfo?.patent?.[i]?.applicantName ?? [];
        const name = data?.data?.result?.dataInfo?.patent?.[i]?.inventorName ?? [];
        const date = data?.data?.result?.dataInfo?.patent?.[i]?.applDate ?? '';
        patentData.push({
          id: common.deHighlight(data?.data?.result?.dataInfo?.patent?.[i]?.applNumber ?? i),
          title: parse(data?.data?.result?.dataInfo?.patent?.[i]?.title ?? ''),
          project: parse(data?.data?.result?.dataInfo?.patent?.[i]?.projectName ?? ''),
          division: data?.data?.result?.dataInfo?.patent?.[i]?.type ?? '',
          num: parse(data?.data?.result?.dataInfo?.patent?.[i]?.applNumber ?? ''),
          date: date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
          agency: agency.join(', '),
          name: name.join(', '),
        });
      }

      let paperData = [];
      for (let i in data?.data?.result?.dataInfo?.paper ?? []) {
        const agency = data?.data?.result?.dataInfo?.paper?.[i]?.affiliation ?? [];
        const name = data?.data?.result?.dataInfo?.paper?.[i]?.author ?? [];
        paperData.push({
          id: data?.data?.result?.dataInfo?.paper?.[i]?.id ?? i,
          title: parse(data?.data?.result?.dataInfo?.paper?.[i]?.title ?? ''),
          year: data?.data?.result?.dataInfo?.paper?.[i]?.year ?? '',
          division: data?.data?.result?.dataInfo?.paper?.[i]?.type ?? '',
          agency: agency.join(', '),
          name: name.join(', '),
          journal: parse(data?.data?.result?.dataInfo?.paper?.[i]?.journalTitle ?? ''),
          link: data?.data?.result?.dataInfo?.paper?.[i]?.link ?? '',
        });
      }

      let ictData = [];
      for (let i in data?.data?.result?.dataInfo?.ict_report ?? []) {
        ictData.push({
          id: data?.data?.result?.dataInfo?.ict_report?.[i]?.applNumber ?? i,
          title: parse(data?.data?.result?.dataInfo?.ict_report?.[i]?.title ?? ''),
          content: parse(data?.data?.result?.dataInfo?.ict_report?.[i]?.contents ?? ''),
          date: (data?.data?.result?.dataInfo?.ict_report?.[i]?.publishedDate ?? '').replaceAll('-','.'),
          agency: parse(data?.data?.result?.dataInfo?.ict_report?.[i]?.source ?? ''),
          link: data?.data?.result?.dataInfo?.ict_report?.[i]?.link ?? '',
          view: data?.data?.result?.dataInfo?.ict_report?.[i]?.view ?? '',
        });
      }

      let policyData = [];
      for (let i in data?.data?.result?.dataInfo?.policy ?? []) {
        const date = data?.data?.result?.dataInfo?.policy?.[i]?.publishedDate ?? '';
        const dateArr = date.split(' ');
        policyData.push({
          id: data?.data?.result?.dataInfo?.policy?.[i]?.applNumber ?? i,
          title: parse(data?.data?.result?.dataInfo?.policy?.[i]?.title ?? ''),
          content: parse(data?.data?.result?.dataInfo?.policy?.[i]?.contents ?? ''),
          source: parse(data?.data?.result?.dataInfo?.policy?.[i]?.source ?? ''),
          date: (dateArr[0] ?? '').replaceAll('-','.'),
          link: data?.data?.result?.dataInfo?.policy?.[i]?.link ?? '',
        });
      }

      let researcherData = [];
      for (let i in data?.data?.result?.dataInfo?.indv ?? []) {
        researcherData.push({
          id: data?.data?.result?.dataInfo?.indv?.[i]?.id ?? i,
          name: common.maskingName(data?.data?.result?.dataInfo?.indv?.[i]?.indvName ?? ''),
          agency: data?.data?.result?.dataInfo?.indv?.[i]?.orgn ?? '',
          assign: data?.data?.result?.dataInfo?.indv?.[i]?.projectCount ?? 0,
          link: data?.data?.result?.dataInfo?.indv?.[i]?.link ?? '',
        });
      }

      let orgnData = [];
      for (let i in data?.data?.result?.dataInfo?.orgn ?? []) {
        orgnData.push({
          id: data?.data?.result?.dataInfo?.orgn?.[i]?.id ?? i,
          name: parse(data?.data?.result?.dataInfo?.orgn?.[i]?.orgnName ?? ''),
          assign: data?.data?.result?.dataInfo?.orgn?.[i]?.projectCount ?? 0,
          patent: data?.data?.result?.dataInfo?.orgn?.[i]?.patentCount ?? 0,
          institue: data?.data?.result?.dataInfo?.orgn?.[i]?.researchInstitute ?? '',
          safety: [2,0,1][i%3],
          sales: data?.data?.result?.dataInfo?.orgn?.[i]?.topRankSales ?? '',
          followup: data?.data?.result?.dataInfo?.orgn?.[i]?.orgnVigilance ?? false,
        });
      }

      let newsData = [];
      for (let i in data?.data?.result?.dataInfo?.news ?? []) {
        const date = data?.data?.result?.dataInfo?.news?.[i]?.publishedDate ?? '';
        const dateArr = date.split(' ');
        newsData.push({
          id: i,
          title: parse(data?.data?.result?.dataInfo?.news?.[i]?.title ?? ''),
          content: data?.data?.result?.dataInfo?.news?.[i]?.contents ?? '',
          source: parse(data?.data?.result?.dataInfo?.news?.[i]?.source ?? ''),
          date: (dateArr[0] ?? '').replaceAll('-','.'),
          link: data?.data?.result?.dataInfo?.news?.[i]?.link ?? '',
          wordCloud: data?.data?.result?.dataInfo?.news?.[i]?.similarity ?? [],
        });
      }

      setTabCount({
        'all': data?.data?.result?.countInfo?.all ?? 0,
        1: data?.data?.result?.countInfo?.project ?? 0,
        2: data?.data?.result?.countInfo?.patent ?? 0,
        3: data?.data?.result?.countInfo?.paper ?? 0,
        4: data?.data?.result?.countInfo?.ict_report ?? 0,
        5: data?.data?.result?.countInfo?.policy ?? 0,
        6: data?.data?.result?.countInfo?.indv ?? 0,
        7: data?.data?.result?.countInfo?.orgn ?? 0,
        8: data?.data?.result?.countInfo?.news ?? 0,
      });
      setProject(projectData);
      setPatent(patentData);
      setPaper(paperData);
      setIct(ictData);
      setPolicy(policyData);
      setResearcher(researcherData);
      setOrgn(orgnData);
      setNews(newsData);
      setSearchButtonClick(false);
    })();
  }, [keyword, searchButtonClick]);

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} setSearchButtonClick={setSearchButtonClick} >
      <section className='mt-6'>
        <div className='container'>
          <div className='list_wrap_style01'>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>과제</h4>
                <a href={'/search/result/projectout?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(project?.length > 0)
                    ? project?.map((e, i) => {
                      let link = '';
                      if (i === 0 || i === 1) {
                        link = `/view/projectout/${e.id}`;
                      } else {
                        link = `/view/projectin/${e.id}`;
                      }

                      return <li key={e.id}>
                        <a href={link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 상세 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>[{e.tab}] {e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>총연구개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                            <p className='text-sm text-color-regular line1_text'>총연구개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                            <p className='text-sm text-color-regular line1_text'>주관연구개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>특허</h4>
                <a href={'/search/result/patent?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(patent?.length > 0)
                    ? patent?.map((e) => {
                      return <li key={e.id}>
                        <a href={`/view/patent/${e.id}`} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 상세 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            {(e.project && e.project.length > 0) ? <p className='text-sm text-color-regular line1_text'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p> : null}
                            <p className='text-sm text-color-regular line1_text'>출원등록구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출원(등록)번호: <span className='font-medium text-color-main'>{e.num}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출원(등록)일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출원(등록)인: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>발명자: <span className='font-medium text-color-main'>{e.name}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>논문</h4>
                <a href={'/search/result/paper?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(paper?.length > 0)
                    ? paper?.map((e) => {
                      return <li key={e.id}>
                        <a href={`/view/paper/${e.id}`} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 상세 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>발행년도: <span className='font-medium text-color-main'>{e.year}</span></p>
                            <p className='text-sm text-color-regular line1_text'>논문 구분: <span className='font-medium text-color-main'>{e.division}</span></p>
                            <p className='text-sm text-color-regular line1_text'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>주 저자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            <p className='text-sm text-color-regular line1_text'>학술지/학술대회명: <span className='font-medium text-color-main'>{e.journal}</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>ICT 자료</h4>
                <a href={'/search/result/ict?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(ict?.length > 0)
                    ? ict?.map((e) => {
                      return <li key={e.id}>
                        {(e.link !== '')
                          ? <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.title}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              <p className='text-sm text-color-regular line1_text'>발행기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular line1_text'>발행일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            </div>
                          </a>
                          : <div className='py-3.5 px-4'>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.title}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              <p className='text-sm text-color-regular line1_text'>발행기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular line1_text'>발행일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            </div>
                          </div>
                        }
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>정부정책</h4>
                <a href={'/search/result/policy?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(policy?.length > 0)
                    ? policy?.map((e) => {
                      return <li key={e.id}>
                        {(e.link !== '')
                          ? <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.title}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                              <p className='text-sm text-color-regular line1_text'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            </div>
                          </a>
                          : <div className='py-3.5 px-4'>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.title}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                              <p className='text-sm text-color-regular line1_text'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            </div>
                          </div>
                        }
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>연구자</h4>
                <a href={'/search/result/researcher?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(researcher?.length > 0)
                    ? researcher?.map((e) => {
                      let link = e.link ?? '';
                      if (link !== '') link = 'https://' + link;

                      return <li key={e.id}>
                        {(link !== '')
                          ? <a href={link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.name} 연구자 페이지`}>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.name}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              {(e.agency !== '') ? <p className='text-sm text-color-regular line1_text'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p> : null}
                              <p className='text-sm text-color-regular line1_text'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                            </div>
                          </a>
                          : <div className='py-3.5 px-4'>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.name}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              <p className='text-sm text-color-regular line1_text'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                              <p className='text-sm text-color-regular line1_text'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                            </div>
                          </div>
                        }
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>기관</h4>
                <a href={'/search/result/orgn?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(orgn?.length > 0)
                    ? orgn?.map((e) => {
                      return <li key={e.id}>
                        <a href={`/view/orgn/${e.id}`} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.name} 기관 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.name}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
                            <p className='text-sm text-color-regular line1_text'>특허: <span className='font-medium text-color-main'>{e.patent}건</span></p>
                          </div>
                        </a>
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
            <div>
              <div className='tit_box'>
                <h4 className='text-base font-bold text-color-thick'>뉴스</h4>
                <a href={'/search/result/news?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(news?.length > 0)
                    ? news?.map((e) => {
                      return <li key={e.id}>
                        {(e.link !== '')
                          ? <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.title}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                              <p className='text-sm text-color-regular line1_text'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            </div>
                          </a>
                          : <div className='py-3.5 px-4'>
                            <p className='text-base text-color-thick line1_text'>
                              <strong className='font-medium'>{e.title}</strong>
                            </p>
                            <div className='text_style01 mt-0.5 line1_text'>
                              <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                              <p className='text-sm text-color-regular line1_text'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
                            </div>
                          </div>
                        }
                      </li>;
                    })
                    : <li className='nodata'>
                      <p className='text-base text-color-placeholder'>데이터가 없습니다.</p>
                    </li>
                  }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}
