import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from 'Domain/Home/Main/Page/Main';
import Login from 'Domain/Home/Login/Page/Main';
import Discovery from 'Domain/Home/Discovery/Page/Main';
import DiscoveryResultAll from 'Domain/Home/Discovery/Page/Result/All';
import DiscoveryResultProjectOut from 'Domain/Home/Discovery/Page/Result/ProjectOut';
import DiscoveryResultProjectIn from 'Domain/Home/Discovery/Page/Result/ProjectIn';
import DiscoveryResultPatent from 'Domain/Home/Discovery/Page/Result/Patent';
import DiscoveryResultPaper from 'Domain/Home/Discovery/Page/Result/Paper';
import DiscoveryResultIct from 'Domain/Home/Discovery/Page/Result/Ict';
import DiscoveryResultPolicy from 'Domain/Home/Discovery/Page/Result/Policy';
import DiscoveryResultResearcher from 'Domain/Home/Discovery/Page/Result/Researcher';
import DiscoveryResultOrgn from 'Domain/Home/Discovery/Page/Result/Orgn';
import DiscoveryResultNews from 'Domain/Home/Discovery/Page/Result/News';
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
import ICTTrendResultProjectOut from 'Domain/Home/ICTTrend/Page/Result/ProjectOut';
import ICTTrendResultProjectIn from 'Domain/Home/ICTTrend/Page/Result/ProjectIn';
import ICTTrendResultPatent from 'Domain/Home/ICTTrend/Page/Result/Patent';
import ICTTrendResultPaper from 'Domain/Home/ICTTrend/Page/Result/Paper';
import ICTTrendResultIct from 'Domain/Home/ICTTrend/Page/Result/Ict';
import ICTTrendResultPolicy from 'Domain/Home/ICTTrend/Page/Result/Policy';
import ICTTrendResultNews from 'Domain/Home/ICTTrend/Page/Result/News';
import PageNotFound from 'Domain/Home/Common/ErrorPage/404';
import Counter from 'Domain/Home/Sample/Page/Counter';
import Modal1 from 'Domain/Home/Sample/Page/Modal1';
import Modal2 from 'Domain/Home/Sample/Page/Modal2';
import Modal3 from 'Domain/Home/Sample/Page/Modal3';
import Graph1 from 'Domain/Home/Sample/Page/Graph1';
import Graph38 from 'Domain/Home/Sample/Page/Graph38';
import Graph2 from 'Domain/Home/Sample/Page/Graph2';
import Graph3 from 'Domain/Home/Sample/Page/Graph3';
import Graph32 from 'Domain/Home/Sample/Page/Graph32';
import Graph33 from 'Domain/Home/Sample/Page/Graph33';
import Graph34 from 'Domain/Home/Sample/Page/Graph34';
import Graph35 from 'Domain/Home/Sample/Page/Graph35';
import Graph36 from 'Domain/Home/Sample/Page/Graph36';
import Graph37 from 'Domain/Home/Sample/Page/Graph37';
import Graph39 from 'Domain/Home/Sample/Page/Graph39';
import Graph40 from 'Domain/Home/Sample/Page/Graph40';
import Graph4 from 'Domain/Home/Sample/Page/Graph4';
import TreeMap from 'Domain/Home/Sample/Page/TreeMap';
import TreeMap2 from 'Domain/Home/Sample/Page/TreeMap2';
import WordCloud1 from 'Domain/Home/Sample/Page/WordCloud1';
import WordCloud2 from 'Domain/Home/Sample/Page/WordCloud2';
import APITest from 'Domain/Home/Sample/Page/APITest';
import Styles from 'Domain/Home/Sample/Page/Styles';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/login' element={<Login />} />
        <Route path='/discovery' element={<Discovery />} />
        <Route path='/discovery/:se2' element={<Discovery />} />
        <Route path='/discovery/:se2/result' element={<Discovery />} />
        <Route path='/discovery/:se2/result/projectout' element={<DiscoveryResultProjectOut />} />
        <Route path='/discovery/:se2/result/projectin' element={<DiscoveryResultProjectIn />} />
        <Route path='/discovery/:se2/result/patent' element={<DiscoveryResultPatent />} />
        <Route path='/discovery/:se2/result/paper' element={<DiscoveryResultPaper />} />
        <Route path='/discovery/:se2/result/ict' element={<DiscoveryResultIct />} />
        <Route path='/discovery/:se2/result/policy' element={<DiscoveryResultPolicy />} />
        <Route path='/discovery/:se2/result/researcher' element={<DiscoveryResultResearcher />} />
        <Route path='/discovery/:se2/result/orgn' element={<DiscoveryResultOrgn />} />
        <Route path='/discovery/:se2/result/news' element={<DiscoveryResultNews />} />
        <Route path='/search' element={<Search />} />
        <Route path='/search/result/all' element={<DiscoveryResultAll />} />
        <Route path='/search/result/projectout' element={<DiscoveryResultProjectOut />} />
        <Route path='/search/result/projectin' element={<DiscoveryResultProjectIn />} />
        <Route path='/search/result/patent' element={<DiscoveryResultPatent />} />
        <Route path='/search/result/paper' element={<DiscoveryResultPaper />} />
        <Route path='/search/result/ict' element={<DiscoveryResultIct />} />
        <Route path='/search/result/policy' element={<DiscoveryResultPolicy />} />
        <Route path='/search/result/researcher' element={<DiscoveryResultResearcher />} />
        <Route path='/search/result/orgn' element={<DiscoveryResultOrgn />} />
        <Route path='/search/result/news' element={<DiscoveryResultNews />} />
        <Route path='/view/projectout/:id' element={<ViewProjectOut />} />
        <Route path='/view/projectin/:id' element={<ViewProjectIn />} />
        <Route path='/view/patent/:id' element={<ViewPatent />} />
        <Route path='/view/paper/:id' element={<ViewPaper />} />
        <Route path='/view/orgn/:id' element={<ViewOrgn />} />
        <Route path='/demandbanking' element={<DemandBanking />} />
        <Route path='/demandbanking/result' element={<DemandBankingResult />} />
        <Route path='/demandbanking/view/:id' element={<DemandBankingView />} />
        <Route path='/demandbanking/merge/:id' element={<DemandBankingMerge />} />
        <Route path='/icttrend' element={<ICTTrend />} />
        <Route path='/icttrend/:se2' element={<ICTTrend />} />
        <Route path='/icttrend/:se2/result' element={<ICTTrend />} />
        <Route path='/icttrend/:se2/result/projectout' element={<ICTTrendResultProjectOut />} />
        <Route path='/icttrend/:se2/result/projectin' element={<ICTTrendResultProjectIn />} />
        <Route path='/icttrend/:se2/result/patent' element={<ICTTrendResultPatent />} />
        <Route path='/icttrend/:se2/result/paper' element={<ICTTrendResultPaper />} />
        <Route path='/icttrend/:se2/result/ict' element={<ICTTrendResultIct />} />
        <Route path='/icttrend/:se2/result/policy' element={<ICTTrendResultPolicy />} />
        <Route path='/icttrend/:se2/result/news' element={<ICTTrendResultNews />} />
        <Route path='/sample/redux' element={<Counter />} />
        <Route path='/sample/modal1' element={<Modal1 />} />
        <Route path='/sample/modal2' element={<Modal2 />} />
        <Route path='/sample/modal3' element={<Modal3 />} />
        <Route path='/sample/graph1' element={<Graph1 />} />
        <Route path='/sample/graph38' element={<Graph38 />} />
        <Route path='/sample/graph2' element={<Graph2 />} />
        <Route path='/sample/graph3' element={<Graph3 />} />
        <Route path='/sample/graph32' element={<Graph32 />} />
        <Route path='/sample/graph33' element={<Graph33 />} />
        <Route path='/sample/graph34' element={<Graph34 />} />
        <Route path='/sample/graph35' element={<Graph35 />} />
        <Route path='/sample/graph36' element={<Graph36 />} />
        <Route path='/sample/graph37' element={<Graph37 />} />
        <Route path='/sample/graph39' element={<Graph39 />} />
        <Route path='/sample/graph40' element={<Graph40 />} />
        <Route path='/sample/graph4' element={<Graph4 />} />
        <Route path='/sample/treemap' element={<TreeMap />} />
        <Route path='/sample/treemap2' element={<TreeMap2 />} />
        <Route path='/sample/wordcloud1' element={<WordCloud1 />} />
        <Route path='/sample/wordcloud2' element={<WordCloud2 />} />
        <Route path='/sample/apitest' element={<APITest />} />
        <Route path='/sample/styles' element={<Styles />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
