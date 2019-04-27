import { merge } from 'lodash';
import Service from './stores/linen/service';
import produce from 'immer';

export const
  FIGURE_ADD         = 'figure.add',
  FIGURE_LAST_RESIZE = 'figure.last.resize',
  FIGURE_LAST_UPDATE = 'figure.last.update',
  FIGURE_NAME        = 'figure.name',
  FIGURE_REMOVE      = 'figure.remove',
  FIGURE_MOVE_START  = 'figure.move.start',
  FIGURE_MOVE_END    = 'figure.move.end',
  READ               = 'read'
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
          draft.weightChanging = true;
        }
        break;
      }
      case FIGURE_LAST_UPDATE: {
        if (draft.openForResizing) {
          service.updateLast(draft, payload);
          draft.weightChanging = false;
          draft.openForResizing = false;
        }
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
      case FIGURE_MOVE_START: {
        break;
      }
      case FIGURE_MOVE_END: {
        const { index, x, y } = payload;
        const figure = draft.figures[index];
        Object.assign(figure, {
          x,
          y,
        });
        draft.move = {
          figure,
        };
        break;
      }
      case READ: {
        Object.assign(draft, payload);
        break;
      }
    }
  });
  return state;
};

export default reducer;
