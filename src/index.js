import React from 'react';
import { render } from 'react-dom';
import { Provider } from "react-redux";
import configureStore from "./store";
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

render(
  (
    <Provider store={configureStore()}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  ), document.getElementById('root'));
  serviceWorker.unregister();

