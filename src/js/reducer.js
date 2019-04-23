import { merge } from 'lodash';
import Service from './stores/linen/service';
import produce from 'immer';

const service = new Service();

export const initialState = service.getInitialState();

const reducer = (prevState, { type, payload }) => {
  const state = produce(prevState, draft => {
    switch(type) {
      case 'figure.add': {
        service.add(draft, payload);
        draft.openForResizing = true;
        break;
      }
      case 'figure.last.resize': {
        if (draft.openForResizing) {
          service.updateLast(draft, payload);
        }
        break;
      }
      case 'figure.last.update': {
        service.updateLast(draft, payload);
        draft.openForResizing = false;
        break;
      }
      case 'figure.name': {
        service.changeName(draft, payload);
        break;
      }
      case 'figure.remove': {
        service.remove(draft, payload);
        break;
      }
    }
  });
  return state;
};

export default reducer;
