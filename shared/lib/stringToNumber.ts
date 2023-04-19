export const stringToNumber = (value: string): number => {
  const number = Number(value);
  if (Number.isNaN(number)) {
    throw new Error(`Can't convert '${value}' to number`);
  }
  return number;
};
