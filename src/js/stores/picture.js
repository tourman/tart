import { ReduceStore } from 'flux/utils';
import { fromJS } from 'immutable';

class PictureStore extends ReduceStore {
  getInitialState() {
    const state = {
      size: 500,
      circles: [], // x, y, size for each
    };
    return fromJS(state);
  }

  reduce(state, action) {
    let newState;
    switch (action.name) {
      case 'add':
        newState = state.updateIn(['circles'], circles => circles.push(action.payload));
        break;
      default:
        newState = state;
        break;
    }
    return newState;
  }
}

export default PictureStore;
