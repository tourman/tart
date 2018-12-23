import {
  last,
  mapValues,
  groupBy,
  sum,
  sumBy,
} from 'lodash';

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
          size,
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
      size: 0,
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
    const circle = last(state.figures);
    const weightAndSize = this.getWeightAndSize(circle, payload);
    Object.assign(circle, weightAndSize);
    const weights = this.getWeights(state);
    Object.assign(state, weights);
    return state;
  }

  getWeightAndSize(circle, payload) {
    const width = payload.x - circle.x;
    const height = payload.y - circle.y;
    const weight = width * width + height * height;
    const size = Math.sqrt(weight);
    return {
      weight,
      size,
    };
  }

  getWeights(state) {
    const figuresByType = groupBy(state.figures, 'type');
    const typeWeights = mapValues(figuresByType, figures => sumBy(figures, 'weight'));
    const totalWeight = sum(Object.values(typeWeights));
    const typeRelativeWeights = mapValues(typeWeights, weight => weight / totalWeight);
    return {
      typeRelativeWeights,
      totalWeight,
    };
  }
}

export default PictureService;
