
// Add buffer polyfill for Solana libraries
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Also import our buffer polyfill utility for consistency
import './utils/buffer-polyfill';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Make sure we're creating the root correctly
const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error('Root element not found');
} else {
  ReactDOM.createRoot(rootElement).render(<App />);
}
