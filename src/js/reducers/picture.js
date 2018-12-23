import Service from 'services/picture';

class PictureReducer {
  constructor({ service }) {
    this.service = service || new Service();
  }

  'circle.add'(...args) {
    const newState = this.service.add(...args);
    return newState;
  }

  'circle.last.update'(...args) {
    const newState = this.service.updateLast(...args);
    return newState;
  }
}

export default PictureReducer;
