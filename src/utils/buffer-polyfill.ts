
// This file ensures Buffer is available globally
import { Buffer } from 'buffer';

// Make Buffer available globally
window.Buffer = Buffer;

export const ensureBufferPolyfill = () => {
  // This function is just to ensure the file is imported
  if (!window.Buffer) {
    window.Buffer = Buffer;
  }
  console.log('Buffer polyfill initialized');
};

// Initialize immediately
ensureBufferPolyfill();
