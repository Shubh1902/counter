import { MAX_VALUE } from 'src/modules/counter/constants';

export const checkMax = (value: number | string) => {
  if (Number(value) >= MAX_VALUE) return MAX_VALUE;
  else if (Number(value) <= -MAX_VALUE) return -MAX_VALUE;
  return Number(value);
};
