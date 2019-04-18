import React, { useReducer } from 'react';
import Linen from '../presents/Linen';
import Info from '../presents/Info';
import { merge, mapValues } from 'lodash';
import Reducer from '../../stores/linen/reducer';
import Service from '../../stores/linen/service';

const service = new Service();

const init = () => {
  return service.getInitialState();
};

const reducer = (() => {
  const reducer = new Reducer({ service })
  return (state, { type, payload }) => reducer[type](merge({}, state), payload);
})();

const actionToTypeMap = {
  onFigureAdd:        'figure.add',
  onFigureLastResize: 'figure.last.resize',
  onFigureLastUpdate: 'figure.last.update',
};

let actions;

const Tart = props => {
  const [state, dispatch] = useReducer(reducer, null, init);
  actions = mapValues(actionToTypeMap, type => payload => dispatch({
    type,
    payload,
  }));
  return (
    <>
      <Linen {...state} {...actions} />
      <Info {...state} />
    </>
  );
};

export default Tart;
