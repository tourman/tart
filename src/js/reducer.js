import { merge } from 'lodash';
import Service from './stores/linen/service';

const service = new Service();

export const initialState = service.getInitialState();

const reducer = (prevState, { type, payload }) => {
  const state = merge({}, prevState);
  switch(type) {
    case 'figure.add': {
      const newState = service.add(state, payload);
      newState.openForResizing = true;
      return newState;
    }
    case 'figure.last.resize': {
      let newState;
      if (state.openForResizing) {
        newState = service.updateLast(state, payload);
      } else {
        newState = state;
      }
      return newState;
    }
    case 'figure.last.update': {
      const newState = service.updateLast(state, payload);
      newState.openForResizing = false;
      return newState;
    }
    default: {
      return prevState;
    }
  }
};

export default reducer;
