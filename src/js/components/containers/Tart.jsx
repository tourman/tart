import React, { useReducer } from 'react';
import Linen from '../presents/Linen';
import Info from '../presents/Info';
import { mapValues } from 'lodash';
import reducer, { initialState } from '../../reducer';

const actionToTypeMap = {
  onFigureAdd:        'figure.add',
  onFigureLastResize: 'figure.last.resize',
  onFigureLastUpdate: 'figure.last.update',
};

const Tart = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = mapValues(actionToTypeMap, type => payload => dispatch({
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
