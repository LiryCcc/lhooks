/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { useMount } from './index';

describe('useMount', () => {
  it('test mount', async () => {
    const fn = vi.fn();
    const hook = renderHook(() => useMount(fn));
    expect(fn).toBeCalledTimes(1);
    hook.rerender();
    expect(fn).toBeCalledTimes(1);
    hook.unmount();
    expect(fn).toBeCalledTimes(1);

    renderHook(() => useMount(fn)).unmount();
    expect(fn).toBeCalledTimes(2);
  });

  it('should throw error when fn is not a function', () => {
    const fn = vi.mockObject({ a: 1 });
    expect(() => renderHook(() => useMount(fn as any))).toThrowError();
  });
});
