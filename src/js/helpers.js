import mapValues from 'lodash/mapValues';
import throttle from 'lodash/throttle';
import pickBy from 'lodash/pickBy';
import merge from 'lodash/merge';
import last from 'lodash/last';
import groupBy from 'lodash/groupBy';
import sum from 'lodash/sum';
import sumBy from 'lodash/sumBy';
import uniqueId from 'lodash/uniqueId';

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
