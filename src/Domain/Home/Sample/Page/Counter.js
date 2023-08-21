import React from 'react';
import logo from 'Assets/Images/Sample/logo.svg';
import { Counter } from 'Domain/Home/Sample/Component/Counter';
import 'Assets/Css/Sample/index.css';
import 'Assets/Css/Sample/App.css';
import SampleLayout from 'Domain/Home/Sample/Layout/SampleLayout';

export default function Main() {
  return (
    <SampleLayout>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Counter />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <span>
            <span>Learn </span>
            <a
              className="App-link"
              href="Domain/Home/Sample/App"
              target="_blank"
              rel="noopener noreferrer"
            >
              React
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="Domain/Home/Sample/App"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux
            </a>
            <span>, </span>
            <a
              className="App-link"
              href="Domain/Home/Sample/App"
              target="_blank"
              rel="noopener noreferrer"
            >
              Redux Toolkit
            </a>
            ,<span> and </span>
            <a
              className="App-link"
              href="Domain/Home/Sample/App"
              target="_blank"
              rel="noopener noreferrer"
            >
              React Redux
            </a>
          </span>
        </header>
      </div>
    </SampleLayout>
  );
}
