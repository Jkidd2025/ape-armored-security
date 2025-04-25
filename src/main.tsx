
// Add buffer polyfill for Solana libraries
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// Also import our buffer polyfill utility for consistency
import './utils/buffer-polyfill';

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
