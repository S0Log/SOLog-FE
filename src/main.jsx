import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import { render } from 'react-dom';

// const domNode = document.getElementById('root');
// render(<App />, domNode);
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
