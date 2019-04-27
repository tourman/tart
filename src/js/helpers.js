import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import merge from 'lodash/merge';
import last from 'lodash/last';
import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import sumBy from 'lodash/sumBy';
import uniqueId from 'lodash/uniqueId';

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
  uniqueId
};
