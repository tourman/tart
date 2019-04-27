import React, { useReducer, useEffect } from 'react';
import Linen from '../presents/Linen';
import Info from '../presents/Info';
import { mapValues } from 'lodash';
import reducer, {
  initialState,
  FIGURE_ADD,
  FIGURE_LAST_RESIZE,
  FIGURE_LAST_UPDATE,
  FIGURE_NAME,
  FIGURE_REMOVE,
  FIGURE_MOVE_START,
  FIGURE_MOVE_END,
  READ
} from '../../reducer';

const actionToTypeMap = {
  onFigureAdd:        FIGURE_ADD,
  onFigureLastResize: FIGURE_LAST_RESIZE,
  onFigureLastUpdate: FIGURE_LAST_UPDATE,
  onChangeName:       FIGURE_NAME,
  onRemove:           FIGURE_REMOVE,
  onFigureMoveStart:  FIGURE_MOVE_START,
  onFigureMoveEnd:    FIGURE_MOVE_END,
  onRead:             READ,
};

const readState = async state => new Promise(resolve => {
  setTimeout(() => {
    const rawSavedState = localStorage.getItem('tart.state') || null;
    const savedState = JSON.parse(rawSavedState);
    resolve(savedState || state);
  });
});

const writeState = async state => new Promise(resove => {
  setTimeout(() => {
    const rawState = JSON.stringify(state);
    localStorage.setItem('tart.state', rawState);
    resove();
  });
});

const actionsMap = new Map();

const Tart = props => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const actions = actionsMap.get(dispatch) || mapValues(actionToTypeMap, type => payload => dispatch({
    type,
    payload,
  }));
  actionsMap.set(dispatch, actions);
  const childrenProps = {
    ...props,
    ...state,
    ...actions,
  };
  useEffect(() => {
    const init = state === initialState;
    if (init) {
      (async () => {
        const savedState = await readState(state);
        actions.onRead(savedState);
        return savedState;
      })();
    } else {
      writeState(state);
    }
  });
  return (
    <>
      <Linen {...childrenProps} />
      <Info {...childrenProps} />
    </>
  );
};

export default Tart;
