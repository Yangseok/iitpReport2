import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import reportWebVitals from 'reportWebVitals';
import {PersistGate} from 'redux-persist/integration/react';
import store, {pst} from 'Config/Store';
import Router from 'Config/Router';
import 'tw-elements-react/dist/css/tw-elements-react.min.css';
import 'Assets/Css/Tailwind.css';
import 'Assets/Css/App.css';
import 'Assets/Css/RcSlider.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={pst}>
        <Router />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
