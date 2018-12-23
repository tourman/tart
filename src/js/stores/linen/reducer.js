import Service from 'stores/linen/service';

/**
 * All methods should accept 2 params: state, payload
 */
class PictureReducer {
  constructor({ service }) {
    this.service = service || new Service();
  }

  'figure.add'(...args) {
    const newState = this.service.add(...args);
    newState.openForResizing = true;
    return newState;
  }

  'figure.last.resize'(state, payload) {
    let newState;
    if (state.openForResizing) {
      newState = this.service.updateLast(state, payload);
    } else {
      newState = state;
    }
    return newState;
  }

  'figure.last.update'(...args) {
    const newState = this.service.updateLast(...args);
    newState.openForResizing = false;
    return newState;
  }
}

export default PictureReducer;
