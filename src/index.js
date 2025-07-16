import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ReactFlowProvider } from '@xyflow/react';
import { DnDProvider } from './DnDContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ReactFlowProvider>
      <DnDProvider>
        <App />
      </DnDProvider>
    </ReactFlowProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
