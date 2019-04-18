import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppWrapper from '../presents/AppWrapper';
import Linen from '../presents/Linen';
import Info from '../presents/Info';
import Store from '../../stores/linen';
import dispatcher from '../../dispatcher';
import { mapValues } from 'lodash';

const store = new Store(dispatcher);

const actionToTypeMap = {
  onFigureAdd:        'figure.add',
  onFigureLastResize: 'figure.last.resize',
  onFigureLastUpdate: 'figure.last.update',
};

const actions = mapValues(actionToTypeMap, name => payload => dispatcher.dispatch({
  name,
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
          <Linen {...this.state} {...actions} />
          <Info {...this.state} />
        </AppWrapper>
      </React.StrictMode>
    );
  }
};

const App = Container.create(AppContent);

export default App;
