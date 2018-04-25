import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux'
import store from './store'


ReactDOM.render(
<div>
       <Provider store={store}>
<BrowserRouter>
<App /> 
</BrowserRouter>
</Provider>
    </div>
 
, document.getElementById('root'));
registerServiceWorker();
