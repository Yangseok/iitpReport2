import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from 'Domain/Home/Main/Page/Main';
import Discovery from 'Domain/Home/Discovery/Page/Main';
import DemandBanking from 'Domain/Home/DemandBanking/Page/Main';
import ICTTrend from 'Domain/Home/ICTTrend/Page/Main';
import PageNotFound from 'Domain/Home/Common/ErrorPage/404';
import Counter from 'Domain/Home/Sample/Page/Counter';
import Modal1 from "Domain/Home/Sample/Page/Modal1";
import Modal2 from "Domain/Home/Sample/Page/Modal2";
import Modal3 from "Domain/Home/Sample/Page/Modal3";
import Graph1 from "Domain/Home/Sample/Page/Graph1";
import Graph2 from "Domain/Home/Sample/Page/Graph2";
import Graph3 from "Domain/Home/Sample/Page/Graph3";
import Graph32 from "Domain/Home/Sample/Page/Graph32";
import Graph33 from "Domain/Home/Sample/Page/Graph33";
import Graph34 from "Domain/Home/Sample/Page/Graph34";
import Graph35 from "Domain/Home/Sample/Page/Graph35";
import Graph4 from "Domain/Home/Sample/Page/Graph4";
import TreeMap from "Domain/Home/Sample/Page/TreeMap";
import TreeMap2 from "Domain/Home/Sample/Page/TreeMap2";
import WordCloud1 from "Domain/Home/Sample/Page/WordCloud1";
import WordCloud2 from "Domain/Home/Sample/Page/WordCloud2";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/discovery' element={<Discovery />} />
        <Route path='/demandbanking' element={<DemandBanking />} />
        <Route path='/icttrend' element={<ICTTrend />} />
        <Route path='/sample/redux' element={<Counter />} />
        <Route path='/sample/modal1' element={<Modal1 />} />
        <Route path='/sample/modal2' element={<Modal2 />} />
        <Route path='/sample/modal3' element={<Modal3 />} />
        <Route path='/sample/graph1' element={<Graph1 />} />
        <Route path='/sample/graph2' element={<Graph2 />} />
        <Route path='/sample/graph3' element={<Graph3 />} />
        <Route path='/sample/graph32' element={<Graph32 />} />
        <Route path='/sample/graph33' element={<Graph33 />} />
        <Route path='/sample/graph34' element={<Graph34 />} />
        <Route path='/sample/graph35' element={<Graph35 />} />
        <Route path='/sample/graph4' element={<Graph4 />} />
        <Route path='/sample/treemap' element={<TreeMap />} />
        <Route path='/sample/treemap2' element={<TreeMap2 />} />
        <Route path='/sample/wordcloud1' element={<WordCloud1 />} />
        <Route path='/sample/wordcloud2' element={<WordCloud2 />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
