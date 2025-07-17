/* eslint-disable @typescript-eslint/no-explicit-any */
const isFunction = (value: unknown): value is (...args: any) => any => {
  const isF = typeof value === 'function';
  return isF;
};

const isDev = () => {
  return process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test';
};

const isObject = (value: unknown): value is Record<any, any> => {
  if (Number.isNaN(value)) {
    return false;
  }
  return value !== null && typeof value === 'object';
};

const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean';
};

const isNumber = (value: unknown): value is number => {
  return typeof value === 'number';
};

const isUndef = (value: unknown): value is undefined => {
  return typeof value === 'undefined';
};

const isSymbol = (value: unknown): value is symbol => {
  return typeof value === 'symbol';
};

const isBigint = (value: unknown): value is bigint => {
  return typeof value === 'bigint';
};

const isNaN = (value: unknown): value is number => {
  return Number.isNaN(value);
};

const isBrowser = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

export { isBigint, isBoolean, isBrowser, isDev, isFunction, isNaN, isNumber, isObject, isString, isSymbol, isUndef };
