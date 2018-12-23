class PictureService {
  getInitialState() {
    const state = {
      size: 500,
      minRadius: 5,
      circles: [/*
        {
          x, //center
          y, //center
          radius,
          weight,
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
    const weightMap = {
      true: 'positive',
      false: 'negative',
    };
    const positive = !!payload.positive;
    const weight = weightMap[positive];
    const circle = {
      x: payload.x,
      y: payload.y,
      radius: state.minRadius,
      weight,
    };
    state.circles.push(circle);
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   */
  updateLast(state, payload) {
    const circle = state.circles.pop();
    const width = payload.x - circle.x;
    const height = payload.y - circle.y;
    const radius = Math.sqrt(width * width + height * height);
    circle.radius = Math.max(Math.ceil(radius), state.minRadius);
    state.circles.push(circle);
    return state;
  }
}

export default PictureService;
