import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'Domain/Home/Main/Page/Main';
import Login from 'Domain/Home/Login/Page/Main';
import Policy from 'Domain/Home/Main/Page/Policy';
import Agree from 'Domain/Home/Main/Page/Agree';
import ServiceGuide from 'Domain/Home/Main/Page/ServiceGuide';
import Discovery from 'Domain/Home/Discovery/Page/Main';
import DiscoveryResultAll from 'Domain/Home/Discovery/Page/Result/All';
import ListWrap from 'Domain/Home/Common/Componet/ListWrap';
import Search from 'Domain/Home/Discovery/Page/Search';
import ViewProjectOut from 'Domain/Home/Discovery/Page/View/ProjectOut';
import ViewProjectIn from 'Domain/Home/Discovery/Page/View/ProjectIn';
import ViewPatent from 'Domain/Home/Discovery/Page/View/Patent';
import ViewPaper from 'Domain/Home/Discovery/Page/View/Paper';
import ViewOrgn from 'Domain/Home/Discovery/Page/View/Orgn';
import DemandBanking from 'Domain/Home/DemandBanking/Page/Main';
import DemandBankingResult from 'Domain/Home/DemandBanking/Page/Result';
import DemandBankingView from 'Domain/Home/DemandBanking/Page/View';
import DemandBankingMerge from 'Domain/Home/DemandBanking/Page/Merge';
import ICTTrend from 'Domain/Home/ICTTrend/Page/Main';
import PageNotFound from 'Domain/Home/Common/ErrorPage/404';

export default function Router() {

  let list = [{
    id: 0,
    path: 'projectout',
    filterKey: 'search/projectOut',
    searchDetailKey: 0
  },{
    id: 1,
    path: 'projectin',
    filterKey: 'search/projectIn',
    searchDetailKey: 0
  },{
    id: 2,
    path: 'patent',
    filterKey: 'search/patent',
    searchDetailKey: 1
  },{
    id: 3,
    path: 'paper',
    filterKey: 'search/paper',
    searchDetailKey: 2
  },{
    id: 4,
    path: 'ict',
    filterKey: 'search/ict',
    searchDetailKey: 3
  },{
    id: 5,
    path: 'policy',
    filterKey: 'search/policy',
    searchDetailKey: 4
  },{
    id: 6,
    path: 'researcher',
    filterKey: 'search/indv',
    searchDetailKey: 5
  },{
    id: 7,
    path: 'orgn',
    filterKey: 'search/orgn',
    searchDetailKey: 6
  },{
    id: 8,
    path: 'news',
    filterKey: 'search/news',
    searchDetailKey: 7
  }];

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='/agree' element={<Agree />} />
        <Route path='/service' element={<ServiceGuide />} />
        <Route path='/discovery' element={<Discovery />} />
        <Route path='/discovery/:se2' element={<Discovery />} />
        <Route path='/discovery/:se2/result' element={<Discovery />} />
        {list.map((e) => {
          return <Route key={e.id} path={'/discovery/:se2/result/' + e.path} element={<ListWrap filterKey={e.filterKey} searchDetailKey={e.searchDetailKey} />} />;
        })}
        <Route path='/search' element={<Search searchInit={true} />} />
        <Route path='/search/result/all' element={<DiscoveryResultAll />} />
        {list.map((e) => {
          return <Route key={e.id} path={'/search/result/' + e.path} element={<ListWrap filterKey={e.filterKey} searchDetailKey={e.searchDetailKey} />} />;
        })}
        <Route path='/view/projectout/:id' element={<ViewProjectOut />} />
        <Route path='/view/projectin/:id' element={<ViewProjectIn />} />
        <Route path='/view/patent/:id' element={<ViewPatent />} />
        <Route path='/view/paper/:id' element={<ViewPaper />} />
        <Route path='/view/orgn/:id' element={<ViewOrgn />} />
        <Route path='/demandbanking' element={<DemandBanking />} />
        <Route path='/demandbanking/result' element={<DemandBankingResult />} />
        <Route path='/demandbanking/view/:noticeId/:surveyId' element={<DemandBankingView />} />
        <Route path='/demandbanking/merge/:surveyId' element={<DemandBankingMerge />} />
        {list.map((e) => {
          return <Route key={e.id} path={'/demandbanking/file/:noticeId/:surveyId/result/' + e.path} element={<ListWrap filterKey={e.filterKey} searchDetailKey={e.searchDetailKey} />} />;
        })}
        <Route path='/icttrend' element={<ICTTrend />} />
        <Route path='/icttrend/:se2' element={<ICTTrend />} />
        <Route path='/icttrend/:se2/result' element={<ICTTrend />} />
        {list.map((e) => {
          return <Route key={e.id} path={'/icttrend/:se2/result/' + e.path} element={<ListWrap filterKey={e.filterKey} searchDetailKey={e.searchDetailKey} />} />;
        })}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
