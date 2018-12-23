class PictureService {
  getInitialState() {
    const state = {
      size: 500,
      minRadius: 5,
      totalWeight: 0,
      figures: [/*
        {
          x, //center
          y, //center
          weight,
          type,
        }
      */],
      typeRelativeWeights: {
        positive: 0,
        negative: 0,
      },
    };
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   * @param {string} payload[].type
   */
  add(state, payload) {
    const circle = {
      x: payload.x,
      y: payload.y,
      weight: 0,
      type: payload.type,
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
    const weights = this.getWeights(state);
    Object.assign(state, weights);
    return state;
  }

  /* eslint-disable no-param-reassign */
  getWeights(state) {
    const weights = {};
    const typeWeights = state.figures.reduce((memo, figure) => {
      memo[figure.type] = memo[figure.type] || 0;
      memo[figure.type] += figure.weight;
      return memo;
    }, {});
    weights.totalWeight = Object.values(typeWeights).reduce((memo, weight) => memo + weight, 0);
    weights.typeRelativeWeights = Object.entries(typeWeights).reduce((memo, [type, weight]) => {
      memo[type] = weight / state.totalWeight;
      return memo;
    }, {});
    return weights;
  }
  /* eslint-enable no-param-reassign */
}

export default PictureService;
