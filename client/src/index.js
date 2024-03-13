import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import App from "./App";
import ReactDOM from 'react-dom';
import 'tailwindcss/tailwind.css';
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
