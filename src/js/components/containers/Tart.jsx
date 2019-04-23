import React, { useReducer } from 'react';
import Linen from '../presents/Linen';
import Info from '../presents/Info';
import { mapValues } from 'lodash';
import reducer, { initialState } from '../../reducer';

const actionToTypeMap = {
  onFigureAdd:        'figure.add',
  onFigureLastResize: 'figure.last.resize',
  onFigureLastUpdate: 'figure.last.update',
  onChangeName:       'figure.name',
  onRemove:           'figure.remove',
};

const actionsMap = new Map();

const Tart = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = actionsMap.get(dispatch) || mapValues(actionToTypeMap, type => payload => dispatch({
    type,
    payload,
  }));
  actionsMap.set(dispatch, actions);
  return (
    <>
      <Linen {...state} {...actions} />
      <Info {...state} {...actions} />
    </>
  );
};

export default Tart;
