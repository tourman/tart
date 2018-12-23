import Service from 'services/picture';

class PictureReducer {
  constructor({ service }) {
    this.service = service || new Service();
  }

  'circle.add'(state, payload) {
    const newState = this.service.add(state, payload);
    return newState;
  }

  'circle.last.update'(state, payload) {
    const newState = this.service.updateLast(state, payload);
    return newState;
  }
}

export default PictureReducer;
