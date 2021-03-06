import {
  chain,
  last,
  mapValues,
  groupBy,
  sum,
  sumBy,
  uniqueId,
} from '../../helpers';

class PictureService {
  getInitialState() {
    const state = {
      size: 500,
      minRadius: 5,
      totalWeight: 0,
      figures: [/*
        {
          id,
          x, //center
          y, //center
          weight,
          relativeWeight,
          size,
          type,
          name,
          focus,
        }
      */],
      typeRelativeWeights: {
        positive: 0,
        negative: 0,
      },
      weightChanging: false,
    };
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   * @param {string} payload[].type
   */
  add(state, { x, y, type }) {
    const id = uniqueId('item_');
    const figure = {
      id,
      x,
      y,
      size: 0,
      weight: 0,
      type,
      name: '',
      focus: false,
    };
    state.figures.push(figure);
    state = this.updateWeights(state);
    return state;
  }

  remove(state, { index }) {
    state.figures.splice(index, 1);
    state = this.updateWeights(state);
    return state;
  }

  /**
   * @param {Object[]} payload
   * @param {number} payload[].x
   * @param {number} payload[].y
   */
  updateLast(state, payload) {
    state.figures.forEach(figure => figure.focus = false);
    const figure = last(state.figures);
    figure.focus = true;
    const weightAndSize = this.getWeightAndSize(figure, payload);
    Object.assign(figure, weightAndSize);
    state = this.updateWeights(state);
    return state;
  }

  changeName(state, { name, index }) {
    const figure = state.figures[index];
    figure.name = name;
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
