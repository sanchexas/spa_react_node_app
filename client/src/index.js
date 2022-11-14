import React from 'react';
import ReactDOM from 'react-dom/client';

import {BrowserRouter} from 'react-router-dom';
import './components/style.css';
import LeftBlock from './components/LeftBlock';
import Content from './components/Content';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <LeftBlock />
      <Content />
    </BrowserRouter>
  //  </React.StrictMode>
);

