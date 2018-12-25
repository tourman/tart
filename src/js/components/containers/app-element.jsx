import React, { Component } from 'react';
import { Container } from 'flux/utils';
import AppWrapper from 'presents/app-wrapper';
import Linen from 'presents/linen';
import Info from 'presents/info';
import Store from 'stores/linen';
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
      <React.StrictMode>
        <AppWrapper>
          <Linen {...this.state} />
          <Info {...this.state} />
        </AppWrapper>
      </React.StrictMode>
    );
  }
};

const AppContainer = Container.create(App);

export default <AppContainer />;
