import { ReduceStore } from 'flux/utils';
import { fromJS } from 'immutable';
import Reducer from 'reducers/picture';

const reducer = new Reducer();

class PictureStore extends ReduceStore {
  getInitialState() {
    const muttableState = reducer.constructor.getInitialState();
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
    if (reducer[action.name]) {
      newState = reducer[action.name](state, action.payload);
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
