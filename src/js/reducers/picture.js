class PictureReducer {
  static getInitialState() {
    const state = {
      size: 500,
      defaultRadius: 10,
      circles: [/*
        {
          x, //center
          y, //center
          radius,
          color,
        }
      */],
    };
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   */
  add(state, payload) {
    const circle = {
      x: payload.x,
      y: payload.y,
      radius: state.defaultRadius,
      color: 'red',
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
    circle.radius = Math.ceil(radius);
    state.circles.push(circle);
    return state;
  }
}

export default PictureReducer;
