export const areTotalWeightsDifferent = (prevProps, props) => {
  const weightDiff = prevProps.totalWeight - props.totalWeight;
  const differentWeights = Math.abs(weightDiff) >= Number.EPSILON;
  return differentWeights;
};
