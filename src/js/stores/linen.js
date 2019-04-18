import { ReduceStore } from 'flux/utils';
import { fromJS } from 'immutable';
import Reducer from './linen/reducer';
import Service from './linen/service';

class PictureStore extends ReduceStore {
  initialize() {
    const service = new Service();
    this.service = service;
    this.reducer = new Reducer({ service });
  }

  getInitialState() {
    this.initialize();
    const muttableState = this.service.getInitialState();
    const immutableState = this.toImmutable(muttableState);
    return immutableState;
  }

  reduce(immutableState, action) {
    const muttableState = this.fromImmutable(immutableState);
    const newMuttableState = this.reduceMutable(muttableState, action);
    const newImmutableState = this.toImmutable(newMuttableState);
    return newImmutableState;
  }

  reduceMutable(state, action) {
    let newState;
    const isMethod = this.reducer[action.type] && typeof this.reducer[action.type] === 'function';
    if (isMethod) {
      newState = this.reducer[action.type](state, action.payload);
    } else {
      newState = state;
    }
    return newState;
  }

  fromImmutable(immutableState) {
    const muttableState = immutableState.toJS();
    return muttableState;
  }

  toImmutable(muttableState) {
    const immutableState = fromJS(muttableState);
    return immutableState;
  }
}

export default PictureStore;
