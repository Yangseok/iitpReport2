import React, { useEffect, useState } from 'react';
import DiscoveryResultLayout from 'Domain/Home/Discovery/Layout/DiscoveryResultLayout';
import { useSelector, useDispatch } from 'react-redux';
import { getSearchKeyword } from 'Domain/Home/Common/Status/CommonSlice';
import { setLoading } from 'Domain/Home/Common/Status/CommonSlice';
import * as discoveryAPI from 'Domain/Home/Discovery/API/Call';
import common from 'Utill';

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

  useEffect(() => {
    (async () => {
      let data = [];
      try {
        dispatch(setLoading(true));
        // console.log('recommend call');
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
          title: data?.data?.result?.dataInfo?.projectOut?.[i]?.title ?? '',
          price: (data?.data?.result?.dataInfo?.projectOut?.[i]?.fund ?? '') + '억',
          period: period.replaceAll('-','.'), 
          agency: data?.data?.result?.dataInfo?.projectOut?.[i]?.researchAgencyName ?? '',
          name: data?.data?.result?.dataInfo?.projectOut?.[i]?.researchManagerName ?? '',
        });
      }
      for (let i in data?.data?.result?.dataInfo?.projectIn ?? []) {
        if (i > 1) continue;
        const period = data?.data?.result?.dataInfo?.projectIn?.[i]?.period ?? '';
        projectData.push({
          id: data?.data?.result?.dataInfo?.projectIn?.[i]?.projectNumber ?? i,
          tab: 'IITP내부',
          title: data?.data?.result?.dataInfo?.projectIn?.[i]?.title ?? '',
          price: (data?.data?.result?.dataInfo?.projectIn?.[i]?.fund ?? '') + '억',
          period: period.replaceAll('-','.'), 
          agency: data?.data?.result?.dataInfo?.projectIn?.[i]?.researchAgencyName ?? '',
          name: data?.data?.result?.dataInfo?.projectIn?.[i]?.researchManagerName ?? '',
        });
      }

      
      let patentData = [];
      for (let i in data?.data?.result?.dataInfo?.patent ?? []) {
        const agency = data?.data?.result?.dataInfo?.patent?.[i]?.applicantName ?? [];
        const name = data?.data?.result?.dataInfo?.patent?.[i]?.inventorName ?? [];
        const date = data?.data?.result?.dataInfo?.patent?.[i]?.applDate ?? '';
        patentData.push({
          id: data?.data?.result?.dataInfo?.patent?.[i]?.applNumber ?? i,
          title: data?.data?.result?.dataInfo?.patent?.[i]?.title ?? '',
          project: data?.data?.result?.dataInfo?.patent?.[i]?.projectName ?? '',
          division: data?.data?.result?.dataInfo?.patent?.[i]?.type ?? '',
          num: data?.data?.result?.dataInfo?.patent?.[i]?.applNumber ?? '',
          date: date.replace(/^(\d{4})(\d{2})(\d{2})$/, '$1.$2.$3'),
          agency: agency.join(', '),
          name: name.join(', '),
          link: '#',
        });
      }

      let paperData = [];
      for (let i in data?.data?.result?.dataInfo?.paper ?? []) {
        const agency = data?.data?.result?.dataInfo?.paper?.[i]?.affiliation ?? [];
        const name = data?.data?.result?.dataInfo?.paper?.[i]?.author ?? [];
        paperData.push({
          id: data?.data?.result?.dataInfo?.paper?.[i]?.id ?? i,
          title: data?.data?.result?.dataInfo?.paper?.[i]?.title ?? '',
          year: data?.data?.result?.dataInfo?.paper?.[i]?.year ?? '',
          division: data?.data?.result?.dataInfo?.paper?.[i]?.type ?? '',
          agency: agency.join(', '),
          name: name.join(', '),
          journal: data?.data?.result?.dataInfo?.paper?.[i]?.journalTitle ?? '',
          link: data?.data?.result?.dataInfo?.paper?.[i]?.link ?? '',
        });
      }

      let ictData = [];
      for (let i in data?.data?.result?.dataInfo?.ict_report ?? []) {
        ictData.push({
          id: data?.data?.result?.dataInfo?.ict_report?.[i]?.applNumber ?? i,
          title: data?.data?.result?.dataInfo?.ict_report?.[i]?.title ?? '',
          content: data?.data?.result?.dataInfo?.ict_report?.[i]?.contents ?? '',
          date: (data?.data?.result?.dataInfo?.ict_report?.[i]?.publishedDate ?? '').replaceAll('-','.'),
          agency: data?.data?.result?.dataInfo?.ict_report?.[i]?.source ?? '',
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
          title: data?.data?.result?.dataInfo?.policy?.[i]?.title ?? '',
          content: data?.data?.result?.dataInfo?.policy?.[i]?.contents ?? '',
          source: data?.data?.result?.dataInfo?.policy?.[i]?.source ?? '',
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
          link: data?.data?.result?.dataInfo?.indv?.[i]?.link ?? '#',
        });
      }

      let orgnData = [];
      for (let i in data?.data?.result?.dataInfo?.orgn ?? []) {
        orgnData.push({
          id: data?.data?.result?.dataInfo?.orgn?.[i]?.id ?? i,
          name: data?.data?.result?.dataInfo?.orgn?.[i]?.orgnName ?? '',
          assign: data?.data?.result?.dataInfo?.orgn?.[i]?.projectCount ?? 0,
          patent: data?.data?.result?.dataInfo?.orgn?.[i]?.patentCount ?? 0,
          link: '#',
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
          title: data?.data?.result?.dataInfo?.news?.[i]?.title ?? '',
          content: data?.data?.result?.dataInfo?.news?.[i]?.contents ?? '',
          source: data?.data?.result?.dataInfo?.news?.[i]?.source ?? '',
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
    })();
  }, [keyword]);

  // const tempData1 = [
  //   {
  //     id: 0,
  //     tab: '국가R&D',
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발 개발 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //   },
  //   {
  //     id: 1,
  //     tab: '국가R&D',
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //   },
  //   {
  //     id: 2,
  //     tab: 'IITP내부',
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //   },
  //   {
  //     id: 3,
  //     tab: 'IITP내부',
  //     title: '인공지능 학습 및 디지털 트윈을 위한 3차원 데이터 수집·전처리 및 가공 플랫폼 개발',
  //     price: '10억',
  //     period: '2023.04.01 ~ 2024.04.30',
  //     agency: '주식회사 오름',
  //     name: '홍길동',
  //   },
  // ];
  // const tempData2 = [
  //   {
  //     id: 0,
  //     title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
  //     project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
  //     division: '출원',
  //     num: '1020200077142',
  //     date: '2021.01.08',
  //     agency: '행정안전부국립재난안전연구원',
  //     name: '홍길동',
  //     link: '#',
  //   },
  //   {
  //     id: 1,
  //     title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
  //     project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
  //     division: '출원',
  //     num: '1020200077142',
  //     date: '2021.01.08',
  //     agency: '행정안전부국립재난안전연구원',
  //     name: '홍길동',
  //     link: '#',
  //   },
  //   {
  //     id: 2,
  //     title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
  //     project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
  //     division: '출원',
  //     num: '1020200077142',
  //     date: '2021.01.08',
  //     agency: '행정안전부국립재난안전연구원',
  //     name: '홍길동',
  //     link: '#',
  //   },
  //   {
  //     id: 3,
  //     title: '드론을 이용한 인공지능 기반 재난 피해정보 탐지 방법 및 시스템',
  //     project: 'AI기술을 활용한 공공데이터 기반 지역현안 솔루션 개발 및 실용화(안전·안심사회 실현을 위한 실증연구 중심으로)',
  //     division: '출원',
  //     num: '1020200077142',
  //     date: '2021.01.08',
  //     agency: '행정안전부국립재난안전연구원',
  //     name: '홍길동',
  //     link: '#',
  //   },
  // ];
  // const tempData3 = [
  //   {
  //     id: 0,
  //     title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
  //     year: '2021',
  //     division: '학술지',
  //     agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
  //     name: '홍길동',
  //     journal: '한국게임학회논문지',
  //     link: '#',
  //   },
  //   {
  //     id: 1,
  //     title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
  //     year: '2021',
  //     division: '학술지',
  //     agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
  //     name: '홍길동',
  //     journal: '한국게임학회논문지',
  //     link: '#',
  //   },
  //   {
  //     id: 2,
  //     title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
  //     year: '2021',
  //     division: '학술지',
  //     agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
  //     name: '홍길동',
  //     journal: '한국게임학회논문지',
  //     link: '#',
  //   },
  //   {
  //     id: 3,
  //     title: '인터랙티브한 애니메이션 캐릭터 제작을 위한 인공지능 미들웨어 설계',
  //     year: '2021',
  //     division: '학술지',
  //     agency: '주경인교육대학교/ 금촌초등학교/ 장명초등학교',
  //     name: '홍길동',
  //     journal: '한국게임학회논문지',
  //     link: '#',
  //   },
  // ];
  // const tempData4 = [
  //   {
  //     id: 0,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     agency: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //     view: null,
  //   },
  //   {
  //     id: 1,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     agency: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //     view: '#',
  //   },
  //   {
  //     id: 2,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     agency: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //     view: null,
  //   },
  //   {
  //     id: 3,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     agency: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //     view: '#',
  //   },
  // ];
  // const tempData5 = [
  //   {
  //     id: 0,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     source: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //   },
  //   {
  //     id: 1,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     source: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //   },
  //   {
  //     id: 2,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     source: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //   },
  //   {
  //     id: 3,
  //     title: '싱가포르 인공지능 진출가이드 2023',
  //     source: '정보통신기획평가원',
  //     date: '2023.06.08',
  //     content: '싱가포르 국립연구재단, 디지털 경제 혁신을 위해 250억 싱가포르 달러 투자 계획 • 인공지능을 비롯해 5G, 사이버보안 등 디지털 경제 구축을 위한 투자 진행 - 싱가포르 국립연구재단(NRF)는 2025년까지 싱가포르 주요 국가 주도 연구개발계획을 발표, 디지털 경제 혁신을 위해 최대 규모의 연구개발 투자를 진행할 예정 - 특히 항공 및 항만 시스템 분야에서 ...',
  //     link: '#',
  //   },
  // ];
  // const tempData6 = [
  //   {
  //     id: 0,
  //     name: '장*탁',
  //     agency: '서울대학교',
  //     assign: '43',
  //     link: '#',
  //   },
  //   {
  //     id: 1,
  //     name: '장*탁',
  //     agency: '서울대학교',
  //     assign: '43',
  //     link: '#',
  //   },
  //   {
  //     id: 2,
  //     name: '장*탁',
  //     agency: '서울대학교',
  //     assign: '43',
  //     link: '#',
  //   },
  //   {
  //     id: 3,
  //     name: '장*탁',
  //     agency: '서울대학교',
  //     assign: '43',
  //     link: '#',
  //   },
  // ];
  // const tempData7 = [
  //   {
  //     id: 0,
  //     name: '주식회사 마인즈랩(MINDS LAB., INC.)',
  //     assign: '10',
  //     patent: '10',
  //     link: '#',
  //     institue: null,
  //     safety: 2,
  //     sales: 10,
  //     followup: true,
  //   },
  //   {
  //     id: 1,
  //     name: '주식회사 마인즈랩(MINDS LAB., INC.)',
  //     assign: '43',
  //     patent: '10',
  //     link: '#',
  //     institue: 'OOO연구소',
  //     safety: 0,
  //     sales: 5,
  //     followup: false,
  //   },
  //   {
  //     id: 2,
  //     name: '주식회사 마인즈랩(MINDS LAB., INC.)',
  //     assign: '10',
  //     patent: '10',
  //     link: '#',
  //     institue: 'OOO연구소',
  //     safety: 1,
  //     sales: 25,
  //     followup: true,
  //   },
  //   {
  //     id: 3,
  //     name: '주식회사 마인즈랩(MINDS LAB., INC.)',
  //     assign: '10',
  //     patent: '10',
  //     link: '#',
  //     institue: null,
  //     safety: 2,
  //     sales: 10,
  //     followup: true,
  //   },
  // ];
  // const tempData8 = [
  //   {
  //     id: 0,
  //     title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
  //     link: '#',
  //     source: '서울신문',
  //     date: '2023.06.08',
  //   },
  //   {
  //     id: 1,
  //     title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
  //     link: '#',
  //     source: '서울신문',
  //     date: '2023.06.08',
  //   },
  //   {
  //     id: 2,
  //     title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
  //     link: '#',
  //     source: '서울신문',
  //     date: '2023.06.08',
  //   },
  //   {
  //     id: 3,
  //     title: 'AGI 예고한 ‘챗GPT 아버지’… “내가 인간인지 증명해야 할 시대 올 것”',
  //     link: '#',
  //     source: '서울신문',
  //     date: '2023.06.08',
  //   },
  // ];

  return (
    <DiscoveryResultLayout totalCount={tabCount?.all} tabCount={tabCount} keyword={keyword} >
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
                    ? project?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.id} className='block'>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>[{e.tab}] {e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>연구 개발비: <span className='font-medium text-color-main'>{e.price}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구 개발기간: <span className='font-medium text-color-main'>{e.period}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구 개발기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>연구 책임자: <span className='font-medium text-color-main'>{e.name}</span></p>
                            
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
                        <a href={e.id} className='block'>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>유발 과제: <span className='font-medium text-color-main'>{e.project}</span></p>
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
                        <a href={e.id} className='block'>
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
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>발행기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>발행일: <span className='font-medium text-color-main'>{e.date}</span></p>
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
                <h4 className='text-base font-bold text-color-thick'>정부정책</h4>
                <a href={'/search/result/policy?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(policy?.length > 0)
                    ? policy?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                            <p className='text-sm text-color-regular line1_text'>작성일: <span className='font-medium text-color-main'>{e.date}</span></p>
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
                <h4 className='text-base font-bold text-color-thick'>연구자</h4>
                <a href={'/search/result/researcher?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(researcher?.length > 0)
                    ? researcher?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.name} 연구자 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.name}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>소속기관: <span className='font-medium text-color-main'>{e.agency}</span></p>
                            <p className='text-sm text-color-regular line1_text'>과제: <span className='font-medium text-color-main'>{e.assign}건</span></p>
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
                <h4 className='text-base font-bold text-color-thick'>기관</h4>
                <a href={'/search/result/orgn?keyword=' + keyword} className='text-base font-bold text-color-footer'>더보기</a>
              </div>
              <div className='list_style04'>
                <ul>
                  {(orgn?.length > 0)
                    ? orgn?.map((e) => {
                      return <li key={e.id}>
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.name} 기관 페이지`}>
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
                        <a href={e.link} className='block' target='_blank' rel="noreferrer" title={`새창이동, ${e.title} 원문 페이지`}>
                          <p className='text-base text-color-thick line1_text'>
                            <strong className='font-medium'>{e.title}</strong>
                          </p>
                          <div className='text_style01 mt-0.5 line1_text'>
                            <p className='text-sm text-color-regular line1_text'>출처: <span className='font-medium text-color-main'>{e.source}</span></p>
                            <p className='text-sm text-color-regular line1_text'>출처일: <span className='font-medium text-color-main'>{e.date}</span></p>
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
          </div>
        </div>
      </section>
    </DiscoveryResultLayout>
  );
}
