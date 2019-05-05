import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import merge from 'lodash/merge';
import last from 'lodash/last';
import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import sumBy from 'lodash/sumBy';

const throttle = (fn, delay = 0) => {
  let result;
  const proceed = () => {
    setTimeout(() => result = void 0, delay);
  };
  return (...args) => {
    result = result || proceed() || fn(...args);
    return result;
  };
};

const uniqueId = base => {
  const id = Math.floor(Math.random() * Math.pow(36, 10)).toString(36);
  return base + id;
};

const compose = (...chain) => Component => chain.reduce((Component, hoc) => hoc(Component), Component);

const chain = arg => {
  const methodMap = {
    mapValues,
    throttle,
    pickBy,
    merge,
    last,
    groupBy,
    sum,
    sumBy,
    uniqueId,
    compose,
  };
  const boundMethodMap = mapValues(methodMap, method => (...args) => {
    const result = method(arg, ...args);
    return chain(result);
  });
  boundMethodMap.value = () => arg;
  return boundMethodMap;
};

export const areTotalWeightsDifferent = (prevProps, props) => {
  const weightDiff = prevProps.totalWeight - props.totalWeight;
  const differentWeights = Math.abs(weightDiff) >= Number.EPSILON;
  return differentWeights;
};

export {
  chain,
  mapValues,
  throttle,
  pickBy,
  merge,
  last,
  groupBy,
  sum,
  sumBy,
  uniqueId,
  compose
};
