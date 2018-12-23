import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppWrapper from 'presents/app-wrapper';
import Picture from 'presents/picture';
import BarSet from 'presents/bar-set';
import Store from 'stores/picture';
import dispatcher from 'dispatcher';

const store = new Store(dispatcher);

class App extends Component {
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
      <AppWrapper {...this.state}>
        <Picture {...this.state} />
        <BarSet {...this.state} />
      </AppWrapper>
    );
  }
};

const AppContainer = Container.create(App);

export default <AppContainer />;
