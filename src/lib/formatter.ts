export const formatMeasure = (measure: string): string => {
  return measure
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
