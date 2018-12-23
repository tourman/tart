class PictureService {
  getInitialState() {
    const state = {
      size: 500,
      minRadius: 5,
      figures: [/*
        {
          x, //center
          y, //center
          weight,
          type,
        }
      */],
    };
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   * @param {boolean} payload[].positive
   */
  add(state, payload) {
    const typeMap = {
      true: 'positive',
      false: 'negative',
    };
    const positive = !!payload.positive;
    const type = typeMap[positive];
    const circle = {
      x: payload.x,
      y: payload.y,
      weight: 0,
      type,
    };
    state.figures.push(circle);
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   */
  updateLast(state, payload) {
    const circle = state.figures.pop();
    const width = payload.x - circle.x;
    const height = payload.y - circle.y;
    circle.weight = width * width + height * height;
    state.figures.push(circle);
    return state;
  }
}

export default PictureService;
