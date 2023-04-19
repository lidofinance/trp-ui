export const stringToBoolean = (value: 'true' | 'false' | string): boolean => {
  switch (value) {
    case 'true':
      return true;
    case 'false':
      return false;
    default:
      throw Error(`Can't convert '${value}' to boolean`);
  }
};
