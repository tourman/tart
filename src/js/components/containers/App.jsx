import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppWrapper from '../presents/AppWrapper';
import Tart from './Tart';
import Store from '../../stores/linen';
import dispatcher from '../../dispatcher';
import { mapValues } from 'lodash';

const store = new Store(dispatcher);

const actionToTypeMap = {
  onFigureAdd:        'figure.add',
  onFigureLastResize: 'figure.last.resize',
  onFigureLastUpdate: 'figure.last.update',
};

const actions = mapValues(actionToTypeMap, type => payload => dispatcher.dispatch({
  type,
  payload,
}))

class AppContent extends Component {
  static getStores() {
    return [
      store,
    ];
  }

  static calculateState() {
    const immutableState = store.getState();
    const mutableState = immutableState.toJS();
    return mutableState;
  }

  render() {
    return (
      <React.StrictMode>
        <AppWrapper>
          <Tart {...this.state} {...actions} />
        </AppWrapper>
      </React.StrictMode>
    );
  }
};

const App = Container.create(AppContent);

export default App;
