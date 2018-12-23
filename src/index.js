import ReactDOM from 'react-dom';
import app from 'containers/app';
import dispatcher from 'dispatcher';
import css from '../css/style.css';

const appEl = window.document.getElementById('app');
ReactDOM.render(app, appEl);

/* global MODE */
if (MODE === 'development') {
  window.dispatcher = dispatcher;
}
