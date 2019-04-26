import { merge } from 'lodash';
import Service from './stores/linen/service';
import produce from 'immer';

export const
  FIGURE_ADD         = 'figure.add',
  FIGURE_LAST_RESIZE = 'figure.last.resize',
  FIGURE_LAST_UPDATE = 'figure.last.update',
  FIGURE_NAME        = 'figure.name',
  FIGURE_REMOVE      = 'figure.remove'
;

const service = new Service();

export const initialState = service.getInitialState();

const reducer = (prevState, { type, payload }) => {
  const state = produce(prevState, draft => {
    switch(type) {
      case FIGURE_ADD: {
        service.add(draft, payload);
        draft.openForResizing = true;
        break;
      }
      case FIGURE_LAST_RESIZE: {
        if (draft.openForResizing) {
          service.updateLast(draft, payload);
        }
        draft.weightChanging = true;
        break;
      }
      case FIGURE_LAST_UPDATE: {
        service.updateLast(draft, payload);
        draft.openForResizing = false;
        draft.weightChanging = false;
        break;
      }
      case FIGURE_NAME: {
        service.changeName(draft, payload);
        break;
      }
      case FIGURE_REMOVE: {
        service.remove(draft, payload);
        break;
      }
    }
  });
  return state;
};

export default reducer;
