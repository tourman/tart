import {
  chain,
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
          relativeWeight,
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
    const figure = {
      x: payload.x,
      y: payload.y,
      size: 0,
      weight: 0,
      type: payload.type,
    };
    state.figures.push(figure);
    state = this.updateWeights(state);
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   */
  updateLast(state, payload) {
    const figure = last(state.figures);
    const weightAndSize = this.getWeightAndSize(figure, payload);
    Object.assign(figure, weightAndSize);
    state = this.updateWeights(state);
    return state;
  }

  getWeightAndSize(figure, payload) {
    const width = payload.x - figure.x;
    const height = payload.y - figure.y;
    const weight = width * width + height * height;
    const size = Math.sqrt(weight);
    return {
      weight,
      size,
    };
  }

  updateWeights(state) {
    const weights = this.getWeights(state);
    Object.assign(state, weights);
    state.figures = state.figures.map(this.setRelativeWeight.bind(this, state));
    return state;
  }

  getWeights(state) {
    const figuresByType = groupBy(state.figures, 'type');
    const typeWeights = mapValues(figuresByType, figures => sumBy(figures, 'weight'));
    const totalWeight = sum(Object.values(typeWeights));
    const typeRelativeWeights = chain(typeWeights)
      .mapValues(weight => weight / totalWeight)
      .mapValues(weight => weight !== weight ? 1 : weight)
      .value()
    ;
    return {
      typeRelativeWeights,
      totalWeight,
    };
  }

  setRelativeWeight(state, figure) {
    figure.relativeWeight = figure.weight / state.totalWeight;
    figure.relativeWeight = figure.relativeWeight !== figure.relativeWeight ? 1 : figure.relativeWeight;
    return figure;
  }
}

export default PictureService;
