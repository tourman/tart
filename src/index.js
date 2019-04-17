import React from 'react';
import ReactDOM from 'react-dom';
import './css/style.css';
import App from './js/components/containers/App';
import * as serviceWorker from './serviceWorker';
import dispatcher from './js/dispatcher';

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
/* eslint-disable */
if (process.env.NODE_ENV === 'development') {
  window._dispatcher = dispatcher;
}
/* eslint-enable */
