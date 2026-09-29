import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx'; // 指向下面的 App 组件
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);