import React, { useReducer } from 'react';
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
  FIGURE_MOVE_END
} from '../../reducer';

const actionToTypeMap = {
  onFigureAdd:        FIGURE_ADD,
  onFigureLastResize: FIGURE_LAST_RESIZE,
  onFigureLastUpdate: FIGURE_LAST_UPDATE,
  onChangeName:       FIGURE_NAME,
  onRemove:           FIGURE_REMOVE,
  onFigureMoveStart:  FIGURE_MOVE_START,
  onFigureMoveEnd:    FIGURE_MOVE_END,
};

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
  return (
    <>
      <Linen {...childrenProps} />
      <Info {...childrenProps} />
    </>
  );
};

export default Tart;
