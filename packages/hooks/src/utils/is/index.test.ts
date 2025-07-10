import { afterEach, beforeEach, describe, expect, it, test } from 'vitest';
import { isBigint, isBoolean, isDev, isFunction, isNaN, isNumber, isObject, isString, isSymbol, isUndef } from '.';

describe('utils is', () => {
  test('is function', () => {
    expect(isFunction(function foo() {})).toBe(true);
    expect(isFunction(() => {})).toBe(true);

    expect(isFunction({})).toBe(false);
    expect(isFunction(1)).toBe(false);
  });

  test('is boolean', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);

    expect(isBoolean('')).toBe(false);
    expect(isBoolean([])).toBe(false);
  });

  test('is function', () => {
    expect(isFunction(function foo() {})).toBe(true);
    expect(isFunction(() => {})).toBe(true);

    expect(isFunction({})).toBe(false);
    expect(isFunction(1)).toBe(false);
  });

  test('is number', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber(Infinity)).toBe(true);
    expect(isNumber(NaN)).toBe(true);

    expect(isNumber('str')).toBe(false);
    expect(isNumber({})).toBe(false);
  });

  test('is object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject([])).toBe(true);
    expect(isObject(new RegExp(''))).toBe(true);
    expect(isObject(new Date())).toBe(true);

    expect(isObject(null)).toBe(false);
    expect(isObject(function foo() {})).toBe(false);
    expect(isObject(123)).toBe(false);
    expect(isObject(NaN)).toBe(false);
  });

  test('is string', () => {
    expect(isString('1')).toBe(true);
    expect(isString(String('1'))).toBe(true);

    expect(isString(1)).toBe(false);
    expect(isString({})).toBe(false);
  });

  test('is undef', () => {
    expect(isUndef(undefined)).toBe(true);

    expect(isUndef(0)).toBe(false);
    expect(isUndef(null)).toBe(false);
    expect(isUndef(NaN)).toBe(false);
    expect(isUndef('')).toBe(false);
  });

  test('is symbol', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol('1'))).toBe(true);
    expect(isSymbol('1')).toBe(false);
    expect(isSymbol(1)).toBe(false);
  });

  test('is NaN', () => {
    expect(isNaN(NaN)).toBe(true);
    expect(isNaN(1)).toBe(false);
    expect(isNaN('1')).toBe(false);
    expect(isNaN(null)).toBe(false);
    expect(isNaN(undefined)).toBe(false);
  });

  test('is bigint', () => {
    expect(isBigint(1n)).toBe(true);
    expect(isBigint(1)).toBe(false);
    expect(isBigint('1')).toBe(false);
    expect(isBigint(null)).toBe(false);
    expect(isBigint(undefined)).toBe(false);
  });

  describe('is dev', () => {
    // 保存原始的 process.env.NODE_ENV
    let originalNodeEnv: string | undefined;

    // 在每个测试用例运行之前，保存原始值
    beforeEach(() => {
      originalNodeEnv = process.env.NODE_ENV;
    });

    // 在每个测试用例运行之后，恢复原始值，确保不影响其他测试
    afterEach(() => {
      process.env.NODE_ENV = originalNodeEnv;
    });

    it('should return true when NODE_ENV is "development"', () => {
      // 模拟 NODE_ENV 为 'development'
      process.env.NODE_ENV = 'development';
      expect(isDev()).toBe(true);
    });

    it('should return true when NODE_ENV is "test"', () => {
      // 模拟 NODE_ENV 为 'test'
      process.env.NODE_ENV = 'test';
      expect(isDev()).toBe(true);
    });

    it('should return false when NODE_ENV is "production"', () => {
      // 模拟 NODE_ENV 为 'production'
      process.env.NODE_ENV = 'production';
      expect(isDev()).toBe(false);
    });

    it('should return false when NODE_ENV is undefined', () => {
      // 模拟 NODE_ENV 为 undefined
      process.env.NODE_ENV = undefined;
      expect(isDev()).toBe(false);
    });

    it('should return false when NODE_ENV is something else', () => {
      // 模拟 NODE_ENV 为其他值
      process.env.NODE_ENV = 'staging';
      expect(isDev()).toBe(false);
    });
  });
});
