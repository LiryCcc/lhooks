import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { useBoolean } from './index';

const setup = (defaultValue?: boolean) => renderHook(() => useBoolean(defaultValue));

describe('useBoolean', () => {
  it('test on methods', async () => {
    const { result } = setup();
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].setTrue();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].setFalse();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].toggle();
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].set(false);
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].set(true);
    });
    expect(result.current[0]).toBe(true);
    act(() => {
      result.current[1].set(0 as unknown as boolean);
    });
    expect(result.current[0]).toBe(false);
    act(() => {
      result.current[1].set('a' as unknown as boolean);
    });
    expect(result.current[0]).toBe(true);
  });

  it('test on default value', () => {
    const hook1 = setup(true);
    expect(hook1.result.current[0]).toBe(true);
    const hook2 = setup();
    expect(hook2.result.current[0]).toBe(false);
    const hook3 = setup(0 as unknown as boolean);
    expect(hook3.result.current[0]).toBe(false);
    const hook4 = setup('' as unknown as boolean);
    expect(hook4.result.current[0]).toBe(false);
    const hook5 = setup('hello' as unknown as boolean);
    expect(hook5.result.current[0]).toBe(true);
  });
});
