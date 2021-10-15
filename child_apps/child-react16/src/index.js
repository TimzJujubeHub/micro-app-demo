import './public-path';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Router from './router';
import reportWebVitals from './reportWebVitals';

// 将渲染操作放入 mount 函数
function mount () {
  ReactDOM.render(
    <React.StrictMode>
      <Router />
    </React.StrictMode>,
    document.getElementById('react16-root')
  );

  console.log('微应用child-react16渲染了');

  // 主动获取数据
  console.log('child-react16 getData:', window.microApp?.getData());

  // 监听数据变化
  window.microApp?.addDataListener((data) => {
    console.log('child-react16 addDataListener:', data);
  })
}

// 将卸载操作放入 unmount 函数
function unmount () {
  ReactDOM.unmountComponentAtNode(document.getElementById('react16-root'));
  console.log('微应用child-react16卸载了');
}

// 微前端环境下，注册mount和unmount方法
if (window.__MICRO_APP_ENVIRONMENT__) {
  window[`micro-app-${window.__MICRO_APP_NAME__}`] = { mount, unmount }
} else {
  // 非微前端环境直接渲染
  mount();
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();