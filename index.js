import React from 'react';
// Fix: For React 18, createRoot is imported from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import App from './App.js';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Fix: Use the createRoot API which is standard for React 18.
// The `render` API is deprecated and has been removed from the main 'react-dom' package.
const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);