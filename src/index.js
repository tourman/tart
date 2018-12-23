import ReactDOM from 'react-dom';
import app from 'containers/app-element';
import dispatcher from 'dispatcher';
import '../css/style.css';

const appEl = window.document.getElementById('app');
ReactDOM.render(app, appEl);

/* eslint-disable */
if (MODE === 'development') {
  window._dispatcher = dispatcher;
}
/* eslint-emable */
