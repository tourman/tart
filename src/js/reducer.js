import { merge } from 'lodash';
import Reducer from './stores/linen/reducer';
import Service from './stores/linen/service';
const service = new Service();

export const initialState = service.getInitialState();

const reducer = (() => {
  const reducer = new Reducer({ service })
  return (state, { type, payload }) => reducer[type](merge({}, state), payload);
})();

export default reducer;
